'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui';
import { DatePicker, Input, InputNumber, Select } from 'antd';
import dayjs from 'dayjs';

const { Option } = Select;

interface FormData {
    type: string;
    name: string;
    technicalDetails?: string;
    yearOfConstruction: string;
    gpsCoordinates: string;
    address: string;
    completionRate: number | null;
    structuralCharacteristics?: string;
    additionalInformation?: string;
    images: File[];
}

const menu = [
    { title: 'Create Object', pageUrl: '/objects/create' },
    { title: 'Dashboard', pageUrl: '/dashboard' },
];

const CreateObjectPage: React.FC = () => {
    const [formData, setFormData] = useState<FormData>({
        type: '',
        name: '',
        technicalDetails: undefined,
        yearOfConstruction: '',
        gpsCoordinates: '',
        address: '',
        completionRate: null,
        structuralCharacteristics: undefined,
        additionalInformation: undefined,
        images: [],
    });

    const router = useRouter();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({
            ...formData,
            completionRate: formData.completionRate ? Number(formData.completionRate) : null,
            [e.target.name]: e.target.value,
        });
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files) {
            setFormData({
                ...formData,
                completionRate: formData.completionRate ? Number(formData.completionRate) : null,
                images: Array.from(files), // Преобразование FileList в массив
            });
        }
    };

    const handleNumberChange = (value: number | null) => {
        setFormData({
            ...formData,
            completionRate: value, // Directly set the value
        });
    };

    const handleDateChange = (date: any) => {
        if (date) {
            // Format date as ISO string for PostgreSQL
            const formattedDate = dayjs(date).toISOString();
            setFormData({
                ...formData,
                yearOfConstruction: formattedDate,
            });
        }
    };

    const handleSelectChange = (key: string, value: string) => {
        setFormData({
            ...formData,
            [key]: value,
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const data = new FormData();
        Object.entries(formData).forEach(([key, value]) => {
            if (Array.isArray(value)) {
                value.forEach((file) => data.append(`${key}[]`, file));
            } else {
                data.append(key, value as string);
            }
        });

        try {
            const res = await fetch('/api/objects', {
                method: 'POST',
                body: data, // Отправляем FormData вместо JSON
            });

            if (res.ok) {
                // Redirect to dashboard or success page
                router.push('/dashboard/objects');
            } else {
                console.error('Failed to create object');
            }
        } catch (error) {
            console.error('Error creating object:', error);
        }
    };

    return (
        <div className="rounded-lg h-[100vh] w-[80vw] overflow-scroll">
            <div className=" justify-between items-center bg-admin-bg">
                <div className="pb-3 sticky top-0 left-0 z-30 bg-admin-bg shadow-sm">
                    <Button
                        className=""
                        href={'/dashboard/objects'}
                        back
                        intent="redirect"
                        size="small">
                        Назад
                    </Button>
                    <h2 className="text-xl font-bold pt-2">Создание объекта</h2>
                </div>

                <div className="bg-white p-5 my-5 rounded-lg">
                    <form onSubmit={handleSubmit} className="space-y-4">
                        {/* Object Type */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Type</label>

                            <Select
                                placeholder="Выбрать"
                                style={{ width: '100%' }}
                                onChange={(value) => handleSelectChange('type', value)}>
                                <Option value="RESIDENTIAL">Жилой дом</Option>
                                <Option value="INDUSTRIAL">Культурный объект</Option>
                            </Select>
                            {/* <input
                                type="text"
                                name="type"
                                value={formData.type}
                                onChange={handleChange}
                                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                                required
                            /> */}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">name</label>
                            <Input
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                            />
                            {/* <textarea
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                            /> */}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                yearOfConstruction
                            </label>
                            <DatePicker
                                onChange={handleDateChange}
                                // picker="year" // Only select the year
                                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                gpsCoordinates
                            </label>

                            <Input
                                name="gpsCoordinates"
                                value={formData.gpsCoordinates}
                                onChange={handleChange}
                                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                            />
                            {/* <textarea
                                name="gpsCoordinates"
                                value={formData.gpsCoordinates}
                                onChange={handleChange}
                                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                            /> */}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                completionRate
                            </label>
                            <InputNumber
                                type="number"
                                name="completionRate"
                                value={formData.completionRate || null}
                                min={1}
                                max={100}
                                defaultValue={1}
                                onChange={handleNumberChange}
                                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                            />
                            {/* <input
                                type="number"
                                name="completionRate"
                                value={formData.completionRate || ''}
                                onChange={handleChange}
                            /> */}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                address
                            </label>
                            <Input
                                name="address"
                                value={formData.address}
                                onChange={handleChange}
                                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                            />
                            {/* <textarea
                                name="address"
                                value={formData.address}
                                onChange={handleChange}
                                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                            /> */}
                        </div>

                        {/* Technical Details */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Technical Details
                            </label>
                            <textarea
                                name="technicalDetails"
                                value={formData.technicalDetails}
                                onChange={handleChange}
                                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                            />
                        </div>

                        {/* Structural Characteristics */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Structural Characteristics
                            </label>
                            <textarea
                                name="structuralCharacteristics"
                                value={formData.structuralCharacteristics}
                                onChange={handleChange}
                                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                            />
                        </div>

                        {/* Additional Information */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Additional Information
                            </label>
                            <textarea
                                name="additionalInformation"
                                value={formData.additionalInformation}
                                onChange={handleChange}
                                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Images
                            </label>
                            <input
                                type="file"
                                name="image"
                                onChange={handleFileChange}
                                multiple // Разрешаем загрузку нескольких файлов
                                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                            />
                        </div>

                        {/* Submit Button */}
                        <div>
                            <button
                                type="submit"
                                className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600">
                                Create Object
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default CreateObjectPage;
