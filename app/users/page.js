import Link from 'next/link'
import { getAllUserData } from '@/lib/actions/crud';
import { Suspense } from 'react';
import { routes } from '@/lib/globals/routes'
import VirtualUsersList from './VirtualUsersList';


export const metadata = {
    title: 'Users List'
};

export default function Page() {
    return (
        <Suspense fallback={<>Loading Users list...</>}>
            <UsersList />
        </Suspense>
    );
}

export async function UsersList() {
    const users = await getAllUserData();
    return <VirtualUsersList users={users} />;
}