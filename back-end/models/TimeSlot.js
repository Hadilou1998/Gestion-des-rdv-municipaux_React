const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const Service = require("./Service");

const TimeSlot = sequelize.define('TimeSlot', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    startTime: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    endTime: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    isAvailable: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
    },   
}, { timestamps: true });

TimeSlot.belongsTo(Service, { foreignKey: 'serviceId', onDelete: 'CASCADE' });