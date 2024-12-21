module.exports = (sequelizeInstance, DataTypes) => {
    const Appointment = sequelizeInstance.define('Appointment', {
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
        }
    }, { timestamps: true, underscored: true });

    Appointment.associate = (models) => {
        Appointment.belongsTo(models.User, { foreignKey: 'user_id', as: 'user', });
        Appointment.belongsTo(models.Service, { foreignKey: 'service_id', as: 'service', });
    };

    return Appointment;
};