## 📦 Suggested Improvements

### ✅ 1. Handle duplicate titles

Prevent overwriting notes with the same title.

```js
const duplicate = notes.find(note => note.title === options.title);
if (duplicate) {
    console.log('❌ Note title already exists!');
    return;
}
```

Add this inside your `add` command's `.action()` before pushing the note.

---

### ✅ 2. Add a `remove` command

```js
program
  .command('remove')
  .description('Remove a note by title')
  .requiredOption('-t, --title <title>', 'Note title to remove')
  .action((options) => {
    const notes = loadNotes();
    const filteredNotes = notes.filter(note => note.title !== options.title);
    if (notes.length === filteredNotes.length) {
        console.log('❌ Note not found!');
    } else {
        saveNotes(filteredNotes);
        console.log('✅ Note removed!');
    }
  });
```

Usage:

```bash
node notes.js remove -t="Title"
```

---

### ✅ 3. Add a `read` command

```js
program
  .command('read')
  .description('Read a specific note by title')
  .requiredOption('-t, --title <title>', 'Note title to read')
  .action((options) => {
    const notes = loadNotes();
    const note = notes.find(n => n.title === options.title);
    if (!note) {
        console.log('❌ Note not found!');
    } else {
        console.log(`📝 ${note.title}\n${note.body}`);
    }
  });
```

---

### ✅ 4. Use `chalk` for better CLI output (optional)

Install:

```bash
npm install chalk
```

Then:

```js
const chalk = require('chalk');
console.log(chalk.green('Note added!'));
```

---

## 🧠 What You're Learning

You're building a **modular command-line tool** using:

* `Commander` for argument parsing
* `fs` for file I/O
* Clean separation of logic (load, save, commands)
* Command design patterns (like `add`, `remove`, `read`, `list`)