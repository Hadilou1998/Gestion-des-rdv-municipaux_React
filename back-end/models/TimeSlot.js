module.exports = (sequelize, DataTypes) => {
    const TimeSlot = sequelize.define('TimeSlot', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: true,
            onUpdate: 'CASCADE',
            onDelete: 'SET NULL',
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
    }, { timestamps: true, underscored: true });

    TimeSlot.associate = (models) => {
        TimeSlot.belongsTo(models.Service, { foreignKey: 'serviceId' });
    };

    return TimeSlot;
};