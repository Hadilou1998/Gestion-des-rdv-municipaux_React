import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";

function Navbar() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const history = useHistory();

    useEffect(() => {
        const token = localStorage.getItem("authToken");
        setIsLoggedIn(!!token);
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("authToken");
        setIsLoggedIn(false);
        history.push("/login");
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">Ville d'Argenteuil</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav me-auto">
                        {/* Liens accessibles à tous */}
                        <li className="nav-item">
                            <Link className="nav-link" to="/">Accueil</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/about">À propos</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/services">Services</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/calendar">Calendrier</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/contact">Contact</Link>
                        </li> 
                    </ul>
                    <ul className="navbar-nav">
                        {/* Liens pour utilisateurs connectés */} 
                        {isLoggedIn ? (
                            <>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/appointments">Mes Rendez-vous</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/profile">Profile</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/dashboard">Tableau de bord</Link>
                                </li>
                                <li className="nav-item">
                                    <button className="btn btn-link nav-link" onClick={handleLogout}>Déconnexion</button>
                                </li>
                            </>
                        ) : (
                            <>
                                {/* Liens conditionnels pour utilisateurs non connectés */}
                                <li className="nav-item">
                                    <Link className="nav-link" to="/login">Connexion</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/register">Inscription</Link>
                                </li>
                            </>
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;