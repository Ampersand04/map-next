'use client';

import { logout } from '@/actions/logout';
import { useRouter, usePathname } from 'next/navigation';

interface Menu {
    title: string;
    pageUrl: string;
}

interface DashboardAsideProps {
    menu: Menu[];
}

const DashboardAside: React.FC<DashboardAsideProps> = ({ menu }: DashboardAsideProps) => {
    const pathname = usePathname();
    const router = useRouter();

    const handleLogout = async () => {
        await logout(); // Вызов функции выхода
        router.push('/login'); // Перенаправление на страницу логина после выхода
    };
    return (
        <aside className="bg-white p-3 w-[188px] min-h-full rounded-lg">
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
                className="cursor-pointer text-sm block w-full p-4 rounded-lg transition-colors duration-300 bg-white text-text hover:bg-gray"
                onClick={handleLogout}>
                <span>Выйти</span>
            </div>
        </aside>
    );
};

export default DashboardAside;
