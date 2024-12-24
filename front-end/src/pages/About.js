import React from "react";

function About() {
    return (
        <div className="container">
            <h2 className="my-4">À propos</h2>
            <p>
                Cette application de gestion des rendez-vous municipaux vise à simplifier la prise de rendez-vous pour les citoyens et optimiser la 
                gestion des services municipaux.
            </p>
            <p>
                <strong>Fonctionnalités principales :</strong>
                <ul>
                    <li>Création de rendez-vous avec des agents et les administrateurs</li>
                    <li>Gestion des rendez-vous et des notifications</li>
                    <li>Visualisation et suivi des rendez-vous</li>
                    <li>Historique des rendez-vous</li>
                    <li>Gestion du calendrier et des agendas</li>
                    <li>Droits d'accès et de gestion des utilisateurs</li>
                    <li>Gestion des paramètres et des options de l'application</li>
                    <li>Et plus encore...</li>
                </ul>
            </p>
        </div>
    );
};

export default About;