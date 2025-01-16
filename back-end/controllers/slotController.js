const { TimeSlot, Service } = require('../models');

// Création d'un créneau (fonction existante - inchangée)
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

// Liste des créneaux (fonction existante - inchangée)
exports.getAllSlots = async (req, res) => {
    try {
        const slots = await TimeSlot.findAll({ include: 'service' });
        res.status(200).json(slots);
    } catch (error) {
        res.status(500).json({ error: 'Erreur lors de la récupération des créneaux', details: error.message });
    }
};

// Consultation d'un créneau par son ID (fonction existante - inchangée)
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

// Modification d'un créneau (fonction existante - inchangée)
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

// Suppression d'un créneau (fonction existante - inchangée)
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
exports.bookSlot = async (req, res) => {
    const { slotId } = req.body; // Récupère l'ID du créneau depuis le corps de la requête

    if (!slotId) {
        return res.status(400).json({ error: 'ID du créneau manquant pour la réservation.' });
    }

    try {
        const slot = await TimeSlot.findByPk(slotId);
        if (!slot) {
            return res.status(404).json({ error: 'Créneau introuvable.' });
        }

        if (!slot.isAvailable) {
            return res.status(400).json({ error: 'Créneau déjà réservé ou indisponible.' });
        }

        // Logique de réservation : Mettre à jour le créneau pour le rendre indisponible (ou autre logique de réservation)
        await slot.update({ isAvailable: false }); // Exemple : le rendre indisponible

        res.status(200).json({ message: 'Créneau réservé avec succès.', slot });

    } catch (error) {
        console.error("Erreur lors de la réservation du créneau:", error);
        res.status(500).json({ error: 'Erreur lors de la réservation du créneau.', details: error.message });
    }
};