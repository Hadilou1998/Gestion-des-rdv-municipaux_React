import React, { useState, useEffect } from "react";

function AppointmentPage() {
    const [appointments, setAppointments] = useState([]);

    useEffect(() => {
        const fetchAppointments = async () => {
            try {
                const response = await fetch("http://localhost:5000/api/appointments");
                const data = await response.json();

                if (Array.isArray(data)) {
                    setAppointments(data); // Assurez-vous que `data` est un tableau
                } else {
                    console.error("La réponse de l'API n'est pas un tableau :", data);
                    setAppointments([]);
                }
            } catch (error) {
                console.error("Erreur lors de la récupération des rendez-vous :", error);
            }
        };

        fetchAppointments();
    }, []);

    const cancelAppointment = async (id) => {
        const response = await fetch(`http://localhost:5000/api/appointments/${id}`, {
            method: "DELETE",
        });

        if (response.ok) {
            setAppointments(appointments.filter((appointment) => appointment.id !== id));
        } else {
            alert("Erreur lors de la suppression du rendez-vous.");
        }
    };

    return (
        <div className="container">
            <h2 className="mt-4">Mes Rendez-vous</h2>
            <div className="mt-4">
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">Service</th>
                            <th scope="col">Date</th>
                            <th scope="col">Statut</th>
                            <th scope="col">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Array.isArray(appointments) && appointments.length > 0 ? (
                            appointments.map((appointment) => (
                                <tr key={appointment.id}>
                                    <td>{appointment.service.name}</td>
                                    <td>{new Date(appointment.appointment_date).toLocaleString()}</td>
                                    <td>{appointment.status}</td>
                                    <td>
                                        <button
                                            className="btn btn-danger btn-sm"
                                            onClick={() => cancelAppointment(appointment.id)}
                                        >
                                            Annuler
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="4" className="text-center">
                                    Aucun rendez-vous disponible.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AppointmentPage;