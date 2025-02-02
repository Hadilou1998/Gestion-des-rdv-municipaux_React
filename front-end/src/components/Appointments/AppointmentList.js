import React, { useState, useEffect, useContext } from "react";
import axios from "../../services/api";
import { UserContext } from "../../context/UserContext";

function AppointmentList() {
    const userContext = useContext(UserContext);
    const { user, loading } = userContext; // Extraction des valeurs
    const [appointments, setAppointments] = useState([]);
    const [fetching, setFetching] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        console.log("🔄 useEffect exécuté ! Utilisateur :", user, "Loading:", loading);

        if (loading || !user) return;

        const fetchAppointments = async () => {
            console.log("📡 Récupération des rendez-vous...");
            setFetching(true);
            setError(null);

            try {
                if (!user?.role) {
                    throw new Error("Le rôle de l'utilisateur est introuvable.");
                }

                const url = user.role === "admin" || user.role === "agent" ? "/appointments" : "/appointments/my";
                console.log("🔗 Requête envoyée à :", url);

                const response = await axios.get(url);

                if (!Array.isArray(response.data)) {
                    throw new Error("Format de données invalide reçu de l'API");
                }

                setAppointments(response.data);
                console.log("✅ Données chargées :", response.data);
            } catch (err) {
                console.error("❌ Erreur lors de la récupération :", err);
                setError(err.response?.data?.message || "Une erreur est survenue.");
            } finally {
                console.log("✔️ Fin du chargement");
                setFetching(false);
            }
        };

        fetchAppointments();
    }, [user, loading]);

    // Vérification que le contexte est bien chargé
    if (!userContext) {
        console.error("⚠️ UserContext est undefined ! Vérifie que UserProvider est bien déclaré.");
        return (
            <div className="container mt-4">
                <div className="alert alert-danger">
                    <h4>Erreur critique</h4>
                    <p>Le contexte utilisateur est introuvable. Assurez-vous que `UserProvider` englobe votre application.</p>
                </div>
            </div>
        );
    }

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

    if (loading) {
        return <div className="text-center mt-4">📡 Chargement des informations utilisateur...</div>;
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

            {error && (
                <div className="alert alert-danger">
                    <h4>Erreur</h4>
                    <p>{error}</p>
                </div>
            )}

            {fetching && (
                <div className="alert alert-info">
                    <p>📡 Chargement des rendez-vous, veuillez patienter...</p>
                </div>
            )}

            {!fetching && appointments.length === 0 && (
                <div className="alert alert-warning">
                    <p>📝 Aucun rendez-vous trouvé.</p>
                </div>
            )}

            {!fetching && appointments.length > 0 && (
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
                            {appointments.map((appt) => (
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
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}

export default AppointmentList;