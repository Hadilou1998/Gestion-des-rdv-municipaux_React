import React, { useState } from "react";
import axios from "../../services/api";

function AppointmentForm({ onAppointmentSaved }) {
    const [formData, setFormData] = useState({
        user_id: "",
        service_id: "",
        appointment_date: "",
        status: "scheduled",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        axios.post("/appointments", formData)
        .then(() => {
            onAppointmentSaved();
        })
        .catch(error => console.error(error));
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="form-group">
                <label htmlFor="user_id" className="form-label">Citoyen</label>
                <input type="text" id="user_id" name="user_id" className="form-control" value={formData.user_id} onChange={handleChange} />
            </div>
            <div className="form-group">
                <label htmlFor="service_id" className="form-label">Service</label>
                <input type="text" id="service_id" name="service_id" className="form-control" value={formData.service_id} onChange={handleChange} />
            </div>
            <div className="form-group">
                <label htmlFor="appointment_date" className="form-label">Date</label>
                <input type="datetime-local" id="appointment_date" name="appointment_date" className="form-control" value={formData.appointment_date} onChange={handleChange} />
            </div>
            <button type="submit" className="btn btn-primary">Enregistrer</button>
        </form>
    );
};

export default AppointmentForm;