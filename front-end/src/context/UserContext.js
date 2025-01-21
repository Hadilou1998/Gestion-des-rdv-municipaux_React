import React, { createContext, useState, useEffect } from "react";
import axios from "../services/api";

export const UserContext = createContext();

function UserProvider({ children }) {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await axios.get("/auth/me");
                setUser(response.data);
            } catch (error) {
                console.error("Erreur lors de la récupération de l'utilisateur:", error);
            }
        };

        fetchUser();
    }, []);

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
};

export default UserProvider;