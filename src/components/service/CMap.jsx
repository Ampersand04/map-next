import React, { useContext, useCallback, useState } from 'react';
import {
    YMap,
    YMapMarker,
    YMapDefaultSchemeLayer,
    YMapDefaultFeaturesLayer,
    YMapComponentsProvider,
    YMapCustomClusterer,
    YMapDefaultMarker,
} from 'ymap3-components';
import { apiKey } from './helpers';
import { ObjectContext } from '@/providers/objectsProvider';
import SidePanel from '../application/sidePanel/SidePanel';

const CMap = () => {
    const objects = useContext(ObjectContext); // Использование контекста
    const [selectedObjectId, setSelectedObjectId] = useState(null); // Состояние для ID выбранного объекта

    // Преобразуем данные объектов в точки для карты
    const points = objects
        ?.filter((item) => item.gpsCoordinates !== null)
        ?.map((item) => {
            const [latitude, longitude] = item.gpsCoordinates.split(',').map(Number); // Извлекаем координаты
            return {
                type: 'Feature',
                id: String(item.id),
                geometry: {
                    type: 'Point',
                    coordinates: [longitude, latitude], // Меняем местами широту и долготу
                },
            };
        });

    const marker = useCallback(
        (feature) => (
            <YMapDefaultMarker
                coordinates={feature.geometry.coordinates}
                onClick={() => setSelectedObjectId(feature.id)} // Установка выбранного объекта
            />
        ),
        [],
    );

    console.log(points);
    const cluster = useCallback(
        (coordinates, features) => (
            <YMapMarker coordinates={coordinates}>
                <span
                    style={{
                        borderRadius: '50%',
                        background: '#000000',
                        color: 'white',
                        width: 42,
                        height: 42,
                        outline: 'solid 3px #000',
                        outlineOffset: '3px',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}>
                    {features.length}
                </span>
            </YMapMarker>
        ),
        [],
    );

    const location = { center: [23.685098, 52.093756], zoom: 14.5 };

    return (
        <YMapComponentsProvider apiKey={apiKey}>
            <YMap key="map" location={location} mode="vector">
                <YMapCustomClusterer
                    marker={marker}
                    cluster={cluster}
                    gridSize={64}
                    features={points}
                />
                <YMapDefaultSchemeLayer />
                <YMapDefaultFeaturesLayer />
                <SidePanel
                    selectedObjectId={selectedObjectId}
                    onClose={() => setSelectedObjectId(null)} // Закрытие боковой панели
                />
            </YMap>
        </YMapComponentsProvider>
    );
};

export default CMap;
