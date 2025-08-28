// async-await example in tasks-app:

import '../src/db/mongoose.js';
import Task from '../src/models/task.js';


const updateStatusAndCount = async (id, completed) => {
    await Task.findByIdAndUpdate(id, { completed });
    const count = await Task.countDocuments({ completed });
    return count;
}

try {
    const count = await updateStatusAndCount('68af95dfeacc9b454a670acd', true);
    console.log(count);
} catch (error) {
    console.log(error)
}