import { RoleGate } from '@/components/auth/role-gate';
import DashboardAside from '@/components/dashboard/dashboard-aside';
import { Role } from '@prisma/client';

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
    const adminElements = [
        { title: 'Объекты', pageUrl: '/objects' },
        { title: 'Пользователи', pageUrl: '/users' },
        { title: 'Менеджеры', pageUrl: '/managers' },
        { title: 'Статистика', pageUrl: '/statistics' },
        { title: 'Настройки', pageUrl: '/settings' },
    ];
    return (
        <RoleGate allowedRole={Role.ADMIN} redirectPath="/objects">
            <div className="flex flex-row bg-admin-bg w-full h-[100vh] p-2 overflow-hidden">
                <DashboardAside menu={adminElements} />
                <section className="text-text flex-grow overflow-hidden p-5 h-full">
                    {children}
                </section>
            </div>
        </RoleGate>
    );
};

export default DashboardLayout;
