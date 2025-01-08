import React, { useEffect, useState } from "react";
import axios from "../../services/api";

function ServiceList() {
    const [services, setServices] = useState([]);

    useEffect(() => {
        axios.get("/services")
        .then(response => setServices(response.data))
        .catch(error => console.log(error));
    }, []);

    return (
        <div className="container mt-4">
            <h2>Liste des services</h2>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Nom</th>
                        <th>Description</th>
                        <th>Durée</th>
                        <th>Département</th>
                    </tr>
                </thead>
                <tbody>
                    {services.map(service => (
                        <tr key={service.id}>
                            <td>{service.id}</td>
                            <td>{service.name}</td>
                            <td>{service.description}</td>
                            <td>{service.duration} min</td>
                            <td>{service.department}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ServiceList;