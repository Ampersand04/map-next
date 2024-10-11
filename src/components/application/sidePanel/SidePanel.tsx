import { ObjectContext } from '@/providers/objectsProvider';
import Image from 'next/image';
import React, { useContext } from 'react';
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
}

interface SidePanelProps {
    selectedObjectId: string | null; // ID выбранного объекта
    onClose: () => void; // Функция для закрытия боковой панели
}

const SidePanel: React.FC<SidePanelProps> = ({ selectedObjectId, onClose }) => {
    const { objects } = useContext(ObjectContext); // Получаем данные из контекста
    const selectedObject = objects.find((obj: ObjectData) => obj.id === selectedObjectId); // Находим выбранный объект

    // if (loading) {
    //     return (
    //         <aside className="text-text fixed left-0 top-0 w-[450px] h-full mt-[73px] bg-white shadow-lg rounded-lg flex items-center justify-center">
    //             <Spin />
    //         </aside>
    //     );
    // }

    if (!selectedObject) return null; // Если объекта нет, ничего не отображаем

    const objectTypeConvert = () => {
        switch (selectedObject.type) {
            case 'RESIDENTIAL':
                return 'Промышленный объект';
            default:
                return 'Неизвестный тип';
        }
    };
    return (
        <aside className="text-text fixed left-0 top-[73px] w-[450px] h-[calc(100%-73px)] bg-white shadow-lg rounded-lg overflow-y-scroll">
            <div>
                <div className="flex flex-col gap-4 p-5">
                    <div className="flex flex-col gap-4">
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

                            {/* <button
                            onClick={onClose}
                            className="bg-red-500 text-white py-0 px-2 rounded">
                            Закрыть
                        </button> */}
                        </div>
                        <div className="flex items-center flex-col gap-3 w-full">
                            <div className="bg-text h-[220px] w-full"></div>
                            <div className="flex justify-center items-center gap-1 w-full">
                                <div className="bg-text h-2 w-2 rounded-md"></div>
                                <div className="bg-text h-2 w-2 rounded-md"></div>
                                <div className="bg-text h-2 w-2 rounded-md"></div>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col gap-4 text-text">
                        <h2 className="text-xl font-bold">
                            {selectedObject.name || 'Неизвестный объект'}
                        </h2>

                        <div className="flex flex-col">
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
                                            content={
                                                selectedObject.yearOfConstruction || 'Нет данных'
                                            }
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
                            <Accordion
                                title="Технические характеристики"
                                content={
                                    <div className="flex flex-col gap-2.5">
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
                            <Accordion
                                title="Конструктивные характеристики"
                                content={
                                    <div className="flex flex-col gap-2.5">
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
                </div>
                <div className="flex flex-col bg-gray mt-8 p-6 pb-8 ">Интерактивная карта</div>
            </div>
        </aside>
    );
};

export default SidePanel;
