const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const sequelize = require('../config/database');
const { QueryTypes } = require('sequelize');

// Inscription
exports.register = async (req, res) => {
    try {
        const { firstName, lastName, email, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({ firstName, lastName, email, password: hashedPassword });
        res.status(201).json({ message: 'Utilisateur crée avec succès', user });
    } catch (error) {
        res.status(400).json({ error: 'Erreur lors de l\'inscription', details: error.message });
    }
};

// Connexion
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Récupérer l'utilisateur via `sequelize.model` et en accédant au modèle d'utilisateur
        const user = await User.findAll({
            where: { email },
            limit: 1  // Limiter à un seul utilisateur (équivalent à `LIMIT 1`)
        });

        // Vérifier si l'utilisateur existe
        if (user.length === 0) {
            return res.status(401).json({ error: 'Utilisateur non trouvé' });
        }

        // Récupérer l'utilisateur du tableau retourné
        const foundUser = user[0];

        // Comparer le mot de passe hashé avec le mot de passe envoyé
        const passwordMatch = await bcrypt.compare(password, foundUser.password);
        if (!passwordMatch) {
            return res.status(401).json({ error: 'Mot de passe incorrect' });
        }

        // Générer un token JWT
        const token = jwt.sign({ id: foundUser.id, role: foundUser.role }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.json({ message: 'Connexion réussie', user: foundUser, token });
    } catch (error) {
        res.status(500).json({ error: 'Erreur lors de la connexion', details: error.message });
    }
};

// Déconnexion (si nécessaire)
exports.logout = (req, res) => {
    res.json({ message: 'Déconnexion réussie' });
};