import React from "react";
import { Navigate } from "react-router-dom";
import { useUser } from "../context/UserContext";

function PrivateRoute({ children, adminOnly }) {
  const { user } = useUser();
  const storedUser = JSON.parse(localStorage.getItem("user")); // Check localStorage for user data

  const currentUser = user || storedUser; // Use either context user or localStorage user

  if (!currentUser) {
    return <Navigate to="/login" />; // Redirect to login if no user is found
  }

  if (adminOnly && currentUser.user_type !== "admin") {
    return <Navigate to="/" />; // Redirect if user is not an admin
  }

  return children;
}

export default PrivateRoute;
