import React from "react";
import { useNavigate } from "react-router-dom";

export default function Nav() {
  const navigate = useNavigate();
  function logout() {
    localStorage.removeItem("uId");
    navigate("/");
  }

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-custom">
        <div className="container-fluid">
          <a
            className="navbar-brand navbar-logo"
            href="#"
            onClick={() => navigate("/Dashboard")}
          >
            Threat Detection
          </a>

          <div className="d-flex align-items-center">
            <span className="navbar-user-name">Welcome to DeepPhish</span>
            <a
              href="#"
              className="navbar-icon-link"
              title="Settings"
              onClick={() => navigate("/settings")}
            >
              <i className="bi bi-gear navbar-icon"></i>
            </a>
            <a
              href="#"
              className="navbar-icon-link"
              title="Logout"
              onClick={logout}
            >
              <i className="bi bi-box-arrow-right navbar-icon"></i>
            </a>
          </div>
        </div>
      </nav>
    </>
  );
}
