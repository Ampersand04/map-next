import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma'; // Import Prisma instance

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const query = searchParams.get('query');
    const type = searchParams.getAll('type');
    const yearFrom = searchParams.get('yearFrom')
        ? parseInt(searchParams.get('yearFrom')!)
        : undefined;
    const yearTo = searchParams.get('yearTo') ? parseInt(searchParams.get('yearTo')!) : undefined;
    const region = searchParams.get('region');
    const city = searchParams.get('city');
    const wearFrom = searchParams.get('wearFrom')
        ? parseInt(searchParams.get('wearFrom')!)
        : undefined;
    const wearTo = searchParams.get('wearTo') ? parseInt(searchParams.get('wearTo')!) : undefined;
    const readinessFrom = searchParams.get('readinessFrom')
        ? parseInt(searchParams.get('readinessFrom')!)
        : undefined;
    const readinessTo = searchParams.get('readinessTo')
        ? parseInt(searchParams.get('readinessTo')!)
        : undefined;

    if (!query) {
        return NextResponse.json({ suggestions: [] });
    }

    try {
        const results = await prisma.object.findMany({
            where: {
                name: {
                    contains: query, // Частичное совпадение по имени
                    mode: 'insensitive', // Регистронезависимый поиск
                },
                // Учитываем назначение объекта (если оно передано)
                // type: { equals: type },

                // Учитываем диапазон годов постройки (если переданы фильтры)
                yearOfConstruction: {
                    gte: yearFrom ? new Date(yearFrom, 0, 1) : undefined, // Если задано, начиная с года yearFrom
                    lte: yearTo ? new Date(yearTo, 11, 31) : undefined, // Если задано, до года yearTo
                },

                // Фильтрация по региону и городу (если указаны)
                address:
                    region || city
                        ? {
                              contains: region ? `${region || city}` : undefined, // Проверяем, есть ли регион в адресе
                          }
                        : undefined,

                // // Физический износ (если указан диапазон)
                // structuralCharacteristics: {
                //     wearPercent: {
                //         gte: wearFrom ?? 0, // Минимальный процент износа (если указан)
                //         lte: wearTo ?? 100, // Максимальный процент износа (если указан)
                //     },
                // },

                // Процент готовности (если указан диапазон)
                completionRate: {
                    gte: readinessFrom ?? 0, // Минимальный процент готовности
                    lte: readinessTo ?? 100, // Максимальный процент готовности
                },

                // Учитываем только не архивные объекты
                isArchived: false,
            },
            select: {
                id: true,
                name: true,
                address: true,
                gpsCoordinates: true,
                images: true, // Предполагается, что images хранит иконки или фотографии объекта
            },
            take: 10, // Лимитируем количество результатов до 10
        });

        return NextResponse.json({ suggestions: results });
    } catch (error) {
        console.error('Error fetching suggestions:', error);
        return NextResponse.json({ error: 'Error fetching suggestions' }, { status: 500 });
    }
}
