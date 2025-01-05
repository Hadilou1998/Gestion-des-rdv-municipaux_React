import React from "react";
import { Navigate } from "react-router-dom";

function PrivateRoute({ children }) {
    const savedUser = localStorage.getItem("user");
    return savedUser ? children : <Navigate to="/login" />;
};

export default PrivateRoute;