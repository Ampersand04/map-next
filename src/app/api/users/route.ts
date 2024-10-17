import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma'; // Импортируйте ваш экземпляр Prisma
import { v2 as cloudinary } from 'cloudinary';
import { create } from '@/actions/create';

export async function GET() {
    try {
        const users = await prisma.user.findMany();
        return NextResponse.json(users);
    } catch (error) {
        return NextResponse.json({ error: 'Error fetching users' }, { status: 500 });
    }
}
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(req: Request) {
    try {
        const formData = await req.formData(); // Parse the FormData from the request
        const userData = Object.fromEntries(formData); // Convert FormData to a plain object

        // Call the register function with the validated user data
        const result = await create(userData);

        if (result.error) {
            return NextResponse.json({ error: result.error }, { status: 400 });
        }

        return NextResponse.json({ success: result.success }, { status: 201 });
    } catch (error) {
        console.error('Error creating user:', error);
        return NextResponse.json({ error: 'Error creating user' }, { status: 500 });
    }
}

// PUT-запрос для обновления пользователя
export async function PUT(req: Request) {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (!id) {
        return NextResponse.json({ error: 'ID is required' }, { status: 400 });
    }

    try {
        const formData = await req.formData(); // Получаем данные из тела запроса
        const updateData = Object.fromEntries(formData); // Преобразуем FormData в объект

        if (updateData.password === '') {
            delete updateData.password; // Не обновляем пароль, если поле пустое
        }

        const updatedUser = await prisma.user.update({
            where: { id },
            data: updateData, // Обновляем пользователя
        });

        return NextResponse.json(updatedUser, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: 'Error updating user' }, { status: 500 });
    }
}

export async function DELETE(req: Request) {
    const { id } = await req.json();

    if (!id) {
        return NextResponse.json({ error: 'ID is required' }, { status: 400 });
    }

    try {
        await prisma.user.delete({
            where: { id },
        });
        return NextResponse.json({ message: 'User deleted successfully' });
    } catch (error) {
        return NextResponse.json({ error: 'Error deleting user' }, { status: 500 });
    }
}
