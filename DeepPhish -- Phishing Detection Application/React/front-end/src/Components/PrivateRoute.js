// PrivateRoute.js
import React from "react";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem("uId"); // Get the token from local storage

  // If token doesn't exist, redirect to login page
  return token ? children : <Navigate to="/" />;
};

export default PrivateRoute;
