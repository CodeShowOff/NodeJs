// in app-2.js we learned to serve static web pages.
// now we'll learn about dynamic web page.

// use templete-engine to render dynamic web pages using express:
// templete-engine: ejs 
// ejs will allow us to: 1. render dynamic documents as opposed to static ones.
//                       2. easily create codes that we can reuse across pages.


import express from 'express';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

// Define paths
const publicDirPath = resolve(__dirname, '../public');
const viewsPath = resolve(__dirname, '../views');


// Set EJS as the template engine
app.set('view engine', 'ejs');
app.set('views', viewsPath);


// Serve static files
app.use(express.static(publicDirPath));

// Routes
app.get('/', (req, res) => {
    res.render('index', { title: 'Home Page', name: 'John Doe' });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Page',
        name: "John Doe"
    });
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help Page',
        name: "John Doe"
    });
})


app.get('/help/*otherHelp', (req, res) => {
    res.render('404page', {
        title: '404',
        name: 'John Doe',
        errorMessage: 'Help article not found.'
    });
})

app.get('/*others', (req, res) => { // Use a named wildcard
    res.render('404page', {
        title: '404',
        name: 'John Doe',
        errorMessage: 'Page not found.'
    });
})

// app.use((req, res) => {
//     res.status(404).send('My 404 page');
// });




const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});