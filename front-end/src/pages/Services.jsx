import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import CardService from "../components/CardService";

const Services = () => {
    const services = [
        { 
            id: 1, 
            name: "Etat Civil", 
            description: "Prenez rendez-vous pour des démarches liées à l'état civil, comme les cartes d'identité et passeports.", 
        },
        { 
            id: 2, 
            name: "Urbanisme", 
            description: "Planifiez un rendez-vous pour des permis de construire ou autres démarches d'urbanisme.", 
        },
        { 
            id: 3, 
            name: "Services Sociaux", 
            description: "Rencontrez un agent pour des aides sociales ou des conseils spécifiques.", 
        },
    ];
    
    const handleServiceClick = (serviceId) => {
        console.log(`Service sélectionné : ${serviceId}`);
        // Navigation ou logique spécifique
    };

    return (
        <Container className="my-5">
            <h2 className="text-center mb-4">Nos Services</h2>
            <Row>
                {services.map((service) => (
                    <Col key={service.id} md={4}>
                        <CardService
                            title={service.title}
                            description={service.description}
                            onClick={() => handleServiceClick(service.id)}
                        />
                    </Col>
                ))}
            </Row>
        </Container>
    );
};

export default Services;