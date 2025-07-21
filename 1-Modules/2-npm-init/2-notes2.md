
## 🧠 Using Scripts in `package.json` – Running Your Project

### 🎬 What Are **npm Scripts**?

In your `package.json`, there’s a `"scripts"` section where you can define **custom commands** to automate tasks like:

* Starting your app
* Running a development server
* Running tests
* Building your app
* Anything else you'd normally do in the terminal

---

### 📝 Example `package.json` with Scripts:

```json
{
  "name": "my-node-app",
  "version": "1.0.0",
  "main": "index.js",
  "scripts": {
    "start": "node index.js",
    "dev": "nodemon index.js",
    "test": "echo \"No tests yet\""
  },
  "dependencies": {
    "express": "^4.18.0"
  }
}
```

---

### 🚀 How to Run Scripts

* To run the `start` script:

  ```bash
  npm start
  ```

  This runs: `node index.js`

* To run the `dev` script (using `nodemon` to auto-restart on file changes):

  ```bash
  npm run dev
  ```

* To run any other script:

  ```bash
  npm run <script-name>
  ```

> ✅ Note: You **must** use `npm run` for all scripts **except** `start` and `test` — those two have shortcuts (`npm start`, `npm test`).

---

### 🛠 Why Scripts Are Useful

* **Automation**: Simplify repetitive tasks (start, build, test).
* **Customization**: You decide what commands run behind each script.
* **Consistency**: Everyone on your team runs the exact same setup.

---

### 📂 Example Project Start Flow

Let’s say your file structure looks like:

```
/my-node-app
  ├── index.js
  ├── package.json
  └── node_modules/
```

1. You define a script in `package.json`:

   ```json
   "start": "node index.js"
   ```

2. You start your project by running:

   ```bash
   npm start
   ```

3. This executes your **entry point** script (`index.js`), which can start a server, run logic, etc.

---

## 🧩 Summary

| Concept       | Explanation                                               |
| ------------- | --------------------------------------------------------- |
| `scripts`     | Automate tasks in your project (start, dev, test, etc.)   |
| `npm start`   | Runs the script under `"start"` (usually starts your app) |
| `npm run xyz` | Runs any custom script you defined as `"xyz"`             |
| Entry point   | Usually `index.js`, launched by your script               |
---