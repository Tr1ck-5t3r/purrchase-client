// src/Components/ProtectedRoute.jsx
import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const ProtectedRoute = () => {
  // Get the authentication status from Redux state
  const { isAuthenticated, isLoading } = useSelector((state) => state.auth);
  const location = useLocation(); // Get current location

  // Optional: Show a loading indicator while checking auth status (if needed)
  // This might be relevant if you have an initial loading phase for auth check
  // In your current slice, isLoading is primarily for API calls, but
  // the initial check happens synchronously based on localStorage.
  // if (isLoading) {
  //   return <div>Loading...</div>; // Or a spinner component
  // }

  // If user is not authenticated, redirect to login page
  if (!isAuthenticated) {
    // Redirect them to the /login page, but save the current location they were
    // trying to go to. This allows us to send them back after login.
    // Pass the intended location in the state object.
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // If authenticated, render the child component specified in the route
  // <Outlet /> renders the matched child route element.
  return <Outlet />;
};

export default ProtectedRoute;
