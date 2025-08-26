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



        // Create Commands:

        // Insert one document:
        // const result = await db.collection('users').insertOne({
        //     name: "Shubham",
        //     age: 23
        // })

        // console.log('Inserted log:', result.insertedId);



        // Insert many documents:
        // const result = await db.collection('users').insertMany([
        //     {
        //         name: 'Himanshu',
        //         age: 20
        //     }, {
        //         name: 'Sarthak',
        //         age: 21
        //     }, {
        //         name: 'Binit',
        //         age: 20
        //     }
        // ])

        // console.log('Inserted logs:', result.insertedIds);



        // Now, Insert into another collection 'tasks':
        // const result = await db.collection('tasks').insertMany([
        //     {
        //         description: 'Clean the house',
        //         completed: true
        //     }, {
        //         description: 'Renew inspection',
        //         completed: false
        //     }, {
        //         description: 'Declutter things',
        //         completed: false
        //     }
        // ])

        // console.log('Inserted logs:', result.insertedIds);

    } catch (err) {
        console.error("Connection failed:", err);
    } finally {
        // Ensures that the client will close when you finish/error
        await client.close();
    }
}
run();