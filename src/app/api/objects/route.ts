import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { auth } from '@/auth';
import { v2 as cloudinary } from 'cloudinary';
import { Readable } from 'stream';

export async function GET() {
    try {
        const objects = await prisma.object.findMany({
            select: {
                id: true,
                name: true,
                type: true,
                images: true,
                gpsCoordinates: true,
                // Добавьте другие поля, которые вам нужны
                yearOfConstruction: true,
                completionRate: true,
                isArchived: true,
                address: true,
            },
        });

        return NextResponse.json(objects, { status: 200 });
    } catch (error) {
        console.error('Error fetching objects:', error);
        return NextResponse.json({ error: 'Error fetching objects' }, { status: 500 });
    }
}

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(req: Request) {
    try {
        // Проверяем сессию пользователя
        const session = await auth();
        if (!session?.user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

        const creatorId = session.user.id;
        if (!creatorId) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const formData = await req.formData();
        console.log('Form Data:', Array.from(formData.entries())); // Логируем все данные формы

        const data: any = { images: [] }; // Объект для хранения данных формы
        formData.forEach((value, key) => {
            console.log(`Key: ${key}, Value:`, value); // Логируем ключи и значения
            if (key === 'images[]') {
                // Используйте ключ 'images[]' для изображений
                data.images.push(value); // Сохраняем изображения в массив
            } else {
                data[key] = value; // Сохраняем остальные данные
            }
        });

        // Проверяем, есть ли изображения
        if (!data.images.length) {
            console.error('No images found in data:', data); // Логируем, если изображения отсутствуют
            return NextResponse.json({ error: 'No images provided' }, { status: 400 });
        }

        // Функция для загрузки изображения в Cloudinary
        const uploadImage = (file: File) => {
            return new Promise((resolve, reject) => {
                const stream = cloudinary.uploader.upload_stream(
                    { folder: 'your-folder-name' },
                    (error, result) => {
                        if (error) {
                            return reject(error);
                        }
                        resolve(result.secure_url); // Возвращаем URL загруженного изображения
                    },
                );

                // Создаем ReadableStream из объекта File
                const readableStream = Readable.from(file.stream());
                readableStream.pipe(stream); // Пайпим поток в upload_stream
            });
        };

        // Загрузка изображений
        const imageUrls = await Promise.all(
            data.images.map(async (file: File) => {
                return await uploadImage(file);
            }),
        );

        // Создание объекта в базе данных
        const object = await prisma.object.create({
            data: {
                type: data.type,
                name: data.name,
                yearOfConstruction: data.yearOfConstruction,
                gpsCoordinates: data.gpsCoordinates,
                address: data.address,
                completionRate: parseInt(data.completionRate, 10) || null, // Убедитесь, что значение является числом
                technicalDetails: data.technicalDetails || null,
                structuralCharacteristics: undefined,
                additionalInformation: undefined,
                creatorId,
                images: imageUrls, // Сохраните URL-адреса загруженных изображений
            },
        });

        // Вернуть созданный объект как JSON
        return NextResponse.json(object, { status: 201 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Error creating object' }, { status: 500 });
    }
}

export async function PUT(req: Request) {
    try {
        // Проверяем сессию пользователя
        const session = await auth();
        if (!session?.user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

        const creatorId = session.user.id;
        if (!creatorId) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const { id } = req.query; // Получаем ID объекта из запроса

        // Проверка на наличие id и его тип
        if (!id || typeof id !== 'string') {
            return NextResponse.json({ error: 'Invalid id provided' }, { status: 400 });
        }

        const formData = await req.formData();
        console.log('Form Data:', Array.from(formData.entries())); // Логируем все данные формы

        const data: any = { images: [] }; // Объект для хранения данных формы
        formData.forEach((value, key) => {
            console.log(`Key: ${key}, Value:`, value); // Логируем ключи и значения
            if (key === 'images[]') {
                data.images.push(value); // Сохраняем изображения в массив
            } else {
                data[key] = value; // Сохраняем остальные данные
            }
        });

        // Функция для загрузки изображения в Cloudinary
        const uploadImage = (file: File) => {
            return new Promise((resolve, reject) => {
                const stream = cloudinary.uploader.upload_stream(
                    { folder: 'your-folder-name' },
                    (error, result) => {
                        if (error) {
                            return reject(error);
                        }
                        resolve(result.secure_url); // Возвращаем URL загруженного изображения
                    },
                );

                // Создаем ReadableStream из объекта File
                const readableStream = Readable.from(file.stream());
                readableStream.pipe(stream); // Пайпим поток в upload_stream
            });
        };

        // Загрузка изображений, если они есть
        let imageUrls = [];
        if (data.images.length > 0) {
            imageUrls = await Promise.all(
                data.images.map(async (file: File) => {
                    return await uploadImage(file);
                }),
            );
        }

        // Обновление объекта в базе данных
        const updatedObject = await prisma.object.update({
            where: { id },
            data: {
                type: data.type,
                name: data.name,
                yearOfConstruction: data.yearOfConstruction,
                gpsCoordinates: data.gpsCoordinates,
                address: data.address,
                completionRate: parseInt(data.completionRate, 10) || null,
                technicalDetails: data.technicalDetails || null,
                structuralCharacteristics: undefined,
                additionalInformation: undefined,
                creatorId,
                images: {
                    // Обновляем URL-адреса изображений только если они были загружены
                    set: imageUrls.length > 0 ? imageUrls : undefined,
                },
            },
        });

        // Вернуть обновленный объект как JSON
        return NextResponse.json(updatedObject, { status: 200 });
    } catch (error) {
        console.error('Error updating object:', error);
        return NextResponse.json({ error: 'Error updating object' }, { status: 500 });
    }
}

export async function DELETE(req: Request) {
    try {
        const { id } = await req.json(); // Извлекаем id из запроса

        // Проверка на наличие id и его тип
        if (!id || typeof id !== 'string') {
            return NextResponse.json({ error: 'Invalid id provided' }, { status: 400 });
        }

        const deletedObject = await prisma.object.delete({
            where: { id },
        });

        return NextResponse.json(deletedObject, { status: 200 });
    } catch (error) {
        console.error('Error deleting object:', error);
        return NextResponse.json({ error: 'Error deleting object' }, { status: 500 });
    }
}
