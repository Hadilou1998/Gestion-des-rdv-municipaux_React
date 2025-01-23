import React, { useEffect, useState } from "react";
import axios from "../../services/api";

function MyAppointments() {
    const [appointments, setAppointments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fonction pour récupérer les rendez-vous de l'utilisateur
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

    // Fonction pour annuler un rendez-vous
    const cancelAppointment = async (appointmentId) => {
        if (!window.confirm("Êtes-vous sûr de vouloir annuler ce rendez-vous ?")) return;

        try {
            await axios.delete(`/appointments/${appointmentId}`); // Requête DELETE pour annuler
            // Met à jour la liste des rendez-vous localement en retirant le rendez-vous annulé
            setAppointments((prevAppointments) =>
                prevAppointments.filter((appt) => appt.id !== appointmentId)
            );
        } catch (err) {
            console.error("Erreur lors de l'annulation:", err);
            setError(
                `Impossible d'annuler le rendez-vous: ${
                    err.response?.data?.message || err.message
                }`
            );
        }
    };

    // Affichage pendant le chargement
    if (loading) return <div>Chargement...</div>;
    // Affichage en cas d'erreur
    if (error) return <div>Erreur: {error}</div>;

    return (
        <div>
            <h2>Mes rendez-vous</h2>
            {appointments.length > 0 ? (
                <ul>
                    {appointments.map((appt) => (
                        <li key={appt.id}>
                            <div>
                                <strong>{appt.service?.name || "Service inconnu"}</strong> -{" "}
                                {new Date(appt.appointmentDate).toLocaleString("fr-FR")}
                            </div>
                            <button
                                className="btn btn-danger btn-sm"
                                onClick={() => cancelAppointment(appt.id)}
                            >
                                Annuler
                            </button>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>Aucun rendez-vous trouvé.</p>
            )}
        </div>
    );
}

export default MyAppointments;