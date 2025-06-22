import React, { useState } from "react";
import Nav from "./Nav";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Settings() {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [strength, setStrength] = useState("");

const evaluateStrength = (password) => {
  const hasUpper = /[A-Z]/.test(password);
  const hasLower = /[a-z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const hasSpecial = /[!@#$%^&*]/.test(password);

  if (password.length >= 10 && hasUpper && hasLower && hasNumber && hasSpecial) {
    return "Strong";
  }

  if (password.length >= 8 && ((hasUpper || hasLower) && hasNumber && hasSpecial)) {
    return "Medium";
  }

  return "Weak";
};

  const handleUpdatePassword = async (e) => {
    e.preventDefault();

    if (!isValidPassword(newPassword)) {
      toast.error("Password must be at least 8 characters long and include at least one number and one special character.");
      return;
    }

    if (newPassword !== confirmNewPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    const userId = localStorage.getItem("uId");

    try {
      const response = await axios.post("http://localhost:5001/change-password", {
        userId,
        oldPassword,
        newPassword,
      });

      if (response.status === 200) {
        toast.success("Password updated successfully!");
        setOldPassword("");
        setNewPassword("");
        setConfirmNewPassword("");
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        toast.error(error.response.data.message || "Invalid old password!");
      } else {
        toast.error("An error occurred. Please try again.");
      }
    }
  };

  const isValidPassword = (password) => {
    const passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
    return passwordRegex.test(password);
  };

  return (
    <>
      <Nav />
      <div className="container vh-100 d-flex justify-content-center align-items-center">
        <div className="card settings-card shadow-lg">
          <div className="card-header text-center settings-card-header">
            <h2 className="settings-card-title">Change Password</h2>
          </div>
          <div className="card-body settings-card-body">
            <form onSubmit={handleUpdatePassword}>
              <div className="mb-3">
                <label
                  htmlFor="old-password"
                  className="form-label settings-label"
                >
                  Old Password
                </label>
                <input
                  type="password"
                  className="form-control settings-input"
                  id="old-password"
                  placeholder="Enter old password"
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3">
                <label
                  htmlFor="new-password"
                  className="form-label settings-label"
                >
                  New Password
                </label>
                <input
                  type="password"
                  className="form-control settings-input"
                  id="new-password"
                  placeholder="Enter new password"
                  value={newPassword}
                  onChange={(e) => {
                    setNewPassword(e.target.value);
                    setStrength(evaluateStrength(e.target.value));
                  }}
                  required
                />
                {newPassword && (
                  <div className="mt-1">
                    <small
                      style={{
                        color:
                          strength === "Strong"
                            ? "green"
                            : strength === "Medium"
                              ? "orange"
                              : "red",
                      }}
                    >
                      Password Strength: {strength}
                    </small>
                  </div>
                )}
              </div>

              <div className="mb-3">
                <label
                  htmlFor="confirm-new-password"
                  className="form-label settings-label"
                >
                  Confirm New Password
                </label>
                <input
                  type="password"
                  className="form-control settings-input"
                  id="confirm-new-password"
                  placeholder="Confirm new password"
                  value={confirmNewPassword}
                  onChange={(e) => setConfirmNewPassword(e.target.value)}
                  required
                />
              </div>
              <div className="text-center mt-4">
                <button type="submit" className="btn settings-btn">
                  Update Password
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
    </>
  );
}
