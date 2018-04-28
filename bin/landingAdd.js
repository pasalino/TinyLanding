require('console.table');
const db = require('../app/db/models/index');
const slugify = require('slugify');

module.exports = async (args) => {
  console.log(args);
  const { name, slug } = args;

  const landingSlug = !slug && slugify(name);
  console.log(landingSlug);

  const existsProduct = (await db.Product.count({
    where: { name },
  })) !== 0;

  if (existsProduct) {
    console.log(`Product '${name}' already exists!`);
  }

  const existsSlug = (await db.Product.count({
    where: { slug },
  })) !== 0;

  if (existsSlug) {
    console.log(`Slug '${landingSlug}'  already exists!`);
  }

  try {
    const product = await db.Product.create({ name, landingSlug });
    console.log(`Product '${product.name}' created correctly, slug: ${landingSlug}, hash: ${product.hash}`);
  } catch (e) {
    // debug_error(JSON.stringify(e));
    console.log(`Error in create new product: ${name}`);
  }
};
