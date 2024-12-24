import React, { useState, useEffect } from "react";

function Notifications() {
    const [notifications, setNotifications] = useState([]);

    useEffect(() => {
        // Simuler une requête pour obtenir les notifications
        setNotifications([
            { id: 1, message: "Nouveau message de support" },
            { id: 2, message: "Nouvelle réservation" },
            { id: 3, message: "Nouvelle demande de rendez-vous" },
        ]);
    }, []);
    return (
        <div className="container">
            <h2 className="my-4">Notifications</h2>
            {notifications.length > 0 ? (
                <ul className="list-group">
                    {notifications.map(notif => (
                        <li key={notif.id} className="list-group-item">
                            <p>{notif.message}</p>
                            <small className="text-muted">{notif.date}</small>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>Aucune notification pour le moment.</p>
            )}
        </div>
    );
};

export default Notifications;