import React, { useEffect, useState } from "react";

function ServiceList() {
  const [services, setServices] = useState([]);

  useEffect(() => {
    const fetchServices = async () => {
      const response = await fetch("http://localhost:5000/api/services");
      const data = await response.json();
      setServices(data);
    };

    fetchServices();
  }, []);

  return (
    <div className="container">
        <h2 className="mt-4">Services Municipaux</h2>
        <div className="list-group mt-4">
          {services.map((service) => (
            <div key={service.id} className="list-group-item">
              <h5 className="mb-1">{service.name}</h5>
              <p className="mb-1">{service.description}</p>
              <small>Durée : {service.duration} minutes</small>
            </div>
          ))}
        </div>
    </div>
  );
};

export default ServiceList;