import React, { useState, useEffect } from "react";
import { Form, Button, Container } from "react-bootstrap";

function Appointment() {
    const [services, setServices] = useState([]);
    const [selectedService, setSelectedService] = useState("");
    const [date, setDate] = useState("");

    useEffect(() => {
        // Appel l'API pour récupérer les services
        fetch("http://localhost:5000/api/services")
            .then(response => response.json())
            .then(data => setServices(data));
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        // Appel l'API pour enregistrer le rendez-vous
        fetch("http://localhost:5000/api/appointments", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ service_id: selectedService, appointment_date: date }),
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert("Rendez-vous enregistré avec succès!");
                setDate("");
                setSelectedService("");
            } else {
                alert(data.message);
            }
        });
    };

    return (
        <Container className="mt-5">
            <h2 className="mt-4">Rendez-vous</h2>
            <Form onSubmit={handleSubmit} className="mt-3">
                <div className="mb-3">
                    <label htmlFor="service" className="form-label">Service</label>
                    <select
                        className="form-select"
                        id="service"
                        value={selectedService}
                        onChange={(e) => setSelectedService(e.target.value)}
                        required
                    >
                        <option value="">-- Sélectionnez un service --</option>
                        {services.map(service => (
                            <option key={service.id} value={service.id}>{service.name}</option>
                        ))}
                    </select>
                </div>
                <div className="mb-3">
                    <label htmlFor="date" className="form-label">Date et Heure</label>
                    <input
                        type="datetime-local"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                    />
                </div>
                <Button type="submit" className="btn btn-primary">Enregistrer</Button>
            </Form>
        </Container>
    );
};

export default Appointment;