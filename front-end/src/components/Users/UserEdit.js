import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "../../services/api";
import { UserContext } from "../../context/UserContext";

function UserEdit() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { user } = useContext(UserContext);
    const [userData, setUserData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!user || user.role !== "admin") {
            navigate("/unauthorized");
            return;
        }

        const fetchUser = async () => {
            try {
                const response = await axios.get(`/users/${id}`);
                setUserData(response.data);
            } catch (error) {
                console.error("Erreur lors de la récupération de l'utilisateur :", error);
                setError("Impossible de charger l'utilisateur.");
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, [id, user, navigate]);

    const handleSave = async () => {
        try {
            await axios.put(`/users/${id}`, userData);
            navigate("/users");
        } catch (error) {
            console.error("Erreur lors de la mise à jour de l'utilisateur :", error);
            setError("Impossible de mettre à jour l'utilisateur.");
        }
    };

    if (loading) return <div>Chargement...</div>;
    if (error) return <div className="alert alert-danger">{error}</div>;

    return (
        <div className="container mt-4">
            <h2>Modifier l'utilisateur #{id}</h2>
            <div className="mb-3">
                <label className="form-label">Nom</label>
                <input
                    type="text"
                    className="form-control"
                    value={userData.last_name}
                    onChange={(e) => setUserData({...userData, last_name: e.target.value })}
                />
            </div>
            <div className="mb-3">
                <label className="form-label">Prénom</label>
                <input
                    type="text"
                    className="form-control"
                    value={userData.first_name}
                    onChange={(e) => setUserData({...userData, first_name: e.target.value })}
                />
            </div>
            <div className="mb-3">
                <label className="form-label">Email</label>
                <input
                    type="email"
                    className="form-control"
                    value={userData.email}
                    onChange={(e) => setUserData({...userData, email: e.target.value })}
                />
            </div>
            <div className="mb-3">
                <label className="form-label">Rôle</label>
                <select
                    className="form-select"
                    value={userData.role}
                    onChange={(e) => setUserData({...userData, role: e.target.value })}
                >
                    <option value="admin">Administrateur</option>
                    <option value="agent">Agent</option>
                    <option value="citizen">Citoyen</option>
                </select>
            </div>
            <button className="btn btn-primary" onClick={handleSave}>Enregistrer</button>
            <button className="btn btn-secondary ms-2" onClick={() => navigate("/users")}>Annuler</button>
        </div>
    );
};

export default UserEdit;