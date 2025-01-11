module.exports = (sequelize, DataTypes) => {
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
    }, { timestamps: true, underscored: true });

    Service.associate = (models) => {
        // Relier Service à Appointment
        Service.hasMany(models.Appointment, { foreignKey: 'service_id', as: 'appointments' });
    };

    return Service;
};