// src/app/api/managers/route.ts
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
    try {
        const managers = await prisma.user.findMany({
            where: { role: 'MANAGER' }, // Фильтрация по роли менеджера
            include: {
                Object: true, // Включаем связанные объекты
            },
        });

        const formattedManagers = managers.map((manager) => ({
            id: manager.id,
            name: manager.name,
            email: manager.email,
            phoneNumber: manager.phoneNumber,
            status: manager.premium, // Используйте поле premium как статус
            createdAt: manager.createdAt,
            objectCount: manager.Object.length, // Количество объектов
        }));

        return NextResponse.json(formattedManagers);
    } catch (error) {
        return NextResponse.json({ error: 'Error fetching managers' }, { status: 500 });
    }
}
