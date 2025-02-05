const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { User } = require("../models");

// Inscription
exports.register = async (req, res) => {
    const { firstName, lastName, email, password, role } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({ firstName, lastName, email, password: hashedPassword, role });
        res.status(201).json({ message: "Utilisateur crée avec succès", user });
    } catch (error) {
        res.status(400).json({ error: "Erreur lors de l'inscription", error: error.message });
    }
};

// Connexion
exports.login = async (req, res) => {
    const { email, password } = req.body;   
    try {  
        console.log("Email:", email);  
        console.log("Password:", password);  

        // Vérification si l'utilisateur existe
        const user = await User.findOne({ where: { email } });  
        if (!user) {
            return res.status(404).json({ error: "Utilisateur introuvable" });
        }

        // Vérification que JWT_SECRET est bien défini  
        if (!process.env.JWT_SECRET) {
            console.error("❌ ERREUR: Clé JWT_SECRET non définie !");
            return res.status(500).json({ error: "Erreur serveur : clé JWT manquante" });
        }

        // ✅ Génération du token JWT sécurisé
        const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "1h" });

        console.log("🔑 Token généré avec succès:", token);

        // ✅ Ne pas renvoyer le mot de passe dans la réponse
        const userData = {
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            role: user.role
        };

        res.status(200).json({ message: "Connexion réussie", token, user: userData });  
    } catch (error) {  
        console.error("❌ Erreur de connexion:", error);  
        res.status(500).json({ error: "Erreur lors de la connexion", details: error.message });  
    }  
};

// Utilisateur actuel
exports.me = async (req, res) => {
    try {
        if (!req.user || !req.user.id) {
            return res.status(401).json({ error: "Utilisateur non authentifié." });
        }

        const user = await User.findByPk(req.user.id, {
            attributes: ["id", "firstName", "lastName", "email", "role"]
        });

        if (!user) {
            return res.status(404).json({ error: "Utilisateur introuvable." });
        }

        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ error: "Erreur serveur lors de la récupération de l'utilisateur." });
    }
};

// Déconnexion (si nécessaire)
exports.logout = (req, res) => {
    res.json({ message: "Déconnexion réussie" });
};