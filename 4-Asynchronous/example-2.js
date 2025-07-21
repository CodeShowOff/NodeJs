console.log('Start');

setTimeout(() => {
    console.log('Timer Done');
    // This runs while 'await' is paused — 
    // because 'await' yields control back to the event loop.
}, 0);

const response = await fetch('https://jsonplaceholder.typicode.com/posts/1');
const data = await response.json();
// 'await' pauses execution here, allowing the event loop to handle other tasks. It isn't blocking like ther synchronous tasks. So, its asynchronous.
// So, while this is waiting, setTimeout's console.log() executes and prints 'Timer Done' in console.


console.log('Fetched Data:', data.title);
console.log('End');

// Expected Output:
// Start
// Timer Done    <-- This runs while awaiting fetch
// Fetched Data: ...
// End


/*
💡 Explanation:
The key difference here is the use of await, which pauses the current function execution but does not block the JavaScript event loop. 
This allows the setTimeout callback to execute even while waiting for the fetch to resolve.
*/