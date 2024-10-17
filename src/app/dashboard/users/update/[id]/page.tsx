'use client';

import React, { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation'; // useParams для получения id
import { Button } from '@/components/ui';

interface FormData {
    name: string;
    email: string;
    image: File | null;
    phoneNumber: string;
    password: string;
    role: string;
}

const UpdateUserPage: React.FC = () => {
    const [formData, setFormData] = useState<FormData>({
        name: '',
        email: '',
        phoneNumber: '',
        password: '',
        image: null,
        role: 'USER', // Default role
    });

    const router = useRouter();
    const params = useParams(); // Используем useParams для получения id из URL
    const userId = params.id; // Извлекаем id пользователя

    useEffect(() => {
        const fetchUserData = async () => {
            if (userId) {
                try {
                    const res = await fetch(`/api/users`);
                    if (!res.ok) {
                        throw new Error('Failed to fetch user data');
                    }
                    const userData = await res.json();
                    setFormData({
                        name: userData.name,
                        email: userData.email,
                        phoneNumber: userData.phoneNumber,
                        password: '', // Оставляем пустым для безопасности
                        image: null, // Оставляем пустым для изображения
                        role: userData.role,
                    });
                } catch (error) {
                    console.error('Error fetching user data:', error);
                }
            }
        };

        fetchUserData();
    }, [userId]);

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
                image: files[0], // Добавляем выбранный файл
            });
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const data = new FormData();
        Object.entries(formData).forEach(([key, value]) => {
            if (key === 'image' && value) {
                data.append(key, value); // Добавляем файл
            } else if (key !== 'password' || (key === 'password' && value)) {
                data.append(key, value as string);
            }
        });

        try {
            const res = await fetch(`/api/users?id=${userId}`, {
                method: 'PUT',
                body: data,
            });

            if (res.ok) {
                router.push('/dashboard/users'); // Перенаправляем после успешного обновления
            } else {
                const errorData = await res.json();
                console.error('Failed to update user:', errorData.error);
            }
        } catch (error) {
            console.error('Error updating user:', error);
        }
    };

    return (
        <div className="rounded-lg p-3 w-full h-full">
            <div className="justify-between items-center pt-6">
                <Button
                    className="absolute top-5"
                    href="/dashboard/users"
                    back
                    intent="redirect"
                    size="small">
                    Назад
                </Button>
                <h2 className="text-xl font-bold">Обновление пользователя</h2>
            </div>

            <div className="bg-white my-5 p-5 rounded-lg">
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
                        <label className="block text-sm font-medium text-gray-700">
                            Пароль (оставьте пустым, если не хотите менять)
                        </label>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            className="mt-1 block w-[300px] p-2 border border-gray-300 rounded-md"
                        />
                    </div>

                    {/* Role */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Роль</label>
                        <select
                            name="role"
                            value={formData.role}
                            onChange={handleChange}
                            className="mt-1 block w-[300px] p-2 border border-gray-300 rounded-md"
                            required>
                            <option value="USER">Обычный</option>
                            <option value="MANAGER">Менеджер</option>
                            <option value="ADMIN">Администратор</option>
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
                            Обновить пользователя
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UpdateUserPage;
