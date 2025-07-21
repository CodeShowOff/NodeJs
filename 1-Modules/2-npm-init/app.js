/*
Initialized the project with `npm init`
Installed the validator package using `npm install validator`  <- you have to run this command again before running this file.
This created a `package-lock.json` file and added a "dependencies" section in `package.json`
which includes all installed packages and their versions.
*/

// Since we're using ES6 module syntax (`import`), we need to add `"type": "module"`
// to the `package.json` file to let Node.js know we're using ES modules.

import validator from 'validator';

console.log(validator.isEmail('shujais@gmail.com')); // true if the email is valid


// For more details, refer to the validator package documentation on the npm website.






// --- Old CommonJS syntax ---
// const validator = require('validator');
// console.log(validator.isEmail('shujais@gmail.com'));