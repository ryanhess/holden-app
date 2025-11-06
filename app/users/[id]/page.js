// server component by default
'use server'
import { simulateApiCall } from '@/lib/devtools'
import { Suspense } from 'react'

export async function generateMetadata({ params }) {
    const { id } = await params;
    const { babyName } = await getUserData(id);
    return {
        title: `User ${babyName} Profile`
    };
}

//ProfilePage must be async because Next made it a requirement
//in order to use the params API
export default async function ProfilePage({ params }) {
    const { id } = await params;
    return (
        <Suspense fallback={<>Retrieving user data...</>}>
            <UserDataDisplay id={id} />
        </Suspense>
    );
}

async function UserDataDisplay({ id }) {
    const { userID, babyName, babyBirthday } = await getUserData(id);
    return (
        <ul>
            <li>userID: {userID}</li>
            <li>Baby's Name: {babyName}</li>
        </ul>
    );
}

async function getUserData(id) {
    const data = {
        userID: id,
        babyName: 'Holden',
        babyBirthday: new Date("10/19/2025")
    };

    await simulateApiCall(data, 2000);

    return data;
}

