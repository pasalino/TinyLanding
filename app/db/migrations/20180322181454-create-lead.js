module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Leads', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
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
      },
      allowNull: false,
    },
    phone: {
      type: Sequelize.STRING(18),
      allowNull: true,
    },
    message: {
      type: Sequelize.STRING(4000),
    },
    company: {
      type: Sequelize.STRING(400),
    },
    LandingPageId: {
      type: Sequelize.INTEGER,
      onDelete: 'CASCADE',
      references: {
        model: 'LandingPages',
        key: 'id',
      },
    },
    createdAt: {
      allowNull: true,
      default: Sequelize.literal('NOW()'),
      type: Sequelize.DATE,
    },
    updatedAt: {
      allowNull: true,
      default: Sequelize.literal('NOW()'),
      type: Sequelize.DATE,
    },
  }),
  down: queryInterface => queryInterface.dropTable('Leads'),
};
