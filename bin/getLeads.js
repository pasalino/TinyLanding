if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = 'production';
}

const db = require('../app/db/models/index');

module.exports = async (args) => {
  console.log('Leads');
  console.log(`Args list: ${args}`);

  let slug = args[0];
  if (!slug) slug = 'tiny-landing';
  console.log(`Product name: ${slug}`);

  const product = (await db.Product.findOne({
    where: { slug },
  }));

  const productId = product.id;

  const leads = await db.Lead.findAll({
    where: {
      ProductId: productId,
    },
    order: [
      ['createdAt', 'DESC'],
    ],
  });

  return leads.map(item => ({
    'Created At': item.createdAt.toLocaleString('it-IT', { hour12: false }),
    Name: item.name,
    Surname: item.surname,
    Company: item.company,
    Email: item.email,
    Phone: item.phone,
    Message: (item.message || '').substr(0, 20),
  }));
};
