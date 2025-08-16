import express from 'express';
import url from 'url';
import path from 'path';

const __filename = url.fileURLToPath(import.meta.url); 
const __dirname = path.dirname(__filename);

console.log('__filename: ', __filename); 
console.log('__dirname: ', __dirname);

const app = express();

// not a modern practice:
// const filePath = path.resolve(__dirname, '../public/index.html');
// console.log('filePath: ', filePath);

// app.get('', (req, res) => {    <- this is a route handler
//     res.sendFile(filePath);
// })


// modern practice:
// Path to the public directory
const publicDirPath = path.resolve(__dirname, '../public'); 

// Serve static files from the public directory
app.use(express.static(publicDirPath));
// so we dont need to add other route-handlers for different routes.


// Start the server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
