import { useUserSession } from '@/hooks/useUserSession';
import Image from 'next/image';

export const IconRole = () => {
    const { user } = useUserSession();

    const isAdmin = user?.role === 'ADMIN';
    const isManager = user?.role === 'MANAGER';

    return (
        <div className="relative">
            <Image
                src={user?.image || '/default-avatar.png'}
                width={40}
                height={40}
                className="min-h-10 min-w-10 rounded-full"
                alt="Profile Image"
            />

            <Image
                src={isAdmin ? '/admin-icon.svg' : isManager ? '/manager-icon.svg' : ''}
                width={16}
                height={16}
                className="absolute bottom-0 right-0 min-h-4 min-w-4"
                alt="Profile Image"
            />
        </div>
    );
};
