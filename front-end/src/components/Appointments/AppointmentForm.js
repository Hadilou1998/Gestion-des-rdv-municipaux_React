import React, { useState, useEffect } from "react";
import axios from "axios";

function AppointmentForm({ onSubmitSuccess, appointmentToEdit}) {
    const [services, setServices] = useState([]);
    const [formData, setFormData] = useState({
        serviceId: "",
        appointmentDate: "",
        notes: "",
    });
    const [error, setError] = useState(null);

    // Charger les services disponibles au montage
    useEffect(() => {
        axios.get("http://localhost:5000/api/services")
        .then((response) => setServices(response.data))
        .catch((error) => console.error("Erreur lors du chargement des services :", error));
    }, []);

    // Préremplir le formulaire si un rendez-vous est à modifier
    useEffect(() => {
        if (appointmentToEdit) {
            setFormData({
                serviceId: appointmentToEdit.serviceId,
                appointmentDate: appointmentToEdit.appointmentDate,
                notes: appointmentToEdit.notes,
            });
        }
    }, [appointmentToEdit]);

    // Gérer les changements dans le formulaire
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ 
            ...formData, 
            [name]: value, 
        });
    };

    // Gérer la soumission du formulaire
    const handleSubmit = (e) => {
        e.preventDefault();
        const apiEndpoint = appointmentToEdit 
            ? `http://localhost:5000/api/appointments/${appointmentToEdit.id}` 
            : "http://localhost:5000/api/appointments";
        const apiMethod = appointmentToEdit ? "put" : "post";

        axios[apiMethod](apiEndpoint, formData)
        .then(() => {
            onSubmitSuccess();
            setFormData({ serviceId: "", appointmentDate: "", notes: "" });
        })
        .catch((error) => {
            setError("Erreur lors de la soumission du formulaire.");
        });
    };

    return (
        <div className="container">
            <h3 className="my-4">{appointmentToEdit ? "Modifier le rendez-vous" : "Prendre un rendez-vous"}</h3>
            {error && <div className="alert alert-danger">{error}</div>}
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="form-label">Service</label>
                    <select
                        className="form-select"
                        name="serviceId"
                        value={formData.serviceId}
                        onChange={handleChange}
                        required
                    >
                        <option value="">-- Sélectionnez un service --</option>
                        {services.map((service) => (
                            <option key={service.id} value={service.id}>
                                {service.name} ({service.duration} minutes)
                            </option>
                        ))}
                    </select>
                </div>
                <div className="mb-3">
                    <label className="form-label">Date et heure</label>
                    <input
                        type="datetime-local"
                        className="form-control"
                        name="appointmentDate"
                        value={formData.appointmentDate}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Notes</label>
                    <textarea
                        className="form-control"
                        name="notes"
                        value={formData.notes}
                        onChange={handleChange}
                        rows="3"
                    ></textarea>
                </div>
                <button type="submit" className="btn btn-primary">
                    {appointmentToEdit ? "Modifier le rendez-vous" : "Prendre un rendez-vous"}
                </button>
            </form>
        </div>
    );
};

export default AppointmentForm;