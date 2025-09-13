// file name should end with .test.js;

import math from "../src/math.js";

/*
test('Should calculate total with tip', () => {
    const total = math.calculateTip(10, 30);

    if(total != 13)
        throw new Error(`Total should be 13. Got ${total}`);
});
*/

test('Should calculate total with tip', () => {
    const total = math.calculateTip(10, 30);

    expect(total).toBe(13); // 'toBe' checks for equality
})


test('Should calculate total with default tip', () => {
    const total = math.calculateTip(10);

    expect(total).toBe(13);
})


test('Should calculate temp in Celsius', () => {
    const celsius = math.fahrenheitToCelsius(32);
    expect(celsius).toBe(0);
})


test('Should calculate temp in Fahrenheit', () => {
    const fahrenheit = math.celsiusToFahrenheit(0);
    expect(fahrenheit).toBe(32);
})


// Working with async functions:
/*
test('Async test demo with callback', (done) => {
    setTimeout(() => {
        expect(1).toBe(2);
        done();
    }, 2000);   
}) */


// test('Async test demo with Promise', () => {
//     return math.add(3, 4).then(sum => {
//         expect(sum).toBe(7);
//     });
// });

test('Async test demo with async/await', async () => {
    await new Promise(resolve => setTimeout(resolve, 2000));
    expect(1).toBe(1);
});

test('Async test demo with async/await', async () => {
    const sum = await math.add(3, 4);
    expect(sum).toBe(7);
});