// This is a modern way:

import { Command } from 'commander';
const program = new Command();

program
    .name('notes')
    .description('A simple CLI notes app')
    .version('1.0.0');

program
    .command('add')
    .description('Add a new note')
    .argument('<title>', 'Note title')
    .argument('<body>', 'Note body')
    .action((title, body) => {
        console.log(`Adding note: ${title}`);
        console.log(`Content: ${body}`);
        // here you'd save the note
    });

program
    .command('list')
    .description('List all notes')
    .action(() => {
        console.log('Listing all notes...');
        // here you'd list saved notes
    });

program
    .command('remove')
    .description('Remove a note by title')
    .argument('<title>', 'Note title to remove')
    .action((title) => {
        console.log(`Removing note: ${title}`);
        // here you'd remove the note
    });

program.parse();