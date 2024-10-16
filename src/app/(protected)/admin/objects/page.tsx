'use client';

import ActionButtons from '@/components/dashboard/ActionButtons';
import DashboardAside from '@/components/dashboard/dashboard-aside';
import { columns } from '@/components/dashboard/dashboard-objects-columns.data';
import DashboardPage from '@/components/dashboard/dashboard-page';
import { Pagination, Table } from 'antd';
import { useEffect, useState } from 'react';

const ObjectPage: React.FC = () => {
    const [dataSource, setDataSource] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [totalItems, setTotalItems] = useState(0);

    // Функция для загрузки данных с сервера
    const fetchObjects = async () => {
        setLoading(true);
        try {
            const response = await fetch('/api/objects');
            if (!response.ok) {
                throw new Error('Failed to fetch objects');
            }

            const data = await response.json();
            const formattedData = data.map((object: any) => ({
                id: object.id,
                yearOfConstruction: object.yearOfConstruction,
                status: object.isArchived,
                name: object.name,
                type: object.type,
                address: object.address,
                completionRate: object.completionRate,
                dateCreated: object.dateCreated,
            }));

            setDataSource(formattedData);
            setTotalItems(data.total);
        } catch (error) {
            console.error('Error loading objects:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchObjects(currentPage, pageSize);
    }, [currentPage, pageSize]);

    const handleDelete = (id: string) => {
        setDataSource((prevData) => prevData.filter((item) => item.id !== id));
        setTotalItems((prevTotal) => prevTotal - 1); // Обновляем общее количество
    };
    const handlePageChange = (page: number, pageSize: number) => {
        setCurrentPage(page);
        setPageSize(pageSize);
    };
    return (
        // <div className="flex justify-center bg-admin-bg p-2 w-full h-full">
        <DashboardPage pageName="Объекты" tableData={dataSource} createLink="/objects/create">
            <div className="w-full overflow-auto bg-admin-bg">
                <Table
                    rowKey="id"
                    loading={loading}
                    dataSource={dataSource}
                    columns={[
                        ...columns,
                        {
                            title: '',
                            key: 'actions',
                            fixed: 'right',
                            render: (record) => (
                                <ActionButtons objectId={record.id} onDelete={handleDelete} />
                            ),
                        },
                    ]}
                    pagination={false}
                    scroll={{
                        x: 'max-content',
                        y: 70 * 5,
                    }}
                    className=" rounded-lg"
                />
            </div>
            <div className="flex justify-center my-3 w-full">
                <Pagination
                    current={currentPage}
                    total={totalItems}
                    pageSize={pageSize}
                    showSizeChanger
                    showQuickJumper
                    // className="w-full "
                    onChange={handlePageChange}
                />
            </div>
        </DashboardPage>
        // </div>
    );
};

export default ObjectPage;
