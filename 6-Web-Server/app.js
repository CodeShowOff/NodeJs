import express from 'express';

const app = express();

// example:
// app.com
// app.com/help
// app.com/about

app.get('', (req, res) => {
    res.send("Hello express!");
})

app.get('/help', (req, res) => {
    res.send('Help page')
})

app.get('/about', (req, res) => {
    res.send('<h1>About page</h1>')
})

app.get('/weather', (req, res) => {
    //JSON can be an object ->
    res.send({
        location: 'Delhi',
        temperature: 28
    })

    // or an array ->
    // res.send([{
    //     location: 'Delhi'
    // }, {
    //     temp: 28
    // }])
})

app.listen(3000, () => {
    console.log('Server is up on port 3000.');
})