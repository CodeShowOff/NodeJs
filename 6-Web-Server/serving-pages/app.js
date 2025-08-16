import express from 'express';
import url from 'url';
import path from 'path';

//  Path cant be relative path here, it has to be an absolute path:

console.log('current file path url: ', import.meta.url); // file:///C:/Users/shukr/Desktop/Node%20J S/6-Web-Server/src/app-2.js

const __filename = url.fileURLToPath(import.meta.url);  // <- has the current file path
const __dirname = path.dirname(__filename); // has current directory path

console.log('__filename: ', __filename); // C:\Users\shukr\Desktop\Node JS\6-Web-Server\src\app-2.js
console.log('__dirname: ', __dirname); // C:\Users\shukr\Desktop\Node JS\6-Web-Server\src



const app = express();

// now for the path of an html file inside public directory:
const filePath = path.resolve(__dirname, '../public/index.html');
console.log('filePath: ', filePath); // C:\Users\shukr\Desktop\Node JS\6-Web-Server\public\index.html


app.get('', (req, res) => {  // <- this is a route handler
    res.sendFile(filePath);
})



// Start the server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
