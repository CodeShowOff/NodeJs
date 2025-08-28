const add = (a, b) => {
    return new Promise((resolve, reject) => {
        console.log("A");
        
        setTimeout(() => {
            console.log("B");            
            resolve(a + b);
        }, 2000);

        console.log("C");        
    })
}

console.log(add( 3, 4)); // logging it immediately will give : Promise { <pending> }

console.log("D");


// Output:
// A
// C
// Promise { <pending> }
// D
// B