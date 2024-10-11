// src/app/api/suggestions/route.ts

import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma'; // Import Prisma instance

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const query = searchParams.get('query');

    if (!query) {
        return NextResponse.json({ suggestions: [] });
    }

    try {
        const results = await prisma.object.findMany({
            where: {
                name: {
                    contains: query, // Matches partially by name
                    mode: 'insensitive', // Case insensitive search
                },
            },
            select: {
                name: true,
                address: true,
                images: true, // Assuming your model has an icon field
            },
            take: 10, // Limit the results to 10 suggestions
        });

        return NextResponse.json({ suggestions: results });
    } catch (error) {
        console.error('Error fetching suggestions:', error);
        return NextResponse.json({ error: 'Error fetching suggestions' }, { status: 500 });
    }
}
