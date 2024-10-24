const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const router = express.Router();

// Inscription
router.post('/register', async (req, res) => {
    const { firstName, lastName, email, password } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({ firstName, lastName, email, password: hashedPassword });
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de l\'inscription' });
    }
});

// Connexion
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ where: { email } });
        if (!user || !await bcrypt.compare(password, user.password)) {
            return res.status(401).json({ message: 'Identifiants incorrects' });
        }
        const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET);
        res.json({ token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erreur lors de la connexion' });
    }
});

module.exports = router;