import {Command} from 'commander';
import chalk from 'chalk';
import fs from 'fs';

const program = new Command();

program
    .name('notes-app')
    .description('a CLI notes app')
    .version('1.0.0')

program
    .command('add')
    .description('add a new note')
    .requiredOption('-t, --title <title>', 'title for the note')
    .requiredOption('-b, --body <body>', 'body for the note')
    .action((options) => {
        const status = addNote(options.title, options.body);
        if(status) console.log(chalk.bgGreen('Notes added successfully'));        
    })


program
    .command('list')
    .description('list all created notes')
    .action(() => {
        const notes = loadNotes();
        notes.forEach((note, index) => {
            console.log(chalk.bgYellow(` ${index + 1}. ${note.title}: ${note.body} `));
        });
    })


program
    .command('remove')
    .description('remove a note')
    .requiredOption('-t, --title <title>', 'note title to remove')
    .action((options) => {
        const notes = loadNotes();
        const filteredNotes = notes.filter(note => note.title !== options.title);
        if (notes.length === filteredNotes.length) {
            console.log(chalk.bgRed('❌ Note not found!'));
        } else {
            fs.writeFileSync('notes.json', JSON.stringify(filteredNotes));
            console.log(chalk.bgGreen('✅ Note removed!'));
        }
    })


program
    .command('read')
    .description('read a note')
    .requiredOption('-t, --title <title>', 'note title to read')
    .action((options) => {
        const notes = loadNotes();
        const note = notes.find(n => n.title === options.title);
        if (!note) {
            console.log(chalk.bgRed('❌ Note not found!'));
        } else {
            console.log(chalk.bgYellow(`📝 ${note.title} \n${note.body} `));
        }
    })


const addNote = function(title, body){
    const notes = loadNotes();

    const duplicate = notes.find(note => note.title === title);
    if (duplicate) {
        console.log(chalk.bgRed('❌ Note title already exists!'));
        return false;
    }

    notes.push({
        title: title,
        body: body
    })
    // console.log(notes);
    
    fs.writeFileSync('notes.json', JSON.stringify(notes));
    return true;
}

const loadNotes = function(){
    try{
        const dataBuffer = fs.readFileSync('notes.json')
        const dataJSON = dataBuffer.toString();
        const data = JSON.parse(dataJSON);
        return data;
    }catch(e){
        return [];
    }
}

program.parse();