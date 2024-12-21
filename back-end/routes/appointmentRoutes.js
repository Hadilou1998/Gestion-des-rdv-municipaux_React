const express = require('express');
const router = express.Router();
const appointmentController = require('../controllers/appointmentController');

// Liste des rendez-vous (tous ou pour un utilisateur spécifique)
router.get('/', appointmentController.getAllAppointments);

// Création de rendez-vous
router.post('/', appointmentController.createAppointment);

// Consultation d'un rendez-vous par son ID
router.get('/:id', appointmentController.getAppointmentById);

// Modification d'un rendez-vous par son ID
router.put('/:id', appointmentController.updateAppointment);

// Suppression d'un rendez-vous par son ID
router.delete('/:id', appointmentController.deleteAppointment);

module.exports = router;