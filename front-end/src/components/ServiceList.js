import React, { useState, useEffect } from "react";
import api from "../services/api";

function ServiceList() {
    const [services, setServices] = useState([]);

    useEffect(() => {
        api.get("/services").then((response) => {
            setServices(response.data);
        });
    }, []);

    return (
        <div>
            <h2>Services disponibles</h2>
            <ul className="list-group">
                {services.map((service) => (
                    <li key={service.id} className="list-group-item">
                        <strong>{service.name}</strong>
                        <br />
                        {service.description}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ServiceList;