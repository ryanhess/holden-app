'use server'

import { ObjectId } from 'mongodb';
import { client } from '@/lib/db/mongo'

// returns one user specified by the given id. If no user exists,
// returns undefined.
// If an error has occurred, catches and returns the error.
export async function getUserData(id) {
    let data;
    try {
        const coll = client.db("main").collection("user-data");
        data = await coll.findOne({ _id: ObjectId.createFromHexString(id) });
    } catch (e) {
        return e;
    } finally {
        if (data) {
            // Clean the data to encapsulate-out the Mongo datatypes.
            data._id = data._id.toString();
        } else {
            return null;
        }
        return data;
    }
}

// returns all the users. if no users, returns null.
export async function getAllUserData() {
    let resultCursor;
    let resultObjs;
    try {
        const coll = client.db("main").collection("user-data");
        resultCursor = await coll.find();
        resultObjs = turnIDsToStrings(await resultCursor.toArray());
    } catch (e) {
        return e;
    } finally {
        // Clean the data to encapsulate-out the Mongo datatypes.
        return resultObjs;
    }
}

export async function createNewUser() { }

// helper function to turn all the ids in the given
// object from ObjectIds into strings.
// if it's an array of objects, return a 'cleaned' array
// clones the item and does not modify the original object.
// function turnIDsToStrings(item) {
//     let result = structuredClone(item);
//     if (item) {
//         if (Array.isArray(item)) {
//             for (let i = 0; i < item.length; i++) {
//                 result[i] = turnIDsToStrings(item[i])
//             };
//         } else if (ObjectId.isValid(item._id)) {
//             result._id = item._id.toString();
//         }
//     }
//     return result;
// }
function turnIDsToStrings(item) {
    let result;
    if (item) {
        if (Array.isArray(item)) {
            result = item.map((doc) => {
                return turnIDsToStrings(doc);
            });
        } else if (ObjectId.isValid(item._id)) {
            result = structuredClone(item)
            result._id = item._id.toString();
        }
    }
    return result;
}

// let a = [{ _id: new ObjectId() }, { _id: new ObjectId() }];
// console.log(a);
// console.log(turnIDsToStrings(a))