// ManagersPage.tsx
"use client";
import { useEffect, useState } from "react";
import { Table } from "antd";
import { Manager } from "@/components/dashboard/manager.iterface";
import UserActionButtons from "@/components/dashboard/UserActionButtons";
import DashboardPage from "@/components/dashboard/dashboard-page";
import dayjs from "dayjs";

const ManagersPage = () => {
    const [dataSource, setDataSource] = useState<Manager[]>([]);
    const [totalItems, setTotalItems] = useState(0);

    useEffect(() => {
        const fetchManagers = async () => {
            try {
                const response = await fetch("/api/managers");
                if (!response.ok) {
                    throw new Error("Failed to fetch managers");
                }

                const data = await response.json();
                setDataSource(data);
                setTotalItems(data.length);
            } catch (error) {
                console.error("Error fetching managers:", error);
            }
        };

        fetchManagers();
    }, []);

    const handleDelete = (id: string) => {
        setDataSource((prevData) => prevData.filter((item) => item.id !== id));
        setTotalItems((prevTotal) => prevTotal - 1); // Обновляем общее количество
    };

    const columns = [
        {
            title: "Дата создания",
            dataIndex: "createdAt",
            key: "createdAt",
            render: (createdAt: Date | string): JSX.Element => (
                <p>{dayjs(createdAt).format("DD.MM.YYYY")}</p>
            ),
        },
        {
            title: "Имя",
            dataIndex: "name",
            key: "name",
        },
        {
            title: "Email",
            dataIndex: "email",
            key: "email",
        },
        {
            title: "Телефон",
            dataIndex: "phoneNumber",
            key: "phoneNumber",
        },
        {
            title: "Количество объектов",
            dataIndex: "objectCount",
            key: "objectCount",
        },
        {
            title: "Действия",
            fixed: "right" as const,
            key: "actions",
            render: (record: Manager) => (
                <UserActionButtons objectId={record.id} onDelete={handleDelete} />
            ),
        },
    ];

    return (
        <DashboardPage
            pageName="Менеджеры"
            tableData={dataSource}
            createLink="/dashboard/users/create">
            <div className="w-full overflow-auto bg-admin-bg">
                <Table
                    columns={columns}
                    dataSource={dataSource}
                    rowKey="id"
                    pagination={{ total: totalItems }}
                />
            </div>
        </DashboardPage>
    );
};

export default ManagersPage;
