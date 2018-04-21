const chalk = require('chalk');

const Log = message => console.log(`[${new Date().toLocaleString()}] `, message);
const Tip = message => console.log(chalk.yellow.bold(`[${new Date().toLocaleString()}] `, message));
const Error = message => console.log(chalk.red(`[${new Date().toLocaleString()}] `, message));

module.exports = { Log, Tip, Error };
