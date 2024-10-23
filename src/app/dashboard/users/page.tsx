// UsersPage.tsx
'use client';
import { useEffect, useState } from 'react';
import { Table } from 'antd';
import { User } from '@/components/dashboard/user.iterface';
import DashboardPage from '@/components/dashboard/dashboard-page';
import UserActionButtons from '@/components/dashboard/UserActionButtons';
import { RoleGate } from '@/components/auth/role-gate';
import { Role } from '@prisma/client';
import dayjs from 'dayjs';

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
                    premium: user.premium,
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
            title: 'Premium',
            dataIndex: 'premium',
            key: 'premium',
            render: (premium: boolean) => (
                <span className={premium ? 'text-green-500' : 'text-red-500'}>
                    {premium ? 'Активный' : 'Не активен'}
                </span>
            ),
        },
        {
            title: 'Дата создания',
            dataIndex: 'createdAt',
            key: 'createdAt',
            render: (createdAt: Date | string): JSX.Element => (
                <p>{dayjs(createdAt).format('DD.MM.YYYY')}</p>
            ),
        },
        {
            title: '',
            key: 'actions',
            fixed: 'right' as const,
            render: (record: User) => (
                <UserActionButtons objectId={record.id} onDelete={handleDelete} />
            ),
        },
    ];

    return (
        <RoleGate allowedRole={Role.ADMIN}>
            <DashboardPage
                pageName="Пользователи"
                tableData={dataSource}
                createLink="/dashboard/users/create">
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
        </RoleGate>
    );
};

export default UsersPage;
