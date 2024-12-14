const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

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
        const user = await User.findOne({ where: { email } });

        if (!user || !await bcrypt.compare(password, user.password)) {
            return res.status(401).json({ error: 'Identifiants incorrects' });
        }

        const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ message: 'Connexion réussie', token });
    } catch (error) {
        res.status(500).json({ error: 'Erreur lors de la connexion', details: error.message });
    }
};

// Déconnexion (si nécessaire)
exports.logout = (req, res) => {
    res.json({ message: 'Déconnexion réussie' });
};