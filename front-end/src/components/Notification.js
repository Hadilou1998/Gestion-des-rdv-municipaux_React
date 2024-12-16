import React, { useState } from "react";

function Notification({ type = "info", message, dismissible = true }) {
    const [visible, setVisible] = useState(true);

    if (!visible) return null;

    const alertClass = `alert alert-${type} ${dismissible ? "alert-dismissible" : ""}`;

    return (
        <div className={alertClass}>
            {message}
            {dismissible && (
                <button type="button" className="btn-close" aria-label="Fermer" onClick={() => setVisible(false)}></button>
            )}
        </div>
    )
};

export default Notification;