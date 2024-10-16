import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

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
    filters: any; // Добавьте тип для фильтров
    setFilters: (filters: any) => void; // Функция для обновления фильтров
}

export const ObjectContext = createContext<ObjectContextProps>({
    objects: [],
    loading: true,
    filters: {},
    setFilters: () => {},
});

// Провайдер контекста
export const ObjectProvider = ({ children }: { children: React.ReactNode }) => {
    const [objects, setObjects] = useState<ObjectData[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [filters, setFilters] = useState({}); // Добавьте состояние для фильтров

    const fetchObjects = async () => {
        setLoading(true);
        try {
            const response = await axios.get('/api/objects');
            setObjects(response.data);
        } catch (error) {
            console.error('Error fetching objects:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchObjects();
    }, []);

    return (
        <ObjectContext.Provider value={{ objects, loading, filters, setFilters }}>
            {children}
        </ObjectContext.Provider>
    );
};
