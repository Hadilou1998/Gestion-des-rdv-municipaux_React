import React, { useContext, useState } from "react";
import { UserContext } from "../contexts/UserContext";

function Profile() {
    const { user, setUser } = useContext(UserContext);
    const [editable, setEditable] = useState(false);
    const [formData, setFormData] = useState({
        name: user?.name || "", 
        email: user?.email || "",
        phone: user?.phone || "",
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
                    <label htmlFor="name" className="form-label">Nom</label>
                    <input
                        type="text"
                        className="form-control"
                        id="name"
                        name="name"
                        value={formData.name}
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
                    <label htmlFor="phone" className="form-label">Téléphone</label>
                    <input
                        type="tel"
                        className="form-control"
                        id="phone"
                        name="phone"
                        value={formData.phone}
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