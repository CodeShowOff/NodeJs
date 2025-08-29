import express from 'express';
import User from '../models/user.js';


const router = new express.Router();

// Create user
router.post('/users', async (req, res) => {
    try {
        const user = new User(req.body);
        const result = await user.save();
        res.status(201).send(result); // 201 = Created
    } catch (err) {
        res.status(400).send({ error: err.message });
    }
});

// Read users
router.get('/users', async (req, res) => {
    try {
        const users = await User.find();
        res.send(users);
    } catch (err) {
        res.status(500).send({ error: 'Server error' });
    }
});


// Find users by Id:
router.get('/users/:id', async (req, res) => {
    try {
        const _id = req.params.id;
        const user = await User.findById(_id);

        if (!user)
            return res.status(404).send({ error: 'User not found!' });

        res.send(user);
    } catch (error) {
        res.status(500).send({ error: 'server error' });
    }
});


// Update users
router.patch('/users/:id', async (req, res) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = ['name', 'age', 'password'];
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update));

    if (!isValidOperation) return res.status(400).send({ error: 'Invalid updates!' });

    try {
        const _id = req.params.id;
        const user = await User.findByIdAndUpdate(_id, req.body, { new: true, runValidators: true });

        if (!user)
            return res.status(404).send({ error: 'User not found!' });

        res.send(user);
    } catch (err) {
        res.status(400).send({ error: err.message });
    }
});


// Delete users
router.delete('/users/:id', async (req, res) => {
    const _id = req.params.id;
    try {
        const user = await User.findByIdAndDelete(_id);
        
        if(!user) return res.status(400).send({error: 'User not found!'});

        res.send(user);
    } catch (err) {
        res.status(400).send({ error: err.message});
    }
});


export default router;