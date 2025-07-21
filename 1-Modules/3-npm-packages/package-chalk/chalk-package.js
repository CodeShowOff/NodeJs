// Printing colored text in the console using the 'chalk' package

import chalk from 'chalk';

// Prints yellow text
console.log(chalk.yellow('Hello mf'));

// Prints yellow text with inverted background and foreground colors
console.log(chalk.yellow.inverse('Hello mf'));

// Prints yellow text with a blue background and inverted colors
console.log(chalk.yellow.inverse.bgBlue('Hello mf')); 

console.log(chalk.red.bold('Hello mf')); 