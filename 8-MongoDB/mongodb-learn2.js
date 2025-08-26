// CRUD Operations:

import { MongoClient, ObjectId } from "mongodb";

const connectionURL = 'mongodb://127.0.0.1:27017';
const databaseName = 'task-manager';

// Create a MongoClient
const client = new MongoClient(connectionURL);

async function run() {
    try {
        // Connect the client to the server
        await client.connect();
        console.log("Connected!");

        const db = client.db(databaseName);


        // Read Commands:
        // const result = await db.collection('users').findOne({ name: 'Shubham' });
        // console.log(result);
        // {
        //     _id: new ObjectId('68ab42315599622302d3f3a6'),
        //     name: 'Shubham',
        //     age: 23
        // }


        // const result = await db.collection('users').findOne({ name: 'Shubham', age: 1 });
        // console.log(result); // null


        // const result = await db.collection('users').findOne({ _id: new ObjectId("68ab42315599622302d3f3a6") });
        // console.log(result);
        // {
        //   _id: new ObjectId('68ab42315599622302d3f3a6'),
        //   name: 'Shubham',
        //   age: 23
        // }


        const result = await db.collection('users').find({ age: {$gt: 20 }}).toArray();
        console.log(result);





 


    } catch (err) {
        console.error("Connection failed:", err);
    } finally {
        // Ensures that the client will close when you finish/error
        await client.close();
    }
}
run();