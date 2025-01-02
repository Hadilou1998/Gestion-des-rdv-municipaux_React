import React, { useState, useEffect } from "react";
import { getAppointments, getServices } from "../services/api";

function Dashboard() {
    const [stats, setStats] = useState({
        totalAppointments: 0,
        totalServices: 0,
    });

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const appointmentsResponse = await getAppointments();
                const servicesResponse = await getServices();
                setStats({
                    totalAppointments: appointmentsResponse.data.length,
                    totalServices: servicesResponse.data.length,
                });
            } catch (error) {
                console.error("Erreur lors de la récupération des statistiques : ", error);
            }
        };
        fetchStats();
    }, []);

    return (
        <div>
            <h2 className="mt-4">Tableau de Bord</h2>
            <div className="row">
                <div className="col-md-6">
                    <div className="card text-white bg-primary mb-3">
                        <div className="card-header">Rendez-vous</div>
                        <div className="card-body">
                            <h5 className="card-title">Nombre de rendez-vous : {stats.totalAppointments}</h5>
                            <p className="card-text">Consultez la liste des rendez-vous en cliquant sur le bouton ci-dessous.</p>
                            <a href="/appointments" className="btn btn-light">Voir les rendez-vous</a>
                        </div>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="card text-white bg-success mb-3">
                        <div className="card-header">Services</div>
                        <div className="card-body">
                            <h5 className="card-title">Nombre de services : {stats.totalServices}</h5>
                            <p className="card-text">Consultez la liste des services en cliquant sur le bouton ci-dessous.</p>
                            <a href="/services" className="btn btn-light">Voir les services</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;