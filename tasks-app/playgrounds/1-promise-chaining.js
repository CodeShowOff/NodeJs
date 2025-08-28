// promise chaining example in tasks-app:

import '../src/db/mongoose.js';
import Task from '../src/models/task.js';


// Task.findByIdAndUpdate('68af95dfeacc9b454a670acd', {completed: true})
//     .then((task) => {
//         console.log(task);

//         return Task.find({completed: true});       
//     })
//     .then((tasks) => {
//         console.log(tasks);
//     })
//     .catch((err) => {
//         console.log(err);
//     })



Task.findByIdAndDelete('68b0c6ea547bd409750a4e43').then((task) => {
    console.log(task);

    return Task.countDocuments({completed: true});
}).then((tasks) => {
    console.log(tasks);
}).catch((err) => {
    console.log(err);
})