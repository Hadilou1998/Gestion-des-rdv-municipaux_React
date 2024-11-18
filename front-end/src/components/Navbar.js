import React from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

const NavigationBar = () => (
    <Navbar bg="dark" variant="dark" expand="lg">
        <Container>
            <Navbar.Brand href="/">Gestion des Rendez-Vous</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                    <LinkContainer to="/dashboard">
                        <Nav.Link>Tableau de Bord</Nav.Link>
                    </LinkContainer>
                    <LinkContainer to="/appointment">
                        <Nav.Link>Prendre RDV</Nav.Link>
                    </LinkContainer>
                    <LinkContainer to="/admin">
                        <Nav.Link>Admin</Nav.Link>
                    </LinkContainer>
                </Nav>
                <Nav>
                    <LinkContainer to="/login">
                        <Nav.Link>Connexion</Nav.Link>
                    </LinkContainer>
                    <LinkContainer to="/signup">
                        <Nav.Link>Inscription</Nav.Link>
                    </LinkContainer>
                </Nav>
            </Navbar.Collapse>
        </Container>
    </Navbar>
);

export default NavigationBar;