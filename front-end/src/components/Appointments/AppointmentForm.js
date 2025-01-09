import React, { useState, useEffect } from "react";
import axios from "../../services/api";

function AppointmentForm() {
    const [services, setServices] = useState([]);
    const [selectedService, setSelectedService] = useState("");
    const [date, setDate] = useState("");
    const [timeSlot, setTimeSlot] = useState("");
    const [availableTimeSlots, setAvailableTimeSlots] = useState([]);
    const [message, setMessage] = useState("");

    // Récupère la liste des services depuis l'API
    useEffect(() => {
        axios.get("/services")
       .then((response) => setServices(response.data))
       .catch((error) => console.log("Erreur lors de la récupération des services : ", error));
    }, []);

    // Récupère les créneaux disponibles pour le service sélectionné
    const handleDateChange = (e) => {
        const selectedDate = e.target.value;
        setDate(selectedDate);

        if (selectedService) {
            axios.get(`/appointments/available?serviceId=${selectedService}&date=${selectedDate}`)
            .then((response) => setAvailableTimeSlots(response.data))
            .catch((error) => console.log("Erreur lors de la récupération des créneaux disponibles : ", error));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const appointmentData = { serviceId: selectedService, date, timeSlot };

        axios.post("/appointments", appointmentData)
        .then(() => setMessage("Rendez-vous pris avec succès !"))
        .catch((error) => {
            console.log("Erreur lors de la prise du rendez-vous : ", error);
            setMessage("Une erreur est survenue lors de la prise de rendez-vous. Veuillez réessayer.");
        });
    };

    return (
        <div className="container mt-4">
            <h2>Prendre un rendez-vous</h2>
            {message && <div className="alert alert-info">{message}</div>}
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="form-label">Service</label>
                    <select className="form-control" value={selectedService} onChange={(e) => setSelectedService(e.target.value)} required>
                        <option value="">-- Choisissez un service --</option>
                        {services.map((service) => (
                            <option key={service.id} value={service.id}>{service.name}</option>
                        ))}
                    </select>
                </div>
                <div className="mb-3">
                    <label className="form-label">Date</label>
                    <input type="date" className="form-control" value={date} onChange={handleDateChange} required />
                </div>
                <div className="mb-3">
                    <label className="form-label">Créneau horaire</label>
                    <select className="form-control" value={timeSlot} onChange={(e) => setTimeSlot(e.target.value)} required>
                        <option value="">-- Choisissez une heure --</option>
                        {availableTimeSlots.map((slot) => (
                            <option key={slot} value={slot}>{slot}</option>
                        ))}
                    </select>
                </div>
                <button type="submit" className="btn btn-primary">Confirmer</button>
            </form>
        </div>
    );
};

export default AppointmentForm;