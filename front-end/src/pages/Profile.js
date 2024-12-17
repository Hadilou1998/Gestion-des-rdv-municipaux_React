import React, { useContext, useState } from "react";
import { UserContext } from "../contexts/UserContext";

function Profile() {
    const { user, setUser } = useContext(UserContext);
    const [editable, setEditable] = useState(false);
    const [formData, setFormData] = useState({
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        password: user.password,
        role: user.role,
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ 
            ...prevData, [name]: value 
        }));
    };

    const handleEditToggle = () => {
        setEditable(!editable);
    };

    const handleSave = () => {
        // Mettre à jour l'utilisateur avec les nouvelles données
        // et mettre à jour le contexte
        setUser((prevUser) => ({ ...prevUser, ...formData }));
        setEditable(false);
        alert("Informations mises à jour avec succès !");
    };

    return (
        <div className="container mt-5">
            <h1>Mon Profil</h1>
            <form>
                <div className="mb-3">
                    <label htmlFor="lastName" className="form-label">Nom</label>
                    <input
                        type="text"
                        className="form-control"
                        id="lastName"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        disabled={!editable}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="firstName" className="form-label">Prénom</label>
                    <input
                        type="text"
                        className="form-control"
                        id="firstName"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        disabled={!editable}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input
                        type="email"
                        className="form-control"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        disabled={!editable}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Mot de passe</label>
                    <input
                        type="password"
                        className="form-control"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        disabled={!editable}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="role" className="form-label">Rôle</label>
                    <input
                        type="text"
                        className="form-control"
                        id="role"
                        name="role"
                        value={formData.role}
                        onChange={handleInputChange}
                        disabled={!editable}
                    />
                </div>
                <div className="mt-4">
                    {editable ? (
                        <button type="button" className="btn btn-success me-2" onClick={handleSave}>
                            Enregistrer
                        </button>
                    ) : (
                        <button type="button" className="btn btn-primary me-2" onClick={handleEditToggle}>
                            Modifier
                        </button>
                    )}
                    {editable && (
                        <button type="button" className="btn btn-secondary" onClick={handleEditToggle}>
                            Annuler
                        </button>
                    )}
                </div>
            </form>
        </div>
    );
};

export default Profile;