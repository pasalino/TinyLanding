if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = 'production';
}

require('console.table');
const db = require('../app/db/models/index');

module.exports = async () => {
  const products = await db.Product.findAll({
    order: [
      ['createdAt', 'DESC'],
    ],
    attributes: {
      include: [[db.Sequelize.fn('COUNT', db.Sequelize.col('leads.id')), 'leads_count']],
    },
    include: [{
      model: db.Lead, attributes: [],
    }],
    group: ['product.id'],
  });


  const productList = products.map(item => ({
    Id: item.id,
    Name: item.name,
    Slug: item.slug,
    Hash: item.hash,
    Created: item.createdAt,
    Leads: item.dataValues.leads_count,
  }));

  console.table(productList);
};
