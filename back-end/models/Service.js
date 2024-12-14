const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Service = sequelize.define('Service', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    description: {
        type: DataTypes.TEXT,
    },
    duration: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    department: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    isActive: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
    }
}, { timestamps: true });

module.exports = Service;