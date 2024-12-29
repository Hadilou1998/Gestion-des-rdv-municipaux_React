import React, { useState, useEffect } from "react";

function Profile() {
    const [profile, setProfile] = useState({});
    const [editMode, setEditMode] = useState(false);
    const [updatedProfile, setUpdatedProfile] = useState({});
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    useEffect(() => {
        // Charger les données du profil
        const fetchProfile = async () => {
            try {
                const response = await fetch("/api/user/profile", {
                    headers: { Authorization: `Bearer ${localStorage.getItem("authToken")}` },
                });
                if (response.ok) {
                    const data = await response.json();
                    setProfile(data);
                    setUpdatedProfile(data);
                } else {
                    setError("Erreur lors du chargement du profil.");
                }
            } catch (error) {
                setError("Une erreur inconnue s'est produite.");
            }
        };

        fetchProfile();
    }, []);

    const handleSave = async () => {
        setError("");
        setSuccess("");
        try {
            const response = await fetch("/api/user/profile", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("authToken")}`,
                },
                body: JSON.stringify(updatedProfile),
            });

            if (response.ok) {
                const data = await response.json();
                setProfile(data);
                setEditMode(false);
                setSuccess("Profil mis à jour avec succès.");
            } else {
                setError("Erreur lors de la mise à jour du profil.");
            }
        } catch (error) {
            setError("Une erreur inconnue s'est produite.");
        }
    };

    return (
        <div className="container">
            <h2 className="my-4">Mon Profil</h2>
            {error && <div className="alert alert-danger mt-3">{error}</div>}
            {success && <div className="alert alert-success mt-3">{success}</div>}
            {!editMode ? (
                <div className="mt-3">
                    <p><strong>Prénom :</strong> {profile.firstName}</p>
                    <p><strong>Nom :</strong> {profile.lastName}</p>
                    <p><strong>Email :</strong> {profile.email}</p>
                    <p><strong>Rôle :</strong> {profile.role}</p>
                    <button className="btn btn-primary" onClick={() => setEditMode(true)}>Modifier le profil</button>
                </div>
            ) : (
                <form className="mt-3">
                    <div className="mb-3">
                        <label htmlFor="firstName" className="form-label">Prénom</label>
                        <input
                            type="text"
                            className="form-control"
                            id="firstName"
                            value={updatedProfile.firstName || ""}
                            onChange={(e) => setUpdatedProfile({...updatedProfile, firstName: e.target.value })}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="lastName" className="form-label">Nom</label>
                        <input
                            type="text"
                            className="form-control"
                            id="lastName"
                            value={updatedProfile.lastName || ""}
                            onChange={(e) => setUpdatedProfile({...updatedProfile, lastName: e.target.value })}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email</label>
                        <input
                            type="email"
                            className="form-control"
                            id="email"
                            value={updatedProfile.email || ""}
                            onChange={(e) => setUpdatedProfile({...updatedProfile, email: e.target.value })}
                            required
                        />
                    </div>
                    <button type="button" className="btn btn-success" onClick={handleSave}>Enregistrer</button>
                    <button type="button" className="btn btn-secondary ms-2" onClick={() => setEditMode(false)}>Annuler</button>
                </form>
            )}
        </div>
    );
};

export default Profile;