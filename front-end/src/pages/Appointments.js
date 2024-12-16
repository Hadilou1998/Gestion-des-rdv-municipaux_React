import React, { useEffect, useState } from "react";
import axios from "axios";

function Appointments() {
    const [appointments, setAppointments] = useState([]);
    
    useEffect(() => {
        // Récupération des rendez-vous via l'API
        const fetchAppointments = async () => {
            try {
                const response = await axios.get("/api/appointments");
                setAppointments(response.data);
            } catch (error) {
                console.error("Erreur lors de la récupération des rendez-vous:", error);
            }
        };

        fetchAppointments();
    }, []);

    return (
        <div>
            <h2>Mes Rendez-vous</h2>
            {appointments.length > 0 ? (
                <table className="table mt-4">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Date</th>
                            <th>Service</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {appointments.map((appointment, index) => (
                            <tr key={appointment.id}>
                                <td>{index + 1}</td>
                                <td>{new Date(appointment.appointment_date).toLocaleString()}</td>
                                <td>{appointment.service_name}</td>
                                <td>{appointment.status}</td>
                                <td>
                                    <button className="btn btn-warning btn-sm me-2">Réserver</button>
                                    <button className="btn btn-danger btn-sm">Supprimer</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>Aucun rendez-vous à afficher.</p>
            )}
        </div>
    );
};

export default Appointments;