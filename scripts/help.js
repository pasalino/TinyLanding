const debug_info = require("../app/middlewares/logs").debug_info;

module.exports = async (args) => {
    debug_info(`Help`);
    console.log("Manage products in landing: npm run manage COMMAND [ARGS]");
    const commands_list = require('./commands.json').commands;
    commands_list.forEach((item) => {
        let arg_list = '';
        if (item.args) {
            arg_list = ' ' + item.args.map(item => item.name).join(' ');
        }
        console.log(`\t${item.name}${arg_list} - ${item.description}`)
    })
};