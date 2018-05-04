module.exports = (sequelize, DataTypes) => {
  const LandingPage = sequelize.define(
    'LandingPage', {
      name: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: true,
      },
      slug: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: true,
      },
      hash: {
        type: DataTypes.UUID,
        allowNull: true,
        unique: true,
        defaultValue: DataTypes.UUIDV1,
      },
      createdAt: {
        type: DataTypes.DATE,
      },
      updatedAt: {
        type: DataTypes.DATE,
      },
    }
    ,
    {
      tableName: 'LandingPages',
    },
  );
  LandingPage.associate = (models) => {
    LandingPage.hasMany(models.Lead, {
      foreignKey: 'LandingPageId',
      onDelete: 'CASCADE',
    });
  };
  return LandingPage;
};
