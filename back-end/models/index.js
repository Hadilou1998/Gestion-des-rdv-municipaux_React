const { Sequelize } = require('sequelize');
const dotenv = require('dotenv');

dotenv.config();

const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        dialect: 'mysql',
        port: process.env.DB_PORT || 3306,
        logging: false
    }
);

// Import des modèles
const User = require('./user');
const Appointment = require('./appointment');
const Slot = require('./slot');
const Service = require('./service');

// Définition des associations
User.hasMany(Appointment);
Appointment.belongsTo(User);

Slot.hasMany(Appointment);
Appointment.belongsTo(Slot);

Service.hasMany(Appointment);
Appointment.belongsTo(Service);

module.exports = {
    sequelize,
    User,
    Appointment,
    Slot,
    Service
};