if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = 'production';
}

const getLeads = require('./getLeads');
const fs = require('mz/fs');
const Json2csvParser = require('json2csv').Parser;

const fields = ['Created At', 'Name', 'Surname', 'Company', 'Email', 'Phone', 'Message'];
const opts = { fields };

module.exports = async (args) => {
  const leadsList = await getLeads(args.slice(1));
  try {
    const parser = new Json2csvParser(opts);
    const csv = parser.parse(leadsList);
    await fs.writeFile(args[0], csv, 'utf8');
  } catch (err) {
    console.error(err);
  }
};
