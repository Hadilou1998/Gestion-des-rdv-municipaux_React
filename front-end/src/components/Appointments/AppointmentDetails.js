import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import axios from "../../services/api";
import { UserContext } from "../../context/UserContext"; // ✅ Importer le contexte utilisateur

function AppointmentDetails() {
    const { id } = useParams();
    const { user } = useContext(UserContext); // ✅ Récupérer l'utilisateur connecté
    const [appointment, setAppointment] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAppointment = async () => {
            try {
                // ✅ Vérifier le rôle AVANT d'envoyer la requête
                if (user.role !== "citizen") {
                    throw new Error("⛔ Accès interdit. Seuls les citoyens peuvent voir leurs rendez-vous.");
                }

                const response = await axios.get(`/appointments/my`);
                setAppointment(response.data);
            } catch (err) {
                console.error("❌ Erreur lors de la récupération du rendez-vous:", err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchAppointment();
    }, [id, user.role]);

    if (loading) {
        return <p>⏳ Chargement en cours...</p>;
    }

    if (error) {
        return <p style={{ color: "red" }}>{error}</p>;
    }

    if (!appointment) {
        return <p style={{ color: "red" }}>⛔ Aucune donnée de rendez-vous disponible.</p>;
    }

    return (
        <div className="container mt-4">
            <h2>Détails du rendez-vous</h2>
            <ul className="list-group">
                <li className="list-group-item"><strong>ID :</strong> {appointment.id}</li>
                <li className="list-group-item"><strong>Citoyen :</strong> {appointment.user_name || "Non renseigné"}</li>
                <li className="list-group-item"><strong>Service :</strong> {appointment.service_name || "Non renseigné"}</li>
                <li className="list-group-item"><strong>Date :</strong> {appointment.appointment_date || "Non renseignée"}</li>
                <li className="list-group-item"><strong>Status :</strong> {appointment.status || "Non spécifié"}</li>
                <li className="list-group-item"><strong>Notes :</strong> {appointment.notes || "Aucune note"}</li>
            </ul>
        </div>
    );
}

export default AppointmentDetails;