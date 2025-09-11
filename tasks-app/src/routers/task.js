import express from 'express';
import Task from '../models/task.js';
import auth from '../middleware/auth.js';


const router = new express.Router();

// Create task
router.post('/tasks', auth, async (req, res) => {
    try {
        const task = new Task({
            ...req.body,
            owner: req.user._id
        });
        const result = await task.save();
        res.status(201).send(result);
    } catch (err) {
        res.status(400).send({ error: err.message });
    }
});

/*
// View all created tasks by me
router.get('/tasks', auth, async (req, res) => {
    // way-1:
    try {
        const tasks = await Task.find({ owner: req.user._id });
        res.send(tasks);
    } catch (err) {
        res.status(500).send({ error: 'Server error' });
    }

    // way-2:
    try {
        await req.user.populate('tasks');
        res.send(req.user.tasks);
    } catch (err) {
        res.status(500).send({ error: 'Server error!' });
    }
});
*/


// View tasks (filtered)
router.get('/tasks', auth, async (req, res) => {
    const match = {};
    const sort = {};

    if(req.query.completed){
        match.completed = req.query.completed === 'true' ? true : false;
    }

    if(req.query.sort){
        const parts = req.query.sort.split(':');
        sort[parts[0]] = parts[1] === 'desc' ? -1 : 1;
    }

    try {
        await req.user.populate({
            path: 'tasks',
            match,
            options: {
                limit: parseInt(req.query.limit), // no of items to list
                skip: parseInt(req.query.skip), // no of items to skip
                sort
            }
        });
        res.send(req.user.tasks);
    } catch (err) {
        res.status(500).send({ error: 'Server error!' });
    }
})



// View task by Id created by me
router.get('/tasks/:id', auth, async (req, res) => {
    const _id = req.params.id;

    try {
        const task = await Task.findOne({ _id, owner: req.user._id });

        if (!task)
            return res.status(404).send({ error: 'tasks not found!' });

        res.send(task);
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
})


// Update a task by id
router.patch('/tasks/:id', auth, async (req, res) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = ['description', 'completed'];
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update));

    if (!isValidOperation) return res.status(400).send({ error: 'Invalid updates!' })

    try {
        const _id = req.params.id;
        const task = await Task.findOne({ _id, owner: req.user._id});
        if (!task)
            return res.status(404).send({ error: 'Task not found!' });

        updates.forEach((update) => task[update] = req.body[update]);
        await task.save();

        res.send(task);
    } catch (err) {
        res.status(400).send({ error: err.message });
    }
});


// Delete a task by id
router.delete('/tasks/:id', auth, async (req, res) => {
    try {
        const _id = req.params.id;
        const task = await Task.findOneAndDelete({ _id, owner: req.user._id });
        if (!task) return res.status(400).send({ error: 'Task not found!' });

        res.send(task);
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
});


export default router;