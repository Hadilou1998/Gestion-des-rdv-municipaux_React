import React from "react";
import { Link } from "react-router-dom";

function Dashboard() {
    return (
        <div>
            <h2>Tableau de bord</h2>
            <p>Bienvenue sur votre tableau de bord ! Accédez rapidement à vos rendez-vous et services.</p>
            
            <div className="row mt-4">
                <div className="col-md-6">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">Vos rendez-vous</h5>
                            <p className="card-text">Consultez vos rendez-vous à venir ou prenez-en un nouveau.</p>
                            <Link to="/appointments" className="btn btn-primary">Gérer mes rendez-vous</Link>
                        </div>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">Services municipaux</h5>
                            <p className="card-text">Découvrez les services proposés par votre mairie.</p>
                            <Link to="/services" className="btn btn-primary">Voir les services</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;