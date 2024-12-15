import React, { useEffect, useState } from "react";
import axios from "axios";

function Dashboard() {
    const [stats, setStats] = useState({ appointments: 0, users: 0, services: 0 });

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const res = await axios.get("/api/admin/stats");
                setStats(res.data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchStats();
    }, []);

    return (
        <div className="container mt-5">
            <h2>Tableau de bord</h2>
            <div className="row">
                <div className="col-md-4">
                    <div className="card text-white bg-primary mb-3">
                        <div className="card-body">
                            <h5 className="card-title">Rendez-vous</h5>
                            <p className="card-text">{stats.appointments}</p>
                        </div>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="card text-white bg-primary mb-3">
                        <div className="card-body">
                            <h5 className="card-title">Services</h5>
                            <p className="card-text">{stats.services}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;