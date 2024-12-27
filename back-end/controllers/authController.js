const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { User } = require("../models");
require("dotenv").config();

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
        
        const user = await User.findOne({ where: { email } });  
        if (!user) return res.status(404).json({ error: "Utilisateur introuvable" });
        
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(401).json({ error: "Mot de passe incorrect" }); 

        // Vérifiez que JWT_SECRET est défini  
        console.log("JWT Secret:", process.env.JWT_SECRET);  

        const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "1h" });  
        res.status(200).json({ message: "Connexion réussie", token, user });  
    } catch (error) {  
        console.error("Erreur de connexion:", error);  
        res.status(500).json({ error: "Erreur lors de la connexion", details: error.message });  
    }  
};

// Déconnexion (si nécessaire)
exports.logout = (req, res) => {
    res.json({ message: "Déconnexion réussie" });
};