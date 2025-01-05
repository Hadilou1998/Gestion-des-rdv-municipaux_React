import React, { useState, useEffect } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

function Dashboard() {
    const [appointments, setAppointments] = useState([]);
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                const savedUser = localStorage.getItem("user");
                if (!savedUser) {
                    throw new Error("Utilisateur non connecté. Veuillez vous reconnecter.");
                }

                const { token } = JSON.parse(savedUser);

                const headers = { Authorization: `Bearer ${token}` };

                const [appointmentsResponse, servicesResponse] = await Promise.all([
                    api.get("http://localhost:5000/api/appointments", { headers }),
                    api.get("http://localhost:5000/api/services", { headers }),
                ]);

                setAppointments(appointmentsResponse.data);
                setServices(servicesResponse.data);
                setLoading(false);
            } catch (error) {
                console.error("Erreur lors de la récupération des rendez-vous : ", error);
                setError(error.message || "Erreur inconnue");
                setLoading(false);
            }
        };

        fetchDashboardData();
    }, []);

    if (loading) {
        return <p>Chargement des données...</p>;
    }

    if (error) {
        return (
            <div className="text-danger">
                <p>Une erreur s'est produite : {error}</p>
                <button className="btn btn-primary" onClick={() => navigate("/login")}>Se reconnecter</button>
            </div>
        );
    }

    return (
        <div>
            <h1>Tableau de bord</h1>

            {/* Afficher les rendez-vous */}
            <section className="mb-4">
                <h2>Rendez-vous récents</h2>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Service</th>
                            <th>Date</th>
                            <th>Statut</th>
                            <th>Utilisateur</th>
                        </tr>
                    </thead>
                    <tbody>
                        {appointments.map((appointment, index) => (
                            <tr key={appointment.id}>
                                <td>{index + 1}</td>
                                <td>{appointment.service?.name || "Service non trouvé"}</td>
                                <td>{new Date(appointment.appointment_date).toLocaleString()}</td>
                                <td>{appointment.status}</td>
                                <td>{appointment.user?.first_name} {appointment.user?.last_name}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </section>

            {/* Afficher les services */}
            <section>
                <h2>Services gérés</h2>
                <table className="table table-bordered">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Nom</th>
                            <th>Description</th>
                            <th>Durée (min)</th>
                            <th>État</th>
                        </tr>
                    </thead>
                    <tbody>
                        {services.map((service, index) => (
                            <tr key={service.id}>
                                <td>{index + 1}</td>
                                <td>{service.name}</td>
                                <td>{service.description}</td>
                                <td>{service.duration}</td>
                                <td>{service.is_active ? "Actif" : "Inactif"}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </section>
        </div>
    );
};

export default Dashboard;