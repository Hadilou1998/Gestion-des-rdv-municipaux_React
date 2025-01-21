const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Inscription
router.post('/register', authController.register);

// Connexion
router.post('/login', authController.login);

// Récupérer les informations utilisateur connecté
router.get("/me", authController.me);

// Déconnexion
router.delete('/logout', authController.logout);

module.exports = router;