import React, { useState } from "react";
import { Container, Form, Button } from "react-bootstrap";

const AppointmentForm = () => {
    const [formData, setFormData] = useState({
        service: "",
        date: "",
        time: "",
    });

    const [availableSlots, setAvailableSlots] = useState([]); // Etat pour les les créneaux disponibles
    const [loadingSlots, setLoadingSlots] = useState(false); // Etat pour indiquer le chargement

    const handleChange = async (e) => {
        const { name, value } = e.target;

        setFormData({ ...formData, [name]: value });

        // Vérifier les créneaux si le service et la date sont selectionnés
        if ((name === "service" && formData.date) || (name === "date" && formData.service)) {
            setLoadingSlots(true);
            const serviceId = name === "service" ? value : formData.service;
            const date = name === "date" ? value : formData.date;

            const slots = await checkSlotAvailability(serviceId, date);
            setAvailableSlots(slots);
            setLoadingSlots(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(formData);
        // logique pour envoyer les données au serveur
    };

    const checkSlotAvailability = async (serviceId, date) => {
        try {
            const response = await fetch(`/api/slots?service_id=${serviceId}&date=${date}`);
            const data = await response.json();
            return data.availableSlots;
        } catch (error) {
            console.log("Erreur lors de la vérification des créneaux", error);
            return [];
        }
    };

    return (
        <Container className="my-5">
            <h2 className="text-center">Prendre un Rendez-vous</h2>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                    <Form.Label>Service</Form.Label>
                    <Form.Select name="service" onChange={handleChange} required>
                        <option value="">Selectionnez une option</option>
                        <option value="1">Etat-Civil</option>
                        <option value="2">Urbanisme</option>
                    </Form.Select>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Date</Form.Label>
                    <Form.Control type="date" name="date" onChange={handleChange} required />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Créneau Horaire</Form.Label>
                    {loadingSlots ? (
                        <p>Chargement des créneaux...</p>
                    ) : (
                        <Form.Select name="time" onChange={handleChange} required>
                            <option value="">Sélectionnez un créneau</option>
                            {availableSlots.length > 0 ? (
                                availableSlots.map((slot, index) => (
                                    <option key={index} value={slot}>
                                        {slot}
                                    </option>
                                ))
                            ) : (
                                <option value="">Aucun créneau disponible</option>
                            )}
                        </Form.Select>
                    )}
                </Form.Group>
                <Button variant="primary" type="submit">Confirmer</Button>
            </Form>
        </Container>
    );
};

export default AppointmentForm;