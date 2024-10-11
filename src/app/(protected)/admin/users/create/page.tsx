'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

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
    { title: 'Create User', pageUrl: '/admin/users/create' },
    { title: 'Dashboard', pageUrl: '/admin/dashboard' },
];

const CreateUserPage: React.FC = () => {
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
                router.push('/admin/users');
            } else {
                const errorData = await res.json();
                console.error('Failed to create user:', errorData.error);
            }
            router.replace('/admin/users');
        } catch (error) {
            console.error('Error creating user:', error);
        }
    };

    return (
        <div className="flex bg-admin-bg p-2 h-screen overflow-scroll">
            {/* Dashboard Aside */}
            {/* <DashboardAside menu={menu} /> */}

            {/* Dashboard Content */}
            <div className="flex-1 ml-4 p-6 bg-white rounded-lg">
                <h2 className="text-2xl font-bold mb-4">Create New User</h2>

                {/* Form to create user */}
                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Name */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Name</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                            required
                        />
                    </div>

                    {/* Email */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Email</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                            required
                        />
                    </div>

                    {/* Phone Number */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Phone Number
                        </label>
                        <input
                            type="text"
                            name="phoneNumber"
                            value={formData.phoneNumber}
                            onChange={handleChange}
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                            required
                        />
                    </div>

                    {/* Password */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Password</label>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
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
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                            required>
                            <option value="USER">User</option>
                            <option value="MANAGER">Manager</option>
                            <option value="ADMIN">Admin</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Images</label>
                        <input
                            type="file"
                            name="image"
                            accept="image/*"
                            onChange={handleFileChange}
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                        />
                    </div>

                    {/* Submit Button */}
                    <div>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600">
                            Create User
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateUserPage;
