const { Service } = require('../models');

// Création d'un service
exports.createService = async (req, res) => {
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
            where: { is_active: true }
        });
        res.json(services);
    } catch (error) {
        res.status(500).json({ error: 'Erreur lors de la récupération des services', details: error.message });
    }
};

// Consultation d'un service par son ID
exports.getServiceById = async (req, res) => {
    try {
        const service = await Service.findByPk(req.params.id);
        if (!service) return res.status(404).json({ error: 'Service introuvable' });
        res.json(service);
    } catch (error) {
        res.status(500).json({ error: 'Erreur lors de la récupération du service', details: error.message });
    }
};

// Modification d'un service
exports.updateService = async (req, res) => {
    try {
        const { name, description, duration, department } = req.body;
        const service = await Service.findByPk(req.params.id);
        if (!service) return res.status(404).json({ error: 'Service introuvable' });

        await service.update({ name, description, duration, department });
        res.json({ message: 'Service mis à jour', service });
    } catch (error) {
        res.status(400).json({ error: 'Erreur lors de la modification du service', details: error.message });
    }
};

// Suppression d'un service
exports.deleteService = async (req, res) => {
    try {
        const service = await Service.findByPk(req.params.id);
        if (!service) return res.status(404).json({ error: 'Service introuvable' });

        await service.destroy();
        res.json({ message: 'Service supprimé' });
    } catch (error) {
        res.status(500).json({ error: 'Erreur lors de la suppression du service', details: error.message });
    }
};