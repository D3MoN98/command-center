import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export default function GuestMiddleware({ children }) {
  let isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  if (isLoggedIn) {
    console.log(isLoggedIn);
    return <Navigate to="/dashboard" replace />;
  }
  return children;
}
