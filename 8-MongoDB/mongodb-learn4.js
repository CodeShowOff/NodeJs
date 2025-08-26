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


        // Delete Commands:

        const result = await db.collection('users').deleteOne(
            { name: 'Tia' }
        )
        
        console.log(result);                
        
        

    } catch (err) {
        console.error("Connection failed:", err);
    } finally {
        await client.close();
    }
}
run();