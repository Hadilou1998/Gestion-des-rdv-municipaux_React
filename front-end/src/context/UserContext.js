import React, { createContext, useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../services/api";

export const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    /** ✅ Déconnexion sécurisée */
    const logout = useCallback(() => {
        console.warn("🚪 Déconnexion automatique...");
        localStorage.removeItem("user");
        setUser(null);
        delete axios.defaults.headers.common["Authorization"];
        navigate("/login");
    }, [navigate]);

    /** ✅ Chargement de l'utilisateur */
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
                if (!parsedUser || !parsedUser.token || typeof parsedUser.token !== "string") {
                    throw new Error("❌ Données utilisateur invalides.");
                }
            } catch (err) {
                console.error("❌ Erreur JSON userData :", err);
                localStorage.removeItem("user");
                setUser(null);
                setLoading(false);
                return;
            }

            // ✅ Vérification du token avant d'envoyer la requête
            const token = parsedUser.token.trim();
            if (!token || token.length < 20) {
                console.error("❌ Token JWT absent ou mal formé !");
                localStorage.removeItem("user");
                setUser(null);
                setLoading(false);
                return;
            }

            // ✅ Ajouter le token dans Axios **via `api.js`**
            console.log("📡 Token envoyé à `/auth/me` :", token);

            // ✅ Vérifier la validité du token avec le backend
            const response = await axios.get("/auth/me");

            console.log("✅ Réponse API `/auth/me` :", response.data);

            if (!response.data || !response.data.role) {
                throw new Error("❌ Le rôle de l'utilisateur est introuvable.");
            }

            setUser({ ...response.data, token });

        } catch (error) {
            console.error("❌ Erreur lors du chargement de l'utilisateur :", error);

            if (error.response?.status === 400) {
                console.warn("⏳ Requête mal formée. Vérifie l'envoi du token !");
            } else if (error.response?.status === 401) {
                console.warn("⏳ Token expiré ou invalide. Déconnexion automatique.");
                logout();
            } else {
                localStorage.removeItem("user");
                setUser(null);
            }
        } finally {
            setLoading(false);
        }
    }, [logout]);

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

            // ✅ Nettoyage de l'ancien token
            localStorage.removeItem("user");

            const userData = { ...response.data.user, token: response.data.token };
            localStorage.setItem("user", JSON.stringify(userData));
            axios.defaults.headers.common["Authorization"] = `Bearer ${response.data.token}`;
            setUser(userData);

            console.log("✅ Connexion réussie. Token stocké :", userData.token);

            // 🚀 Redirection après connexion
            navigate("/dashboard");

            return { success: true };
        } catch (error) {
            console.error("❌ Erreur lors de la connexion :", error);
            return {
                success: false,
                error: error.response?.data?.message || "Erreur de connexion",
            };
        }
    };

    return (
        <UserContext.Provider value={{ user, loading, login, logout, loadUser }}>
            {children}
        </UserContext.Provider>
    );
};