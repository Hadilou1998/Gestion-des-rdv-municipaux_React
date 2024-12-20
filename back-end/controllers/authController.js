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
        console.log("Email:", email);  
        console.log("Password:", password);  

        const user = await User.findOne({ where: { email } });  
        if (!user) {  
            console.log("Utilisateur non trouvé");  
            return res.status(401).json({ error: 'Identifiants incorrects' });  
        }  
        
        const isPasswordValid = await bcrypt.compare(password, user.password);  
        if (!isPasswordValid) {  
            console.log("Mot de passe invalide");  
            return res.status(401).json({ error: 'Identifiants incorrects' });  
        }  

        // Vérifiez que JWT_SECRET est défini  
        console.log("JWT Secret:", process.env.JWT_SECRET);  

        const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });  
        res.status(200).json({ message: 'Connexion réussie', token, user });  
    } catch (error) {  
        console.error("Erreur de connexion:", error);  
        res.status(500).json({ error: 'Erreur lors de la connexion', details: error.message });  
    }  
};

// Déconnexion (si nécessaire)
exports.logout = (req, res) => {
    res.json({ message: 'Déconnexion réussie' });
};