const add = (a, b) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if(a < 0 || b < 0) 
                reject('Numbers must be non-negative!');
            resolve(a + b);
        }, 2000);
    })
}

const doWork = async () => {
    const sum = await add(1, 90);
    const sum2 = await add(sum, 50);
    const sum3 = await add(sum2, -20);
    return sum3;
}

doWork().then((result) => {
    console.log(result);
}).catch((err) => {
    console.log(err);
})