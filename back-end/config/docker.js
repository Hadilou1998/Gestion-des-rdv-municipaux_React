const { Sequelize } = require('sequelize');

// Debug des variables d'environnement
console.log('Variables d\'environnement DB:', {
    DB_HOST: process.env.DB_HOST,
    DB_NAME: process.env.DB_NAME,
    DB_USER: process.env.DB_USER,
    DB_PORT: process.env.DB_PORT
});

// Configuration explicite
const sequelize = new Sequelize({
    database: process.env.DB_NAME || 'base_mairie',
    username: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || 'supersaiyan',
    host: process.env.DB_HOST || 'mysql_db',  // Forcer l'utilisation de mysql_db
    port: process.env.DB_PORT || 3306,
    dialect: 'mysql',
    logging: console.log, // Active les logs SQL
    dialectOptions: {
        connectTimeout: 60000
    }
});

// Test de connexion avec plus de détails
sequelize.authenticate()
    .then(() => {
        console.log('✅ Connexion à MySQL réussie!');
    })
    .catch(err => {
        console.error('❌ Détails de l\'erreur de connexion:', {
            message: err.message,
            host: process.env.DB_HOST || 'mysql_db',
            port: process.env.DB_PORT || 3306,
            database: process.env.DB_NAME || 'base_mairie',
            user: process.env.DB_USER || 'root'
        });
    });