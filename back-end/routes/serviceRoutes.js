const express = require('express');
const router = express.Router();
const serviceController = require('../controllers/serviceController');
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');

// Créer un service (accessible uniquement par les administrateurs)
router.post('/', authMiddleware, roleMiddleware(['admin']), serviceController.createService);

// Obtenir tous les services
router.get('/', authMiddleware, serviceController.getAllServices);

// Consulter un service
router.get('/:id', serviceController.getServiceById);

// Modifier un service (accessible uniquement par les administrateurs)
router.put('/:id', authMiddleware, roleMiddleware(['admin']), serviceController.updateService);

// Supprimer un service (accessible uniquement par les administrateurs)
router.delete('/:id', authMiddleware, roleMiddleware(['admin']), serviceController.deleteService);

module.exports = router;