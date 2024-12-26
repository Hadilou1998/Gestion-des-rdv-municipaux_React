import React from "react";
import { Card, Button, Row, Col } from "react-bootstrap";

const Service = [
    { id: 1, name: "Carte d'identité", description: "Création ou renouvellement.", department: "État civil" },
    { id: 2, name: "Passeport", description: "Démarche administrative pour obtenir un passeport.", department: "État civil" },
    { id: 3, name: "Permis de construire", description: "Démarche administrative pour obtenir un permis de construire.", department: "Urbanisme et logement" },
    { id: 4, name: "Voyage à l'étranger", description: "Démarche administrative pour obtenir un visa.", department: "Immigration et déplacement" },
    { id: 5, name: "Déclaration de handicap", description: "Démarche administrative pour obtenir une déclaration de handicap.", department: "Santé et sécurité" },
    { id: 6, name: "Certificat de réussite", description: "Démarche administrative pour obtenir un certificat de réussite.", department: "Santé et sécurité" },
    { id: 7, name: "Demande de renseignements", description: "Demande de renseignements sur une situation spécifique.", department: "Service général" },
];

function ServiceList() {
    return (
        <div>
            <h2>Liste des services</h2>
            <Row>
                {Service.map(service => (
                    <Col key={service.id} md={6} className="mb-4">
                        <Card>
                            <Card.Body>
                                <Card.Title>{service.name}</Card.Title>
                                <Card.Text>{service.description}</Card.Text>
                                <Card.Text>
                                    <strong>Département :</strong> {service.department}
                                </Card.Text>
                                <Button variant="primary">Voir les créneaux</Button>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </div>
    );
};

export default ServiceList;