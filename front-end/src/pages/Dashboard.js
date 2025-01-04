import React, { useState, useEffect } from "react";
import api from "../services/api";

function Dashboard() {
    const [appointments, setAppointments] = useState([]);
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                const token = localStorage.getItem("user");
                const headers = token ? { Authorization: `Bearer ${token}` } : {};

                // fetch rendez-vous
                const appointmentsResponse = await api.get("http://localhost:5000/api/appointments", { headers });
                setAppointments(appointmentsResponse.data);

                // fetch services
                const servicesResponse = await api.get("http://localhost:5000/api/services", { headers });
                setServices(servicesResponse.data);

                setLoading(false);
            } catch (error) {
                console.error("Erreur lors de la récupération des données : ", error);
                setLoading(false);
            }
        };

        fetchDashboardData();
    }, []);

    if (loading) {
        return <p>Chargement des données...</p>;
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
                        <tr>#</tr>
                        <tr>Nom</tr>
                        <tr>Description</tr>
                        <tr>Durée (min)</tr>
                        <th>État</th>
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