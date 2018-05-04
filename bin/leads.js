require('console.table');
const db = require('../app/db/models/index');

require('console.table');
const chalk = require('chalk');
const format = require('date-format');
const fs = require('mz/fs');
const Json2csvParser = require('json2csv').Parser;

module.exports = async (args) => {
  const {
    name, slug, id, f, order, limit,
  } = args;
  console.log(args);

  if (!Number.isInteger(limit)) {
    console.log(chalk.red('Limit parameter must be a number'));
    return;
  }

  let orderColumn = null;

  switch (order) {
    case 'created':
      orderColumn = ['createdAt', 'ASC'];
      break;
    default:
      orderColumn = ['createdAt', 'DESC'];
      break;
  }

  let message = null;
  let where = {};
  if (name) {
    where = { name };
    message = `⚠️ No landing in database whit name ${name}`;
  } else if (slug) {
    where = { slug };
    message = `⚠️ No landing with slug '${slug}'`;
  } else if (id) {
    where = { id };
    message = `⚠️ No landing with id ${id}`;
  }

  const landing = (await db.LandingPage.findOne({ where, order: [['id']] }));
  if (landing === null) {
    console.log(chalk.yellow(message));
    return;
  }

  const leads = await db.Lead.findAll({
    where: { LandingPageId: landing.id },
    order: [orderColumn],
    ...limit !== -1 && { limit },
  });

  if (leads.length === 0) {
    console.log(chalk.yellow(`⚠️ No leads for landing ${landing.name}`));
  }
  const leadsTable = leads.map(item => ({
    Created: format.asString('dd-MM-yyyy hh:mm', item.createdAt),
    Name: item.name,
    Surname: item.surname,
    Company: item.company,
    Email: item.email,
    Phone: item.phone,
    Message: f ? item.message : (item.message || '').substr(0, 20),
  }));

  if (f) {
    const fields = ['Created', 'Name', 'Surname', 'Company', 'Email', 'Phone', 'Message'];
    const opts = { fields };
    try {
      const parser = new Json2csvParser(opts);
      const csv = parser.parse(leadsTable);
      await fs.writeFile(f, csv, 'utf8');
    } catch (err) {
      console.error(chalk.red(err));
    }
  } else {
    console.log(chalk.bold(chalk.underline(`\nLeads for ${landing.name} landing page`.toUpperCase())));
    console.table(leadsTable);
  }
};
