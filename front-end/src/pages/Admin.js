import React, { useEffect, useState } from "react";
import { Table, Button, Container } from "react-bootstrap";
import api from "../services/api";

const Admin = () => {
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchServices = async () => {
            const response = await api.get("/services");
            setServices(response.data);
            setLoading(false);
        };
        fetchServices();
    }, []);

    return (
        <Container className="mt-5">
            <h3>Gestion des Services</h3>
            {loading ? (
                <p>Chargement...</p>
            ) : (
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Nom</th>
                            <th>Description</th>
                            <th>Durée</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {services.map((service) => (
                            <tr key={service.id}>
                                <td>{service.name}</td>
                                <td>{service.description}</td>
                                <td>{service.duration} minutes</td>
                                <td>
                                    <Button variant="warning" className="me-2">
                                        Modifier
                                    </Button>
                                    <Button variant="danger">Supprimer</Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            )}
        </Container>
    );
};

export default Admin;