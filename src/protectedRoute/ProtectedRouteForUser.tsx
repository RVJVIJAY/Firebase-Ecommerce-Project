import React from "react";
import { useNavigate } from "react-router-dom";
import { Navigate } from "react-router-dom";
const ProtectedRouteForUser = ({ children }) => {
  const userstring = localStorage.getItem("users");
  const user= userstring ? JSON.parse(userstring) : null ;
  const navigate = useNavigate();
  if (user?.role === "user") {
    return children;
  } else {
    return <Navigate to={'/login'}/>;
  }
};

export default ProtectedRouteForUser;
