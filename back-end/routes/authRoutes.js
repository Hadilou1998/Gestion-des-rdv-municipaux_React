const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const authMiddleware = require('../middleware/authMiddleware');

// Inscription
router.post('/register', authController.register);

// Connexion
router.post('/login', authController.login);

// Récupérer les informations utilisateur connecté
router.get("/me", authMiddleware, authController.me);

// Déconnexion
router.delete('/logout', authController.logout);

module.exports = router;