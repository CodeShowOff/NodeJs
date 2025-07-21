console.log("starting");

setTimeout(() => {
    console.log("2-sec-timer");    
}, 2000)


setTimeout(() => {
    console.log("0-sec-timer");    
}, 0)

console.log("stopping");


// Output:
//     starting
//     stopping
//     0 - sec - timer
//     2 - sec - timer
