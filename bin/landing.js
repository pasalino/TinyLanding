process.env.NODE_ENV = !process.env.NODE_ENV || 'production';

require('console.table');
const format = require('date-format');
const slugify = require('slugify');
const chalk = require('chalk');
const path = require('path');
const db = require('../app/db/models/index');
const fs = require('fs-extra');

const templateFolder = path.join(__dirname, '../app/templates');
const basePublic = '../app/public';
const baseView = '../app/views';

const slugifyWithCheckDb = async (name, verbose, baseSlug = null, index = 0) => {
  let newSlug = baseSlug || slugify(name, { replacement: '-', lower: true });
  if (index > 0)newSlug = `${baseSlug}${index + 1}`;
  const existsSlug = (await db.LandingPage.count({ where: { slug: newSlug } })) !== 0;
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
        orderingColumns = [db.Sequelize.literal('leadsCount'), 'DESC'];
        break;
      case 'created':
        orderingColumns = ['createdAt', 'DESC'];
        break;
      default:
        throw new Error('Order parameter is not valid');
    }

    const landings = await db.LandingPage.findAll({
      order: [
        orderingColumns,
      ],
      attributes: {
        include: [[db.Sequelize.fn('COUNT', db.Sequelize.col('leads.id')), 'leadsCount']],
      },
      include: [{
        model: db.Lead, attributes: [],
      }],
      group: ['LandingPage.id'],
    });


    const landingList = landings.map(item => ({
      Id: item.id,
      Name: item.name,
      Slug: item.slug,
      ...hash && { Hash: item.hash },
      Created: format.asString('dd-MM-yyyy hh:mm', item.createdAt),
      Leads: item.dataValues.leadsCount,
    }));

    console.table(landingList);
    return landingList;
  },

  landingAdd: async (args) => {
    const { name, slug, verbose } = { ...args, ...{} };
    if (!name) {
      console.log(chalk.red('⛔️ Name is required for create new landing'));
      return null;
    }
    if (verbose) console.log(chalk.bold('🖍  Create new landing page'));
    const existsLanding = (await db.LandingPage.count({ where: { name } })) !== 0;
    if (existsLanding) {
      console.log(chalk.red(`⛔️ Landing page '${name}' already exists!`));
      return null;
    }

    if (verbose && !slug) console.log(chalk.green(`Create slug for landing: ${name}`));
    const landingSlug = slug || await slugifyWithCheckDb(name, verbose);
    if (verbose && !slug) console.log(chalk.green(`New slug for landing: ${landingSlug}`));

    const existsSlug = (await db.LandingPage.count({ where: { slug } })) !== 0;
    if (existsSlug) {
      console.log(chalk.red(`⛔️ Slug '${landingSlug}' already exists!`));
      return null;
    }


    const publicPath = path.join(__dirname, basePublic, landingSlug);
    const viewPath = path.join(__dirname, baseView, landingSlug);

    if (fs.existsSync(publicPath)) {
      console.log(chalk.red(`⛔️ Public folder '${publicPath}' already exists!`));
      return null;
    }
    if (fs.existsSync(viewPath)) {
      console.log(chalk.red(`⛔️ View folder '${viewPath}' already exists!`));
      return null;
    }

    fs.mkdir(publicPath);
    fs.mkdir(viewPath);

    await fs.copy(path.join(templateFolder, 'img'), path.join(publicPath, 'img'));
    await fs.copy(path.join(templateFolder, 'scripts'), path.join(publicPath, 'scripts'));
    await fs.copy(path.join(templateFolder, 'styles'), path.join(publicPath, 'styles'));

    await fs.copy(path.join(templateFolder, 'views'), viewPath);

    const indexPath = path.join(viewPath, 'index.mustache');
    const data = await fs.readFile(indexPath, 'utf8');
    const result = data.replace('{{form}}', `./${landingSlug}/form`);

    await fs.writeFile(indexPath, result, 'utf8');

    const landing = await db.LandingPage.create({ name, slug: landingSlug });
    console.log(chalk.green('✅ Landing Page created correctly'));
    console.log(chalk.green(`\tName:\t'${landing.name}'`));
    console.log(chalk.green(`\tSlug:\t'${landingSlug}'`));
    console.log(chalk.green(`\tName:\t'${landing.hash}'`));
    return landing;
  },
  landingRemove: async (args) => {
    const { name, slug, id } = { ...args, ...{} };
    if (!name && !slug && !id) {
      console.log(chalk.red('⛔️ name or slug or id is mandatory for delete landing'));
      return;
    }

    const where = {
      ...name && { name },
      ...slug && { slug },
      ...id && id,
    };
    const landing = await db.LandingPage.findOne({ where });
    if (!landing) {
      console.log(chalk.red('⛔️ landing is not found'));
      return;
    }

    const publicPath = path.join(__dirname, basePublic, landing.slug);
    const viewPath = path.join(__dirname, baseView, landing.slug);

    await fs.remove(publicPath);
    await fs.remove(viewPath);
    await landing.destroy();
  },
};
