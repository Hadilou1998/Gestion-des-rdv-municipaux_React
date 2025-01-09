import React, { useState, useEffect } from "react";
import axios from "../../services/api";

function AppointmentForm() {
    const [services, setServices] = useState([]);
    const [selectedService, setSelectedService] = useState("");
    const [date, setDate] = useState("");
    const [timeSlot, setTimeSlot] = useState("");
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    // Récupère la liste des services depuis l'API
    useEffect(() => {
        axios.get("/services")
        .then((response) => setServices(response.data))
        .catch((error) => {
            console.error("Erreur lors de la récupération des services : ", error);
            setError("Une erreur est survenue lors de la récupération des services. Veuillez réessayer.");
        });
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage("");
        setError("");

        const appointmentData = { serviceId: selectedService, date, timeSlot };

        try {
            await axios.post("/appointments", appointmentData);
            setMessage("Rendez-vous pris avec succès !");
            setSelectedService("");
            setDate("");
            setTimeSlot("");
        } catch (error) {
            console.error("Erreur lors de la prise du rendez-vous : ", error);
            setError("Une erreur est survenue lors de la prise de rendez-vous. Veuillez réessayer.");
        }
    };

    return (
        <div className="container mt-4">
            <h2>Prendre un rendez-vous</h2>
            {error && <div className="alert alert-danger">{error}</div>}
            {message && <div className="alert alert-success">{message}</div>}
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="service" className="form-label">Service</label>
                    <select id="service" className="form-control" value={selectedService} onChange={(e) => setSelectedService(e.target.value)} required>
                        <option value="">-- Choisissez un service --</option>
                        {services.map((service) => (
                            <option key={service.id} value={service.id}>{service.name}</option>
                        ))}
                    </select>
                </div>
                <div className="mb-3">
                    <label htmlFor="date" className="form-label">Date</label>
                    <input type="date" id="date" className="form-control" value={date} onChange={(e) => setDate(e.target.value)} required />
                </div>
                <div className="mb-3">
                    <label className="form-label">Créneau horaire</label>
                    <select className="form-control" value={timeSlot} onChange={(e) => setTimeSlot(e.target.value)} required>
                        <option value="">-- Choisissez une heure --</option>
                        {["9h-10h", "10h-11h", "11h-12h", "14h-15h", "15h-16h", "16h-17h"].map((slot) => (
                            <option key={slot} value={slot}>{slot}</option>
                        ))}
                    </select>
                </div>
                <button type="submit" className="btn btn-primary" disabled={!selectedService || !date || !timeSlot}>Confirmer</button>
            </form>
        </div>
    );
};

export default AppointmentForm;