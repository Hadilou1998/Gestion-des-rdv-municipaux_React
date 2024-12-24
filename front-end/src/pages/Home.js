import React from "react";
import { Link } from "react-router-dom";

function Home() {
    return (
        <div className="container mt-5">
            <h1>Bienvenue sur la plateforme municipale</h1>
            <p className="mt-3">
                Simplifiez vos démarches administratives en prenant rendez-vous en ligne avec les services municipaux.
            </p>
            <div className="mt-4">
                <Link to="/register" className="btn btn-primary me-3">
                    Créer un compte
                </Link>
                <Link to="/login" className="btn btn-outline-primary">
                    Se connecter
                </Link>
            </div>
        </div>
    );
};

export default Home;