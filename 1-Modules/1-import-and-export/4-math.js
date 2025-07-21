function add(a, b){
    return a + b
}

function sub(a, b){
    return a - b
}


// we can send like this:
// module.exports = {
//     add,
//     sub
// }

// or we can rename also:
module.exports = {
    addFn : add,
    subFn : sub
}