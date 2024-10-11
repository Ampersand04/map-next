import { ObjectContext } from '@/providers/objectsProvider';
import Image from 'next/image';
import React, { useContext, useState } from 'react';
import Accordion from '../Accordion/Accordion';
import { Spin } from 'antd';
import DefaultContentLine from '../Accordion/DefaultContentLine';

interface ObjectData {
    id: string;
    type: string | null;
    name: string | null;
    gpsCoordinates: string | null;
    yearOfConstruction: string | null;
    completionRate: number | null;
    isArchived: boolean;
    address: string | null;
    images?: string[]; // массив изображений объекта
}

interface SidePanelProps {
    selectedObjectId: string | null; // ID выбранного объекта
    onClose: () => void; // Функция для закрытия боковой панели
}

const SidePanel: React.FC<SidePanelProps> = ({ selectedObjectId, onClose }) => {
    const { objects } = useContext(ObjectContext); // Получаем данные из контекста
    const selectedObject = objects.find((obj: ObjectData) => obj.id === selectedObjectId); // Находим выбранный объект

    // Если объекта нет, ничего не отображаем
    if (!selectedObject) return null;

    const objectTypeConvert = () => {
        switch (selectedObject.type) {
            case 'RESIDENTIAL':
                return 'Промышленный объект';
            default:
                return 'Неизвестный тип';
        }
    };

    // Слайдер изображений
    const [currentSlide, setCurrentSlide] = useState(0);
    const images = selectedObject.images || ['/default-image.png']; // Используем дефолтное изображение, если нет картинок

    const handlePrevSlide = () => {
        setCurrentSlide((prevSlide) => (prevSlide === 0 ? images.length - 1 : prevSlide - 1));
    };

    const handleNextSlide = () => {
        setCurrentSlide((prevSlide) => (prevSlide === images.length - 1 ? 0 : prevSlide + 1));
    };

    return (
        <aside className="text-text fixed left-0 top-[73px] w-[450px] h-[calc(100%-73px)] bg-white shadow-lg rounded-lg overflow-y-scroll">
            <div className="flex flex-col gap-4 p-5">
                <div className="flex justify-between items-center w-full">
                    <div className="flex items-center gap-2">
                        <Image src={'/industrial-icon.svg'} alt="" width={30} height={30} />
                        <p className="text-text-secondary text-sm font-semibold">
                            {objectTypeConvert()}
                        </p>
                    </div>
                    <Image
                        src={'/clear.svg'}
                        alt=""
                        width={16}
                        height={16}
                        onClick={onClose}
                        className="hover:cursor-pointer"
                    />
                </div>

                {/* Слайдер изображений */}
                <div className="flex items-center flex-col gap-3 w-full">
                    {/* Текущее изображение */}
                    <div className="bg-text h-[220px] w-full flex items-center justify-center relative">
                        <Image
                            src={images[currentSlide]}
                            alt={`Image ${currentSlide + 1}`}
                            layout="fill"
                            objectFit="cover"
                            className="rounded-md"
                        />
                        {/* Кнопка предыдущего слайда */}
                        <button
                            className="absolute left-2 bg-gray-200 hover:bg-gray-300 p-2 rounded-full"
                            onClick={handlePrevSlide}>
                            ◀
                        </button>
                        {/* Кнопка следующего слайда */}
                        <button
                            className="absolute right-2 bg-gray-200 hover:bg-gray-300 p-2 rounded-full"
                            onClick={handleNextSlide}>
                            ▶
                        </button>
                    </div>

                    {/* Индикаторы слайдов */}
                    <div className="flex justify-center items-center gap-1 w-full">
                        {images.map((_, index) => (
                            <div
                                key={index}
                                className={`h-2 w-2 rounded-md ${
                                    currentSlide === index ? 'bg-blue-500' : 'bg-gray-400'
                                }`}
                            />
                        ))}
                    </div>
                </div>

                {/* Основные характеристики */}
                <div className="flex flex-col gap-4 text-text">
                    <h2 className="text-xl font-bold">
                        {selectedObject.name || 'Неизвестный объект'}
                    </h2>

                    <Accordion
                        open
                        title="Основные характеристики"
                        content={
                            <div className="flex flex-col gap-2.5">
                                <DefaultContentLine
                                    name="Назначение объекта"
                                    content={objectTypeConvert()}
                                />

                                <DefaultContentLine
                                    name="Год постройки/ввода в эксплуатацию"
                                    content={selectedObject.yearOfConstruction || 'Нет данных'}
                                />

                                <DefaultContentLine
                                    name="Адрес"
                                    content={selectedObject.address || 'Нет данных'}
                                />

                                <DefaultContentLine
                                    name="Координаты"
                                    content={selectedObject.gpsCoordinates || 'Нет данных'}
                                />

                                <DefaultContentLine
                                    name="Процент готовности объекта"
                                    content={selectedObject.completionRate || 'Нет данных'}
                                />
                            </div>
                        }
                    />
                </div>
            </div>
            <div className="flex flex-col bg-gray mt-8 p-6 pb-8">Интерактивная карта</div>
        </aside>
    );
};

export default SidePanel;
