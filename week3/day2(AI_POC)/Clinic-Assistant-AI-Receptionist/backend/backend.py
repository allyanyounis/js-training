"""FastAPI Backend for Clinic Assistant AI Receptionist.

Handles patient appointment scheduling, cancellation, listing,
clinic configuration, and user authentication with WebSocket support.
"""

import datetime as dt
import os
import sys
from typing import List, Optional

from fastapi import Depends, FastAPI, HTTPException, Request, WebSocket, WebSocketDisconnect
from fastapi.middleware.cors import CORSMiddleware
from passlib.context import CryptContext
from pydantic import BaseModel, Field
from sqlalchemy import select
from sqlalchemy.orm import Session
import uvicorn

# Ensure the root directory is on the system path for database package import
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from database.database import Appointment, ClinicSettings, User, get_db, init_db

# ---------------------------------------------------------------------------
# Security & Password Utilities
# ---------------------------------------------------------------------------
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


def get_password_hash(password: str) -> str:
    """Hash password using bcrypt, truncated to 72 bytes to avoid passlib limit."""
    return pwd_context.hash(password[:72])


def verify_password(plain_password: str, hashed_password: str) -> bool:
    """Verify plain password against hashed password."""
    return pwd_context.verify(plain_password[:72], hashed_password)


# Initialize SQLite database tables on startup
init_db()


# ---------------------------------------------------------------------------
# Pydantic Schemas / Data Contracts
# ---------------------------------------------------------------------------

# --- Appointment Schemas ---
class AppointmentRequest(BaseModel):
    patient_name: str
    reason: str
    start_time: dt.datetime


class AppointmentResponse(BaseModel):
    id: int
    patient_name: str
    reason: str | None
    start_time: dt.datetime
    canceled: bool
    created_at: dt.datetime


class CancelAppointmentRequest(BaseModel):
    patient_name: str
    date: dt.date


class CancelAppointmentResponse(BaseModel):
    canceled_count: int


class ListAppointmentRequest(BaseModel):
    date: dt.date | None = None


# --- Clinic Settings Schemas ---
class ClinicSettingsResponse(BaseModel):
    start_hour: int = Field(..., ge=0, le=23)
    end_hour: int = Field(..., ge=0, le=23)
    slot_duration_minutes: int
    working_days: str
    holidays: str


class UpdateClinicSettingsRequest(BaseModel):
    start_hour: int = Field(..., ge=0, le=23)
    end_hour: int = Field(..., ge=0, le=23)
    slot_duration_minutes: int
    working_days: str
    holidays: str


# --- Authentication Schemas ---
class SignUpRequest(BaseModel):
    name: str
    email: str
    password: str


class LoginRequest(BaseModel):
    email: str
    password: str


class UserResponse(BaseModel):
    name: str
    email: str
    isLoggedIn: bool = True


# ---------------------------------------------------------------------------
# FastAPI Application & Middleware
# ---------------------------------------------------------------------------
app = FastAPI(title="DocAssist AI - Clinic Assistant API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)


# ---------------------------------------------------------------------------
# WebSocket Real-Time Connection Manager
# ---------------------------------------------------------------------------
class ConnectionManager:
    """Manages active WebSocket client connections for real-time notifications."""

    def __init__(self):
        self.active_connections: List[WebSocket] = []

    async def connect(self, websocket: WebSocket):
        await websocket.accept()
        self.active_connections.append(websocket)

    def disconnect(self, websocket: WebSocket):
        if websocket in self.active_connections:
            self.active_connections.remove(websocket)

    async def send_personal_message(self, message: str, websocket: WebSocket):
        await websocket.send_text(message)

    async def broadcast(self, message: str):
        for connection in list(self.active_connections):
            try:
                await connection.send_text(message)
            except Exception:
                # Remove inactive connection
                self.disconnect(connection)


manager = ConnectionManager()


@app.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):
    """WebSocket endpoint for real-time communication."""
    await manager.connect(websocket)
    try:
        while True:
            data = await websocket.receive_text()
            # Echo back or handle incoming messages
            await manager.send_personal_message(f"Received: {data}", websocket)
    except WebSocketDisconnect:
        manager.disconnect(websocket)


# ---------------------------------------------------------------------------
# Authentication Endpoints
# ---------------------------------------------------------------------------
@app.post("/auth/signup", response_model=UserResponse)
def signup(request: SignUpRequest, db: Session = Depends(get_db)):
    """Register a new clinic staff account."""
    # Check if a user with this email already exists
    stmt = select(User).where(User.email == request.email)
    existing_user = db.execute(stmt).scalars().first()
    if existing_user:
        raise HTTPException(status_code=400, detail="A user with this email already exists.")

    new_user = User(
        name=request.name,
        email=request.email,
        password_hash=get_password_hash(request.password)
    )
    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    return UserResponse(name=new_user.name, email=new_user.email)


@app.post("/auth/login", response_model=UserResponse)
def login(request: LoginRequest, db: Session = Depends(get_db)):
    """Authenticate clinic staff using email and password."""
    stmt = select(User).where(User.email == request.email)
    user = db.execute(stmt).scalars().first()

    if not user or not verify_password(request.password, user.password_hash):
        raise HTTPException(status_code=401, detail="Invalid email or password.")

    return UserResponse(name=user.name, email=user.email)


# ---------------------------------------------------------------------------
# Clinic Settings Endpoints
# ---------------------------------------------------------------------------
@app.get("/settings", response_model=ClinicSettingsResponse)
@app.get("/settings/", response_model=ClinicSettingsResponse)
def get_settings(db: Session = Depends(get_db)):
    """Fetch current clinic operating hours, working days, and holidays."""
    settings = db.execute(select(ClinicSettings)).scalar_one_or_none()
    if not settings:
        settings = ClinicSettings()
        db.add(settings)
        db.commit()
        db.refresh(settings)

    return ClinicSettingsResponse(
        start_hour=settings.start_hour,
        end_hour=settings.end_hour,
        slot_duration_minutes=settings.slot_duration_minutes,
        working_days=settings.working_days,
        holidays=settings.holidays
    )


@app.post("/settings", response_model=ClinicSettingsResponse)
@app.post("/settings/", response_model=ClinicSettingsResponse)
def update_settings(request: UpdateClinicSettingsRequest, db: Session = Depends(get_db)):
    """Update clinic schedule configuration."""
    try:
        settings = db.execute(select(ClinicSettings)).scalars().first()
        if not settings:
            settings = ClinicSettings()
            db.add(settings)

        settings.start_hour = request.start_hour
        settings.end_hour = request.end_hour
        settings.slot_duration_minutes = request.slot_duration_minutes
        settings.working_days = request.working_days
        settings.holidays = request.holidays

        db.commit()
        db.refresh(settings)

        return settings
    except Exception as e:
        print(f"Error in update_settings: {e}")
        db.rollback()
        raise HTTPException(status_code=500, detail=str(e))


# ---------------------------------------------------------------------------
# Appointment Management Endpoints
# ---------------------------------------------------------------------------
@app.post("/schedule_appointment")
@app.post("/schedule_appointment/")
def schedule_appointment(request: AppointmentRequest, db: Session = Depends(get_db)):
    """Schedule a new appointment after applying all business validations."""
    settings = db.execute(select(ClinicSettings)).scalar_one_or_none()
    if not settings:
        settings = ClinicSettings()

    req_date_str = request.start_time.strftime('%Y-%m-%d')
    holidays = [h.strip() for h in settings.holidays.split(',')] if settings.holidays else []

    # 1. Holiday Check
    if req_date_str in holidays:
        raise HTTPException(
            status_code=400,
            detail=f"I'm sorry, but the clinic is closed for a holiday on {request.start_time.strftime('%B %d, %Y')}."
        )

    # 2. Working Days Check (0=Monday ... 6=Sunday)
    working_days = [int(d.strip()) for d in settings.working_days.split(',')] if settings.working_days else []
    if request.start_time.weekday() not in working_days:
        raise HTTPException(
            status_code=400,
            detail=(
                f"I'm sorry, but the clinic is closed on this day of the week. "
                f"{request.start_time.strftime('%B %d, %Y')} falls on a non-working day. "
                "Please choose a valid working day."
            )
        )

    # 3. Booking Window Check (not in the past, within 10 days)
    current_date = dt.datetime.now().date()
    appointment_date = request.start_time.date()

    if appointment_date < current_date:
        raise HTTPException(
            status_code=400,
            detail=(
                f"I'm sorry, but you cannot book an appointment in the past. "
                f"Please choose a date today or up to 10 days from today."
            )
        )

    if appointment_date > current_date + dt.timedelta(days=10):
        max_date = current_date + dt.timedelta(days=10)
        raise HTTPException(
            status_code=400,
            detail=(
                f"I'm sorry, but appointments can only be booked up to 10 days in advance. "
                f"The latest date you can book is {max_date.strftime('%B %d, %Y')}."
            )
        )

    # 4. Operating Hours Check
    if request.start_time.hour < settings.start_hour or request.start_time.hour >= settings.end_hour:
        start_ampm = "AM" if settings.start_hour < 12 else "PM"
        end_ampm = "AM" if settings.end_hour < 12 else "PM"
        sh = settings.start_hour % 12 or 12
        eh = settings.end_hour % 12 or 12

        raise HTTPException(
            status_code=400,
            detail=(
                f"I'm sorry, but your requested appointment time of "
                f"{request.start_time.strftime('%I:%M %p')} is outside clinic hours. "
                f"The doctor is only available between {sh}:00 {start_ampm} and {eh}:00 {end_ampm}. "
                "Please choose a different time slot."
            )
        )

    # 5. Same-Person Duplicate Booking Check
    same_person_booking = db.execute(
        select(Appointment)
        .where(Appointment.patient_name == request.patient_name)
        .where(Appointment.start_time == request.start_time)
        .where(Appointment.canceled == False)
    ).scalar_one_or_none()

    if same_person_booking:
        raise HTTPException(
            status_code=400,
            detail=(
                f"It looks like {request.patient_name} already has an appointment "
                f"on {request.start_time.strftime('%B %d, %Y')} at {request.start_time.strftime('%I:%M %p')}. "
                "You cannot book the same slot twice. Please choose a different time."
            )
        )

    # 6. Slot Availability Check (no conflicting active booking)
    existing_appointment = db.execute(
        select(Appointment)
        .where(Appointment.start_time == request.start_time)
        .where(Appointment.canceled == False)
    ).scalar_one_or_none()

    if existing_appointment:
        raise HTTPException(
            status_code=400,
            detail=(
                f"I'm sorry, but the {request.start_time.strftime('%I:%M %p')} slot on "
                f"{request.start_time.strftime('%B %d, %Y')} is already booked by another patient. "
                "Please choose a different time slot."
            )
        )

    # Create and persist new appointment
    new_appointment = Appointment(
        patient_name=request.patient_name,
        reason=request.reason,
        start_time=request.start_time,
    )
    db.add(new_appointment)
    db.commit()
    db.refresh(new_appointment)

    return AppointmentResponse(
        id=new_appointment.id,
        patient_name=new_appointment.patient_name,
        reason=new_appointment.reason,
        start_time=new_appointment.start_time,
        canceled=new_appointment.canceled,
        created_at=new_appointment.created_at
    )


@app.post("/cancel_appointment")
@app.post("/cancel_appointment/")
def cancel_appointment(request: CancelAppointmentRequest, db: Session = Depends(get_db)):
    """Cancel existing appointments for a patient on a specific date."""
    start_dt = dt.datetime.combine(request.date, dt.time.min)
    end_dt = start_dt + dt.timedelta(days=1)

    result = db.execute(
        select(Appointment)
        .where(Appointment.patient_name == request.patient_name)
        .where(Appointment.start_time >= start_dt)
        .where(Appointment.start_time < end_dt)
        .where(Appointment.canceled == False)
    )

    appointments = result.scalars().all()
    if not appointments:
        raise HTTPException(
            status_code=404,
            detail="No matching appointment for the details found in our system"
        )

    for appointment in appointments:
        appointment.canceled = True

    db.commit()

    return CancelAppointmentResponse(canceled_count=len(appointments))


def _parse_date_value(val):
    """Helper to safely parse dates from string or date objects."""
    if not val:
        return None
    if isinstance(val, dt.date):
        return val
    if isinstance(val, str):
        val = val.strip()
        # Handle ISO timestamp strings like '2026-10-27T12:00:00'
        if "T" in val:
            val = val.split("T")[0]
        try:
            return dt.date.fromisoformat(val)
        except Exception:
            return None
    return None


@app.api_route("/check_doctor_availability", methods=["GET", "POST"])
@app.api_route("/check_doctor_availability/", methods=["GET", "POST"])
@app.api_route("/doctor_availability", methods=["GET", "POST"])
@app.api_route("/list_appointments", methods=["GET", "POST"])
@app.api_route("/list_appointments/", methods=["GET", "POST"])
async def list_appointments(
    request: Request,
    date: str | None = None,
    db: Session = Depends(get_db)
):
    """List appointments sorted by time and provide doctor availability hours.

    Supports:
    - VAPI GET request: Returns doctor working hours, working days, and schedule summary
    - Frontend POST request: Returns raw appointments array
    """
    target_date = _parse_date_value(date)

    # If it's a POST request, try extracting date from body if not already in query
    if request.method == "POST":
        try:
            body = await request.json()
            if isinstance(body, dict):
                # Handle VAPI tool-call wrapped format if sent
                if "message" in body and "toolCalls" in body.get("message", {}):
                    tool_calls = body["message"]["toolCalls"]
                    if tool_calls and "function" in tool_calls[0]:
                        args = tool_calls[0]["function"].get("arguments", {})
                        if isinstance(args, str):
                            import json
                            args = json.loads(args)
                        if "date" in args and not target_date:
                            target_date = _parse_date_value(args.get("date"))
                elif "date" in body and body["date"] and not target_date:
                    target_date = _parse_date_value(body["date"])
        except Exception:
            pass

    query = select(Appointment)

    if target_date:
        start_dt = dt.datetime.combine(target_date, dt.time.min)
        end_dt = start_dt + dt.timedelta(days=1)
        query = query.where(Appointment.start_time >= start_dt).where(Appointment.start_time < end_dt)

    query = query.order_by(Appointment.start_time.asc())

    result = db.execute(query)
    booked_appointments = []
    for appointment in result.scalars().all():
        appointment_obj = AppointmentResponse(
            id=appointment.id,
            patient_name=appointment.patient_name,
            reason=appointment.reason,
            start_time=appointment.start_time,
            canceled=appointment.canceled,
            created_at=appointment.created_at
        )
        booked_appointments.append(appointment_obj)

    # Fetch clinic settings to supply availability hours and days
    settings = db.execute(select(ClinicSettings)).scalar_one_or_none()
    if not settings:
        settings = ClinicSettings()

    start_ampm = "AM" if settings.start_hour < 12 else "PM"
    end_ampm = "AM" if settings.end_hour < 12 else "PM"
    sh = settings.start_hour % 12 or 12
    eh = settings.end_hour % 12 or 12
    hours_text = f"{sh}:00 {start_ampm} to {eh}:00 {end_ampm}"

    day_map = {0: "Monday", 1: "Tuesday", 2: "Wednesday", 3: "Thursday", 4: "Friday", 5: "Saturday", 6: "Sunday"}
    working_day_ints = [int(d.strip()) for d in settings.working_days.split(",") if d.strip().isdigit()]
    working_day_names = [day_map[d] for d in working_day_ints if d in day_map]
    working_days_text = ", ".join(working_day_names) if working_day_names else "Monday through Friday"

    # For VAPI (GET requests or availability checks), return rich availability info
    if request.method == "GET" or "check_doctor_availability" in request.url.path:
        return {
            "doctor_available_hours": hours_text,
            "working_days": working_days_text,
            "slot_duration_minutes": settings.slot_duration_minutes,
            "summary": f"The doctor is available between {hours_text} on {working_days_text}.",
            "booked_appointments": booked_appointments,
            "appointments": booked_appointments
        }

    # For Frontend POST requests, return the appointments list
    return booked_appointments




# ---------------------------------------------------------------------------
# Server Startup
# ---------------------------------------------------------------------------
if __name__ == "__main__":
    uvicorn.run("backend:app", host="127.0.0.1", port=4444, reload=True)

