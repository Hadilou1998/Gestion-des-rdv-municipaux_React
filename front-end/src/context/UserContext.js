import React, { createContext, useState, useEffect } from "react";
import axios from "../services/api"; // Assure-toi que le chemin est correct

export const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await axios.get("/auth/me"); // Vérifie que cet endpoint fonctionne
                setUser(response.data.user);
            } catch (error) {
                console.error("Erreur lors de la récupération de l'utilisateur :", error);
                setUser(null);
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, []);

    return (
        <UserContext.Provider value={{ user, loading }}>
            {children}
        </UserContext.Provider>
    );
};