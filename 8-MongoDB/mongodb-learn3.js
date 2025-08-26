// CRUD Operations:

import { MongoClient } from "mongodb";

const connectionURL = 'mongodb://127.0.0.1:27017';
const databaseName = 'task-manager';

const client = new MongoClient(connectionURL);

async function run() {
    try {
        await client.connect();
        console.log("Connected!");

        const db = client.db(databaseName);


        // Update Commands:

        // Promise syntax:
        // const result = db.collection('users').updateOne(
        //     { name: 'tia' },           // filter
        //     { $set: { name: 'tiya' } } // update operator
        // );

        // result.then((result) => {
        //     console.log(result);
            
        // }).catch((err) => {
        //     console.log(err);
            
        // });


        // Async await syntax: 
        // const result = await db.collection('users').updateOne(
        //     { name: 'Tia' },           // filter
        //     { $set: { name: 'Tiya' } } // update operator
        // );

        // note: once you await, result is already resolved (it’s not a Promise anymore).
        // console.log(result);        




        // Update document by incrementing the value:
        
        // const result = await db.collection('users').updateOne(
        //     { name: 'Tia' }, // filter
        //     { $inc: { age: 1 } } // update operator
        // );
        // so, before age of Tia = 22 and after = 23.
        // console.log(result);  

        

        // Update all uncompleted task to completed:
        const result = await db.collection('tasks').updateMany(
            { completed: false },
            { $set: {completed : true}}
        )
        
        console.log(result);        
        

    } catch (err) {
        console.error("Connection failed:", err);
    } finally {
        await client.close();
    }
}
run();