module.exports = (sequelize, DataTypes) => {
    const Service = sequelize.define('Service', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING(100),
            allowNull: false
        },
        description: DataTypes.TEXT,
        duration: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        department: {
            type: DataTypes.STRING(100),
            allowNull: false
        },
        is_active: {
            type: DataTypes.BOOLEAN,
            defaultValue: true
        }
    }, {
        timestamps: true,
        underscored: true
    });
    return Service;
};