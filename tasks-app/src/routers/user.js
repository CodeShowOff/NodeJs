import express from 'express';
import multer from 'multer';
import sharp from 'sharp';
import User from '../models/user.js';
import auth from '../middleware/auth.js';
import sendMail from '../emails/accounts.js';


const router = new express.Router();


// Create user (sign-up)
router.post('/users', async (req, res) => {
    try {
        const user = new User(req.body);
        const result = await user.save();

        sendMail.sendWelcomeEmail(user.email, user.name);

        const token = await user.generateAuthToken();
        res.status(201).send({ user: result, token }); // 201 = Created
    } catch (err) {
        res.status(400).send({ error: err.message });
    }
});

// User login
router.post('/users/login', async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password); // <- custom
        const token = await user.generateAuthToken();
        // res.send({ user: await user.getPublicProfile(), token });
        res.send({ user: user, token });
    } catch (err) {
        res.status(400).send({ error: err.message });
    }
})

/* We dont want anyone to access all users data, it was just for learning purpose i.e. to view all users.
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


// logout from this session
router.post('/users/logout', auth, async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token !== req.token;
        })
        await req.user.save();
        res.send()
    } catch (err) {
        res.status(500).send();
    }
});


// logout from everywhere
router.post('/users/logoutAll', auth, async (req, res) => {
    try {
        req.user.tokens = [];
        await req.user.save();
        res.send();
    } catch (err) {
        res.status(500).send();
    }
});


// Get your own profile:
router.get('/users/me', auth, async (req, res) => {
    res.send(req.user); // we created this 'req.user' in our auth.js file
});


/* Not required
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
*/

/* We dont want to update a user using its user-id
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
*/


// Update users
router.patch('/users/me', auth, async (req, res) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = ['name', 'age', 'password'];
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update));

    if (!isValidOperation) return res.status(400).send({ error: 'Invalid updates!' });

    try {
        updates.forEach((update) => req.user[update] = req.body[update]);
        await req.user.save();

        res.send(req.user);
    } catch (err) {
        res.status(400).send({ error: err.message });
    }
});



/* We dont want to delete a user using its user-id
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
*/


// Delete users
router.delete('/users/me', auth, async (req, res) => {
    try {
        await User.findByIdAndDelete(req.user._id);
        sendMail.sendCancelEmail(req.user.email, req.user.name);
        res.send(req.user);
    } catch (err) {
        res.status(400).send({ error: err.message });
    }
});


// Files Upload
const upload = multer({
    // dest: 'avatars/',
    limits: {
        fileSize: 1000000
    },
    fileFilter(req, file, callback) {
        if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
            return callback(new Error("Please upload an image!"));
        }
        callback(undefined, true); // accept file
    }
});

// Set avatar
router.post('/users/me/avatar', auth, upload.single('avatar'), async (req, res) => {
    const buffer = await sharp(req.file.buffer)
                        .resize({ width: 250, height: 250 })
                        .png()
                        .toBuffer();

    req.user.avatar = buffer; // store image buffer with user data in database
    await req.user.save();

    res.send();
}, (error, req, res, next) => {
    res.status(400).send({ error: error.message });
});


// Delete avatar
router.delete('/users/me/avatar', auth, async (req, res) => {
    req.user.avatar = undefined;
    await req.user.save();

    res.send();
})


// Get avatar
router.get('/users/:id/avatar', async (req, res) => {
    try {
        const user = await User.findById(req.params.id);

        if(!user || !user.avatar){
            throw new Error('User or avatar not found!');
        }

        res.set('Content-Type', 'image/png')
        res.send(user.avatar);
    } catch (error) {
        res.status(404).send({ error: error.message });
    }
})

export default router;