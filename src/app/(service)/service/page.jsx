'use client';
import Header from '@/components/application/header/header';
import CMap from '@/components/service/CMap';
import { ObjectProvider } from '@/providers/objectsProvider';
import React from 'react';

export default function Service() {
    return (
        <div className="h-[100vh]">
            <Header />
            <ObjectProvider>
                <CMap
                    // center={[37.623082, 55.75254]}
                    // zoom={9}
                    // width={'full'}
                    height={'full'}
                />
            </ObjectProvider>
        </div>
    );
}
