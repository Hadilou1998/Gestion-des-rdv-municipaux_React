import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";

const services = [
    { id: 1, name: "Etat Civil", description: "Passeport, carte d'identité, etc." },
    { id: 2, name: "Urbanisme", description: "Permis de construire, informations foncières." },
    { id: 3, name: "Services Sociaux", description: "Aides sociales et accompagnement." },
];

const Services = () => {
    <Container className="my-5">
        <h2 className="text-center">Nos Services</h2>
        <Row className="mt-4">
            {services.map((service) => (
                <Col md={4} key={service.id} className="mb-4">
                    <Card className="my-3">
                        <Card.Body>
                            <Card.Title>{service.name}</Card.Title>
                            <Card.Text>{service.description}</Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
            ))}
        </Row>
    </Container>
};

export default Services;