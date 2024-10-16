'use client';

import { logout } from '@/actions/logout';
import { useUserSession } from '@/hooks/useUserSession';
import Image from 'next/image';
import { useRouter, usePathname } from 'next/navigation';
import { IconRole } from '../shared/userMenu/iconRole';

interface Menu {
    title: string;
    pageUrl: string;
}

interface DashboardAsideProps {
    menu: Menu[];
}

const DashboardAside: React.FC<DashboardAsideProps> = ({ menu }: DashboardAsideProps) => {
    const user = useUserSession();
    const pathname = usePathname();
    const router = useRouter();

    const handleLogout = async () => {
        await logout(); // Вызов функции выхода
        router.push('/login'); // Перенаправление на страницу логина после выхода
    };
    return (
        <aside className="bg-white p-3 min-w-[188px] min-h-full rounded-lg">
            <div className="flex flex-row items-center gap-2 text-sm w-full py-4 bg-white text-text">
                <IconRole />
                <p>{user.user?.role === 'ADMIN' ? 'Администратор' : 'Менеджер'}</p>
            </div>
            {menu.map((item) => {
                const isActive = pathname.startsWith('' + item.pageUrl);
                return (
                    <div
                        key={item.title}
                        className={`cursor-pointer text-sm block w-full p-4 rounded-lg transition-colors duration-300 ${
                            isActive
                                ? 'bg-gray text-text font-semibold' // Активный элемент
                                : 'bg-white text-text' // Неактивный элемент
                        }`}
                        onClick={() => {
                            router.push('' + item.pageUrl);
                        }}>
                        <span>{item.title}</span>
                    </div>
                );
            })}
            <div
                className="cursor-pointer text-sm block w-full p-4 rounded-lg transition-colors duration-300 bg-white text-red-500 hover:bg-gray"
                onClick={handleLogout}>
                <b>Выйти</b>
            </div>
        </aside>
    );
};

export default DashboardAside;
