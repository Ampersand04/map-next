'use client';

import Link from 'next/link';
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

    return (
        <aside className="bg-white p-3 w-[188px] min-h-full rounded-lg">
            {menu.map((item) => {
                const isActive = pathname.startsWith('/admin' + item.pageUrl);
                return (
                    <div
                        key={item.title}
                        className={`cursor-pointer text-sm block w-full p-4 rounded-lg transition-colors duration-300 ${
                            isActive
                                ? 'bg-gray text-text font-semibold' // Активный элемент
                                : 'bg-white text-text' // Неактивный элемент
                        }`}
                        onClick={() => {
                            router.push('/admin' + item.pageUrl);
                        }}>
                        <span>{item.title}</span>
                    </div>
                );
            })}
        </aside>
    );
};

export default DashboardAside;
