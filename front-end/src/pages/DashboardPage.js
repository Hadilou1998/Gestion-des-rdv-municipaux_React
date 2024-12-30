import React, { useState, useEffect } from "react";

function DashboardPage() {
    const [appointments, setAppointments] = useState([]);
    const [error, setError] = useState(null); // Pour capturer les erreurs

    useEffect(() => {
        const fetchAppointments = async () => {
            try {
                const token = localStorage.getItem("authToken");
                const response = await fetch("http://localhost:5000/api/appointments", {
                    headers: { Authorization: `Bearer ${token}` },
                });
                
                if (!response.ok) {
                    throw new Error(`Erreur ${response.status}: Impossible de récupérer les rendez-vous`);
                }

                const data = await response.json();

                // Vérifiez si la réponse est bien un tableau
                if (Array.isArray(data)) {
                    setAppointments(data);
                } else {
                    setError("La réponse de l'API n'est pas un tableau");
                }
            } catch (err) {
                setError(err.message);
            }
        };

        fetchAppointments();
    }, []);

    if (error) {
        return (
            <div className="container">
                <h2 className="mt-4">Erreur</h2>
                <p>{error}</p>
            </div>
        );
    }

    return (
        <div className="container">
            <h2 className="mt-4">Tableau de bord des rendez-vous</h2>
            <div className="mt-4">
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">Nom</th>
                            <th scope="col">Service</th>
                            <th scope="col">Date</th>
                            <th scope="col">Statut</th>
                        </tr>
                    </thead>
                    <tbody>
                        {appointments.length > 0 ? (
                            appointments.map((appointment) => (
                                <tr key={appointment.id}>
                                    <td>{appointment.user.first_name} {appointment.user.last_name}</td>
                                    <td>{appointment.service.name}</td>
                                    <td>{new Date(appointment.appointment_date).toLocaleString()}</td>
                                    <td>{appointment.status}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="4">Aucun rendez-vous trouvé</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default DashboardPage;