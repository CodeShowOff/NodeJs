Running a local web server for Node.js learning is pretty straightforward — you can do it in two main ways:
**(1) Pure Node.js with the built-in `http` module**, or
**(2) Using a framework like Express** (which is common for beginners).

Here’s both approaches so you can pick one:

---

## **1. Quick Barebones Node.js Server**

1. Create a new folder for your project:

   ```bash
   mkdir my-node-server
   cd my-node-server
   ```

2. Initialize it with `npm`:

   ```bash
   npm init -y
   ```

3. Create a file called `server.js`:

   ```javascript
   const http = require('http');

   const server = http.createServer((req, res) => {
     res.statusCode = 200;
     res.setHeader('Content-Type', 'text/plain');
     res.end('Hello, Node.js learner!');
   });

   server.listen(3000, () => {
     console.log('Server running at http://localhost:3000/');
   });
   ```

4. Run it:

   ```bash
   node server.js
   ```

5. Open your browser and visit:

   ```
   http://localhost:3000
   ```

---

## **2. Using Express (Easier for Bigger Projects)**

1. Create a folder and initialize:

   ```bash
   mkdir my-express-server
   cd my-express-server
   npm init -y
   ```

2. Install Express:

   ```bash
   npm install express
   ```

3. Create `server.js`:

   ```javascript
   const express = require('express');
   const app = express();
   const PORT = 3000;

   app.get('/', (req, res) => {
     res.send('Hello from Express!');
   });

   app.listen(PORT, () => {
     console.log(`Server running at http://localhost:${PORT}`);
   });
   ```

4. Run it:

   ```bash
   node server.js
   ```

---

💡 **Tips for Easier Development**

* Install **nodemon** to restart automatically when you save changes:

  ```bash
  npm install --global nodemon
  nodemon server.js
  ```
* You can change the port if 3000 is taken by setting `PORT` in the code.

---

If you want, I can also show you **how to serve HTML, CSS, and JS files locally** so you can practice front-end + Node.js together. That’s often the next step after getting “Hello World” running. Would you like me to set that up for you?
