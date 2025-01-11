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
        // Relier Appointment à User
        Appointment.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' });
        
        // Relier Appointment à Service
        Appointment.belongsTo(models.Service, { foreignKey: 'service_id', as: 'service' });  // assurez-vous que l'alias est 'service'
    };

    return Appointment;
};