"use client";

import { ObjectContext } from "@/providers/objectsProvider";
import Image from "next/image";
import React, { useContext, useState } from "react";
import Accordion from "../Accordion/Accordion";
import { Spin } from "antd";
import DefaultContentLine from "../Accordion/DefaultContentLine";
import { objectTypeConvert } from "@/lib/objextTypeConvert";
import dayjs from "dayjs";

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

    dashboard?: boolean;
}

const SidePanel: React.FC<SidePanelProps> = ({ selectedObjectId, onClose, dashboard }) => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { objects } = useContext(ObjectContext);
    const selectedObject = objects.find((obj: ObjectData) => obj.id === selectedObjectId);

    console.log(selectedObjectId, selectedObject);
    if (!selectedObject) return null;

    // Слайдер изображений
    const images = selectedObject?.images || ["/default-image.png"]; // Используем дефолтное изображение, если нет картинок

    const openModal = (index: number) => {
        setCurrentSlide(index);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const handlePrevSlide = () => {
        setCurrentSlide((prevSlide) => (prevSlide === 0 ? images.length - 1 : prevSlide - 1));
    };

    const handleNextSlide = () => {
        setCurrentSlide((prevSlide) => (prevSlide === images.length - 1 ? 0 : prevSlide + 1));
    };

    return (
        <aside
            className={`transition-all duration-500 text-text fixed ${
                dashboard ? "top-0 right-0 h-[100%]" : "top-[73px] left-0 h-[calc(100%-73px)]"
            } z-10 w-[450px] bg-white shadow-lg rounded-lg overflow-y-scroll`}
            onClick={(e) => {
                e.stopPropagation();
            }}>
            <div className="flex flex-col gap-4 p-5">
                <div className="flex justify-between items-center w-full">
                    <div className="flex items-center gap-2">
                        <Image src={"/industrial-icon.svg"} alt="" width={30} height={30} />
                        <p className="text-text-secondary text-sm font-semibold">
                            {objectTypeConvert(selectedObject?.type)}
                        </p>
                    </div>
                    <Image
                        src={"/clear.svg"}
                        alt=""
                        width={16}
                        height={16}
                        onClick={onClose}
                        className="hover:cursor-pointer"
                    />
                </div>

                {/* Слайдер изображений */}
                <div className="flex items-center flex-col w-full gap-3">
                    {/* Текущее изображение */}
                    <div
                        className="bg-text h-[220px] w-full flex items-center justify-center relative rounded-lg overflow-hidden"
                        onClick={() => openModal(currentSlide)}>
                        <Image
                            src={images[currentSlide] || "/default-image.png"}
                            alt={`Image ${currentSlide + 1}`}
                            layout="fill"
                            objectFit="cover"
                            className="rounded-md"
                        />
                        {/* Кнопка предыдущего слайда */}

                        {selectedObject?.images && selectedObject?.images.length > 1 && (
                            <div>
                                <button
                                    className="absolute left-2 bg-gray-200 hover:bg-gray-300 p-2 rounded-full"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handlePrevSlide();
                                    }}>
                                    ◀
                                </button>
                                <button
                                    className="absolute right-2 bg-gray-200 hover:bg-gray-300 p-2 rounded-full"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleNextSlide();
                                    }}>
                                    ▶
                                </button>
                                5
                            </div>
                        )}
                    </div>

                    {selectedObject?.images.length > 1 && (
                        <div className="flex justify-center items-center gap-1 w-full">
                            {images.map((_, index) => (
                                <div
                                    key={index}
                                    onClick={() => {
                                        setCurrentSlide(index);
                                    }}
                                    className={`h-2 w-2 rounded-md ${
                                        currentSlide === index
                                            ? "bg-text-secondary"
                                            : "bg-gray-secondary"
                                    }`}
                                />
                            ))}
                        </div>
                    )}
                </div>

                {/* Основные характеристики */}
                <div className="flex flex-col gap-4 text-text">
                    <h2 className="text-xl font-bold">
                        {selectedObject?.name || "Неизвестный объект"}
                    </h2>

                    <Accordion
                        open
                        title="Основные характеристики"
                        content={
                            <div className="flex flex-col gap-2.5">
                                <DefaultContentLine
                                    name="Назначение объекта"
                                    content={objectTypeConvert(selectedObject?.type)}
                                />

                                <DefaultContentLine
                                    name="Год постройки/ввода в эксплуатацию"
                                    content={
                                        dayjs(selectedObject?.yearOfConstruction).format(
                                            "DD.MM.YYYY",
                                        ) || "Нет данных"
                                    }
                                />

                                <DefaultContentLine
                                    name="Адрес"
                                    content={selectedObject?.address || "Нет данных"}
                                />

                                <DefaultContentLine
                                    name="Координаты"
                                    content={selectedObject?.gpsCoordinates || "Нет данных"}
                                />

                                <DefaultContentLine
                                    name="Процент готовности объекта"
                                    content={selectedObject?.completionRate || "Нет данных"}
                                />
                            </div>
                        }
                    />

                    <Accordion
                        title="Технические характеристики"
                        content={
                            <div className="flex flex-col gap-2.5">
                                <DefaultContentLine
                                    name="Технические характеристики"
                                    content={selectedObject?.technicalDetails || "Нет данных"}
                                />
                            </div>
                        }
                    />
                    <Accordion
                        title="Конструктивные характеристики"
                        content={
                            <div className="flex flex-col gap-2.5">
                                <DefaultContentLine
                                    name="Конструктивные характеристики"
                                    content={
                                        selectedObject?.structuralCharacteristics || "Нет данных"
                                    }
                                />
                            </div>
                        }
                    />
                </div>
            </div>
            <div className="flex flex-col bg-gray mt-8 p-6 pb-8">Интерактивная карта</div>
            {isModalOpen && (
                <div className="fixed inset-0 z-40 bg-black bg-opacity-75 flex items-center justify-center">
                    <div className="relative w-[90%] h-[70%]">
                        <Image
                            src={images[currentSlide] || "/default-image.png"}
                            alt={`Full image ${currentSlide + 1}`}
                            layout="fill"
                            objectFit="contain"
                        />
                        {images.length > 1 && (
                            <>
                                <button
                                    className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-gray-200 hover:bg-gray-300 p-3 rounded-full text-white text-2xl"
                                    onClick={handlePrevSlide}>
                                    ◀
                                </button>
                                <button
                                    className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-gray-200 hover:bg-gray-300 p-3 rounded-full text-white text-2xl"
                                    onClick={handleNextSlide}>
                                    ▶
                                </button>
                            </>
                        )}
                        <button
                            className="absolute top-4 right-4 text-white text-2xl z-50"
                            onClick={closeModal}>
                            <Image src={"/close.png"} alt="" width={20} height={20} />
                        </button>
                    </div>
                </div>
            )}
        </aside>
    );
};

export default SidePanel;
