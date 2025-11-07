import { MongoClient, ServerApiVersion } from 'mongodb';
const uri = process.env.MONGODB_URI;

let client;
// Create a MongoClient with a MongoClientOptions object to set the Stable API version

async function makeConnection() {
    try {
        if (!uri) {
            throw new Error('MongoDB URI environment variable is required.')
        }
        client = new MongoClient(uri, {
            serverApi: {
                version: ServerApiVersion.v1,
                strict: true,
                deprecationErrors: true,
            }
        });
        // Connect the client to the server	(optional starting in v4.7)
        await client.connect();
    } catch (e) {
        console.log("error:" + e.name + ': ' + e.message);
    }
}

await makeConnection();

export { client, makeConnection };