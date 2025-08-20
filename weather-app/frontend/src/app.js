import express from 'express';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

import getWeather from './temp-backend/app.js'; 


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
    res.render('index', { title: 'Home Page', name: 'Weather App' });
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


app.get('/weather', async (req, res) => {
    if(!req.query.address) {
        return res.send({
            error: 'You must provide an address!'
        })
    }

    const weatherData = await getWeather(req.query.address);
    res.send(weatherData);
})


app.get('/help/*otherHelp', (req, res) => {
    res.render('404page', {
        title: '404',
        name: 'John Doe',
        errorMessage: 'Help article not found.'
    });
})

app.get('/*others', (req, res) => { 
    res.render('404page', {
        title: '404',
        name: 'John Doe',
        errorMessage: 'Page not found.'
    });
})


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});