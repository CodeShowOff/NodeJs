import express from 'express';
import Task from '../models/task.js';


const router = new express.Router();

router.post('/tasks', async (req, res) => {
    try {
        const task = new Task(req.body);
        const result = await task.save();
        res.status(201).send(result);
    } catch (err) {
        res.status(400).send({ error: err.message });
    }
});


router.get('/tasks', async (req, res) => {
    try {
        const tasks = await Task.find();
        res.send(tasks);
    } catch (err) {
        res.status(500).send({ error: 'Server error' });
    }
});


router.patch('/tasks/:id', async (req, res) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = ['description', 'completed'];
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update));

    if(!isValidOperation) return res.status(400).send({error: 'Invalid updates!'})

    try {
        const _id = req.params.id;
        const task = await Task.findByIdAndUpdate(_id, req.body, { new: true, runValidators: true });     

        if (!task)
            return res.status(404).send({ error: 'Task not found!' });

        res.send(task);   
    } catch (err) {
        res.status(400).send({error: err.message});
    }
});


router.delete('/tasks/:id', async (req, res) => {
    try {
        const _id = req.params.id;
        const task = await Task.findByIdAndDelete(_id);
        
        if(!task) return res.status(400).send({error: 'Task not found!'});

        res.send(task);
    } catch (err) {
        res.status(500).send({ error: err.message});
    }
});


export default router;