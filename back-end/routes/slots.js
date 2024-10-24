const express = require('express');
const { TimeSlot } = require('./models');
const router = express.Router();

// Ajouter un créneau horaire
router.post('/', async (req, res) => {
    const { serviceId, startTime, endTime } = req.body;
    try {
        const timeSlot = await TimeSlot.create({ serviceId, startTime, endTime });
        res.json(timeSlot);
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la création du créneau horaire.' });
    }
});

// Obtenir tous les créneaux horaires d'un service
router.get('/service/:serviceId', async (req, res) => {
    const { serviceId } = req.params;
    try {
        const timeSlots = await TimeSlot.findAll({ where: { serviceId } });
        res.json(timeSlots);
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la récupération des créneaux horaires.' });
    }
});

// Voir un créneau horaire
router.get('/:timeSlotId', async (req, res) => {
    const { timeSlotId } = req.params;
    try {
        const timeSlot = await TimeSlot.findByPk(timeSlotId);
        if (!timeSlot) {
            return res.status(404).json({ message: 'Créneau horaire introuvable.' });
        }
        res.json(timeSlot);
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la récupération du créneau horaire.' });
    }
});

// Modifier un créneau horaire
router.put('/:timeSlotId', async (req, res) => {
    const { timeSlotId } = req.params;
    const { startTime, endTime } = req.body;
    try {
        const timeSlot = await TimeSlot.findByPk(timeSlotId);
        if (!timeSlot) {
            return res.status(404).json({ message: 'Créneau horaire introuvable.' });
        }
        await timeSlot.update({ startTime, endTime });
        res.json(timeSlot);
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la modification du créneau horaire.' });
    }
});

// Supprimer un créneau horaire
router.delete('/:timeSlotId', async (req, res) => {
    const { timeSlotId } = req.params;
    try {
        const timeSlot = await TimeSlot.findByPk(timeSlotId);
        if (!timeSlot) {
            return res.status(404).json({ message: 'Créneau horaire introuvable.' });
        }
        await timeSlot.destroy();
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la suppression du créneau horaire.' });
    }
});

module.exports = router;