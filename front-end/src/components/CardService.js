import React from "react";
import { Card, Button } from "react-bootstrap";

const CardService = ({ title, description, onClick }) => {
    return (
        <Card className="m-3 shadow" style={{ width: "18rem" }}>
            <Card.Body>
                <Card.Title>{title}</Card.Title>
                <Card.Text>{description}</Card.Text>
                <Button variant="primary" onClick={onClick}>
                    En savoir plus
                </Button>
            </Card.Body>
        </Card>
    );
};

export default CardService;