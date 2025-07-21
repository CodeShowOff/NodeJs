const fs = require('fs');

// Write:
// const book = {
//     title: "How to Win Friends and Influence People",
//     author: "Dale Carnegie"
// };

// const bookJSON = JSON.stringify(book);
// fs.writeFileSync('Books.json', bookJSON);



// Read:
const dataBuffer = fs.readFileSync('Books.json'); // returns buffer data not string

// convert to string:
const dataJSON = dataBuffer.toString();
console.log(dataJSON);

// parse to object:
const data = JSON.parse(dataJSON);

console.log(data);
