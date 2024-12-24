import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/UserContext";
import axios from "axios";

function Dashboard() {
    const { user } = useContext(UserContext);
    const [appointments, setAppointments] = useState([]);

    useEffect(() => {
        if (user) {
            axios.get("/api/appointments")
            .then(response => setAppointments(response.data))
            .catch(error => console.error("Erreur lors du chargement des rendez-vous"));
        }
    }, [user]);

    if (!user) {
        return (
            <div className="container mt-5">
                <h2>Tableau de bord</h2>
                <p>Vous devez vous connecter pour accéder à votre tableau de bord.</p>
            </div>
        );
    }

    return (
        <div className="container mt-5">
            <h2>Bienvenue, {user.firstName} {user.lastName}</h2>
            <p>Voici un aperçu de vos rendez-vous :</p>
            {appointments.length > 0 ? (
                <ul className="list-group mt-4">
                    {appointments.map(appointment => (
                        <li key={appointment.id} className="list-group-item">
                            <strong>Service : </strong> {appointment.serviceName} <br />
                            <strong>Date : </strong> {new Date(appointment.date).toLocaleDateString()} <br />
                            <strong>Statut : </strong> {appointment.status}
                        </li>
                    ))}
                </ul>
            ) : (
                <p className="mt-4">Vous n'avez aucun rendez-vous pour le moment.</p>
            )}
        </div>
    );
};

export default Dashboard;