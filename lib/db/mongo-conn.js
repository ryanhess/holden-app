import { MongoClient, ServerApiVersion } from 'mongodb';
const uri = process.env.MONGODB_URI;

async function makeConnection() {
    try {
        if (!uri) {
            throw new Error('MongoDB URI environment variable is required.')
        }
        // Create a MongoClient with a MongoClientOptions object to set the Stable API version
        const client = new MongoClient(uri, {
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
        return -1;
    } finally {
        return client;
    }
}

const client = await makeConnection();

export { client, makeConnection };