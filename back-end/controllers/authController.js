const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { User } = require("../models");

// 🔐 Générer un token sécurisé avec une clé secrète
const generateToken = (user) => {
    return jwt.sign(
        { id: user.id, role: user.role },
        process.env.JWT_SECRET,  // Vérifie que cette clé est bien définie dans .env
        { expiresIn: "1h" } // ⏳ Expiration en 1h
    );
};

// ✅ Inscription (avec vérification des emails déjà utilisés)
exports.register = async (req, res) => {
    const { firstName, lastName, email, password, role } = req.body;

    try {
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ error: "Cet email est déjà utilisé." });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({ firstName, lastName, email, password: hashedPassword, role });

        res.status(201).json({ message: "Utilisateur créé avec succès", user });
    } catch (error) {
        res.status(500).json({ error: "Erreur lors de l'inscription", details: error.message });
    }
};

// ✅ Connexion (avec hachage du mot de passe)
exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ where: { email } });

        if (!user) {
            return res.status(404).json({ error: "Utilisateur introuvable" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ error: "Mot de passe incorrect" });
        }

        const token = generateToken(user);
        await user.update({ token }); // Stocke le token en BDD

        res.status(200).json({ message: "Connexion réussie", token, user });
    } catch (error) {
        console.error("❌ Erreur de connexion:", error);
        res.status(500).json({ error: "Erreur lors de la connexion", details: error.message });
    }
};

// ✅ Récupération de l'utilisateur connecté
exports.me = async (req, res) => {
    if (!req.user || !req.user.id) {
        return res.status(401).json({ error: "Utilisateur non authentifié." });
    }

    try {
        const user = await User.findOne({ where: { id: req.user.id } });

        if (!user) {
            return res.status(404).json({ error: "Utilisateur introuvable." });
        }

        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ error: "Erreur lors de la récupération des données utilisateur.", details: error.message });
    }
};

// �� Déconnexion
exports.logout = async (req, res) => {
    try {
        const user = await User.findOne({ where: { id: req.user.id } });
        if (!user) {
            return res.status(404).json({ error: "Utilisateur introuvable." });
        }
        await user.update({ token: null }); // Supprime le token en BDD
        res.status(200).json({ message: "Déconnexion réussie." });
    } catch (error) {
        res.status(500).json({ error: "Erreur lors de la déconnexion", details: error.message });
    }
};