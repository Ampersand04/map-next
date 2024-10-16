'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui';

interface FormData {
    name: string;
    email: string;
    image: File | null;
    phoneNumber: string;
    password: string;
    role: string;
}

// Dummy data for aside menu (You can adjust this)
const menu = [
    { title: 'Create User', pageUrl: '/users/create' },
    { title: 'Dashboard', pageUrl: '/dashboard' },
];

interface CreateUserPageProps {
    pageName: string;
    backLink: string;
}

const CreateUserPage: React.FC<CreateUserPageProps> = (pageName, backLink) => {
    const [formData, setFormData] = useState<FormData>({
        name: '',
        email: '',
        phoneNumber: '',
        password: '',
        image: null,
        role: 'USER', // Default role
    });

    const router = useRouter();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files && files.length > 0) {
            setFormData({
                ...formData,
                image: files[0], // Set the first selected file
            });
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const data = new FormData();
        Object.entries(formData).forEach(([key, value]) => {
            if (key === 'image' && value) {
                data.append(key, value); // Append the file
            } else {
                data.append(key, value as string); // Append other fields as strings
            }
        });

        try {
            const res = await fetch('/api/users', {
                method: 'POST',
                // Remove the Content-Type header
                body: data, // Send the form data directly
            });

            if (res.ok) {
                // Redirect to user list or success page
                router.push('/dashboard/users');
            } else {
                const errorData = await res.json();
                console.error('Failed to create user:', errorData.error);
            }
            router.replace('/dashboard/users');
        } catch (error) {
            console.error('Error creating user:', error);
        }
    };

    return (
        <div className="rounded-lg p-3 w-full h-full">
            <div className=" justify-between items-center pt-6">
                <Button
                    className="absolute top-5"
                    href="/dashboard/users"
                    back
                    intent="redirect"
                    size="small">
                    Назад
                </Button>
                <h2 className="text-xl font-bold">Создание пользователя</h2>
            </div>

            <div className="bg-white my-5 p-5 rounded-lg">
                {/* Form to create user */}
                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Name */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">ФИО</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="mt-1 block w-[300px] p-2 border border-gray-300 rounded-md"
                            required
                        />
                    </div>

                    {/* Email */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">e-mail</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="mt-1 block w-[300px] p-2 border border-gray-300 rounded-md"
                            required
                        />
                    </div>

                    {/* Phone Number */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Номер телефона
                        </label>
                        <input
                            type="text"
                            name="phoneNumber"
                            value={formData.phoneNumber}
                            onChange={handleChange}
                            className="mt-1 block w-[300px] p-2 border border-gray-300 rounded-md"
                            required
                        />
                    </div>

                    {/* Password */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Пароль</label>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            className="mt-1 block w-[300px] p-2 border border-gray-300 rounded-md"
                            required
                        />
                    </div>

                    {/* Role */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Role</label>
                        <select
                            name="role"
                            value={formData.role}
                            onChange={handleChange}
                            className="mt-1 block w-[300px] p-2 border border-gray-300 rounded-md"
                            required>
                            <option value="USER">Обычный</option>
                            <option value="MANAGER">Менеджер</option>
                            <option value="ADMIN">Администратов</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Аватар</label>
                        <input
                            type="file"
                            name="image"
                            accept="image/*"
                            onChange={handleFileChange}
                            className="mt-1 block w-[300px] p-2 border border-gray-300 rounded-md"
                        />
                    </div>

                    {/* Submit Button */}
                    <div>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600">
                            Создать пользователя
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateUserPage;
