import express from 'express';
import './db/mongoose.js';
import User from './models/user.js';
import Task from './models/task.js';

const app = express();


app.use(express.json()); // it will automatically parse incoming json to an object

// Create user
app.post('/users', async (req, res) => {
    try {
        const user = new User(req.body);
        const result = await user.save();
        res.status(201).send(result); // 201 = Created
    } catch (err) {
        res.status(400).send({ error: err.message });
    }
});

// Get all users (optional helper route)
app.get('/users', async (req, res) => {
    try {
        const users = await User.find();
        res.send(users);
    } catch (err) {
        res.status(500).send({ error: 'Server error' });
    }
});


app.post('/tasks', async (req, res) => {
    try {
        const task = new Task(req.body);
        const result = await task.save();
        res.status(201).send(result);        
    } catch (error) {
        res.status(400).send({ error: err.message });
    }
});


app.get('/tasks', async (req, res) => {
    try {
        const task = await Task.find();
        res.send(task);
    } catch (err) {
        res.status(500).send({ error: 'Server error' });
    }
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});   