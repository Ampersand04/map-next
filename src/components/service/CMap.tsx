import React, { useContext, useCallback, useState } from 'react';
import {
    YMap,
    YMapMarker,
    YMapDefaultSchemeLayer,
    YMapDefaultFeaturesLayer,
    YMapComponentsProvider,
    YMapCustomClusterer,
    YMapDefaultMarker,
    YMapListener,
} from 'ymap3-components';
import { DomEventHandler, LngLat } from '@yandex/ymaps3-types';
import './styles.scss';
import { apiKey, location } from './helpers';
import { ObjectContext } from '@/providers/objectsProvider';
import SidePanel from '../application/sidePanel/SidePanel';
import Image from 'next/image';
import { Spin } from 'antd';

interface ObjectData {
    id: string;
    gpsCoordinates: string | null;
    name?: string;
}

const CMap = () => {
    const { objects, loading } = useContext(ObjectContext);
    const [selectedObjectId, setSelectedObjectId] = useState(null);
    const [markerActive, setMarkerActive] = useState(false);

    // Преобразуем данные объектов в точки для карты
    const points = objects
        ?.filter((item) => item.gpsCoordinates !== null)
        ?.map((item) => {
            if (item.gpsCoordinates) {
                const [latitude, longitude] = item.gpsCoordinates.split(',').map(Number); // Извлекаем координаты
                return {
                    type: 'Feature',
                    id: String(item.id),
                    geometry: {
                        type: 'Point',
                        coordinates: [longitude, latitude], // Меняем местами широту и долготу
                    },
                };
            }
            return null;
        })
        .filter((point): point is Feature => point !== null);

    const marker = useCallback(
        (feature: any) => (
            <YMapMarker
                key={feature.id}
                coordinates={feature.geometry.coordinates}
                onClick={() => setSelectedObjectId(feature.id)}>
                <div
                    className="hover:cursor-pointer"
                    // onMouseOver={() => markerMouseOver(feature.id)}
                    // onMouseOut={() => markerMouseOut(feature.id)}
                >
                    <div className={`${feature.name ? 'visible' : 'hidden'}`}>{[feature.name]}</div>
                    <div className="w-10 h-10 rounded-3xl border-2 border-blue-main">
                        <Image src={'/industrial-icon.svg'} alt="" width={40} height={40} />
                    </div>
                </div>
            </YMapMarker>
        ),
        [],
    );

    console.log(points);
    const cluster = useCallback(
        (coordinates: LngLat, features: any) => (
            <YMapMarker coordinates={coordinates}>
                <span
                    style={{
                        borderRadius: '50%',
                        background: '#406BDC',
                        color: 'white',
                        width: 42,
                        height: 42,
                        outline: 'solid 3px #406BDC',
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

    const onMouseClick: DomEventHandler = useCallback((event) => {
        setMarkerActive(true);
    }, []);

    if (loading) {
        return (
            <div className="w-full flex justify-center items-center" style={{ height: '100vh' }}>
                <Spin />
            </div>
        );
    }

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
                <YMapListener onClick={onMouseClick} />
                <SidePanel
                    selectedObjectId={selectedObjectId}
                    onClose={() => setSelectedObjectId(null)}
                />
            </YMap>
        </YMapComponentsProvider>
    );
};

export default CMap;