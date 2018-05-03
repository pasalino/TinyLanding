if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = 'production';
}

require('console.table');
const format = require('date-format');
const slugify = require('slugify');
const chalk = require('chalk');
const db = require('../app/db/models/index');

const slugifyWithCheckDb = async (name, verbose, baseSlug = null, index = 0) => {
  let newSlug = baseSlug || slugify(name, { replacement: '-', lower: true });
  if (index > 0)newSlug = `${baseSlug}${index + 1}`;
  const existsSlug = (await db.Product.count({ where: { slug: newSlug } })) !== 0;
  if (verbose && existsSlug)console.log(chalk.yellow(`Slug ${newSlug} already exists`));
  if (existsSlug) newSlug = await slugifyWithCheckDb(name, verbose, baseSlug, index + 1);
  return newSlug;
};

const landingListDefaultParams = { hash: false, order: 'created' };

module.exports =
{
  landingListDefaultParams,

  landingList: async (args) => {
    const { hash, order } = { ...landingListDefaultParams, ...args };

    let orderingColumns;
    switch (order) {
      case 'name':
        orderingColumns = ['name', 'ASC'];
        break;
      case 'leads':
        orderingColumns = [db.Sequelize.literal('leads_count'), 'DESC'];
        break;
      case 'created':
        orderingColumns = ['createdAt', 'DESC'];
        break;
      default:
        throw new Error('Order parameter is not valid');
    }

    const products = await db.Product.findAll({
      order: [
        orderingColumns,
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
      ...hash && { Hash: item.hash },
      Created: format.asString('dd-MM-yyyy hh:mm', item.createdAt),
      Leads: item.dataValues.leads_count,
    }));

    console.table(productList);
    return productList;
  },

  landingAdd: async (args) => {
    const { name, slug, verbose } = args;
    if (verbose) console.log(chalk.bold('🖍  Create new landing page'));
    const existsProduct = (await db.Product.count({ where: { name } })) !== 0;
    if (existsProduct) {
      console.log(chalk.red(`⛔️ Landing page '${name}' already exists!`));
      return;
    }

    if (verbose && !slug) console.log(chalk.green(`Create slug for landing: ${name}`));
    const landingSlug = slug || await slugifyWithCheckDb(name, verbose);
    if (verbose && !slug) console.log(chalk.green(`New slug for landing: ${landingSlug}`));

    const existsSlug = (await db.Product.count({ where: { slug } })) !== 0;
    if (existsSlug) {
      console.log(chalk.red(`⛔️ Slug '${landingSlug}' already exists!`));
      return;
    }

    try {
      const product = await db.Product.create({ name, slug: landingSlug });
      console.log(chalk.green('✅ Landing Page created correctly'));
      console.log(chalk.green(`\tName:\t'${product.name}'`));
      console.log(chalk.green(`\tSlug:\t'${landingSlug}'`));
      console.log(chalk.green(`\tName:\t'${product.hash}'`));
    } catch (e) {
      if (verbose) console.log(JSON.stringify(e));
      console.log(chalk.red(`⛔️ Error in create new product: ${name}`));
    }
  },
};
