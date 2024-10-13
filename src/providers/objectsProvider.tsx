// context/ObjectContext.tsx
import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

// Интерфейсы для данных объекта и контекста
interface ObjectData {
    id: string;
    type: string | null;
    name: string | null;
    gpsCoordinates: string | null;
    yearOfConstruction: string | null;
    completionRate: number | null;
    isArchived: boolean;
    address: string | null;
}

interface ObjectContextProps {
    objects: ObjectData[];
    loading: boolean;
}

// Создаем контекст
export const ObjectContext = createContext<ObjectContextProps>({
    objects: [],
    loading: true,
});

// Провайдер контекста
export const ObjectProvider = ({ children }: { children: React.ReactNode }) => {
    const [objects, setObjects] = useState<ObjectData[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    const fetchObjects = async () => {
        setLoading(true); // Устанавливаем состояние загрузки
        try {
            const response = await axios.get('/api/objects');
            setObjects(response.data);
        } catch (error) {
            console.error('Error fetching objects:', error);
        } finally {
            setLoading(false); // Отключаем загрузку после получения данных
        }
    };
    useEffect(() => {
        fetchObjects();
    }, []);

    return <ObjectContext.Provider value={{ objects, loading }}>{children}</ObjectContext.Provider>;
};
