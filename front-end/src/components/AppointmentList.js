import React, { useState, useEffect } from "react";
import api from "../services/api";

function AppointmentList() {
    const [appointments, setAppointments] = useState([]);

    useEffect(() => {
        // Charger les rendez-vous de l'utilisateur
        api.get("/appointments").then((response) => {
            setAppointments(response.data);
        });
    }, []);

    const handleCancel = (appointmentId) => {
        if (window.confirm("Voulez-vous annuler ce rendez-vous?")) {
            api.delete(`/appointments/${appointmentId}`)
            .then((response) => {
                console.log("Rendez-vous annulé avec succès:", response.data);
                setAppointments(appointments.filter((appointment) => appointment.id!== appointmentId));
            })
            .catch((error) => {
                console.error("Erreur lors de l'annulation du rendez-vous:", error);
            });
        }
    };

    return (
        <div>
            <h2>Mes Rendez-vous</h2>
            <ul className="list-group">
                {appointments.map((appointment) => (
                    <li key={appointment.id} className="list-group-item d-flex justify-content-between align-items-center">
                        <div>
                            <strong>{appointment.service.name}</strong>
                            <br />
                            {new Date(appointment.appointment_date).toLocaleString()}
                        </div>
                        <button className="btn btn-danger btn-sm" onClick={() => handleCancel(appointment.id)}>Annuler</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default AppointmentList;