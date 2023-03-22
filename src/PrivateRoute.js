import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
const PrivateRoute = ({ children }) => {
  // bring data from reduc store
  const { user } = useSelector((state) => {
    return state.userInfo;
  });

  return user?.uid ? children : <Navigate to="/" replace />;
};

export default PrivateRoute;
