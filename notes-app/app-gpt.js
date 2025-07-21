import { Command } from 'commander';
import { readFileSync, writeFileSync } from 'fs';
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
        const notes = loadNotes();
        notes.push({ title: options.title, body: options.body });
        saveNotes(notes);
        console.log('Note added!');
    });

program
    .command('list')
    .description('List all notes')
    .action(() => {
        const notes = loadNotes();
        notes.forEach((note, index) => {
            console.log(`${index + 1}. ${note.title}: ${note.body}`);
        });
    });

function loadNotes() {
    try {
        const data = readFileSync('notes.json', 'utf-8');
        return JSON.parse(data);
    } catch (e) {
        return [];
    }
}

function saveNotes(notes) {
    writeFileSync('notes.json', JSON.stringify(notes, null, 2));
}

program.parse(process.argv);
