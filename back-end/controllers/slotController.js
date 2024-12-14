const TimeSlot = require('../models/TimeSlot');

// Liste des créneaux
exports.getAllSlots = async (req, res) => {
    try {
        const slots = await TimeSlot.findAll();
        res.json(slots);
    } catch (error) {
        res.status(500).json({ error: 'Erreur lors de la récupération des créneaux', details: error.message });
    }
};

// Création d'un créneau
exports.createSlot = async (req, res) => {
    try {
        const { serviceId, startTime, endTime } = req.body;
        const slot = await TimeSlot.create({ serviceId, startTime, endTime });
        res.status(201).json({ message: 'Créneau créé', slot });
    } catch (error) {
        res.status(400).json({ error: 'Erreur lors de la création du créneau', details: error.message });
    }
};

// Consultation d'un créneau par son ID
exports.getSlotById = async (req, res) => {
    try {
        const slot = await TimeSlot.findByPk(req.params.id);
        if (!slot) return res.status(404).json({ error: 'Créneau introuvable' });
        res.json(slot);
    } catch (error) {
        res.status(500).json({ error: 'Erreur lors de la récupération du créneau', details: error.message });
    }
};

// Modification d'un créneau
exports.updateSlot = async (req, res) => {
    try {
        const { startTime, endTime, isAvailable } = req.body;
        const slot = await TimeSlot.findByPk(req.params.id);
        if (!slot) return res.status(404).json({ error: 'Créneau introuvable' });

        await slot.update({ startTime, endTime, isAvailable });
        res.json({ message: 'Créneau mis à jour', slot });
    } catch (error) {
        res.status(400).json({ error: 'Erreur lors de la modification du créneau', details: error.message });
    }
};

// Suppression d'un créneau
exports.deleteSlot = async (req, res) => {
    try {
        const slot = await TimeSlot.findByPk(req.params.id);
        if (!slot) return res.status(404).json({ error: 'Créneau introuvable' });

        await slot.destroy();
        res.json({ message: 'Créneau supprimé' });
    } catch (error) {
        res.status(500).json({ error: 'Erreur lors de la suppression du créneau', details: error.message });
    }
};