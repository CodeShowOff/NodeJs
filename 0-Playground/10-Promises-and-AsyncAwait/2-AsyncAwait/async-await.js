// const doWork = async () => {

// }

// console.log(doWork()); // undefined <- without async keyword
// console.log(doWork()); // Promise { undefined } <- with async keyword



// const doWork = async () => {
//     return 'Shubham';
// }

// console.log(doWork()); // Shubham <- without async keyword
// console.log(doWork()); // Promise { 'Shubham' } <- with async keyword



const doWork = async () => {
    return 'Shubham';
}

doWork().then((value) => {
    console.log(value); // Shubham
}).catch((err) => {
    console.log(err);
})
