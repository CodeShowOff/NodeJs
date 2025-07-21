// Display the full array of command-line arguments
console.log(process.argv); // Gives an array of command-line arguments

// Explanation:
// process.argv[0] is the path to the Node.js executable
// process.argv[1] is the path to the executed file (your script)
// process.argv[2] and onwards are the actual arguments you passed

// Example usage:
// Command: node 1-cmd-line-args.js shubham

// Output:
console.log(process.argv[2]); // Output: shubham


// You can pass more arguments too:
const args = process.argv.slice(2); // Extract only user-passed arguments
console.log("User arguments:", args);

// Example: node 1-cmd-line-args.js shubham 25
// args will be: ['shubham', '25']


// You can use this to determine user intent
if (args.length === 0) {
    console.log("No arguments passed.");
} else {
    console.log(`Hello ${args[0]}!`);
    if (args[1]) {
        console.log(`You are ${args[1]} years old.`);
    }
}