import { client } from './mongo-conn.js';
import { dbnames } from '../globals/db_names.js';

// drops all collections
async function resetDB() {
    await client.db(dbnames.MAIN_DB).collection(dbnames.USERS_COLL).drop();
    await client.db(dbnames.MAIN_DB).dropDatabase();
}

async function populateSampleUserData() {
    const coll = client.db(dbnames.MAIN_DB).collection(dbnames.USERS_COLL);

    // assmeble a rudimentary set of data using an index and a static string
    const maxData = 1000;
    let sampleData = [];
    for (let i = 1; i <= maxData; i++) {
        sampleData.push({
            babyName: 'sampleName' + i
        })
    }

    await coll.insertMany(sampleData);
}

await resetDB();
await populateSampleUserData();
client.close();
// process.exit(0);