'use strict';
module.exports = (sequelize, DataTypes) => {
    const Product = sequelize.define('Product', {
            name: {
                type: DataTypes.STRING(50),
                allowNull: false,
                unique: true
            },
            slug: {
                type: DataTypes.STRING(50),
                allowNull: false,
                unique: true
            },
            hash: {
                type: DataTypes.UUID,
                allowNull: true,
                unique: true,
                defaultValue: DataTypes.UUIDV1
            },
            createdAt: {
                type: DataTypes.DATE,
            },
            updatedAt: {
                type: DataTypes.DATE,
            }
        }
        ,
        {
            tableName: 'Products'
        });

    Product.associate = function (models) {
        Product.hasMany(models.Lead, {
            foreignKey: 'ProductId',
            onDelete: 'CASCADE'
        });
    };
    return Product;
};