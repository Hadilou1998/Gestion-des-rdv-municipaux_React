import React, { useState, useEffect } from "react";
import axios from "axios";

function AppointmentForm() {
    const [services, setServices] = useState([]);
    const [timeSlots, setTimeSlots] = useState([]);
    const [selectedService, setSelectedService] = useState("");
    const [selectedTimeSlot, setSelectedTimeSlot] = useState("");
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState("");

    // Charger les services disponibles
    useEffect(() => {
        axios.get("http://localhost:5000/api/services")
        .then((response) => setServices(response.data))
        .catch((error) => console.error("Erreur lors du chargement des services :", error));
    }, []);

    // Préremplir le formulaire si un rendez-vous est à modifier
    useEffect(() => {
        if (selectedService) {
            // Charger les créneaux disponibles pour le service sélectionné
            axios.get(`http://localhost:5000/api/slots?serviceId=${selectedService}`)
            .then((response) => setTimeSlots(response.data))
            .catch((error) => console.error("Erreur lors du chargement des créneaux :", error));
        }
    }, [selectedService]);

    // Gérer la soumission du formulaire
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!selectedService || !selectedTimeSlot) {
            setError("Veuillez sélectionner un service et un créneau.");
            return;
        }

        // Envoyer la requête d'ajout de rendez-vous
        axios.post("http://localhost:5000/api/appointments", {
            serviceId: selectedService,
            timeSlot: selectedTimeSlot,
        })
        .then(() => setSuccess(true))
        .catch(() => setError("Une erreur est survenue lors de la prise du rendez-vous."));
    };

    return (
        <div className="container">
            <h2>Prendre un rendez-vous</h2>
            {success && <div className="alert alert-success">Rendez-vous pris avec succès!</div>}
            {error && <div className="alert alert-danger">{error}</div>}
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="service" className="form-label">Choisissez un service</label>
                    <select
                        id="service"
                        className="form-select"
                        value={selectedService}
                        onChange={(e) => setSelectedService(e.target.value)}
                        required
                    >
                        <option value="">-- Sélectionnez un service --</option>
                        {services.map((service) => (
                            <option key={service.id} value={service.id}>
                                {service.name}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="mb-3">
                    <label htmlFor="timeSlot" className="form-label">Choisissez un créneau</label>
                    <select
                        id="timeSlot"
                        className="form-select"
                        value={selectedTimeSlot}
                        onChange={(e) => setSelectedTimeSlot(e.target.value)}
                        required
                        disabled={!selectedService || timeSlots.length === 0}
                    >
                        <option value="">-- Sélectionnez un créneau --</option>
                        {timeSlots.map((timeSlot) => (
                            <option key={timeSlot.id} value={timeSlot.id}>
                                {new Date(timeSlot.start_time).toLocaleTimeString()} - {new Date(timeSlot.end_time).toLocaleTimeString()}
                            </option>
                        ))}
                    </select>
                </div>
                <button type="submit" className="btn btn-primary">Prendre rendez-vous</button>
            </form>
        </div>
    );
};

export default AppointmentForm;