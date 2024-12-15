const express = require('express');
const router = express.Router();
const serviceController = require('../controllers/serviceController');
const auth = require('../middleware/auth');

// Liste des services
router.get('/', serviceController.getAllServices);

// Création d'un service
router.post('/', auth, serviceController.createService);

// Consultation d'un service par son ID
router.get('/:id', serviceController.getServiceById);

// Modification d'un service par son ID
router.put('/:id', auth, serviceController.updateService);

// Suppression d'un service par son ID
router.delete('/:id', auth, serviceController.deleteService);

module.exports = router;