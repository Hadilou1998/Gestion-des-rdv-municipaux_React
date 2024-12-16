import React, { useEffect, useState } from "react";
import axios from "axios";

function Services() {
    const [services, setServices] = useState([]);

    useEffect(() => {
        const fetchServices = async () => {
            try {
                const response = await axios.get("/api/services");
                setServices(response.data);
            } catch (error) {
                console.error("Erreur lors de la récupération des services:", error);
            }
        };
        fetchServices();
    }, []);

    return (
        <div>
            <h2>Services</h2>
            {services.length > 0 ? (
                <div className="row">
                    {services.map((service) => (
                        <div key={service.id} className="col-md-4">
                            <div className="card mb-4">
                                <div className="card-body">
                                    <h5 className="card-title">{service.name}</h5>
                                    <p className="card-text">{service.description}</p>
                                    <p className="card-text"><strong>Durée : </strong>{service.duration} minutes</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <p>Aucun service à afficher.</p>
            )}
        </div>
    );
};

export default Services;