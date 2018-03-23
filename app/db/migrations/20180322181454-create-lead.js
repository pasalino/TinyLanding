'use strict';
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('Leads', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            name: {
                type: Sequelize.STRING(500),
                allowNull: false,
            },
            surname: {
                type: Sequelize.STRING(500),
                allowNull: true,
            },
            email: {
                type: Sequelize.STRING(500),
                validate: {
                    isEmail: true,
                }
            },
            phone: {
                type: Sequelize.STRING(18),
                allowNull: true
            },
            message: {
                type: Sequelize.STRING(4000)
            },
            company: {
                type: Sequelize.STRING(400)
            },
            ProductId: {
                type: Sequelize.INTEGER,
                onDelete: 'CASCADE',
                references: {
                    model: 'Product',
                    key: 'id'
                }
            },
            createdAt: {
                allowNull: true,
                type: Sequelize.DATE,
            },
            updatedAt: {
                allowNull: true,
                type: Sequelize.DATE,
            }
        });
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('Leads');
    }
};