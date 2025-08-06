// Synchronous example:
// This version works fine because everything runs synchronously.
// The function immediately returns the data object.
const geoCode = (address, callback) => {
    const data = {
        latitude: 0,
        longitude: 0
    }
    return data;
}

const data = geoCode('Philadelphia');
console.log(data); // { latitude: 0, longitude: 0 }



// Asynchronous example without a callback:
// This version does NOT work as expected because `setTimeout` is asynchronous.
// The function does not return any data immediately.
// By the time `setTimeout` runs, the main function has already finished.
const geoCode2 = (address, callback) => {
    setTimeout(() => {
        const data = {
            latitude: 0,
            longitude: 0
        }
        return data; // This return is ignored since it's inside an async callback.
    }, 2000)
}

const data2 = geoCode2('Philadelphia');
console.log(data2); // undefined



// Correct asynchronous handling using a callback:
// We pass a callback to `geoCode`, which is invoked when the asynchronous operation completes.
// This ensures we can access the data only after it's available.
const geoCode3 = (address, callback) => {
    setTimeout(() => {
        const data = {
            latitude: 0,
            longitude: 0
        }
        callback(data); // Invoke the callback with the data once ready
    }, 2000)
}

geoCode3('Philadelphia', (data) => {
    console.log(data); // { latitude: 0, longitude: 0 }
})
