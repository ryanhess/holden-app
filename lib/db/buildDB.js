import { client, makeConnection } from "./mongo-conn";
import { MongoClient, ServerApiVersion } from 'mongodb';

async function populateUserData() {
    const client = makeConnection();
    const coll = client.db('main').collection('user-data');
}
