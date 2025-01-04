import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

function PublicRoute({ children }) {
    const { auth } = useContext(AuthContext);

    if (auth) {
        return <Navigate to="/dashboard" replace />;
    }

    return children;
};

export default PublicRoute;