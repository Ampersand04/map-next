// UsersPage.tsx
'use client';
import { useEffect, useState } from 'react';
import { Table } from 'antd';
import { User } from '@/components/dashboard/user.iterface';
import ActionButtons from '@/components/dashboard/ActionButtons';
import DashboardPage from '@/components/dashboard/dashboard-page';

const UsersPage = () => {
    const [dataSource, setDataSource] = useState<User[]>([]);
    const [totalItems, setTotalItems] = useState(0);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await fetch('/api/users');
                if (!response.ok) {
                    throw new Error('Failed to fetch users');
                }

                const data = await response.json();
                const formattedData = data.map((user: any) => ({
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    status: user.status,
                    createdAt: user.createdAt,
                }));

                setDataSource(formattedData);
                setTotalItems(data.length);
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };

        fetchUsers();
    }, []);

    const handleDelete = (id: string) => {
        setDataSource((prevData) => prevData.filter((item) => item.id !== id));
        setTotalItems((prevTotal) => prevTotal - 1); // Обновляем общее количество
    };

    const columns = [
        {
            title: 'Имя',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Статус',
            dataIndex: 'status',
            key: 'status',
            render: (status: boolean) => (
                <span className={status ? 'text-red-500' : 'text-green-500'}>
                    {status ? 'Заблокирован' : 'Активный'}
                </span>
            ),
        },
        {
            title: 'Дата создания',
            dataIndex: 'createdAt',
            key: 'createdAt',
        },
        {
            title: '',
            key: 'actions',
            fixed: 'right' as const,
            render: (record: User) => (
                <ActionButtons objectId={record.id} onDelete={handleDelete} />
            ),
        },
    ];

    return (
        <DashboardPage pageName="Пользователи">
            <div className="w-full overflow-auto bg-admin-bg">
                <Table
                    columns={columns}
                    dataSource={dataSource}
                    rowKey="id"
                    pagination={{ total: totalItems }}
                    scroll={{
                        x: 'max-content',
                        y: 70 * 5,
                    }}
                />
            </div>
        </DashboardPage>
    );
};

export default UsersPage;
