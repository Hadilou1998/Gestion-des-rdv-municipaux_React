import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

function AppointmentForm() {
    const [service, setService] = useState("");
    const [date, setDate] = useState("");
    const [timeSlot, setTimeSlot] = useState("");
    const [services, setServices] = useState([]);
    const history = useHistory();

    useEffect(() => {
        const fetchServices = async () => {
            const response = await fetch("/api/services");
            const data = await response.json();
            setServices(data);
        };
        fetchServices();
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const appointmentData = {
            service_id: service,
            appointment_date: `${date} ${timeSlot}`,
        };

        const response = await fetch("/api/appointments", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ appointmentData }),
        });
        
        if (response.ok) {
            history.push("/appointments");
        } else {
            alert("Erreur lors de la prise du rendez-vous");
        }
    };

    return (
        <div className="container">
            <h2 className="mt-4">Prendre Rendez-vous</h2>
            <form onSubmit={handleSubmit} className="mt-3">
                <div className="mb-3">
                    <label htmlFor="service" className="form-label">Service</label>
                    <select
                        className="form-select"
                        id="service"
                        value={service}
                        onChange={(e) => setService(e.target.value)}
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
                <div className="mb-3">
                    <label htmlFor="date" className="form-label">Date</label>
                    <input
                        type="date"
                        className="form-control"
                        id="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="timeSlot" className="form-label">Créneau horaire</label>
                    <select
                        className="form-select"
                        id="timeSlot"
                        value={timeSlot}
                        onChange={(e) => setTimeSlot(e.target.value)}
                        required
                    >
                        <option value="">-- Sélectionnez un créneau --</option>
                        {/* Time slots should be fetched dynamically based on the selected service */}
                        <option value="09:00">09:00</option>
                        <option value="10:00">10:00</option>
                        <option value="11:00">11:00</option>
                        <option value="14:00">14:00</option>
                        <option value="15:00">15:00</option>
                        <option value="16:00">16:00</option>
                        {/* Add more options as needed */}
                    </select>
                </div>
                <button type="submit" className="btn btn-primary">Prendre Rendez-vous</button>
            </form>
        </div>
    );
};

export default AppointmentForm;