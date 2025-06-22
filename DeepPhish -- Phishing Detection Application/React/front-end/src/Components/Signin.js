import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import login from "../Assets/login.png";

export default function Signin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Send login request to backend
      const response = await axios.post("http://localhost:5001/login", {
        email,
        password,
      });

      // If login is successful, store userId in localStorage and redirect
      localStorage.setItem("uId", response.data.userId);
      navigate("/dashboard");
    } catch (err) {
      // Handle errors (invalid credentials)
      setErrorMessage("Invalid email or password. Please try again.");
    }
  };

  return (
    <>
      <div className="container d-flex justify-content-center align-items-center vh-100">
        <div className="card signin-card d-flex flex-row">
          <div className="signin-left d-flex flex-column align-items-center justify-content-center">
            <img src={login} alt="Rest with Dignity" className="signin-image" />
            <h2 className="signin-title">Secure Yourself</h2>
            <p className="signin-text">
              Secure and easy threat detection solution.
            </p>
          </div>

          <div className="signin-right p-4">
            <h3 className="signin-form-title text-center">User Sign-In</h3>
            <p className="signin-form-subtitle text-center">
              Enter your credentials
            </p>
            <form className="signin-form" onSubmit={handleSubmit}>
              <div className="mb-3">
                <label
                  htmlFor="signin-email"
                  className="form-label signin-label"
                >
                  Email or ID
                </label>
                <input
                  type="text"
                  className="form-control signin-input"
                  id="signin-email"
                  placeholder="Enter your email or ID"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3">
                <label
                  htmlFor="signin-password"
                  className="form-label signin-label"
                >
                  Password
                </label>
                <input
                  type="password"
                  className="form-control signin-input"
                  id="signin-password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              {/* Error Message */}
              {errorMessage && (
                <div className="alert alert-danger mt-3">{errorMessage}</div>
              )}

              <button type="submit" className="btn signin-btn w-100">
                Sign In
              </button>
            </form>
            <p className="signin-footer-text text-center mt-3">
              Don't have an account?{" "}
              <Link to="/signup" className="signin-link">
                Sign Up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
