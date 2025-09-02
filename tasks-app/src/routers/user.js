import express from 'express';
import User from '../models/user.js';
import auth from '../middleware/auth.js';

const router = new express.Router();

// Create user (sign-up)
router.post('/users', async (req, res) => {
    try {
        const user = new User(req.body);
        const result = await user.save();
        const token = await user.generateAuthToken();
        res.status(201).send({ result, token }); // 201 = Created
    } catch (err) {
        res.status(400).send({ error: err.message });
    }
});


router.post('/users/login', async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password); // <- custom
        const token = await user.generateAuthToken();
        res.send({ user, token });
    } catch (err) {
        res.status(400).send({ error: err.message });
    }
})

/* We are commenting out this route because we dont want anyone to access all users data, it was just for learning purpose i.e. to view all users.
// Read users
router.get('/users', auth, async (req, res) => {
    try {
        const users = await User.find();
        res.send(users);
    } catch (err) {
        res.status(500).send({ error: 'Server error' });
    }
});
*/


// Get your own profile:
router.get('/users/me', auth, async (req, res) => {
    res.send(req.user); // we created this 'req.user' in our auth.js file
});


// Find users by Id:
router.get('/users/:id', auth, async (req, res) => {
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
router.patch('/users/:id', auth, async (req, res) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = ['name', 'age', 'password'];
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update));

    if (!isValidOperation) return res.status(400).send({ error: 'Invalid updates!' });

    try {
        const _id = req.params.id;

        // before using middleware in mongoose:
        // const user = await User.findByIdAndUpdate(_id, req.body, { new: true, runValidators: true });

        // after using middleware in mongoose:
        // we have to do this way because we have applied middleware on 'save' i.e. to do something before saving a user.
        // as findByIdAndUpdate() bypasses mongoose, it performs a direct operation on database thats why we even have to set a special option for running a validators as "runValidators: true"
        // refer to "9-Mongoose/notes/note-1.md"
        // So now we'll update using more traditional mongoose way so that the middleware runs correctly:

        const user = await User.findById(_id);
        updates.forEach( (update) => user[update] = req.body[update]);
        await user.save();        

        if (!user)
            return res.status(404).send({ error: 'User not found!' });

        res.send(user);
    } catch (err) {
        res.status(400).send({ error: err.message });
    }
});


// Delete users
router.delete('/users/:id', auth, async (req, res) => {
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