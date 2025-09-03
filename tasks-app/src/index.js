import express from 'express';
import './db/mongoose.js';
import userRouter from './routers/user.js';
import taskRouter from './routers/task.js'

const app = express();

// Express middleware:
// Without middleware: new request -> run route handler

// With middleware: new request -> do something -> run route handler

/*
// express middleware for maintainance mode:
app.use((req, res, next) => {
    res.send('Site is currently down. We are in maintainance mode. Check back soon!')
}) 

// now we couldn't use middleware for authentication here as we used for maintainance mode, otherwise it will run with every request but we dont want it to run with 'create-user' and 'login'.
// So, we'll pass widdleware to specific route-handler before which we want it to run.
*/
 

app.use(express.json()); // it will automatically parse incoming json to an object
// Use these routers:
app.use(userRouter);
app.use(taskRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});