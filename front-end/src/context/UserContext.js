import React, { createContext, useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../services/api";

export const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    /** ✅ Charger l'utilisateur depuis localStorage */
    const loadUser = useCallback(async () => {
        setLoading(true);
        try {
            const userData = localStorage.getItem("user");

            if (!userData) {
                setUser(null);
                setLoading(false);
                return;
            }

            let parsedUser;
            try {
                parsedUser = JSON.parse(userData);
                if (!parsedUser || !parsedUser.token) {
                    throw new Error("❌ Données utilisateur invalides.");
                }
            } catch (err) {
                console.error("❌ Erreur JSON:", err);
                localStorage.removeItem("user");
                setUser(null);
                setLoading(false);
                return;
            }

            console.log("📡 Token envoyé à /auth/me:", parsedUser.token);
            axios.defaults.headers.common["Authorization"] = `Bearer ${parsedUser.token}`;

            const response = await axios.get("/auth/me");

            if (!response.data.role) {
                console.error("❌ ERREUR: Le rôle de l'utilisateur n'est pas défini !");
                throw new Error("Rôle utilisateur introuvable.");
            }

            console.log("✅ Utilisateur chargé:", response.data);
            setUser({ ...response.data, token: parsedUser.token });

        } catch (error) {
            console.error("❌ Erreur utilisateur:", error);
            localStorage.removeItem("user");
            setUser(null);
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
            const response = await axios.post("/auth/login", credentials);

            if (!response.data.user || !response.data.token) {
                throw new Error("❌ Réponse invalide du serveur.");
            }

            console.log("✅ Token reçu après connexion:", response.data.token);

            const userData = { ...response.data.user, token: response.data.token };

            // ✅ Stockage sécurisé
            localStorage.setItem("user", JSON.stringify(userData));
            axios.defaults.headers.common["Authorization"] = `Bearer ${response.data.token}`;
            setUser(userData);
            console.log("🔹 Utilisateur défini après connexion:", userData);

            return { success: true };
        } catch (error) {
            console.error("❌ Erreur lors de la connexion:", error);
            return {
                success: false,
                error: error.response?.data?.message || "Erreur de connexion",
            };
        }
    };

    /** ✅ Fonction de déconnexion */
    const logout = () => {
        console.log("🚪 Déconnexion en cours...");
        localStorage.removeItem("user");
        setUser(null);
        delete axios.defaults.headers.common["Authorization"];

        // ✅ Attendre que `user` soit bien null avant de rediriger
        setTimeout(() => navigate("/login"), 1000);
    };

    return (
        <UserContext.Provider value={{ user, loading, login, logout, loadUser }}>
            {children}
        </UserContext.Provider>
    );
};