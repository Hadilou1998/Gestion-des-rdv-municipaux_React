import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../context/UserContext"; // Contexte utilisateur

function Dashboard() {
    const { user } = useContext(UserContext) || {}; // Récupérer les informations utilisateur

    return (
        <div className="container mt-4">
            <h2>Tableau de bord</h2>
            <p>Bienvenue sur votre tableau de bord. Vous pouvez ici accéder à votre liste des rendez-vous, des créneaux horaires, des services, etc.</p>
            <div className="row">
                <div className="col-md-4">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">Services</h5>
                            <p className="card-text">Explorez les services proposés par la mairie.</p>
                            <Link to="/services" className="btn btn-primary">Voir les services</Link>
                        </div>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">Rendez-vous</h5>
                            <p className="card-text">Prenez ou gérez des rendez-vous.</p>
                            <Link to="/appointments" className="btn btn-primary">Voir les rendez-vous</Link>
                            {(user?.role === "admin" || user?.role === "agent") && (
                                <div className="mt-3">
                                    <Link to="/appointments/manage" className="btn btn-secondary">Gérer les rendez-vous</Link>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">Prendre un rendez-vous</h5>
                            <p className="card-text">Réservez un créneau horaire pour vos démarches.</p>
                            <Link to="/appointments/new" className="btn btn-success">Prendre rendez-vous</Link>
                        </div>
                    </div>
                </div>
            </div>

            {/* Si l'utilisateur est admin ou agent, afficher une section dédiée aux rendez-vous */}
            {(user?.role === "admin" || user?.role === "agent") && (
                <div className="mt-4">
                    <h5>Rendez-vous Citoyens</h5>
                    <p>En tant qu'administrateur ou agent, vous pouvez accéder à tous les rendez-vous des citoyens pour les gérer.</p>
                    <Link to="/appointments/citizens" className="btn btn-warning">Voir les rendez-vous des citoyens</Link>
                </div>
            )}
        </div>
    );
};

export default Dashboard;