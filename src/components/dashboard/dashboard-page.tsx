'use client';

import DashboardInputSearch from './dashboardInputSearch';
import { useState } from 'react';
import { Button } from '../ui';
import Link from 'next/link';

interface DashboardPageProps {
    pageName?: string;
    backLink?: string;
    createLink?: string;
    children?: React.ReactNode;
    tableData: any[];
}

const DashboardPage: React.FC<DashboardPageProps> = ({
    pageName,
    backLink,

    createLink,
    children,
    tableData,
}: DashboardPageProps) => {
    const [searchValue, setSearchValue] = useState('');

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchValue(event.target.value);
    };

    const exportToCSV = () => {
        // Check if there is data to export
        if (!tableData || tableData.length === 0) {
            alert('No data to export');
            return;
        }

        // Get the keys of the first object for the CSV header
        const csvHeaders = Object.keys(tableData[0]).join(',') + '\n';
        // Create CSV rows
        const csvRows = tableData.map((row) => Object.values(row).join(',')).join('\n');
        // Combine headers and rows
        const csvData = csvHeaders + csvRows;

        // Create a Blob from the CSV string
        const blob = new Blob([csvData], { type: 'text/csv' });
        const url = URL.createObjectURL(blob);

        // Create a link to download the file
        const a = document.createElement('a');
        a.href = url;
        a.download = 'exported_data.csv'; // Name of the CSV file
        a.click();

        // Clean up the URL object
        URL.revokeObjectURL(url);
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
                    <div className="flex gap-3">
                        <Button intent="primary" className="text-3xl" onClick={exportToCSV}>
                            Экспорт
                        </Button>
                        <Link href={createLink != undefined ? createLink : '/404'}>
                            <Button intent="primary" className="text-3xl">
                                Создать
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>

            <div className="overflow-hidden h-[100%] w-[100%] ">{children}</div>
        </div>
    );
};

export default DashboardPage;
