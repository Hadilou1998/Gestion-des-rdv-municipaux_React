import React, { useState } from "react";
import { Container, Form, Button } from "react-bootstrap";

const AppointmentForm = () => {
    const [formData, setFormData] = useState({
        service: "",
        date: "",
        time: "",
    });

    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Submit form data to server or API
        console.log(formData);
    };

    return (
        <Container className="my-5">
            <h2 className="text-center">Prendre un Rendez-vous</h2>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                    <Form.Label>Service</Form.Label>
                    <Form.Select name="service" onChange={handleChange}>
                        <option value="">Sélectionnez un service</option>
                        <option value="etat-civil">Etat-Civil</option>
                        <option value="urbanisme">Urbanisme</option>
                    </Form.Select>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Date</Form.Label>
                    <Form.Control type="date" name="date" onChange={handleChange} required />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Heure</Form.Label>
                    <Form.Control type="time" name="time" onChange={handleChange} required />
                </Form.Group>
                <Button variant="primary" type="submit">Confirmer</Button>
            </Form>
        </Container>
    );
};

export default AppointmentForm;