'use client';

import { RoleGate } from '@/components/auth/role-gate';
import DashboardAside from '@/components/dashboard/dashboard-aside';
import { useUserSession } from '@/hooks/useUserSession';
import { Role } from '@prisma/client';

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
    const user = useUserSession();

    const adminElements = [
        { title: 'Объекты', pageUrl: '/dashboard/objects' },
        { title: 'Пользователи', pageUrl: '/dashboard/users' },
        { title: 'Менеджеры', pageUrl: '/dashboard/managers' },
        { title: 'Статистика', pageUrl: '/dashboard/statistics' },
        { title: 'Настройки', pageUrl: '/dashboard/settings' },
    ];

    // Элементы меню для менеджера
    const managerElements = [
        { title: 'Объекты', pageUrl: '/dashboard/objects' },
        { title: 'Статистика', pageUrl: '/dashboard/statistics' },
        { title: 'Настройки', pageUrl: '/dashboard/settings' },
    ];

    const menuItems = user.user?.role === Role.ADMIN ? adminElements : managerElements;
    return (
        // <RoleGate allowedRole={Role.MANAGER} redirectPath="/dashboard/objects">
        <div className="flex flex-row bg-admin-bg w-full h-[100vh] p-2 overflow-hidden">
            <DashboardAside menu={menuItems} />
            <section className="text-text flex-grow overflow-hidden p-5 h-full">{children}</section>
        </div>
        // </RoleGate>
    );
};

export default DashboardLayout;
