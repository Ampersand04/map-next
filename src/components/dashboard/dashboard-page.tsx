'use client';

import DashboardInputSearch from './dashboardInputSearch';
import { useState } from 'react';
import { Button } from '../ui';

interface DashboardPageProps {
    pageName?: string;
    backLink?: string;
    children?: React.ReactNode;
}

const DashboardPage: React.FC<DashboardPageProps> = ({
    pageName,
    backLink,
    children,
}: DashboardPageProps) => {
    const [searchValue, setSearchValue] = useState('');

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchValue(event.target.value);
    };

    return (
        <div className="rounded-lg p-3 w-full h-full">
            <div className=" justify-between items-center pt-8">
                {backLink && (
                    <Button
                        className="absolute -top-3"
                        href={backLink}
                        back
                        intent="redirect"
                        size="small">
                        Назад
                    </Button>
                )}
                <h2 className="text-xl font-bold">{pageName}</h2>
                <div className="flex justify-between items-center gap-2">
                    <DashboardInputSearch value={searchValue} onChange={handleSearchChange} />
                    <Button intent="primary" size="small" className="text-3xl">
                        Создать
                    </Button>
                </div>
            </div>

            <div className="overflow-hidden h-[100%] w-[100%] ">{children}</div>
        </div>
    );
};

export default DashboardPage;
