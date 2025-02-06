import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "../../services/api";

function AppointmentDetails() {
    const { id } = useParams();
    const [appointment, setAppointment] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true); // ✅ Ajout d'un état de chargement

    useEffect(() => {
        const fetchAppointment = async () => {
            try {
                const response = await axios.get(`/appointments/${id}`);
                setAppointment(response.data);
            } catch (err) {
                console.error("❌ Erreur lors de la récupération du rendez-vous:", err);
                setError("Rendez-vous introuvable.");
            } finally {
                setLoading(false); // ✅ Fin du chargement
            }
        };

        fetchAppointment();
    }, [id]);

    if (loading) {
        return <p>⏳ Chargement en cours...</p>;
    }

    if (error) {
        return <p style={{ color: "red" }}>{error}</p>;
    }

    // ✅ Vérification si `appointment` est null AVANT d'afficher les détails
    if (!appointment) {
        return <p style={{ color: "red" }}>⛔ Aucune donnée de rendez-vous disponible.</p>;
    }

    return (
        <div className="container mt-4">
            <h2>Détails du rendez-vous</h2>
            <ul className="list-group">
                <li className="list-group-item"><strong>ID :</strong> {appointment.id}</li>
                <li className="list-group-item"><strong>Citoyen :</strong> {appointment.user_name}</li>
                <li className="list-group-item"><strong>Service :</strong> {appointment.service_name}</li>
                <li className="list-group-item"><strong>Date :</strong> {appointment.appointment_date}</li>
                <li className="list-group-item"><strong>Status :</strong> {appointment.status}</li>
                <li className="list-group-item"><strong>Notes :</strong> {appointment.notes || "Aucune note"}</li>
            </ul>
        </div>
    );
};

export default AppointmentDetails;