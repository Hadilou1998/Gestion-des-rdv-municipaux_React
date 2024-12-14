module.exports = (sequelize, DataTypes) => {
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
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: true, 
            references: {
              model: 'users',
              key: 'id'
            },
            onUpdate: 'CASCADE',
            onDelete: 'SET NULL'
        },
        service_id: {
            type: DataTypes.INTEGER,
            allowNull: true, 
            references: {
              model: 'services',
              key: 'id'
            },
            onUpdate: 'CASCADE',
            onDelete: 'SET NULL'
        },
    }, { timestamps: true, underscored: true });

    Appointment.associate = (models) => {
        Appointment.belongsTo(models.User, { foreignKey: 'user_id' });
        Appointment.belongsTo(models.Service, { foreignKey: 'service_id' });
    };

    return Appointment;
};