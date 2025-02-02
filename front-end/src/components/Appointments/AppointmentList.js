import React, { useState, useEffect, useContext } from "react";
import axios from "../../services/api";
import { UserContext } from "../../context/UserContext";

function AppointmentList() {
    const { user, loading } = useContext(UserContext) || {}; 
    const [appointments, setAppointments] = useState([]);
    const [fetching, setFetching] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (loading || !user) return;

        const fetchAppointments = async () => {
            setFetching(true);
            try {
                if (!user?.role) {
                    throw new Error("Le rôle de l'utilisateur est introuvable.");
                }

                // L'admin et l'agent voient tous les rendez-vous, le citoyen voit les siens
                const url = user.role === "admin" || user.role === "agent"
                    ? "/appointments" 
                    : "/appointments/my";

                const response = await axios.get(url);

                if (!Array.isArray(response.data)) {
                    throw new Error("Format de données invalide reçu de l'API");
                }

                setAppointments(response.data);
            } catch (err) {
                console.error("Erreur de récupération des rendez-vous :", err);
                setError(err.response?.data?.message || "Une erreur est survenue.");
            } finally {
                setFetching(false);
            }
        };

        fetchAppointments();
    }, [user, loading]);

    const formatDate = (dateString) => {
        try {
            return new Date(dateString).toLocaleString("fr-FR", {
                year: "numeric",
                month: "long",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit",
            });
        } catch {
            return "Date invalide";
        }
    };

    if (loading || fetching) {
        return <div className="text-center mt-4">Chargement des rendez-vous...</div>;
    }

    if (!user) {
        return (
            <div className="container mt-4">
                <div className="alert alert-warning">
                    <h4>Accès refusé</h4>
                    <p>Vous devez être connecté pour voir cette page.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="container mt-4">
            <h2>Liste des rendez-vous</h2>

            {error ? (
                <div className="alert alert-danger">
                    <h4>Erreur</h4>
                    <p>{error}</p>
                </div>
            ) : (
                <div className="table-responsive">
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th>#</th>
                                {(user.role === "admin" || user.role === "agent") && <th>Citoyen</th>}
                                <th>Service</th>
                                <th>Date</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {appointments.length > 0 ? (
                                appointments.map((appt) => (
                                    <tr key={appt.id}>
                                        <td>{appt.id}</td>
                                        {(user.role === "admin" || user.role === "agent") && (
                                            <td>
                                                {appt.user
                                                    ? `${appt.user.first_name} ${appt.user.last_name}`
                                                    : "Utilisateur inconnu"}
                                            </td>
                                        )}
                                        <td>{appt.service?.name || "Service inconnu"}</td>
                                        <td>{formatDate(appt.appointmentDate)}</td>
                                        <td>{appt.status}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={5} className="text-center text-muted">
                                        Aucun rendez-vous trouvé.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}

export default AppointmentList;