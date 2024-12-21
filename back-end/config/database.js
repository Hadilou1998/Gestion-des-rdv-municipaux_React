const { Sequelize } = require('sequelize');

// Configuration de Sequelize
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: 'mysql', // ou 'postgres', 'sqlite', etc.
    logging: true, // Afficher les logs dans le console
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000,
    },
    timezone: "+01:00",
});

// Exporter l'instance de Sequelize
module.exports = sequelize;
