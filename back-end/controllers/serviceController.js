const { Service } = require('../models');

// Création d'un service (Admin et Agent seulement)
exports.createService = async (req, res) => {
    // Vérification du rôle (renforcement de la sécurité)
    if (!['admin', 'agent'].includes(req.user.role)) {
        return res.status(403).json({ error: 'Accès interdit : rôle insuffisant.' });
    }

    try {
        const { name, description, duration, department, isActive } = req.body;
        const service = await Service.create({ name, description, duration, department, isActive });
        res.status(201).json({ message: 'Service créé', service });
    } catch (error) {
        res.status(400).json({ error: 'Erreur lors de la création du service', details: error.message });
    }
};

// Liste des services
exports.getAllServices = async (req, res) => {
    try {
        const services = await Service.findAll({
            where: { isActive: true }
        });
        res.status(200).json(services);
    } catch (error) {
        res.status(500).json({ error: 'Erreur lors de la récupération des services', details: error.message });
    }
};

// Consultation d'un service par son ID
exports.getServiceById = async (req, res) => {
    try {
        const service = await Service.findByPk(req.params.id);
        if (!service) {
            return res.status(404).json({ error: 'Service introuvable' });
        }
        res.status(200).json(service);
    } catch (error) {
        res.status(500).json({ error: 'Erreur lors de la récupération du service', details: error.message });
    }
};

// Modification d'un service (Admin et Agent seulement)
exports.updateService = async (req, res) => {
    // Vérification du rôle (renforcement de la sécurité)
    if (!['admin', 'agent'].includes(req.user.role)) {
        return res.status(403).json({ error: 'Accès interdit : rôle insuffisant.' });
    }

    try {
        const { name, description, duration, department } = req.body;
        const service = await Service.findByPk(req.params.id);
        if (!service) {
            return res.status(404).json({ error: 'Service introuvable' });
        }

        await service.update({ name, description, duration, department });
        res.status(200).json({ message: 'Service mis à jour', service });
    } catch (error) {
        res.status(400).json({ error: 'Erreur lors de la modification du service', details: error.message });
    }
};

// Suppression d'un service (Admin seulement)
exports.deleteService = async (req, res) => {
    // Vérification du rôle (renforcement de la sécurité)
    if (req.user.role !== 'admin') {
        return res.status(403).json({ error: 'Accès interdit : rôle insuffisant.' });
    }

    try {
        const service = await Service.findByPk(req.params.id);
        if (!service) {
            return res.status(404).json({ error: 'Service introuvable' });
        }

        await service.destroy();
        res.status(200).json({ message: 'Service supprimé' });
    } catch (error) {
        res.status(500).json({ error: 'Erreur lors de la suppression du service', details: error.message });
    }
};