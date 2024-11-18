import React, { useState } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import api from "../services/api";

const Signup = () => {
    const [formData, setFormData] = useState({
        firstname: "",
        lastname: "",
        email: "",
        password: "",
        confirmPassword: "",
    });
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (formData.password !== formData.confirmPassword) {
            setError("Les mots de passe ne correspondent pas.");
            return;
        }

        try {
            // eslint-disable-next-line no-unused-vars
            const response = await api.post("/auth/register", {
                firstname: formData.firstname,
                lastname: formData.lastname,
                email: formData.email,
                password: formData.password,
            });
            setSuccess(true);
            setError("");
        } catch (error) {
            setError(error.response?.data?.message || "Erreur d'inscription.");
        }
    };
    return (
        <Container className="mt-5">
            <Row className="justify-content-md-center">
                <Col md={6}>
                    <h3>Inscription</h3>
                    {error && <p className="text-danger">{error}</p>}
                    {success && <p className="text-success">Inscription réussie. Vous pouvez vous connecter.</p>}
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="firstName" className="mt-3">
                            <Form.Label>Prénom</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Entrez votre prénom"
                                name="firstName"
                                value={formData.firstName}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId="lastName" className="mt-3">
                            <Form.Label>Nom</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Entrez votre nom"
                                name="lastName"
                                value={formData.lastName}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId="email" className="mt-3">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="Entrez votre email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId="password" className="mt-3">
                            <Form.Label>Mot de Passe</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Mot de passe"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId="confirmPassword" className="mt-3">
                            <Form.Label>Confirmez le Mot de Passe</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Confirmez le mot de passe"
                                name="confirmPassword"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                        <Button variant="primary" type="submit" className="mt-3">
                            S'inscrire
                        </Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
};

export default Signup;