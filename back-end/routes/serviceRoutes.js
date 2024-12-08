const express = require('express');
const router = express.Router();
const serviceController = require('../controllers/serviceController');
const authMiddleware = require('../middleware/authMiddleware');

// Liste des services
router.get('/', serviceController.getAllServices);

// Création d'un service
router.post('/', authMiddleware, serviceController.createService);

// Consultation d'un service par son ID
router.get('/:id', serviceController.getServiceById);

// Modification d'un service par son ID
router.put('/:id', authMiddleware, serviceController.updateService);

// Suppression d'un service par son ID
router.delete('/:id', authMiddleware, serviceController.deleteService);

module.exports = router;