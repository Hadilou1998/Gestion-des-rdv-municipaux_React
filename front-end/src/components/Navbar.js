import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode"; // Importation corrigée

function Navbar() {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const storedData = localStorage.getItem("user");

        if (storedData) {
            try {
                const decoded = jwtDecode(storedData); // Décodage du JWT
                setUser({ id: decoded.id, role: decoded.role, token: storedData });
            } catch (error) {
                console.warn("Erreur lors de la lecture des données utilisateur :", error);
                setUser(null);
            }
        } else {
            setUser(null);
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("user");
        setUser(null);
        navigate("/login");
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">
                    Ville d'Argenteuil
                </Link>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNav"
                    aria-controls="navbarNav"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav me-auto">
                        <li className="nav-item">
                            <Link className="nav-link" to="/">
                                Accueil
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/about">
                                À propos
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/contact">
                                Contact
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/services">
                                Services
                            </Link>
                        </li>
                        {user && (
                            <>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/appointments/my">
                                        Mes Rendez-vous
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/dashboard">
                                        Tableau de bord
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/slots">
                                        Créneaux disponibles
                                    </Link>
                                </li>
                                {["admin", "agent"].includes(user.role) && (
                                    <>
                                        <li className="nav-item">
                                            <Link className="nav-link" to="/appointments">
                                                Tous les Rendez-vous
                                            </Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link className="nav-link" to="/slots/new">
                                                Ajouter un créneau
                                            </Link>
                                        </li>
                                    </>
                                )}
                            </>
                        )}
                    </ul>
                    <ul className="navbar-nav">
                        {!user ? (
                            <>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/login">
                                        Connexion
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/register">
                                        Inscription
                                    </Link>
                                </li>
                            </>
                        ) : (
                            <li className="nav-item">
                                <button
                                    className="btn btn-outline-danger"
                                    onClick={handleLogout}
                                >
                                    Déconnexion
                                </button>
                            </li>
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;