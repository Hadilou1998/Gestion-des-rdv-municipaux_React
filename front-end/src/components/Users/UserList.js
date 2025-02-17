import React, { useEffect, useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "../../services/api";
import { UserContext } from "../../context/UserContext";

function UserList() {
    const { user, loading } = useContext(UserContext);
    const navigate = useNavigate();
    const [users, setUsers] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!loading) {
            // 🔒 Vérifier que seul l'admin a accès à cette page
            if (!user || user.role !== "admin") {
                navigate("/unauthorized");
                return;
            }

            // Récupérer les utilisateurs
            axios.get("/users")
                .then(response => setUsers(response.data))
                .catch(error => {
                    console.error("Erreur lors du chargement des utilisateurs :", error);
                    setError("Impossible de charger la liste des utilisateurs.");
                });
        }
    }, [user, loading, navigate]);

    // Fonction pour supprimer un utilisateur
    const deleteUser = async (userId) => {
        if (!window.confirm("Êtes-vous sûr de vouloir supprimer cet utilisateur ?")) return;

        try {
            await axios.delete(`/users/${userId}`);
            setUsers(users.filter(u => u.id !== userId)); // Mettre à jour la liste sans recharger la page
        } catch (error) {
            console.error("Erreur lors de la suppression :", error);
            setError("Impossible de supprimer cet utilisateur.");
        }
    };

    if (loading) return <div>Chargement...</div>;
    if (error) return <div className="alert alert-danger">{error}</div>;

    return (
        <div className="container mt-4">
            <h2>Liste des utilisateurs</h2>
            <table className="table">
                <thead>
                    <tr>
                        <th>Nom</th>
                        <th>Email</th>
                        <th>Rôle</th>
                        {user.role === "admin" && <th>Actions</th>} {/* 🔒 Affiché uniquement pour l'admin */}
                    </tr>
                </thead>
                <tbody>
                    {users.map(userItem => (
                        <tr key={userItem.id}>
                            <td>{userItem.last_name}, {userItem.first_name}</td>
                            <td>{userItem.email}</td>
                            <td>{userItem.role}</td>
                            {user.role === "admin" && (
                                <td>
                                    {/* 🔗 Ajout du lien vers les détails de l'utilisateur */}
                                    <Link to={`/users/${userItem.id}`} className="btn btn-info btn-sm me-2">
                                        Détails
                                    </Link>
                                    <Link to={`/users/edit/${userItem.id}`} className="btn btn-warning btn-sm me-2">
                                        Modifier
                                    </Link>
                                    <button className="btn btn-danger btn-sm" onClick={() => deleteUser(userItem.id)}>
                                        Supprimer
                                    </button>
                                </td>
                            )}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default UserList;