const { MongoClient } = require('mongodb');

let db;
async function connect() {
    const mongoURI = process.env.MONGO_URI;
    try {
        const client = new MongoClient(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });
        await client.connect();
        console.log("Connected to MongoDB!");
        db = client.db('reddit');
    } catch (error) {
        console.error("Failed to connect to MongoDB", error);
        console.log(mongoURI);
    }
}

async function getDb() {
    if (!db) {
        await connect();
    }
    return db;
}

module.exports = { getDb };
