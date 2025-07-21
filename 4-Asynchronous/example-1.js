console.log('Start');

setTimeout(() => {
    console.log('Timer Done');
    // Although the delay is 0 ms, this gets pushed to the event loop (macro-task queue).
    // It will only execute after all synchronous code has finished running.
}, 0);

console.log('End');
console.log('End');
console.log('End');
console.log('End');

// Expected Output:
// Start
// End
// End
// End
// End
// Timer Done  <-- Runs last, after all synchronous logs.

/*
💡 Explanation:
Even with a 0ms delay, setTimeout is asynchronous and does not run immediately. It waits until all synchronous 
code is complete, then the callback is executed via the event loop.
*/