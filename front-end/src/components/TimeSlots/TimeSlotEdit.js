import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "../../services/api";
import { UserContext } from "../../context/UserContext";

function TimeSlotEdit() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { user } = useContext(UserContext);
    const [timeSlot, setTimeSlot] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!user || !["admin", "agent"].includes(user.role)) {
            navigate("/unauthorized");
            return;
        }

        const fetchTimeSlot = async () => {
            try {
                const response = await axios.get(`/timeslots/${id}`);
                setTimeSlot(response.data);
            } catch (error) {
                console.error("Erreur lors de la récupération du créneau :", error);
                setError("Impossible de charger le créneau.");
            } finally {
                setLoading(false);
            }
        };

        fetchTimeSlot();
    }, [id, user, navigate]);

    const handleSave = async () => {
        try {
            await axios.put(`/timeslots/${id}`, timeSlot);
            navigate("/slots");
        } catch (error) {
            console.error("Erreur lors de la mise à jour du créneau :", error);
            setError("Impossible de mettre à jour le créneau.");
        }
    };

    if (loading) return <div>Chargement...</div>;
    if (error) return <div className="alert alert-danger">{error}</div>;

    return (
        <div className="container mt-4">
            <h2>Modifier le créneau horaire #{id}</h2>
            <div className="mb-3">
                <label className="form-label">Heure de début</label>
                <input
                    type="datetime-local"
                    className="form-control"
                    value={timeSlot.start_time}
                    onChange={(e) =>
                        setTimeSlot({...timeSlot, start_time: e.target.value })
                    }
                />
            </div>
            <div className="mb-3">
                <label className="form-label">Heure de fin</label>
                <input
                    type="datetime-local"
                    className="form-control"
                    value={timeSlot.end_time}
                    onChange={(e) =>
                        setTimeSlot({...timeSlot, end_time: e.target.value })
                    }
                />
            </div>
            <button className="btn btn-primary" onClick={handleSave}>Enregistrer</button>
            <button className="btn btn-secondary ms-2" onClick={() => navigate("/slots")}>Annuler</button>
        </div>
    );
};

export default TimeSlotEdit;