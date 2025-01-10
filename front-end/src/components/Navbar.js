import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

function Navbar() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("user");
        if (token) {
            setIsLoggedIn(false);
        }
    }, []);

    const handleRegister = (e) => {
        e.preventDefault();
        navigate("/login");
    };

    const handleLogin = (e) => {
        e.preventDefault();
        navigate("/login");
    };

    const handleLogout = () => {
        localStorage.removeItem("user");
        setIsLoggedIn(false);
        navigate("/login");
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
                        <li className="nav-item">
                            <Link className="nav-link" to="/">Accueil</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/about">À propos</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/contact">Contact</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/services">Services</Link>
                        </li>
                        {isLoggedIn && (
                            <>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/appointments">Mes Rendez-vous</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/calendar">Calendrier</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/dashboard">Tableau de bord</Link>
                                </li>
                            </>
                        )}
                    </ul>
                    <ul className="navbar-nav">
                        {!isLoggedIn ? (
                            <>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/login" onClick={handleLogin}>Connexion</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/register" onClick={handleRegister}>Inscription</Link>
                                </li>
                            </>
                        ) : (
                            <li className="nav-item">
                                <button className="nav-link" onClick={handleLogout}>Déconnexion</button>
                            </li>
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;