'use client';

import { SearchOutlined, FilterOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import Image from 'next/image';

export const columns = [
    {
        title: 'Год постойки объекта',
        dataIndex: 'yearOfConstruction',
        key: 'yearOfConstruction',
        sorter: (a: any, b: any) =>
            new Date(a.yearOfConstruction).getTime() - new Date(b.yearOfConstruction).getTime(),
    },
    {
        title: 'Статус',
        dataIndex: 'status',
        key: 'status',
        render: (status: string) => (
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
    },
    {
        title: 'Адрес',
        dataIndex: 'address',
        key: 'address',
    },
    {
        title: 'Год постройки',
        dataIndex: 'yearOfConstruction',
        key: 'yearOfConstruction',
        render: (yearOfConstruction: Date) => {
            yearOfConstruction ? (
                <div className="flex gap-2">
                    <Image src={'/iconamoon_edit.svg'} alt="" width={16} height={16} />
                    <Image src={'/symbols_delete.svg'} alt="" width={16} height={16} />
                </div>
            ) : (
                'asd'
            );
        },
        sorter: (a: any, b: any) => a.yearOfConstruction - b.yearOfConstruction,
    },
    {
        title: 'Готовность (%)',
        dataIndex: 'completionRate',
        key: 'completionRate',
        sorter: (a: any, b: any) => a.completionRate - b.completionRate,
    },
    {
        title: '',
        key: 'actions',
        fixed: 'right',
        render: () => (
            <div className="flex gap-2">
                <Image src={'/iconamoon_edit.svg'} alt="" width={16} height={16} />
                <Image src={'/symbols_delete.svg'} alt="" width={16} height={16} />
            </div>
        ),
    },
];
