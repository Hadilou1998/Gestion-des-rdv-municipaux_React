import React, { createContext, useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../services/api';

export const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false); // ✅ Ajout d'un état pour suivre l'authentification
    const navigate = useNavigate();

    /** ✅ Charger l'utilisateur depuis localStorage */
    const loadUser = useCallback(async () => {
        setLoading(true);
        try {
            const userData = localStorage.getItem("user");

            if (!userData) {
                setUser(null);
                setIsAuthenticated(false);
                setLoading(false);
                return;
            }

            let parsedUser;
            try {
                parsedUser = JSON.parse(userData);
                if (!parsedUser || !parsedUser.token) {
                    throw new Error("Données utilisateur invalides.");
                }
            } catch (err) {
                console.error("Erreur JSON:", err);
                localStorage.removeItem("user");
                setUser(null);
                setIsAuthenticated(false);
                setLoading(false);
                return;
            }

            axios.defaults.headers.common['Authorization'] = `Bearer ${parsedUser.token}`;
            const response = await axios.get('/auth/me');

            if (!response.data.role) {
                throw new Error("Le rôle de l'utilisateur est introuvable.");
            }

            setUser({ ...response.data, token: parsedUser.token });
            setIsAuthenticated(true); // ✅ Confirmer l'authentification

        } catch (error) {
            console.error("Erreur utilisateur:", error);
            localStorage.removeItem("user");
            setUser(null);
            setIsAuthenticated(false);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        loadUser();
    }, [loadUser]);

    /** ✅ Fonction de connexion */
    const login = async (credentials) => {  
        try {
            const response = await axios.post('/auth/login', credentials);

            if (!response.data.user || !response.data.token) {
                throw new Error("Réponse invalide du serveur.");
            }

            const userData = { ...response.data.user, token: response.data.token };
            localStorage.setItem("user", JSON.stringify(userData));
            setUser(userData);
            setIsAuthenticated(true); // ✅ L'utilisateur est connecté
            axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;

            // ✅ Redirection après connexion
            if (userData.role === "admin" || userData.role === "agent") {
                navigate("/dashboard");
            } else {
                navigate("/appointments/my");
            }

            return { success: true };
        } catch (error) {
            return { success: false, error: error.response?.data?.message || "Erreur de connexion" };
        }
    };

    /** ✅ Fonction de déconnexion */
    const logout = () => {
        localStorage.removeItem("user");
        setUser(null);
        setIsAuthenticated(false); // ✅ Déconnecter l'utilisateur proprement
        delete axios.defaults.headers.common["Authorization"];
        navigate("/login");
    };

    return (
        <UserContext.Provider value={{ user, loading, isAuthenticated, login, logout, loadUser }}>
            {children}
        </UserContext.Provider>
    );
};