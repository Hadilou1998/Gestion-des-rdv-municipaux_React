import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import Logout from "./Auth/Logout";

function Navbar() {
    const { user } = useContext(UserContext); // Accès à l'utilisateur connecté

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container">
                <Link className="navbar-brand" to="/">Ville d'Argenteuil</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ms-auto">
                        {/* Liens accessibles à tous */}
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

                        {/* Liens conditionnels pour utilisateurs non connectés */}
                        {!user ? (
                            <>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/login">Connexion</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/register">Inscription</Link>
                                </li>
                            </>
                        ) : (
                            <>
                                {/* Liens pour utilisateurs connectés */}
                                <li className="nav-item">
                                    <Link className="nav-link" to="/appointments">Mes Rendez-Vous</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/profile">Mon Profil</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/dashboard">Tableau de bord</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/notifications">Notifications</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/calendar">Calendrier</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/settings">Paramètres</Link>
                                </li>
                                <li className="nav-item">
                                    <Logout />
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