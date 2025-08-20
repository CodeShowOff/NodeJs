const greeter = (name = 'user') => {
    console.log('Hello' + name);    
}

greeter('shubham'); // Hello shubham
greeter(); // Hello user



// In case of destructuring:
const transactions = (type, {label, stock} = {}) => {
    console.log(type, label, stock);
    
}

transactions('order') // order undefined undefined




const transactions2 = (type, {label, stock = 0} = {}) => {
    console.log(type, label, stock);
    
}

transactions2('order') // order undefined 0