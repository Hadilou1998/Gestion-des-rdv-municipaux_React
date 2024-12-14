const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const User = require("./User");
const Service = require("./Service");

const Appointment = sequelize.define('Appointment', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    appointmentDate: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    status: {
        type: DataTypes.ENUM('scheduled', 'completed', 'cancelled'),
        defaultValue: 'scheduled',
    },
    notes: {
        type: DataTypes.TEXT,
    },
}, { timestamps: true });

Appointment.belongsTo(models.User, { foreignKey: 'userId', onDelete: 'CASCADE' });
Appointment.belongsTo(models.Service, { foreignKey: 'serviceId', onDelete: 'RESTRICT' });