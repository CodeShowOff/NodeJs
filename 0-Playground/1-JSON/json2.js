// Example-1:
// const pet = {
//     name: 'tommy'
// }

// console.log(pet); // { name: 'tommy' }
// console.log(JSON.stringify(pet)); // {"name":"tommy"}



// Example-2:
// const pet = {
//     name: 'tommy'
// }

// pet.toJSON = function() { 
//     console.log(this); // { name: 'tommy', toJSON: [Function (anonymous)] }
//     return this;
// }

// console.log(JSON.stringify(pet)); // {"name":"tommy"}
// this means JSON.stringify() call toJSON internally



// Example-3:
const pet = {
    name: 'tommy'
}

pet.toJSON = function () {
    return {}
}

console.log(JSON.stringify(pet)); // {}
