import React, { createContext, useEffect, useState } from "react";

// Création du contexte
export const AuthContext = createContext();

// Provider du contexte
export const AuthContextProvider = ({ children }) => {
    const [auth, setAuth] = useState(null);
    const [loading, setLoading] = useState(true);

    // Charger l'utilisateur à partir du localStorage lors du démarrage de l'application
    useEffect(() => {
        const savedUser = localStorage.getItem("user");
        if (savedUser) {
            setAuth(JSON.parse(savedUser));
        }
        setLoading(false);
    }, []);

    // Fonction pour connecter un utilisateur
    const login = (credentials) => {
        setAuth(credentials);
        localStorage.setItem("user", JSON.stringify(credentials));
    };

    // Fonction pour déconnecter un utilisateur
    const logout = () => {
        setAuth(null);
        localStorage.removeItem("user");
    };

    return (
        <AuthContext.Provider value={{ auth, login, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
}