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
import dayjs from 'dayjs';

interface ObjectData {
    id: string;
    gpsCoordinates: string | null;
    name?: string;
}

const CMap = ({ setSelectedObjectId }: { setSelectedObjectId: any }) => {
    const { objects, loading, filters } = useContext(ObjectContext);
    const [markerActive, setMarkerActive] = useState(false);

    const filteredObjects = objects.filter((item) => {
        if (filters.type && item.type !== filters.type) return false;
        if (filters.yearFrom && item.yearOfConstruction) {
            const itemYear = dayjs(item.yearOfConstruction).year();
            if (itemYear < filters.yearFrom) return false;
        }

        if (filters.yearTo && item.yearOfConstruction) {
            const itemYear = dayjs(item.yearOfConstruction).year();
            if (itemYear > filters.yearTo) return false;
        }

        // Фильтр по региону (region) - проверка региона в адресе
        // if (filters.region && item.address && !item.address.includes(filters.region)) return false;

        // Фильтр по городу (city) - проверка города в адресе
        // if (filters.city && item.address && !item.address.includes(filters.city)) return false;

        // Фильтр по физическому износу (wearFrom, wearTo)
        if (filters.wearFrom && item.wearRate !== null && item.wearRate < filters.wearFrom)
            return false;

        if (filters.wearTo && item.wearRate !== null && item.wearRate > filters.wearTo)
            return false;

        // Фильтр по степени готовности (readinessFrom, readinessTo)
        if (
            filters.readinessFrom &&
            item.completionRate !== null &&
            item.completionRate < filters.readinessFrom
        )
            return false;

        if (
            filters.readinessTo &&
            item.completionRate !== null &&
            item.completionRate > filters.readinessTo
        )
            return false;

        return true;
    });

    // Преобразуем данные объектов в точки для карты
    const points = filteredObjects
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
            </YMap>
        </YMapComponentsProvider>
    );
};

export default CMap;
