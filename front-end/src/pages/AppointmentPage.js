import React, { useState, useEffect } from "react";

function AppointmentPage() {
    const [appointments, setAppointments] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchAppointments = async () => {
            try {
                const token = localStorage.getItem("authToken"); // Récupère le jeton du localStorage
                if (!token) {
                    setError("Jeton d'authentification manquant.");
                    return;
                }

                const response = await fetch("http://localhost:5000/api/appointments", {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${token}`, // Ajoute le jeton dans l'en-tête Authorization
                    },
                });

                const data = await response.json(); // Récupère la réponse au format JSON

                // Affiche la réponse pour débogage
                console.log(data);

                if (!response.ok) {
                    throw new Error(`Erreur ${response.status}: ${data.message || response.statusText}`);
                }

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
}

export default AppointmentPage;