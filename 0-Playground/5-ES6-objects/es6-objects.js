// Object property shorthand:

const name = "Shubham";
const userAge = 23;

const user = {
    // name: name,
    name, 
    age: userAge,
    location: "Philadelphia"
}

console.log(user);




// Object destructuring:

const product = {
    label: "Red Notebook",
    price: 30,
    stock: 120,
    salePrice: NaN
}

// const label = product.label;
// const price = product.price;

const {label, price} = product;

console.log(label);
console.log(price);


const {label: productLabel} = product; // <- renaming while destructuring
console.log(productLabel);


const {label: productLabel2, rating = 5} = product; 
console.log(rating);


function transactions (type, {label, stock}){ // destructuring here itself
    console.log("Inside transaction: ", label, stock);    
}
transactions("order", product);