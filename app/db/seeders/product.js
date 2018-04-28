module.exports = {
  async up(queryInterface) {
    const count = queryInterface.sequelize.query("SELECT COUNT(*) FROM Products WHERE slug LIKE 'tiny-landing'");
    if (count > 0) return;
    queryInterface.bulkInsert('Products', [{
      name: 'TinyLanding',
      slug: 'tiny-landing',
      hash: '4870de00-3512-11e8-a612-5b7cd30edbfc',
    }], {});
  },

  down() {

  },
};
