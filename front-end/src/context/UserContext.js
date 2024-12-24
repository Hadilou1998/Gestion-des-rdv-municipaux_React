import React, { createContext, useState, useEffect } from "react";

// Création du context utilisateur
export const UserContext = createContext();

// Fournisseur du context utilisateur
export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null); // Utilisateur connecté

    // Récupération des informations utilisateur depuis le localStorage
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            setUser(token);
        }
    }, []);

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
};