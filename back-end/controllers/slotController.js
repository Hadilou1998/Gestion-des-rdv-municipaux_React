const { TimeSlot, Service } = require('../models');

// Création d'un créneau
exports.createSlot = async (req, res) => {
    const { serviceId, startTime, endTime } = req.body;
    try {
        const service = await Service.findByPk(serviceId);
        if (!service) return res.status(404).json({ error: 'Service introuvable' });

        const slot = await TimeSlot.create({ serviceId, startTime, endTime });
        res.status(201).json({ message: 'Créneau créé', slot });
    } catch (error) {
        res.status(400).json({ error: 'Erreur lors de la création du créneau', details: error.message });
    }
};

// Liste des créneaux
exports.getAllSlots = async (req, res) => {
    try {
        const slots = await TimeSlot.findAll({ include: 'service' });
        res.status(200).json(slots);
    } catch (error) {
        res.status(500).json({ error: 'Erreur lors de la récupération des créneaux', details: error.message });
    }
};

// Consultation d'un créneau par son ID
exports.getSlotById = async (req, res) => {
    const { id } = req.params;
    try {
        const slot = await TimeSlot.findByPk(id);
        if (!slot) return res.status(404).json({ error: 'Créneau introuvable' });

        await slot.save();
        res.status(200).json(slot);
    } catch (error) {
        res.status(500).json({ error: 'Erreur lors de la récupération du créneau', details: error.message });
    }
};

// Modification d'un créneau
exports.updateSlot = async (req, res) => {
    const { id } = req.params;
    const { startTime, endTime, isAvailable } = req.body;
    try {
        const slot = await TimeSlot.findByPk(id);
        if (!slot) return res.status(404).json({ error: 'Créneau introuvable' });

        await slot.update({ startTime, endTime, isAvailable });
        res.status(200).json({ message: 'Créneau mis à jour', slot });
    } catch (error) {
        res.status(400).json({ error: 'Erreur lors de la modification du créneau', details: error.message });
    }
};

// Suppression d'un créneau
exports.deleteSlot = async (req, res) => {
    const { id } = req.params;
    try {
        const slot = await TimeSlot.findByPk(id);
        if (!slot) return res.status(404).json({ error: 'Créneau introuvable' });

        await slot.destroy();
        res.status(200).json({ message: 'Créneau supprimé' });
    } catch (error) {
        res.status(500).json({ error: 'Erreur lors de la suppression du créneau', details: error.message });
    }
};

// Fonction pour la RÉSERVATION d'un créneau
exports.reserveSlot = async (req, res) => {
    const { id } = req.params;
    try {
        // Vérifier si l'ID est valide
        if (!id) {
            return res.status(400).json({ error: 'ID du créneau manquant' });
        }

        const slot = await TimeSlot.findByPk(id);
        
        // Vérifier si le créneau existe
        if (!slot) {
            return res.status(404).json({ error: 'Créneau introuvable' });
        }

        // Vérifier si le créneau est disponible
        if (!slot.isAvailable) {
            return res.status(400).json({ error: 'Ce créneau n\'est plus disponible' });
        }

        // Vérifier si le créneau n'est pas déjà passé
        if (new Date(slot.startTime) < new Date()) {
            return res.status(400).json({ error: 'Ce créneau est déjà passé' });
        }

        // Mettre à jour le créneau
        await slot.update({ 
            isAvailable: false,
            // Ajoutez d'autres champs si nécessaire pour la réservation
        });

        // Renvoyer la réponse
        res.status(200).json({
            message: 'Réservation effectuée avec succès',
            slot: {
                id: slot.id,
                startTime: slot.startTime,
                endTime: slot.endTime,
                isAvailable: false,
                // Autres informations nécessaires
            }
        });

    } catch (error) {
        console.error('Erreur lors de la réservation:', error);
        res.status(500).json({
            error: 'Erreur lors de la réservation du créneau',
            details: error.message
        });
    }
};