require('console.table');
const db = require('../app/db/models/index');
const slugify = require('slugify');

module.exports = async (args) => {
  let productName = null;

  try {
    productName = args.name;
  } catch (e) {
    console.error('product_name is required');
    return;
  }

  const slug = args[1] ? args[1] : slugify(productName);

  const existsProduct = (await db.Product.count({
    where: { name: productName },
  })) !== 0;

  if (existsProduct) {
    console.log(`Product '${productName}' already exists!`);
    return;
  }

  const existsSlug = (await db.Product.count({
    where: { slug },
  })) !== 0;

  if (existsSlug) {
    console.log(`Slug '${slug}'  already exists!`);
    return;
  }

  try {
    const product = await db.Product.create({ name: productName, slug });
    console.log(`Product '${product.name}' created correctly, slug: ${slug}, hash: ${product.hash}`);
  } catch (e) {
    // debug_error(JSON.stringify(e));
    console.log(`Error in create new product: ${productName}`);
  }
};
