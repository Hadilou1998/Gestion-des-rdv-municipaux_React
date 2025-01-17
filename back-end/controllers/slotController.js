const { TimeSlot, Service } = require('../models');

// Création d'un créneau
exports.createSlot = async (req, res) => {
    const { serviceId, startTime, endTime } = req.body;

    // Vérification du rôle (renforcement de la sécurité)
    if (!['admin', 'agent'].includes(req.user.role)) {
        return res.status(403).json({ error: 'Accès interdit : rôle insuffisant.' });
    }

    try {
        const service = await Service.findByPk(serviceId);
        if (!service) {
            return res.status(404).json({ error: 'Service introuvable.' });
        }

        const slot = await TimeSlot.create({ serviceId, startTime, endTime });
        res.status(201).json({ message: 'Créneau créé avec succès.', slot });
    } catch (error) {
        res.status(400).json({ error: 'Erreur lors de la création du créneau.', details: error.message });
    }
};

// Liste des créneaux
exports.getAllSlots = async (req, res) => {
    try {
        const slots = await TimeSlot.findAll({ include: 'service' });
        res.status(200).json(slots);
    } catch (error) {
        res.status(500).json({ error: 'Erreur lors de la récupération des créneaux.', details: error.message });
    }
};

// Consultation d'un créneau par son ID
exports.getSlotById = async (req, res) => {
    const { id } = req.params;

    try {
        const slot = await TimeSlot.findByPk(id, { include: 'service' });
        if (!slot) {
            return res.status(404).json({ error: 'Créneau introuvable.' });
        }

        res.status(200).json(slot);
    } catch (error) {
        res.status(500).json({ error: 'Erreur lors de la récupération du créneau.', details: error.message });
    }
};

// Modification d'un créneau
exports.updateSlot = async (req, res) => {
    const { id } = req.params;
    const { startTime, endTime, isAvailable } = req.body;

    // Vérification du rôle (renforcement de la sécurité)
    if (!['admin', 'agent'].includes(req.user.role)) {
        return res.status(403).json({ error: 'Accès interdit : rôle insuffisant.' });
    }

    try {
        const slot = await TimeSlot.findByPk(id);
        if (!slot) {
            return res.status(404).json({ error: 'Créneau introuvable.' });
        }

        await slot.update({ startTime, endTime, isAvailable });
        res.status(200).json({ message: 'Créneau mis à jour avec succès.', slot });
    } catch (error) {
        res.status(400).json({ error: 'Erreur lors de la modification du créneau.', details: error.message });
    }
};

// Suppression d'un créneau
exports.deleteSlot = async (req, res) => {
    const { id } = req.params;

    // Vérification du rôle (renforcement de la sécurité)
    if (!['admin', 'agent'].includes(req.user.role)) {
        return res.status(403).json({ error: 'Accès interdit : rôle insuffisant.' });
    }

    try {
        const slot = await TimeSlot.findByPk(id);
        if (!slot) {
            return res.status(404).json({ error: 'Créneau introuvable.' });
        }

        await slot.destroy();
        res.status(200).json({ message: 'Créneau supprimé avec succès.' });
    } catch (error) {
        res.status(500).json({ error: 'Erreur lors de la suppression du créneau.', details: error.message });
    }
};

// Réservation d'un créneau
exports.reserveSlot = async (req, res) => {
    const { id } = req.params;

    try {
        // Vérifier si l'ID est valide
        if (!id) {
            return res.status(400).json({ error: 'ID du créneau manquant.' });
        }

        const slot = await TimeSlot.findByPk(id);

        // Vérifier si le créneau existe
        if (!slot) {
            return res.status(404).json({ error: 'Créneau introuvable.' });
        }

        // Vérifier si le créneau est disponible
        if (!slot.isAvailable) {
            return res.status(400).json({ error: 'Ce créneau n\'est plus disponible.' });
        }

        // Vérifier si le créneau n'est pas déjà passé
        if (new Date(slot.startTime) < new Date()) {
            return res.status(400).json({ error: 'Ce créneau est déjà passé.' });
        }

        // Mettre à jour le créneau
        await slot.update({
            isAvailable: false,
        });

        // Renvoyer la réponse
        res.status(200).json({
            message: 'Réservation effectuée avec succès.',
            slot: {
                id: slot.id,
                startTime: slot.startTime,
                endTime: slot.endTime,
                isAvailable: false,
            },
        });
    } catch (error) {
        res.status(500).json({
            error: 'Erreur lors de la réservation du créneau.',
            details: error.message,
        });
    }
};