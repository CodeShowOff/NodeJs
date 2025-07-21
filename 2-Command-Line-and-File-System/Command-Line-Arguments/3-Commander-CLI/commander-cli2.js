const { Command } = require('commander');
const program = new Command();

program
    .name('notes')
    .description('A CLI notes app')
    .version('1.0.0');

program
    .command('add')
    .description('Add a new note')
    .requiredOption('-t, --title <title>', 'Note title')
    .requiredOption('-b, --body <body>', 'Note body')
    .action((options) => {
        console.log('Adding Notes...\n Notes title: ', options.title, '\n Notes body: ', options.body);
        console.log('Note added!');
    });

program
    .command('list')
    .description('List all notes')
    .action(() => {
        console.log('Your notes:');
    });


program.parse(process.argv);
