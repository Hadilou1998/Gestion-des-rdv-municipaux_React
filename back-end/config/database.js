require('dotenv').config();
const { Sequelize } = require('sequelize');

// Charger la configuration en fonction de l'environnement
const config = require('./config')[process.env.NODE_ENV || 'development'];

// Initialiser Sequelize
const sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    {
        host: config.host,
        dialect: config.dialect,
        pool: config.pool,
        timezone: config.timezone,
        logging: false, // Désactiver les logs SQL pour éviter la pollution de la console
    }
);

module.exports = sequelize;