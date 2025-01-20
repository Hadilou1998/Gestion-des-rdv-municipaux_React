import React, { useEffect, useState } from "react";
import axios from "../../services/api";

function MyAppointments() {
    const [appointments, setAppointments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchMyAppointments = async () => {
            try {
                const response = await axios.get("/appointments/my");
                setAppointments(response.data);
                setLoading(false);
            } catch (err) {
                console.error("Détails de l'erreur:", err);
                setError(
                    `Une erreur est survenue lors du chargement des rendez-vous: ${
                        err.response?.data?.message || err.message
                    }`
                );
                setLoading(false);
            }       
        };

        fetchMyAppointments();
    }, []);

    if (loading) return <div>Chargement...</div>;
    if (error) return <div>Erreur: {error}</div>;

    return (
        <div>
            <h2>Mes rendez-vous</h2>
            {appointments.length > 0 ? (
                <ul>
                    {appointments.map((appt) => (
                        <li key={appt.id}>
                            {appt.service?.name || "Service inconnu"} -{" "}
                            {new Date(appt.appointmentDate).toLocaleString("fr-FR")}
                        </li>
                    ))}
                </ul>
            ) : (
                <p>Aucun rendez-vous trouvé.</p>
            )}
        </div>
    );
};

export default MyAppointments;