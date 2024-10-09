import { ObjectContext } from '@/providers/objectsProvider';
import React, { useContext } from 'react';

interface ObjectData {
    id: string;
    name: string | null;
    gpsCoordinates: string | null;
    yearOfConstruction: string | null;
    completionRate: string | null;
    isArchived: boolean;
    address: string | null;
}

interface SidePanelProps {
    selectedObjectId: string | null; // ID выбранного объекта
    onClose: () => void; // Функция для закрытия боковой панели
}

const SidePanel: React.FC<SidePanelProps> = ({ selectedObjectId, onClose }) => {
    const objects: ObjectData[] = useContext(ObjectContext); // Получаем данные из контекста
    const selectedObject = objects.find((obj: ObjectData) => obj.id === selectedObjectId); // Находим выбранный объект

    if (!selectedObject) return null; // Если объекта нет, ничего не отображаем

    return (
        <aside className="text-text fixed left-0 top-0 w-80 h-full mt-[73px] bg-white shadow-lg rounded-lg p-5">
            <h2 className="text-xl font-bold">{selectedObject.name || 'Неизвестный объект'}</h2>
            <p>
                <strong>Адрес:</strong> {selectedObject.address || 'Нет данных'}
            </p>
            <p>
                <strong>Год постройки:</strong> {selectedObject.yearOfConstruction || 'Нет данных'}
            </p>
            <p>
                <strong>Процент завершения:</strong> {selectedObject.completionRate || 'Нет данных'}
            </p>
            <button onClick={onClose} className="mt-4 bg-red-500 text-white py-1 px-2 rounded">
                Закрыть
            </button>
        </aside>
    );
};

export default SidePanel;
