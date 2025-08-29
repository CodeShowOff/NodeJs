import express from 'express';
import './db/mongoose.js';
import userRouter from './routers/user.js';
import taskRouter from './routers/task.js'

const app = express();


app.use(express.json()); // it will automatically parse incoming json to an object

// Use these routers:
app.use(userRouter);
app.use(taskRouter);


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});   