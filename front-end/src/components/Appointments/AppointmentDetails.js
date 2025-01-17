import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "../../services/api";

function AppointmentDetails() {
    const { id } = useParams();
    const [appointment, setAppointment] = useState(null);

    useEffect(() => {
        axios.get(`/appointments/${id}`)
        .then(response => setAppointment(response.data))
        .catch(error => {
            console.error("Erreur lors de la récupération du rendez-vous:", error.response ? error.response.data : error.message);
        });
    }, [id]);

    if (!appointment) return <div>Chargement...</div>;

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