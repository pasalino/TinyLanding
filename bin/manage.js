#!/usr/bin/env node
const chalk = require('chalk');
const landingList = require('./landingList');
const landingAdd = require('./landingAdd');
const leads = require('./leads');

const yargs = require('yargs').usage(chalk.underline(`Manage landing and leads in ${chalk.bold('TinyLanging')}`))
  .showHelpOnFail(true)
  .help(
    'help',
    'Show usage instructions.',
  )
  .command('list', 'List of all landing', () => {}, landingList)
  .command('add [name]', 'Add new landing page', (args) => {
    args
      .positional('name', {
        alias: 'n',
        describe: 'Name of landing page',
      })
      .option('slug', {
        describe: 'Slug for landing',
      })
      .option('v', {
        alias: 'verbose',
        describe: 'Verbose mode',
      })
      .demandOption(['name']);
  }, landingAdd)
  .command('remove', 'Remove landing page', () => {
  }, landingAdd)
  .command('leads', 'Manage leads for landing page', () => {
  }, leads)
  .demandCommand(1, chalk.red('You need at least one command before moving on'))
  .alias('help', 'h');

const commands = yargs.getCommandInstance().getCommands();
const { argv } = yargs;
if (!argv._[0] || commands.indexOf(argv._[0]) === -1) {
  console.log(`\n${chalk.bgRed(' You need at least one command before moving on ')}\n`);
  process.exit(1);
}
