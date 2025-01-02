import React, { useState, useEffect } from "react";
import { getUserProfile, updateUserProfile } from "../services/api";

function Profile() {
    const [profile, setProfile] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        role: "",
    });

    useEffect(() => {
        // Charger les données du profil
        const fetchProfile = async () => {
            try {
                const response = await getUserProfile();
                setProfile(response.data);
            } catch (error) {
                console.error("Erreur lors du chargement du profil :", error);    
            }
        };

        fetchProfile();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProfile({ ...profile, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await updateUserProfile(profile);
            alert("Votre profil a été mis à jour avec succès !");
        } catch (error) {
            console.error("Erreur lors de la mise à jour du profil :", error);
        }
    };

    return (
        <div>
            <h2 className="my-4">Mon Profil</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="form-label">Prénom</label>
                    <input type="text" className="form-control" name="firstName" value={profile.firstName} onChange={handleChange} required />
                </div>
                <div className="mb-3">
                    <label className="form-label">Nom</label>
                    <input type="text" className="form-control" name="lastName" value={profile.lastName} onChange={handleChange} required />
                </div>
                <div className="mb-3">
                    <label className="form-label">Email</label>
                    <input type="email" className="form-control" name="email" value={profile.email} onChange={handleChange} required />
                </div>
                <div className="mb-3">
                    <label className="form-label">Mot de passe</label>
                    <input type="password" className="form-control" name="password" value={profile.password} onChange={handleChange} required />
                </div>
                <div className="mb-3">
                    <label className="form-label">Rôle</label>
                    <select className="form-select" name="role" value={profile.role} onChange={handleChange}>
                        <option value="">-- Sélectionnez un rôle --</option>
                        <option value="admin">Administrateur</option>
                        <option value="citizen">Utilisateur</option>
                        <option value="agent">Agent</option>
                    </select>
                </div>
                <button type="submit" className="btn btn-primary">Mettre à jour le profil</button>
            </form>
        </div>
    );
};

export default Profile;