import React, { useState, useEffect } from "react";
import api from "../services/api";

function AppointmentForm() {
    const [services, setServices] = useState([]);
    const [selectedService, setSelectedService] = useState("");
    const [date, setDate] = useState("");
    const [timeSlots, setTimeSlots] = useState([]);
    const [selectedSlot, setSelectedSlot] = useState("");

    useEffect(() => {
        api.get("/services").then((response) => {
            setServices(response.data);
        });
    }, []);

    const handleServiceChange = (serviceId) => {
        setSelectedService(serviceId);
        api.get(`/slots?service_id=${serviceId}`).then((response) => {
            setTimeSlots(response.data);
        });
    };
    
    const handleSubmit = (e) => {
        e.preventDefault();
        const appointmentData = {
            service_id: selectedService,
            appointment_date: `${date} ${selectedSlot}`,
        };
        api.post("/appointments", appointmentData).then((response) => {
            console.log("Rendez-vous créé avec succès:", response.data);
        });
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="form-group">
                <label>Service</label>
                <select
                    className="form-control"
                    value={selectedService}
                    onChange={(e) => handleServiceChange(e.target.value)}
                    required
                >
                    <option value="">Sélectionnez un service</option>
                    {services.map((service) => (
                        <option key={service.id} value={service.id}>
                            {service.name}
                        </option>
                    ))}
                </select>
            </div>
            <div className="form-group">
                <label>Date</label>
                <input
                    type="date"
                    className="form-control"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    required
                />
            </div>
            <div className="form-group">
                <label>Créneau horaire</label>
                <select
                    className="form-control"
                    value={selectedSlot}
                    onChange={(e) => setSelectedSlot(e.target.value)}
                    required
                >
                    <option value="">Sélectionnez un créneau</option>
                    {timeSlots.map((slot) => (
                        <option key={slot.id} value={slot.start_time}>
                            {new Date(slot.start_time).toLocaleTimeString()} - {new Date(slot.end_time).toLocaleTimeString()}
                        </option>
                    ))}
                </select>
            </div>

            <button type="submit" className="btn btn-primary btn-block mt-3">Valider</button>
        </form>
    );
};

export default AppointmentForm;