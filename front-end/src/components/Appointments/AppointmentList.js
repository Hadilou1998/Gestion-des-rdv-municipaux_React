import React, { useState, useEffect } from "react";
import axios from "axios";

function AppointmentList() {
    const [appointments, setAppointments] = useState([]);

    useEffect(() => {
        const fetchAppointments = async () => {
            try {
                const response = await axios.get("/api/appointments", {
                    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
                });
                setAppointments(response.data);
            } catch (error) {
                console.error("Erreur lors de récupération des rendez-vous:", error);
            }
        };
        fetchAppointments();
    }, []);

    const handleCancel = (appointmentId) => {
        if (window.confirm("Voulez-vous annuler ce rendez-vous?")) {
            axios.delete(`/appointments/${appointmentId}`)
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
        <div className="container">
            <h2 className="my-4">Mes Rendez-vous</h2>
            <ul className="list-group">
                {appointments.map((appointment) => (
                    <li key={appointment.id} className="list-group-item d-flex justify-content-between align-items-center">
                        {appointment.service.name} - {new Date(appointment.appointment_date).toLocaleString()}
                        <button className="btn btn-danger btn-sm" onClick={() => handleCancel(appointment.id)}>Annuler</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default AppointmentList;