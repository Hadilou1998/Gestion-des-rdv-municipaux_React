import React, { createContext, useState } from "react";

// Création du contexte
export const AuthContext = createContext();

// Provider du contexte
export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState(null);

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
        <AuthContext.Provider value={{ auth, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}