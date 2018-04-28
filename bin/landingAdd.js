require('console.table');
const db = require('../app/db/models/index');
const slugify = require('slugify');

module.exports = async(args) => {
  let product_name = null;

  try {
    product_name = args.name;
  } catch (e) {
    console.error('product_name is required');
    return;
  }

  let slug = null;
  if (args[1]) {
    slug = args[1];
  } else {
    slug = slugify(product_name);
  }

  const exists_product = (await db.Product.count({
    where: {name: product_name},
  })) !== 0;

  if (exists_product) {
    console.log(`Product '${product_name}' already exists!`);
    return;
  }

  const exists_slug = (await db.Product.count({
    where: {slug},
  })) !== 0;

  if (exists_slug) {
    console.log(`Slug '${slug}'  already exists!`);
    return;
  }

  try {
    const product = await db.Product.create({name: product_name, slug});
    console.log(`Product '${product.name}' created correctly, slug: ${slug}, hash: ${product.hash}`);
  } catch (e) {
    // debug_error(JSON.stringify(e));
    console.log(`Error in create new product: ${product_name}`);
  }
};
