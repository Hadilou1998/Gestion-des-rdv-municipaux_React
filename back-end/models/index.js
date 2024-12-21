const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('database', 'username', 'password', {
    host: 'localhost',
    dialect: 'mysql', // ou 'postgres', 'sqlite', etc.
});

// Définir les modèles
const User = require('./User')(sequelize, DataTypes);
const Service = require('./Service')(sequelize, DataTypes);
const Appointment = require('./Appointment')(sequelize, DataTypes);
const TimeSlot = require('./TimeSlot')(sequelize, DataTypes);

// Configurer les relations si nécessaire
User.hasMany(Appointment);
Appointment.belongsTo(User);

Service.hasMany(Appointment);
Appointment.belongsTo(Service);

TimeSlot.hasMany(Appointment);
Appointment.belongsTo(TimeSlot);

module.exports = {
    sequelize,
    Sequelize,
    User,
    Service,
    Appointment,
    TimeSlot,
};
