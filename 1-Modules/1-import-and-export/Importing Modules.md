**CommonJS** syntax in your code, which is typical for Node.js environments:

```js
const fs = require('fs');

fs.writeFileSync('notes.txt', 'Hii this is a file in notes-app');
```

This works perfectly if you're running the script with Node.js (like `node yourscript.js`).

---

If you want to use **ES6 module** syntax instead (for example, in a modern project using `type: "module"` in `package.json`), you would do this:

```js
import fs from 'fs';

fs.writeFileSync('notes.txt', 'Hii this is a file in notes-app');
```

**Important differences:**

1. To use `import`/`export`, either:

   * Name your file with a `.mjs` extension, or
   * Set `"type": "module"` in your `package.json`.

2. CommonJS (`require`) is the default in older Node.js versions and projects.

Let me know if you want to mix both types or switch a whole project to ES6 modules — I can guide you through that.
