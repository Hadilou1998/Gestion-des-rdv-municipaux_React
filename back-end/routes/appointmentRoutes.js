const express = require('express');
const router = express.Router();
const appointmentController = require('../controllers/appointmentController');
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');
const validateMiddleware = require('../middleware/validateMiddleware');

// Créer un rendez-vous
router.post('/', authMiddleware, validateMiddleware.validationAppointment, appointmentController.createAppointment);

// Obtenir tous les rendez-vous
router.get('/', authMiddleware, appointmentController.getAllAppointments);

// Consulter un rendez-vous
router.get('/:id', authMiddleware, appointmentController.getAppointmentById);

// Mettre à jour un rendez-vous
router.put('/:id', authMiddleware, appointmentController.updateAppointment);

// Supprimer un rendez-vous
router.delete('/:id', authMiddleware, appointmentController.deleteAppointment);

module.exports = router;