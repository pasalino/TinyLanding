module.exports = {
  async up(queryInterface) {
    const count = await queryInterface.sequelize.query("SELECT COUNT(*) AS 'value' FROM Products WHERE slug LIKE 'tiny-landing'");
    if (count[0][0].value > 0) return;

    await queryInterface.bulkInsert('Products', [{
      name: 'TinyLanding',
      slug: 'tiny-landing',
      hash: '4870de00-3512-11e8-a612-5b7cd30edbfc',
    }], {});
  },

  down() {

  },
};
