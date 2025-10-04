import React from "react";
import { Navigate, Outlet } from "react-router-dom";

type ProtectedRouteProps = {
  allowedRoles: string[];
};

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ allowedRoles }) => {
  const role = localStorage.getItem("userRole");

  if (!role || !allowedRoles.includes(role)) {
    // redirect to dashboard (or you can replace with 403 page)
    return <Navigate to="/dashboard" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
