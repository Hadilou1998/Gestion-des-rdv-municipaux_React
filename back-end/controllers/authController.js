const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { User } = require("../models");

// Inscription
exports.register = async (req, res) => {
    const { firstName, lastName, email, password, role } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({ firstName, lastName, email, password: hashedPassword, role });
        res.status(201).json({ message: "Utilisateur créé avec succès", user });
    } catch (error) {
        res.status(400).json({ error: "Erreur lors de l'inscription", details: error.message });
    }
};

// Connexion
exports.login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(404).json({ error: "Utilisateur introuvable" });
        }

        // Vérifier le mot de passe
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ error: "Mot de passe incorrect" });
        }

        // Vérifier que la clé JWT_SECRET est bien définie
        if (!process.env.JWT_SECRET) {
            console.error("❌ ERREUR: Clé JWT_SECRET non définie !");
            return res.status(500).json({ error: "Erreur serveur : clé JWT manquante" });
        }

        // Générer le token
        const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "1h" });

        console.log("✅ Token généré avec succès :", token);

        res.status(200).json({ message: "Connexion réussie", token, user });
    } catch (error) {
        console.error("❌ Erreur de connexion:", error);
        res.status(500).json({ error: "Erreur lors de la connexion", details: error.message });
    }
};

// Récupérer l'utilisateur actuel
exports.me = async (req, res) => {
    if (!req.user || !req.user.id) {
        return res.status(401).json({ error: "Utilisateur non authentifié." });
    }

    try {
        const user = await User.findByPk(req.user.id, { attributes: { exclude: ["password"] } });
        if (!user) {
            return res.status(404).json({ error: "Utilisateur introuvable." });
        }

        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ error: "Erreur lors de la récupération des données utilisateur.", details: error.message });
    }
};

// Déconnexion (si nécessaire)
exports.logout = (req, res) => {
    res.json({ message: "Déconnexion réussie" });
};