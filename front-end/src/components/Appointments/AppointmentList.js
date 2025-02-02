import React, { useContext } from "react";
import { UserContext } from "../../context/UserContext";

function AppointmentList() {
    const { user, loading, appointments, fetchingAppointments } = useContext(UserContext);

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

            {fetchingAppointments && (
                <div className="alert alert-info">
                    <p>📡 Chargement des rendez-vous...</p>
                </div>
            )}

            {!fetchingAppointments && appointments.length === 0 && (
                <div className="alert alert-warning">
                    <p>📝 Aucun rendez-vous trouvé.</p>
                </div>
            )}

            {!fetchingAppointments && appointments.length > 0 && (
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
                                        {appt.user ? `${appt.user.first_name} ${appt.user.last_name}` : "Utilisateur inconnu"}
                                    </td>
                                )}
                                <td>{appt.service?.name || "Service inconnu"}</td>
                                <td>{new Date(appt.appointmentDate).toLocaleString("fr-FR", {
                                    year: "numeric", month: "long", day: "numeric",
                                    hour: "2-digit", minute: "2-digit"
                                })}</td>
                                <td>{appt.status}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}

export default AppointmentList;