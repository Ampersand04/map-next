'use client';

import SidePanel from '@/components/application/sidePanel/SidePanel';
import ActionButtons from '@/components/dashboard/ActionButtons';
import DashboardAside from '@/components/dashboard/dashboard-aside';
import { columns } from '@/components/dashboard/dashboard-objects-columns.data';
import DashboardPage from '@/components/dashboard/dashboard-page';
import { ObjectProvider } from '@/providers/objectsProvider';
import { Pagination, Table } from 'antd';
import { useEffect, useState } from 'react';

const ObjectPage: React.FC = () => {
    const [dataSource, setDataSource] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [totalItems, setTotalItems] = useState(0);

    const [selectedObjectId, setSelectedObjectId] = useState<string | null>(null);
    const [isPanelOpen, setIsPanelOpen] = useState(false);

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
        <ObjectProvider>
            <DashboardPage
                pageName="Объекты"
                tableData={dataSource}
                createLink="/dashboard/objects/create">
                <div className="w-full overflow-auto bg-admin-bg">
                    <Table
                        rowKey="id"
                        loading={loading}
                        onRow={(record) => ({
                            onClick: () => {
                                setSelectedObjectId(record?.id);
                                console.log('record?.id ' + record?.id);
                                console.log('selectedObjectId' + selectedObjectId);
                                setIsPanelOpen(true);
                            },
                        })}
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
                {isPanelOpen && (
                    <div
                        className="fixed inset-0 bg-text/50 z-30 w-[100vw]"
                        onClick={() => {
                            setIsPanelOpen(false);
                            setSelectedObjectId(null);
                        }}>
                        <SidePanel
                            selectedObjectId={selectedObjectId}
                            onClose={() => {
                                setIsPanelOpen(false);
                                setSelectedObjectId(null);
                            }}
                            dashboard
                        />
                    </div>
                )}
            </DashboardPage>
        </ObjectProvider>
    );
};

export default ObjectPage;
