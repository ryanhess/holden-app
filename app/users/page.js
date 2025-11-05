import Link from 'next/link'
import routes from '@/lib/routes'

export const metadata = {
    title: 'Users List'
};

export default function UsersList() {
    return (
        <ul>
            <li><Link href={routes.users.profile(1)}>Id 1</Link></li>
            <li><Link href="/users/2">User Id 2</Link></li>
        </ul >
    );
}