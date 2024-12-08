import React from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col, Button } from "react-bootstrap";

const Home = () => {
    <Container className="text-center my-5">
        <h1>Bienvenue sur le portail municipal</h1>
        <p className="lead">Prendre rendez-vous en ligne pour toutes vos démarches administratives.</p>
        <Row className="my-4">
            <Col>
                <Button variant="primary" as={Link} to="/services">Explorer les Services</Button>
            </Col>
            <Col>
                <Button variant="secondary" as={Link} to="/appointments">Mes Rendez-vous</Button>
            </Col>
        </Row>
    </Container>
};

export default Home;