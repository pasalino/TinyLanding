#!/usr/bin/env node
const debug_error = require('../app/middlewares/logs').debug_error;
const debug_info = require('../app/middlewares/logs').debug_info;

const commands_list = require('./commands.json').commands;

const short_list = commands_list.reduce((map, obj) => {
  if (!obj.short_name) return map;
  map[obj.short_name] = obj.name;
  return map;
}, {});

let command = require(`${__dirname}/help`);

try {
  const args_2 = process.argv[2];
  const command_name = short_list[args_2] ? short_list[args_2] : args_2;

  debug_info(command_name);

  command = require(`${__dirname}/${command_name}`);
} catch (err) {
  debug_error('Command not found');
}

command(process.argv.splice(3)).then(() => {
  debug_info('Done!');
});

