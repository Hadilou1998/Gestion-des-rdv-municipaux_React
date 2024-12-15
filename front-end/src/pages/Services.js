import React, { useEffect, useState } from "react";
import axios from "axios";

function Services() {
    const [services, setServices] = useState([]);

    useEffect(() => {
        const fetchServices = async () => {
            try {
                const res = await axios.get("/api/services");
                setServices(res.data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchServices();
    }, []);

    return (
        <div className="container mt-5">
            <h2>Services</h2>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Nom</th>
                        <th>Description</th>
                    </tr>
                </thead>
                <tbody>
                    {services.map((service) => (
                        <tr key={service.id}>
                            <td>{service.id}</td>
                            <td>{service.name}</td>
                            <td>{service.description}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Services;