import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { auth } from '@/auth';

export async function GET() {
    try {
        const objects = await prisma.object.findMany({
            select: {
                id: true,
                name: true,
                gpsCoordinates: true,
                // Добавьте другие поля, которые вам нужны
                yearOfConstruction: true,
                completionRate: true,
                isArchived: true,
                address: true,
            },
        });

        console.log(objects);
        return NextResponse.json(objects, { status: 200 });
    } catch (error) {
        console.error('Error fetching objects:', error);
        return NextResponse.json({ error: 'Error fetching objects' }, { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        const session = await auth();

        if (!session?.user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

        const creatorId = session?.user?.id;
        if (!creatorId) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const data = await req.json();

        const object = await prisma.object.create({
            data: {
                type: data.type,
                name: data.name,
                yearOfConstruction: data.yearOfConstruction,
                gpsCoordinates: data.gpsCoordinates,
                address: data.address,
                completionRate: data.completionRate,
                technicalDetails: data.technicalDetails,
                structuralCharacteristics: data.structuralCharacteristics,
                additionalInformation: data.additionalInformation,
                creatorId,
            },
        });

        // Return the created object as JSON
        return NextResponse.json(object, { status: 201 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Error creating object' }, { status: 500 });
    }
}
