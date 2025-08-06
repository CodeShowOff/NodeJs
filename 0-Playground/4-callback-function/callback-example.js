// Callbacks are not necessarily asynchronous. 

// example of asynchronous callback function:
setTimeout(() => {  // <- predefined as asynchronous
    console.log("2 seconds are up.");    
}, 2000)


// example of skynchronous callback function:
const names = ['Shubham', 'Himanshu', 'Jess', 'Ram']
const shortNames = names.filter((name) => {  // <- callback but not asynchronous
    return name.length <= 4;
})