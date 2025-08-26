// IDs in MongoDB

    // IDs in MongoDB are GUIDs : Globally Unique IDs 
    // Tthey are designed to be unique using an algorithm without needing the server to determine what the next ID value is.
    // It allowed mongodb to scale well in a distributed system. so we have multiple databases servers running instead of just one allowing us to handle 
    // heavy traffic when we have a lot of queries coming in.


    // we can generate our own object IDs using mongodb library:
    const id = new ObjectId();

    console.log(id); // new ObjectId('68adf6a320e3544e6b478e9e')  <- each time different output
    console.log(id.getTimestamp()); // 2025-08-26T18:02:11.000Z
    
    // setting our own generated id to documents:
    const result = await db.collection('users').insertOne({
        _id: id,
        name: "Tia",
        age: 22
    })

    console.log('Inserted log:', result.insertedId); // Inserted log: new ObjectId('68adf6a320e3544e6b478e9e')

    // now, we dont really gonna use this as mongodb generates ids itself for each document.