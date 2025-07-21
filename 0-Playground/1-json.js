// Let's understand JSON

// ❓ What is JSON?
// JSON (JavaScript Object Notation) is a format for storing and transporting data.
// It is often used when data is sent from a server to a web page or between applications.


// create an object
const book = {
    title: "How to Win Friends and Influence People",
    author: "Dale Carnegie"
};


// convert object to JSON string
const bookJSON = JSON.stringify(book);  // Converts the JS object to a JSON string
console.log(bookJSON);

// Output will look like:
// {"title":"How to Win Friends and Influence People","author":"Dale Carnegie"}



// convert JSON string back to object
const parsedData = JSON.parse(bookJSON);  // Converts the JSON string back to a JS object
console.log(parsedData);
console.log(parsedData.author);
