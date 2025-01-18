import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../services/api";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { UserContext } from "../../context/UserContext";

function TimeSlotForm({ onSlotSaved = () => {} }) {
    const [services, setServices] = useState([]);
    const [formData, setFormData] = useState({
        serviceId: "",
        startTime: "",
        endTime: "",
        isAvailable: true
    });
    const [error, setError] = useState("");
    const { user } = useContext(UserContext) || {};
    const navigate = useNavigate();

    useEffect(() => {
        if (!user) {
            navigate("/login"); // Redirigez les utilisateurs non connectés
        }

        if (user?.role === "citizen") {
            alert("Vous n'avez pas les autorisations nécessaires.");
            navigate("/unauthorized");
        }

        // Recupérer la liste des services
        axios.get("/services")
        .then(response => setServices(response.data))
        .catch(error => {
            console.error(error);
            setError("Erreur lors du chargement des services");
        });
    }, [user, navigate]);

    if (!user) {
        return <div>Chargement...</div>;
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleDateChange = (selectedDate, field) => {
        setFormData({ ...formData, [field]: selectedDate ? selectedDate.toISOString() : "" });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        try {
            await axios.post("/slots", formData);
            if (typeof onSlotSaved === 'function') {
                onSlotSaved();
            }
            
            // Réinitialiser le formulaire
            setFormData({
                serviceId: "",
                startTime: "",
                endTime: "",
                isAvailable: true
            });
        } catch (error) {
            console.error("Error while posting:", error);
            setError("Erreur lors de la sauvegarde du créneau");
        }
    };

    return (
        <form onSubmit={handleSubmit} className="mt-4">
            {error && <div className="alert alert-danger">{error}</div>}
            
            <div className="mb-3">
                <label htmlFor="serviceId" className="form-label">Service</label>
                <select 
                    id="serviceId" 
                    name="serviceId" 
                    className="form-select" 
                    value={formData.serviceId} 
                    onChange={handleChange}
                    required
                >
                    <option value="">-- Choisir un service --</option>
                    {services.map(service => (
                        <option key={service.id} value={service.id}>{service.name}</option>
                    ))}
                </select>
            </div>

            <div className="mb-3">
                <label htmlFor="startTime" className="form-label">Heure de début</label>
                <DatePicker
                    className="form-control"
                    selected={formData.startTime ? new Date(formData.startTime) : null}
                    onChange={(date) => handleDateChange(date, "startTime")}
                    dateFormat="yyyy-MM-dd HH:mm"
                    timeCaption="Heure de début"
                    showTimeSelect
                    timeFormat="HH:mm"
                    placeholderText="Sélectionnez une date et une heure"
                    required
                    minDate={new Date()}
                />
            </div>

            <div className="mb-3">
                <label htmlFor="endTime" className="form-label">Heure de fin</label>
                <DatePicker
                    className="form-control"
                    selected={formData.endTime ? new Date(formData.endTime) : null}
                    onChange={(date) => handleDateChange(date, "endTime")}
                    dateFormat="yyyy-MM-dd HH:mm"
                    timeCaption="Heure de fin"
                    showTimeSelect
                    timeFormat="HH:mm"
                    placeholderText="Sélectionnez une date et une heure"
                    required
                />
            </div>

            <div className="form-check mb-3">
                <input
                    type="checkbox"
                    id="isAvailable"
                    name="isAvailable"
                    className="form-check-input"
                    checked={formData.isAvailable}
                    onChange={() => setFormData({ ...formData, isAvailable: !formData.isAvailable })}
                />
                <label htmlFor="isAvailable" className="form-check-label">Disponible</label>
            </div>

            <button type="submit" className="btn btn-primary">Enregistrer</button>
        </form>
    );
}

export default TimeSlotForm;