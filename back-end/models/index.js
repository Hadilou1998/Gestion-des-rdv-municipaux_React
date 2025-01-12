const { Sequelize, DataTypes } = require('sequelize');

// Initialisation de la connexion à la base de données
const sequelize = new Sequelize('base_mairie', 'root', 'supersaiyan', {
    host: 'localhost',
    dialect: 'mysql', // Changez en fonction de votre SGBD (par exemple : 'postgres', 'sqlite', etc.)
    logging: false, // Désactivez les logs SQL pour plus de clarté, activez-les pour le debug.
});

// Importation des modèles
const User = require('./User')(sequelize, DataTypes);
const Service = require('./Service')(sequelize, DataTypes);
const Appointment = require('./Appointment')(sequelize, DataTypes);
const TimeSlot = require('./TimeSlot')(sequelize, DataTypes);

// Ajout des modèles dans un objet pour leur gestion centralisée
const models = {
    User,
    Service,
    Appointment,
    TimeSlot,
};

// Initialisation des associations
Object.keys(models).forEach((modelName) => {
    if (models[modelName].associate) {
        models[modelName].associate(models); // Appelle les méthodes d'association dans chaque modèle
    }
});

// Export des modèles et de la connexion Sequelize
module.exports = {
    sequelize,
    Sequelize,
    ...models,
};