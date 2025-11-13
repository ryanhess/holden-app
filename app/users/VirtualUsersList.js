'use client'

import { Virtuoso } from 'react-virtuoso';
import Link from 'next/link';
import { routes } from '@/lib/globals/routes';

export default function VirtualUsersList({ users }) {
    return (
        <div className='h-full'>
            <h2 className="text-xl font-bold mb-4 px-4">Users ({users.length})</h2>
            <Virtuoso
                style={{ height: '100%' }}
                data={users}
                itemContent={(index, user) => (
                    <div className="border-b border-gray-700 px-4 py-2 hover:bg-gray-800">
                        <Link href={routes.users.profile(user._id)}>
                            UserID: {user._id}. Baby Name: {user.babyName}
                        </Link>
                    </div>
                )}
            />
        </div>
    );
}
