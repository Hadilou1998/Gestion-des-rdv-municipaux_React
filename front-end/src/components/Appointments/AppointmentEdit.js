import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "../../services/api";

function AppointmentEdit() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [appointment, setAppointment] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchAppointment = async () => {
            try {
                const response = await axios.get(`/appointments/${id}`);
                setAppointment(response.data);
                setLoading(false);
            } catch (error) {
                console.error("Erreur lors de la récupération du rendez-vous:", error);
                setError(
                    `Une erreur est survenue lors de la récupération du rendez-vous: ${
                        error.response?.data?.message || error.message
                    }`
                );
                setLoading(false);
            }
        };

        fetchAppointment();
    }, [id]);
    
    const handleSave = async () => {
        try {
            await axios.put(`/appointments/${id}`, appointment);
            console.log("Rendez-vous mis à jour avec succès!");
            navigate("/appointments");
        } catch (error) {
            console.error("Erreur lors de la mise à jour du rendez-vous:", error);
            setError(
                `Une erreur est survenue lors de la mise à jour du rendez-vous: ${
                    error.response?.data?.message || error.message
                }`
            );
        }
    };

    if (loading) {
        return <div className="text-center mt-4">Chargement du rendez-vous...</div>;
    }

    if (error) {
        return (
            <div className="container mt-4">
                <div className="alert alert-danger">
                    <h4>Erreur</h4>
                    <p>{error}</p>
                </div>
            </div>
        );
    }

    return (
        <div className="container mt-4">
            <h2>Modifier le rendez-vous #{id}</h2>
            <div className="form-group">
                <label htmlFor="status">Status</label>
                <select
                id="status"
                className="form-control"
                value={appointment.status}
                onChange={(e) => setAppointment({ ...appointment, status: e.target.value })}
                >
                    <option value="pending">En attente</option>
                    <option value="confirmed">Confirmé</option>
                    <option value="cancelled">Annulé</option>
                </select>
            </div>
            <button className="btn btn-primary mt-3" onClick={handleSave}>
                Sauvegarder
            </button>
        </div>
    );
};

export default AppointmentEdit;