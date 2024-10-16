'use client';
import DashboardAside from '@/components/dashboard/dashboard-aside';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const AdminPage: React.FC = () => {
    const router = useRouter();

    useEffect(() => {
        router.push('/dashboard/objects');
    }, [router]);

    return null;
};

export default AdminPage;
