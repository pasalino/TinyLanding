#!/usr/bin/env node
const chalk = require('chalk');
const landingList = require('./landingList');
const landingAdd = require('./landingAdd');
const leads = require('./leads');

const yargs = require('yargs')
  .usage(chalk.underline(`Manage landing and leads in ${chalk.bold('TinyLanging')}`))
  .showHelpOnFail(true)
  .help(
    'help',
    'Show usage instructions.'
  )
  .command('list', 'List of all landing', (yargs) => {
  }, landingList)
  .command('add [name]', 'Add new landing page', (yargs) => {
    yargs
      .positional('name', {
        alias: 'n',
        describe: 'Name of landing page',
      })
      .option('v', {
        alias: 'verbose',
        default: false,
        describe: 'Verbose mode',
      })
      .demandOption(['name']);
  }, landingAdd)
  .command('remove', 'Remove landing page', (yargs) => {
  }, landingAdd)
  .command('leads', 'Manage leads for landing page', (yargs) => {
  }, leads)
  .demandCommand(1, chalk.red('You need at least one command before moving on'))
  .alias('help', 'h');

const commands = yargs.getCommandInstance().getCommands();
const argv = yargs.argv;
if (!argv._[0] || commands.indexOf(argv._[0]) === -1) {
  console.log(`\n${chalk.bgRed(' You need at least one command before moving on ')}\n`);
  process.exit(1);
}

//
//
// const commands_list = require('./commands.json').commands;
//
// const short_list = commands_list.reduce((map, obj) => {
//     if (!obj.short_name) return map;
//     map[obj.short_name] = obj.name;
//     return map;
// }, {});
//
// let command = require(`${__dirname}/help`);
//
// try {
//     const args_2 = process.argv[2];
//     const command_name = short_list[args_2] ? short_list[args_2] : args_2;
//
//     debug_info(command_name);
//
//     command = require(`${__dirname}/${command_name}`);
// } catch (err) {
//     debug_error("Command not found");
// }
//
// command(process.argv.splice(3)).then(() => {
//     debug_info("Done!");
// });
//
