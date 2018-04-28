if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = 'production';
}

require('console.table');
const getLeads = require('./getLeads');

module.exports = async (args) => {
  const leadsList = await getLeads(args);
  console.table(leadsList);
};
