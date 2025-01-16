import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "../../services/api";

function ServiceDetails() {
    const { id } = useParams();
    const [slot, setSlot] = useState(null);

    useEffect(() => {
        axios.get(`/slots/${id}`)
       .then(response => setSlot(response.data))
       .catch(error => console.error(error));
    });

    if (!slot) return <div>Chargement...</div>;

    return (
        <div className="container mt-4">
            <h2>Détail du créneau horaire</h2>
            <ul className="list-group">
                <li className="list-group-item"><strong>ID :</strong> {slot.id}</li>
                <li className="list-group-item"><strong>Service :</strong> {slot.service_name}</li>
                <li className="list-group-item"><strong>Début :</strong> {slot.startTime}</li>
                <li className="list-group-item"><strong>Fin :</strong> {slot.endTime}</li>
                <li className="list-group-item"><strong>Disponibilité :</strong> {slot.isAvailable? "Disponible" : "Indisponible"}</li>
            </ul>
        </div>
    );
};

export default ServiceDetails;