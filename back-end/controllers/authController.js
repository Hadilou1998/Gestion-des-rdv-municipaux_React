const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { User } = require("../models");

// Fonction pour générer un token sécurisé
const generateToken = (user) => {
    return jwt.sign(
        { id: user.id, role: user.role },
        process.env.JWT_SECRET,  // 🔐 Utiliser une clé secrète sécurisée
        { expiresIn: "1h" }      // ⏳ Expiration du token en 1h
    );
};

// ✅ Inscription
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

// ✅ Connexion
exports.login = async (req, res) => {
    const { email, password } = req.body;   
    try {  
        const user = await User.findOne({ where: { email } });

        if (!user) {
            return res.status(404).json({ error: "Utilisateur introuvable" });
        }

        const isMatch = await bcrypt.compare(password, user.password); // 🔑 Vérification du mot de passe
        if (!isMatch) {
            return res.status(401).json({ error: "Mot de passe incorrect" });
        }

        const token = generateToken(user);

        // ✅ Stocker le token dans la base de données
        await user.update({ token });

        res.status(200).json({ message: "Connexion réussie", token, user });
    } catch (error) {
        console.error("Erreur de connexion:", error);
        res.status(500).json({ error: "Erreur lors de la connexion", details: error.message });
    }  
};

// ✅ Utilisateur actuel
exports.me = async (req, res) => {
    if (!req.user || !req.user.id) {
        return res.status(401).json({ error: "Utilisateur non authentifié." });
    }

    try {
        const user = await User.findOne({ where: { id: req.user.id } });

        if (!user) {
            return res.status(404).json({ error: "Utilisateur introuvable." });
        }

        res.status(200).json(user); // ✅ Retourner uniquement l'utilisateur, pas d'objet `user: {}`
    } catch (error) {
        res.status(500).json({ error: "Erreur lors de la récupération des données utilisateur.", details: error.message });
    }
};

// ✅ Déconnexion (si nécessaire)
exports.logout = async (req, res) => {
    try {
        const user = await User.findByPk(req.user.id);
        if (user) {
            await user.update({ token: null }); // 🧹 Effacer le token de la base de données
        }
        res.json({ message: "Déconnexion réussie" });
    } catch (error) {
        res.status(500).json({ message: "Erreur lors de la déconnexion" });
    }
};