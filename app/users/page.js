import Link from 'next/link'
import { getAllUserData } from '@/lib/actions/crud';
import { Suspense } from 'react';
import { routes } from '@/lib/routes'


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
    console.log(users);
    return (
        <ul>
            {users.map((user, i) =>
                <li key={i}>
                    <Link href={routes.users.profile(user._id)}>
                        UserID: {user._id}. Baby Name: {user.babyName}
                    </Link>
                </li>
            )}
        </ul>
    );
}