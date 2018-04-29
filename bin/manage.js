#!/usr/bin/env node

if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = 'production';
}

const chalk = require('chalk');
const { landingList, landingAdd } = require('./landing');
const leads = require('./leads');

const yargs = require('yargs').usage(chalk.underline(`Manage landing and leads in ${chalk.bold('TinyLanging')}`))
  .showHelpOnFail(true)
  .help(
    'help',
    'Show usage instructions.',
  )
  .command('landing', 'List of all landing', (args) => {
    args
      .option('hash', {
        describe: 'Show Hash in result table',
        type: 'boolean',
      })
      .option('order', {
        alias: 'o',
        describe: 'Ordering column',
        default: 'created',
        choices: ['name', 'created', 'leads'],
      })
      .strict();
  }, landingList)
  .command('add-landing [name]', 'Add new landing page', (args) => {
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
      .strict()
      .demandOption(['name']);
  }, landingAdd)
  .command('remove-landing', 'Remove landing page', () => {
  }, landingAdd)
  .command('leads', 'Show leads for landing page', (args) => {
    args
      .option('name', {
        alias: 'n',
        type: 'string',
        conflicts: ['slug', 'id'],
        describe: 'Landing name of leads',
      })
      .option('slug', {
        alias: 's',
        type: 'string',
        conflicts: ['id', 'name'],
        describe: 'Landing slug of leads',
      })
      .option('id', {
        type: 'number',
        conflicts: ['slug', 'name'],
        describe: 'Landing id of leads',
      })
      .option('file-path', {
        alias: 'f',
        type: 'string',
        describe: 'Path for export in csv',
      })
      .option('order', {
        alias: 'o',
        type: 'string',
        default: 'created-desc',
        choices: ['created', 'created-desc'],
        describe: 'Ordering column',
      })
      .option('limit', {
        type: 'number',
        default: 100,
        describe: 'Leads limit (-1) for all',
      })
      .strict();
  }, leads)
  .demandCommand(1, chalk.red('You need at least one command before moving on'))
  .alias('help', 'h');

const commands = yargs.getCommandInstance().getCommands();
const { argv } = yargs;
if (!argv._[0] || commands.indexOf(argv._[0]) === -1) {
  console.log(`\n${chalk.bgRed(' You need at least one command before moving on ')}\n`);
  process.exit(1);
}
