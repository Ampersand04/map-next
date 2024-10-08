'use client';
import { useUserCurrentRole } from '@/hooks/useUserCurrentRole';
import { Role } from '@prisma/client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface RoleGateProps {
    children: React.ReactNode;
    allowedRole: Role;
    redirectPath?: string; // Optional: you can provide a custom redirect path for allowed roles
}

export const RoleGate: React.FC<RoleGateProps> = ({
    children,
    allowedRole,
    redirectPath = '/404',
}) => {
    const role = useUserCurrentRole();
    const router = useRouter();

    useEffect(() => {
        if (role === undefined) {
            return;
        }

        if (role !== allowedRole) {
            router.replace('/404');
        }
    }, [role, allowedRole, redirectPath, router]);

    if (role === allowedRole) {
        return <>{children}</>;
    }

    return null;
};
