"""Database configuration, models, and session management using SQLAlchemy."""

import datetime as dt
import os
from typing import Generator

from sqlalchemy import Boolean, Column, DateTime, Integer, String, create_engine
from sqlalchemy.orm import Session, declarative_base, sessionmaker

# ---------------------------------------------------------------------------
# Database File & Connection Configuration
# ---------------------------------------------------------------------------
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
DEFAULT_DB_PATH = os.path.join(BASE_DIR, "appointments_db.db")
DATABASE_URL = os.environ.get("DATABASE_URL", f"sqlite:///{DEFAULT_DB_PATH}")

if DATABASE_URL.startswith("sqlite"):
    engine = create_engine(
        DATABASE_URL,
        connect_args={"check_same_thread": False, "timeout": 30}
    )
else:
    # Ensure compatible driver prefix for PostgreSQL (psycopg 3)
    if DATABASE_URL.startswith("postgres://"):
        DATABASE_URL = DATABASE_URL.replace("postgres://", "postgresql+psycopg://", 1)
    elif DATABASE_URL.startswith("postgresql://") and "+psycopg" not in DATABASE_URL and "+asyncpg" not in DATABASE_URL:
        DATABASE_URL = DATABASE_URL.replace("postgresql://", "postgresql+psycopg://", 1)

    engine = create_engine(
        DATABASE_URL,
        pool_pre_ping=True,
    )

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()


# ---------------------------------------------------------------------------
# SQLAlchemy Database Models
# ---------------------------------------------------------------------------
class Appointment(Base):
    """Stores patient appointments with start time, reason, and cancellation status."""
    __tablename__ = "appointments"

    id = Column(Integer, primary_key=True, index=True)
    patient_name = Column(String, index=True)
    reason = Column(String, nullable=True)
    start_time = Column(DateTime, index=True)
    canceled = Column(Boolean, default=False)
    created_at = Column(DateTime, default=dt.datetime.utcnow)


class ClinicSettings(Base):
    """Stores operating hours, working days, and holidays for the clinic."""
    __tablename__ = "settings"

    id = Column(Integer, primary_key=True, index=True)
    start_hour = Column(Integer, default=12)             # 12 PM
    end_hour = Column(Integer, default=17)               # 5 PM
    slot_duration_minutes = Column(Integer, default=15)  # 15 min default
    working_days = Column(String, default="0,1,2,3,4,5") # Mon(0) to Sat(5)
    holidays = Column(String, default="")                # Comma-separated 'YYYY-MM-DD' dates


class User(Base):
    """Stores clinic staff credentials for dashboard authentication."""
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String)
    email = Column(String, unique=True, index=True)
    password_hash = Column(String)
    created_at = Column(DateTime, default=dt.datetime.utcnow)


# ---------------------------------------------------------------------------
# Helper Functions & Dependency
# ---------------------------------------------------------------------------
def init_db() -> None:
    """Create all tables in the SQLite database if they do not exist."""
    Base.metadata.create_all(bind=engine)


def get_db() -> Generator[Session, None, None]:
    """FastAPI dependency that provides a database session and ensures it closes after request."""
    db: Session = SessionLocal()
    try:
        yield db
    finally:
        db.close()
