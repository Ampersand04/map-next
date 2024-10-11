'use client';

import React, { useState } from 'react';
import DashboardAside from '@/components/dashboard/dashboard-aside';
import { useRouter } from 'next/navigation';
import { object } from 'zod';

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

// Dummy data for aside menu (You can adjust this)
const menu = [
    { title: 'Create Object', pageUrl: '/admin/objects/create' },
    { title: 'Dashboard', pageUrl: '/admin/dashboard' },
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
                router.push('/admin/objects');
            } else {
                console.error('Failed to create object');
            }
        } catch (error) {
            console.error('Error creating object:', error);
        }
    };

    return (
        <div className="flex bg-admin-bg p-2 h-screen overflow-scroll">
            {/* Dashboard Aside */}
            {/* <DashboardAside menu={menu} /> */}

            {/* Dashboard Content */}
            <div className="flex-1 ml-4 p-6 bg-white rounded-lg">
                <h2 className="text-2xl font-bold mb-4">Create New Object</h2>

                {/* Form to create object */}
                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Object Type */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Type</label>
                        <input
                            type="text"
                            name="type"
                            value={formData.type}
                            onChange={handleChange}
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">name</label>
                        <textarea
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            yearOfConstruction
                        </label>
                        <textarea
                            name="yearOfConstruction"
                            value={formData.yearOfConstruction}
                            onChange={handleChange}
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            gpsCoordinates
                        </label>
                        <textarea
                            name="gpsCoordinates"
                            value={formData.gpsCoordinates}
                            onChange={handleChange}
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            completionRate
                        </label>
                        <input
                            type="number"
                            name="completionRate"
                            value={formData.completionRate || ''}
                            onChange={handleChange}
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">address</label>
                        <textarea
                            name="address"
                            value={formData.address}
                            onChange={handleChange}
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                        />
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
                        <label className="block text-sm font-medium text-gray-700">Images</label>
                        <input
                            type="file"
                            name="images"
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
    );
};

export default CreateObjectPage;
