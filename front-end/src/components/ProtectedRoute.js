import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

function ProtectedRoute({ children }) {
    const { auth } = useContext(AuthContext);

    if (!auth) {
        // Si l'utilisateur n'est pas connecté, rediriger vers la page de connexion
        return <Navigate to="/login" replace />;
    }

    return children;
};

export default ProtectedRoute;