// context/ObjectContext.tsx
import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

// Создаем контекст
export const ObjectContext = createContext([]);

// Провайдер контекста
export const ObjectProvider = ({ children }: { children: React.ReactNode }) => {
    const [objects, setObjects] = useState([]);

    useEffect(() => {
        const fetchObjects = async () => {
            try {
                const response = await axios.get('/api/objects');
                setObjects(response.data);
            } catch (error) {
                console.error('Error fetching objects:', error);
            }
        };
        fetchObjects();
    }, []);

    return <ObjectContext.Provider value={objects}>{children}</ObjectContext.Provider>;
};
