
import { useState } from "react";

function SignupForm() {
    const [touched, setTouched] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [form, setForm] = useState({
        fullName: "",
        email: "",
        password: "",
        confirmPassword: "",
        country: "",
        acceptTerms: false,
    });

    //   Variable	Meaning	Example
    // name	Identifies which field changed	"fullName"
    // value	Gives the current value of the input	"Ali"
    // type	Identifies the input type	"text" or "checkbox"
    // checked	Tells whether a checkbox is selected	true or false

    // What is event?
    // event contains information about an action that happened, such as the user typing into an input field.

    const handleChange = (event) => {
        const { name, value, type, checked } = event.target;

        // type tells about checkbox and value tells about text

        setForm({
            ...form,
            [name]: type === "checkbox" ? checked : value,
        });
    };
    const nameError =
        form.fullName.trim().length < 3
            ? "Name must be at least 3 characters."
            : ""; //returns an empty string if the name is valid.

    const emailError =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)
            ? ""
            : "Please enter a valid email address.";

    const passwordError =
        form.password.length < 8 ||
        !/[A-Z]/.test(form.password) ||
        !/[0-9]/.test(form.password)
            ? "Password must have 8+ characters, a capital letter, and a number."
            : "";

    const confirmPasswordError =
        form.password !== form.confirmPassword
            ? "Passwords do not match."
            : "";

    const countryError = form.country === ""
        ? "Please select a country."
        : "";

    const termsError = !form.acceptTerms
        ? "You must accept the terms and conditions."
        : "";

    const getPasswordStrength = (password) => {
        if (password.length < 8) {
            return "Weak";
        }

        const hasCapital = /[A-Z]/.test(password);
        const hasNumber = /[0-9]/.test(password);
        const hasSpecial = /[^A-Za-z0-9]/.test(password);

        if (hasCapital && hasNumber && hasSpecial) {
            return "Strong";
        }

        return "Medium";
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        setIsSubmitting(true);

        await new Promise((resolve) => setTimeout(resolve, 1500));

        setIsSubmitting(false);
        setIsSuccess(true);
    };

    const isFormValid =
        !nameError &&
        !emailError &&
        !passwordError &&
        !confirmPasswordError &&
        !countryError &&
        !termsError;

    if (isSuccess) {
        return (
            <div>
                <h1>Registration Successful!</h1>
                <p>Your account has been created successfully.</p>
            </div>
        );
    }

    return (
        <div>
            <h1>Create an Account</h1>

            <form onSubmit={handleSubmit}>
                <div>
                    <label>Full Name</label>

                    <input
                        name="fullName"
                        value={form.fullName}
                        onChange={handleChange}
                        onBlur={() =>
                            setTouched({ ...touched, fullName: true })
                        }
                    />

                    {touched.fullName && nameError && (
                        <p>{nameError}</p>
                    )}
                </div>

                <div>
                    <label>Email</label>

                    <input
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        onBlur={() =>
                            setTouched({ ...touched, email: true })
                        }
                    />

                    {touched.email && emailError && (
                        <p>{emailError}</p>
                    )}
                </div>

                <div>
                    <label>Password</label>

                    <input
                        type="password"
                        name="password"
                        value={form.password}
                        onChange={handleChange}
                        onBlur={() =>
                            setTouched({ ...touched, password: true })
                        }
                    />

                    <p>
                        Password strength: {getPasswordStrength(form.password)}
                    </p>

                    {touched.password && passwordError && (
                        <p>{passwordError}</p>
                    )}
                </div>

                <div>
                    <label>Confirm Password</label>

                    <input
                        type="password"
                        name="confirmPassword"
                        value={form.confirmPassword}
                        onChange={handleChange}
                        onBlur={() =>
                            setTouched({ ...touched, confirmPassword: true })
                        }
                    />

                    {touched.confirmPassword && confirmPasswordError && (
                        <p>{confirmPasswordError}</p>
                    )}
                </div>

                <div>
                    <label>Country</label>

                    <select
                        name="country"
                        value={form.country}
                        onChange={handleChange}
                        onBlur={() =>
                            setTouched({ ...touched, country: true })
                        }
                    >
                        <option value="">Select country</option>
                        <option value="Pakistan">Pakistan</option>
                        <option value="Germany">Germany</option>
                        <option value="United Kingdom">United Kingdom</option>
                        <option value="United States">United States</option>
                    </select>

                    {touched.country && countryError && (
                        <p>{countryError}</p>
                    )}
                </div>

                <div>
                    <label>
                        <input
                            type="checkbox"
                            name="acceptTerms"
                            checked={form.acceptTerms}
                            onChange={handleChange}
                            onBlur={() =>
                                setTouched({ ...touched, acceptTerms: true })
                            }
                        />
                        I accept the terms and conditions
                    </label>

                    {touched.acceptTerms && termsError && (
                        <p>{termsError}</p>
                    )}
                </div>

                <button
                    type="submit"
                    disabled={!isFormValid || isSubmitting}
                >
                    {isSubmitting ? "Submitting..." : "Create Account"}
                </button>
            </form>
        </div>
    );
}

export default SignupForm;
