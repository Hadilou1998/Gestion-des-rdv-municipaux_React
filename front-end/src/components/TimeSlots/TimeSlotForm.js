import React, { useState, useEffect } from "react";
import axios from "../../services/api";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function TimeSlotForm({ onSlotSaved }) {
    const [services, setServices] = useState([]);
    const [formData, setFormData] = useState({
        service_id: "",
        start_time: "",
        end_time: "",
        is_available: true
    });

    useEffect(() => {
        axios.get("/services")
            .then(response => setServices(response.data))
            .catch(error => console.error(error));
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleDateChange = (selectedDate, field) => {
        // Mettre à jour la date et l'heure dans le format ISO
        setFormData({ ...formData, [field]: selectedDate ? selectedDate.toISOString() : "" });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("FormData to send:", formData); // Vérifier les données envoyées
        try {
            const response = await axios.post("/api/slots", formData);
            console.log("Response from API:", response); // Afficher la réponse du backend
            onSlotSaved();
        } catch (error) {
            console.error("Error while posting:", error); // Afficher l'erreur dans la console
        }
    };

    return (
        <form onSubmit={handleSubmit} className="mt-4">
            <div className="mb-3">
                <label htmlFor="service_id" className="form-label">Service</label>
                <select id="service_id" name="service_id" className="form-select" value={formData.service_id} onChange={handleChange}>
                    <option value="">-- Choisir un service --</option>
                    {services.map(service => (
                        <option key={service.id} value={service.id}>{service.name}</option>
                    ))}
                </select>
            </div>
            <div className="mb-3">
                <label htmlFor="start_time" className="form-label">Heure de début</label>
                <DatePicker
                    className="form-control"
                    selected={formData.start_time ? new Date(formData.start_time) : null}
                    onChange={(date) => handleDateChange(date, "start_time")}
                    dateFormat="yyyy-MM-dd HH:mm"
                    timeCaption="Heure de début"
                    showTimeSelect
                    timeFormat="HH:mm"
                    placeholderText="Sélectionnez une date et une heure"
                    required
                    minDate={new Date()} // Empêche la sélection de dates antérieures
                />
            </div>
            <div className="mb-3">
                <label htmlFor="end_time" className="form-label">Heure de fin</label>
                <DatePicker
                    className="form-control"
                    selected={formData.end_time ? new Date(formData.end_time) : null}
                    onChange={(date) => handleDateChange(date, "end_time")}
                    dateFormat="yyyy-MM-dd HH:mm"
                    timeCaption="Heure de fin"
                    showTimeSelect
                    timeFormat="HH:mm"
                    placeholderText="Sélectionnez une date et une heure"
                    required
                    minDate={new Date()} // Empêche la sélection de dates antérieures
                />
            </div>
            <div className="form-check mb-3">
                <input
                    type="checkbox"
                    id="is_available"
                    name="is_available"
                    className="form-check-input"
                    checked={formData.is_available}
                    onChange={() => setFormData({ ...formData, is_available: !formData.is_available })}
                />
                <label htmlFor="is_available" className="form-check-label">Disponible</label>
            </div>
            <button type="submit" className="btn btn-primary">Enregistrer</button>
        </form>
    );
};

export default TimeSlotForm;