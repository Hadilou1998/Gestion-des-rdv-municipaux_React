import React from "react";
import { Link } from "react-router-dom";

function Unauthorized() {
    return (
        <div className="container mt-4">
            <h2>Accès interdit</h2>
            <p>Vous n'êtes pas autorisé à accéder à cette page.</p>
            <Link to="/" className="btn btn-primary">Retour à la page d'accueil</Link>
        </div>
    );
};

export default Unauthorized;