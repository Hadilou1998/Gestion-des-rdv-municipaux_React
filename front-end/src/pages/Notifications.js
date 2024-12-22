import React from "react";

function Notifications() {
    const notifications = [
        { id: 1, message: "Votre rendez-vous pour le passeport est confirmé pour le 10 janvier à 10h00." },
        { id: 2, message: "Un nouveau créneau est disponible pour le service d'état civil." },
        { id: 3, message: "Votre rendez-vous pour la carte d'identité a été annulé." },
    ];
    return (
        <div className="container mt-5">
            <h1>Notifications</h1>
            {notifications.length > 0 ? (
                <ul className="list-group mt-4">
                    {notifications.map(notification => (
                        <li key={notification.id} className="list-group-item">
                            {notification.message}
                        </li>
                    ))}
                </ul>
            ) : (
                <p className="mt-4">Aucune notification pour le moment.</p>
            )}
        </div>
    );
};

export default Notifications;