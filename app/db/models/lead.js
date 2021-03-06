module.exports = (sequelize, DataTypes) => {
  const Lead = sequelize.define(
    'Lead', {
      name: {
        type: DataTypes.STRING(500),
        allowNull: false,
      },
      surname: {
        type: DataTypes.STRING(500),
        allowNull: true,
      },
      email: {
        type: DataTypes.STRING(500),
        allowNull: false,
        validate: {
          isEmail: true,
        },
      },
      phone: {
        type: DataTypes.STRING(18),
        allowNull: true,
      },
      message: DataTypes.STRING(4000),
      company: DataTypes.STRING(400),
      createdAt: {
        type: DataTypes.DATE,
      },
      updatedAt: {
        type: DataTypes.DATE,
      },
    }
    , {
      tableName: 'Leads',
    },
  );

  Lead.associate = (models) => {
    Lead.belongsTo(models.LandingPage, {
      foreignKey: 'id',
      onDelete: 'CASCADE',
    });
  };
  return Lead;
};
