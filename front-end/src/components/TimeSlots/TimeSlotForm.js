import React, { useState, useEffect } from "react";
import axios from "../../services/api";

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
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        axios.post("/slots", formData)
        .then(() => onSlotSaved())
        .catch(error => console.error(error));
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
                <input type="datetime-local" id="start_time" name="start_time" className="form-control" value={formData.start_time} onChange={handleChange} />
            </div>
            <div className="mb-3">
                <label htmlFor="end_time" className="form-label">Heure de fin</label>
                <input type="datetime-local" id="end_time" name="end_time" className="form-control" value={formData.end_time} onChange={handleChange} />
            </div>
            <div className="form-check mb-3">
                <input type="checkbox" id="is_available" name="is_available" className="form-check-input" checked={formData.is_available} onChange={() => setFormData({ ...formData, is_available: !formData.is_available })} />
                <label htmlFor="is_available" className="form-check-label">Disponible</label>
            </div>
            <button type="submit" className="btn btn-primary">Enregistrer</button>
        </form>
    );
};

export default TimeSlotForm;