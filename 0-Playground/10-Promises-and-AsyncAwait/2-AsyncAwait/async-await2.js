const add = (a, b) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(a + b);
        }, 2000);
    })
}

console.log("A");

const doWork = async () => {
    console.log('First Execution Started');
    const sum = await add(1, 90);
    console.log('Fisrt Execution Completed', sum);
    
    console.log('Second Execution Started');    
    const sum2 = await add(sum, 50);
    console.log('Second Execution Completed', sum2);
    return sum2;
}

console.log("B");

const result = await doWork();
console.log(result);

console.log("C");

/*
Output:
A
B
First Execution Started
Fisrt Execution Completed 91
Second Execution Started
Second Execution Completed 141
141
C
*/