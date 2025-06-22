import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";

export default function Signup() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [dob, setDob] = useState("");
  const [passwordStrength, setPasswordStrength] = useState("");

  const [error, setError] = useState("");

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
const evaluatePasswordStrength = (password) => {
  const hasUpper = /[A-Z]/.test(password);
  const hasLower = /[a-z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const hasSpecial = /[!@#$%^&*]/.test(password);

  if (password.length >= 10 && hasUpper && hasLower && hasNumber && hasSpecial) {
    return "Strong";
  }

  if (password.length >=8  && ((hasUpper || hasLower) && hasNumber && hasSpecial)) {
    return "Medium";
  }

  return "Weak";
};



  const isAtLeast18 = (dob) => {
    const today = new Date();
    const birthDate = new Date(dob);
    const age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    return age > 18 || (age === 18 && m >= 0);
  };
  const isValidPassword = (password) => {
    const passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
    return passwordRegex.test(password);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isValidEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    if (!isValidPassword(password)) {
      setError("Password must be at least 8 characters long and include at least one number and one special character.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (!isAtLeast18(dob)) {
      setError("You must be at least 18 years old to sign up.");
      return;
    }

    setError("");

    const userData = {
      name,
      email,
      password,
      dateOfBirth: dob,
    };

    try {
      const response = await axios.post("http://localhost:5001/signUp", userData);
      if (response.status === 201) {
        localStorage.setItem("uId", response.data.userId);
        navigate("/dashboard");
      }
    } catch (err) {
      setError(err.response?.data?.message || "An error occurred. Please try again.");
    }
  };


  return (
    <div className="container vh-100 d-flex justify-content-center align-items-center">
      <div className="card login-card shadow-lg">
        <div className="card-header text-center login-card-header">
          <h2 className="login-card-title">Create an Account</h2>
        </div>
        <div className="card-body login-card-body">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="name" className="form-label login-label">
                Full Name
              </label>
              <input
                type="text"
                className="form-control login-input"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your full name"
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label login-label">
                Email Address
              </label>
              <input
                type="email"
                className="form-control login-input"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label login-label">
                Password
              </label>
              <input
                type="password"
                className="form-control login-input"
                id="password"
                value={password}
                onChange={(e) => {
                  const value = e.target.value;
                  setPassword(value);
                  setPasswordStrength(evaluatePasswordStrength(value));
                }}
                placeholder="Enter your password"
                required
              />
              {password && (
                <div
                  className="mt-1"
                  style={{
                    color:
                      passwordStrength === "Weak"
                        ? "red"
                        : passwordStrength === "Medium"
                          ? "orange"
                          : "green",
                    fontWeight: "bold",
                  }}
                >
                  Strength: {passwordStrength}
                </div>
              )}
            </div>

            <div className="mb-3">
              <label htmlFor="confirm-password" className="form-label login-label">
                Confirm Password
              </label>
              <input
                type="password"
                className="form-control login-input"
                id="confirm-password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm your password"
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="dob" className="form-label login-label">
                Date of Birth
              </label>
              <input
                type="date"
                className="form-control login-input"
                id="dob"
                value={dob}
                onChange={(e) => setDob(e.target.value)}
                required
              />
            </div>
            {error && (
              <div className="alert alert-danger mt-3">
                <strong>Error: </strong>
                {error}
              </div>
            )}
            <div className="text-center mt-4">
              <button type="submit" className="btn login-btn">
                Sign Up
              </button>
            </div>
          </form>
        </div>
        <div className="card-footer text-center login-card-footer">
          <p>
            Already have an account?{" "}
            <Link to="/" className="login-link">
              Log In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
