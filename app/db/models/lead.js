'use strict';
module.exports = (sequelize, DataTypes) => {
    const Lead = sequelize.define('Lead', {
            name: {
                type: DataTypes.STRING(500),
                allowNull: false
            },
            surname: {
                type: DataTypes.STRING(500),
                allowNull: true
            },
            email: {
                type: DataTypes.STRING(500),
                allowNull: false,
                validate: {
                    isEmail: true,
                }
            },
            phone: {
                type: DataTypes.STRING(18),
                allowNull: true
            },
            message: DataTypes.STRING(4000),
            company: DataTypes.STRING(400),
        }
        , {
            tableName: 'Leads'
        });

    Lead.associate = function (models) {
        Lead.belongsTo(models.Product, {
            foreignKey: 'id',
            onDelete: 'CASCADE'
        });
    };
    return Lead;
};