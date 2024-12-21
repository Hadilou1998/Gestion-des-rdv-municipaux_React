const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('database', 'username', 'password', {
    host: 'localhost',
    dialect: 'mysql', // ou 'postgres', 'sqlite', etc.
});

// Définir les modèles
const User = require('./User');
const Service = require('./Service');
const Appointment = require('./Appointment');
const TimeSlot = require('./TimeSlot');

// Ajout des modèles à `db`
const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.User = User(sequelize, Sequelize.DataTypes);
db.Service = Service(sequelize, Sequelize.DataTypes);
db.Appointment = Appointment(sequelize, Sequelize.DataTypes);
db.TimeSlot = TimeSlot(sequelize, Sequelize.DataTypes);

module.exports = db;