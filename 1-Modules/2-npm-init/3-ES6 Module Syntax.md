### ES Module syntax:

```js
import validator from "validator";

console.log(validator.isEmail("shujais@gmail.com"));
```

### 📝 Make sure:

- Your file is either using the `.mjs` extension **OR** you have `"type": "module"` in your `package.json`.

### Add `"type": "module"` to your `package.json`

Go to your `package.json` and update it like this:

```json
{
  "name": "0-npm-init",
  "version": "1.0.0",
  "description": "",
  "main": "app.js",
  "type": "module",           <-- ✅ Add this line
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "dependencies": {
    "validator": "^13.9.0"
  }
}
```

---

### 🔍 Why this matters:

Node.js has two module systems:

- **CommonJS** (`require`) – default in `.js` files without `"type": "module"`
- **ES Modules** (`import`) – only enabled if:

  - The file ends in `.mjs`, or
  - `package.json` contains `"type": "module"`

Right now, Node is auto-detecting your use of `import` and **re-parsing** the file, which works but shows a warning and adds overhead.

---

### 📦 `"type": "module"` in `package.json` applies to **all `.js` files in that project** — it tells Node.js:

> “Treat `.js` files as ES modules (i.e., using `import`/`export`), not CommonJS.”

### 🔹 So to clarify:

If you set this in **your project's** `package.json`:

```json
{
  "type": "module"
}
```

Then **all `.js` files** in that folder (and its subfolders) will:

- Be parsed as **ES modules**
- Allow syntax like `import ... from '...'` and `export ...`

---

### 🔸 Without `"type": "module"`:

- Node assumes `.js` files are **CommonJS** (so only `require()` and `module.exports` work).
- To use ES Modules, you'd have to rename your files to `.mjs`.

---

### ✅ If you're using CommonJS (`require` syntax):

If you're **not** using ES Modules, then the equivalent CommonJS version is:

```js
const validator = require("validator");

console.log(validator.isEmail("shujais@gmail.com"));
```

You're getting that warning because Node.js detects **ES module syntax** (`import`) in your file, but your `package.json` doesn’t explicitly say you're using ES modules.

---
