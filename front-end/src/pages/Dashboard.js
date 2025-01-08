import React from "react";

function Dashboard() {

    return (
        <div className="container mt-4">
            <h2>Tableau de bord</h2>
            <p>Bienvenue sur votre tableau de bord. Vous pouvez ici accéder à votre liste des rendez-vous, des créneaux horaires, des services, etc.</p>
            <div className="row">
                <div className="col-md-4">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">Rendez-vous</h5>
                            <p className="card-text">Consultez ou modifiez vos rendez-vous.</p>
                            <a href="/appointments" className="btn btn-primary">Voir mes rendez-vous</a>
                        </div>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">Services</h5>
                            <p className="card-text">Explorez les services proposés par la mairie.</p>
                            <a href="/services" className="btn btn-primary">Explorer les services</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;