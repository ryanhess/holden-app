// server component by default
'use server'
import { simulateApiCall } from '@/lib/devtools';
import { Suspense } from 'react';
import { getUserData } from '@/lib/actions/crud';

export async function generateMetadata({ params }) {
    // const { id } = await params;
    // const { babyName } = await getUserData(id);
    const { babyName } = await simulateApiCall({ babyName: "Holden" }, 2000);
    return {
        title: `${babyName}'s Profile`
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
    const usrData = await getUserData(id);
    return (
        <ul>
            <li>userID: {usrData._id}</li>
            <li>Baby's Name: {usrData.babyName}</li>
        </ul>
    );
}