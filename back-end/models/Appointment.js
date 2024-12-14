module.exports = (sequelize, DataTypes) => {
    const Appointment = sequelize.define('Appointment', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: true,
            onUpdate: 'CASCADE',
            onDelete: 'SET NULL',
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
    }, { timestamps: true, underscored: true });

    Appointment.associate = (models) => {
        Appointment.belongsTo(models.User, { foreignKey: 'userId' });
        Appointment.belongsTo(models.Service, { foreignKey: 'serviceId' });
    };

    return Appointment;
};