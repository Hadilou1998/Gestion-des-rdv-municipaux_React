import React, { useEffect, useState } from "react";
import axios from "../../services/api";

function MyAppointments() {
    const [appointments, setAppointments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [editingAppointment, setEditingAppointment] = useState(null);
    const [newDate, setNewDate] = useState("");

    // Fonction pour récupérer les rendez-vous de l'utilisateur
    useEffect(() => {
        const fetchMyAppointments = async () => {
            try {
                const response = await axios.get("/appointments/my");
                setAppointments(response.data);
                setLoading(false);
            } catch (err) {
                console.error("Détails de l'erreur:", err);
                setError(
                    `Une erreur est survenue lors du chargement des rendez-vous: ${
                        err.response?.data?.message || err.message
                    }`
                );
                setLoading(false);
            }
        };

        fetchMyAppointments();
    }, []);

    // Fonction pour annuler un rendez-vous
    const cancelAppointment = async (appointmentId) => {
        if (!window.confirm("Êtes-vous sûr de vouloir annuler ce rendez-vous ?")) return;

        try {
            await axios.delete(`/appointments/${appointmentId}`);
            setAppointments((prevAppointments) =>
                prevAppointments.filter((appt) => appt.id !== appointmentId)
            );
        } catch (err) {
            console.error("Erreur lors de l'annulation:", err);
            setError(
                `Impossible d'annuler le rendez-vous: ${
                    err.response?.data?.message || err.message
                }`
            );
        }
    };

    // Fonction pour ouvrir le formulaire de modification
    const startEditing = (appointment) => {
        setEditingAppointment(appointment);
        setNewDate(appointment.appointmentDate);
    };

    // Fonction pour modifier un rendez-vous
    const updateAppointment = async () => {
        if (!newDate) {
            alert("Veuillez sélectionner une nouvelle date.");
            return;
        }

        try {
            await axios.put(`/appointments/${editingAppointment.id}`, {
                appointmentDate: newDate,
            });

            // Mettre à jour localement la liste des rendez-vous
            setAppointments((prevAppointments) =>
                prevAppointments.map((appt) =>
                    appt.id === editingAppointment.id
                        ? { ...appt, appointmentDate: newDate }
                        : appt
                )
            );

            setEditingAppointment(null);
            setNewDate("");
            alert("Rendez-vous modifié avec succès !");
        } catch (err) {
            console.error("Erreur lors de la modification:", err);
            setError(
                `Impossible de modifier le rendez-vous: ${
                    err.response?.data?.message || err.message
                }`
            );
        }
    };
    // Affichage pendant le chargement
    if (loading) return <div>Chargement...</div>;
    // Affichage en cas d'erreur
    if (error) return <div>Erreur: {error}</div>;

    return (
        <div>
            <h2>Mes rendez-vous</h2>
            {appointments.length > 0 ? (
                <ul>
                    {appointments.map((appt) => (
                        <li key={appt.id}>
                            <div>
                                <strong>{appt.service?.name || "Service inconnu"}</strong> -{" "}
                                {new Date(appt.appointmentDate).toLocaleString("fr-FR")}
                            </div>
                            <button
                                className="btn btn-warning btn-sm"
                                onClick={() => startEditing(appt)}
                            >
                                Modifier
                            </button>
                            <button
                                className="btn btn-danger btn-sm"
                                onClick={() => cancelAppointment(appt.id)}
                            >
                                Annuler
                            </button>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>Aucun rendez-vous trouvé.</p>
            )}

            {/* Formulaire de modification */}
            {editingAppointment && (
                <div>
                    <h3>Modifier le rendez-vous</h3>
                    <label>
                        Nouvelle date et heure :
                        <input
                            type="datetime-local"
                            value={newDate}
                            onChange={(e) => setNewDate(e.target.value)}
                        />
                    </label>
                    <button className="btn btn-success btn-sm" onClick={updateAppointment}>
                        Enregistrer
                    </button>
                    <button className="btn btn-secondary btn-sm" onClick={() => setEditingAppointment(null)}>
                        Annuler
                    </button>
                </div>
            )}
        </div>
    );
}

export default MyAppointments;