const name = process.argv[2] || "Guest";
const hii = "Shubham"

function greet(user) {
    const message = `Hello, ${user}!`;
    return message;
}

const result = greet(name);
console.log(result);
