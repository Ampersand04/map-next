'use client';
import Image from 'next/image';
import { ColumnType } from 'antd/es/table'; // Импортируем необходимые типы из Ant Design
import { useRouter } from 'next/navigation';
import ActionButtons from './ActionButtons';
import { objectTypeConvert } from '@/lib/objextTypeConvert';
import dayjs from 'dayjs';

// Определяем интерфейс для данных строки
interface ObjectData {
    id: string;
    yearOfConstruction: string | Date; // В зависимости от вашего источника данных
    status: boolean;
    name: string;
    type: string;
    address: string;
    completionRate: number;
}

export const columns: ColumnType<ObjectData>[] = [
    {
        title: 'Год постройки объекта',
        dataIndex: 'yearOfConstruction',
        key: 'yearOfConstruction',
        sorter: (a, b) =>
            new Date(a.yearOfConstruction).getTime() - new Date(b.yearOfConstruction).getTime(),
        render: (yearOfConstruction: Date | string): JSX.Element => (
            <p>{dayjs(yearOfConstruction).format('DD.MM.YYYY')}</p>
        ),
    },
    {
        title: 'Статус',
        dataIndex: 'status',
        key: 'status',
        render: (status: boolean) => (
            <span className={status ? 'text-red-500' : 'text-green-500'}>
                {status ? 'В архиве' : 'Опубликован'}
            </span>
        ),
    },
    {
        title: 'Наименование',
        dataIndex: 'name',
        key: 'name',
    },
    {
        title: 'Назначение',
        dataIndex: 'type',
        key: 'type',
        render: (type: string) => <span>{objectTypeConvert(type)}</span>,
    },
    {
        title: 'Адрес',
        dataIndex: 'address',
        key: 'address',
    },
    {
        title: 'Готовность (%)',
        dataIndex: 'completionRate',
        key: 'completionRate',
        sorter: (a, b) => a.completionRate - b.completionRate,
    },
    // {
    //     title: '',
    //     key: 'actions',
    //     fixed: 'right' as const,
    //     render: (record: ObjectData) => (
    //         // console.log('Rendering actions for ID:', record.id); // Выводим ID для отладки
    //         <ActionButtons objectId={record.id} />
    //     ),
    // },
];
