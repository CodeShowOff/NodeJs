import Task from '../src/models/task.js';
import User from '../src/models/user.js';

const main = async () => {
    const task = await Task.findById('68b89007522e6092edc4ca76');
    await task.populate('owner');
    console.log(task.owner);

    const user = await User.findById('68b88ef1d1e331ff751d06c8');
    await user.populate('tasks');
    console.log(user.tasks); 
}

main();