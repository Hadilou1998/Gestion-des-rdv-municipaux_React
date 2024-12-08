import React, { useState, useEffect } from "react";
import { Form, Button, Container } from "react-bootstrap";
import api from "../services/api";

const Appointment = () => {
    const [services, setServices] = useState([]);
    // eslint-disable-next-line no-unused-vars
    const [serviceId, setServiceId] = useState("");
    const [date, setDate] = useState("");
    const [slots, setSlots] = useState([]);

    useEffect(() => {
        const fetchServices = async () => {
            const response = await api.get("/services");
            setServices(response.data);
        };
        fetchServices();
    }, []);

    const handleServiceChange = async (e) => {
        setServiceId(e.target.value);
        const response = await api.get(`/slots?serviceId=${e.target.value}&date=${date}`);
        setSlots(response.data);
    };

    return (
        <Container className="mt-5">
            <h3>Prendre un Rendez-vous</h3>
            <Form>
                <Form.Group controlId="formService">
                    <Form.Label>Service</Form.Label>
                    <Form.Control as="select" onChange={handleServiceChange}>
                        <option value="">Sélectionnez un service</option>
                        {services.map((service) => (
                            <option key={service.id} value={service.id}>{service.name}</option>
                        ))}
                    </Form.Control>
                </Form.Group>
                <Form.Group controlId="formDate" className="mt-3">
                    <Form.Label>Date</Form.Label>
                    <Form.Control type="date" value={date} onChange={(e) => setDate(e.target.value)} />
                </Form.Group>
                <Form.Group controlId="formSlot" className="mt-3">
                    <Form.Label>Heure du RDV</Form.Label>
                    <Form.Control as="select">
                        <option value="">Sélectionnez une heure</option>
                        {slots.map((slot) => (
                            <option key={slot.id} value={slot.id}>{slot.start_time} - {slot.end_time}</option>
                        ))}
                    </Form.Control>
                </Form.Group>
                <Button variant="primary" className="mt-3">Réserver</Button>
            </Form>
        </Container>
    );
};

export default Appointment;