'use client';
import Header from '@/components/application/header/header';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation'; // Импортируйте useRouter из next/navigation
import { ObjectProvider } from '@/providers/objectsProvider';
import CMap from '@/components/service/CMap';
import SidePanel from '@/components/application/sidePanel/SidePanel';

export default function Service() {
    const router = useRouter();
    const [selectedObjectId, setSelectedObjectId] = useState(null);
    const [isPanelOpen, setIsPanelOpen] = useState(false); // Состояние для боковой панели

    useEffect(() => {
        if (selectedObjectId) {
            setIsPanelOpen(true); // Открываем боковую панель, если объект был передан в URL
            console.log('Opening object with ID:', objectId);
        }
    }, [router]);

    return (
        <div className="h-[100vh]">
            <Header
                setSelectedObjectId={setSelectedObjectId} // Передаем функцию для установки выбранного объекта
                setIsPanelOpen={setIsPanelOpen} // Передаем функцию для открытия боковой панели
            />
            <ObjectProvider>
                <CMap
                    height={'full'}
                    selectedObjectId={selectedObjectId}
                    setSelectedObjectId={setSelectedObjectId}
                />
                <SidePanel
                    selectedObjectId={selectedObjectId}
                    onClose={() => setSelectedObjectId(null)}
                />
            </ObjectProvider>
        </div>
    );
}
