import React, { useState } from 'react';

function Settings() {
    const [emailNotifications, setEmailNotifications] = useState(true);
    const [smsNotifications, setSmsNotifications] = useState(false);

    const handleSave = () => {
        alert('Vos paramètres ont été sauvegardés.');
    };

    return (
        <div className="container mt-5">
            <h1>Paramètres</h1>
            <form className="mt-4">
                <div className="form-check">
                    <input
                        type="checkbox"
                        className="form-check-input"
                        id="emailNotifications"
                        checked={emailNotifications}
                        onChange={() => setEmailNotifications(!emailNotifications)}
                    />
                    <label className="form-check-label" htmlFor="emailNotifications">
                        Recevoir des notifications par email
                    </label>
                </div>
                <div className="form-check mt-3">
                    <input
                        type="checkbox"
                        className="form-check-input"
                        id="smsNotifications"
                        checked={smsNotifications}
                        onChange={() => setSmsNotifications(!smsNotifications)}
                    />
                    <label className="form-check-label" htmlFor="smsNotifications">
                        Recevoir des notifications par SMS
                    </label>
                </div>
                <button
                    type="button"
                    className="btn btn-primary mt-4"
                    onClick={handleSave}
                >
                    Sauvegarder
                </button>
            </form>
        </div>
    );
}

export default Settings;