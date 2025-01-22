import React, { createContext, useState, useEffect } from "react";
import axios from "../services/api";

export const UserContext = createContext(null);

function UserProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                // Vérifier si on a un token dans le localStorage
                const token = localStorage.getItem("user");
                if (!token) {
                    setLoading(false);
                    return;
                }

                // Configuration du token dans les headers
                axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
                
                // Appel à l'API pour récupérer les infos utilisateur
                const response = await axios.get("/auth/me");
                setUser(response.data);
            } catch (error) {
                console.error("Erreur lors de la récupération des données utilisateur:", error);
                localStorage.removeItem("user"); // Supprimer le token si invalide
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, []);

    return (
        <UserContext.Provider value={{ user, setUser, loading }}>
            {children}
        </UserContext.Provider>
    );
}

export default UserProvider;