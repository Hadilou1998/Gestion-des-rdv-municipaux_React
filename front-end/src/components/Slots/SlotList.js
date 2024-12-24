import React from "react";

function SlotList({ slots }) {
    return (
        <div className="container">
            <h2 className="my-4">Créneaux disponibles</h2>
            <div className="row">
                {slots.map((slot) => (
                    <div key={slot.id} className="col-md-4">
                        <div className="card mb-3">
                            <div className="card-body">
                                <h5 className="card-title">{new Date(slot.start_time).toLocaleTimeString()}</h5>
                                <p className="card-text">{slot.is_available ? "Disponible" : "Indisponible"}</p>
                                <button className="btn btn-primary" disabled={!slot.is_available}>Réserver</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SlotList;