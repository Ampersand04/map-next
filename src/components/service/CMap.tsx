import React, { useContext, useCallback, useState } from "react";
import {
    YMap,
    YMapMarker,
    YMapDefaultSchemeLayer,
    YMapDefaultFeaturesLayer,
    YMapComponentsProvider,
    YMapCustomClusterer,
    YMapDefaultMarker,
    YMapListener,
    YMapHintContext,
    YMapHint,
} from "ymap3-components";
import { DomEventHandler, LngLat } from "@yandex/ymaps3-types";
import "./styles.scss";
import { apiKey, location } from "./helpers";
import { ObjectContext } from "@/providers/objectsProvider";
import SidePanel from "../application/sidePanel/SidePanel";
import Image from "next/image";
import { Spin } from "antd";
import dayjs from "dayjs";
import { ObjectType } from "@prisma/client";

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

    const iconMap = (type: ObjectType): string => {
        switch (type) {
            case ObjectType.RESIDENTIAL:
                return "/residential-icon.svg";
            case ObjectType.PUBLIC_OFFICE:
                return "/public-office-icon.svg";
            case ObjectType.EDUCATIONAL:
                return "/educational-icon.svg";
            case ObjectType.HEALTHCARE:
                return "/healthcare-icon.svg";
            case ObjectType.TRADE:
                return "/trade-icon.svg";
            case ObjectType.CULTURAL:
                return "/cultural-icon.svg";
            case ObjectType.CATERING:
                return "/catering-icon.svg";
            case ObjectType.INDUSTRIAL:
                return "/industrial-icon.svg";
            case ObjectType.URBAN_INFRASTRUCTURE:
                return "/urban-infrastructure-icon.svg";
            case ObjectType.TRANSPORT_INFRASTRUCTURE:
                return "/transport-infrastructure-icon.svg";
            case ObjectType.RELIGIOUS:
                return "/religious-icon.svg";
            case ObjectType.CIVIL_DEFENSE:
                return "/civil-defense-icon.svg";
            case ObjectType.WAREHOUSE:
                return "/warehouse-icon.svg";
            case ObjectType.NON_RESIDENTIAL:
                return "/non-residential-icon.svg";
            case ObjectType.COMPLEX_DEVELOPMENT:
                return "/complex-development-icon.svg";
            case ObjectType.TEMPORARY:
                return "/temporary-icon.svg";
            case ObjectType.UNFINISHED_CONSTRUCTION:
                return "/unfinished-construction-icon.svg";
            case ObjectType.OTHER:
            default:
                return "/other-icon.svg";
        }
    };

    // Преобразуем данные объектов в точки для карты
    const points = filteredObjects
        ?.filter((item) => item.gpsCoordinates !== null)
        ?.map((item) => {
            if (item.gpsCoordinates) {
                const [latitude, longitude] = item.gpsCoordinates.split(",").map(Number); // Извлекаем координаты
                return {
                    type: "Feature",
                    id: String(item.id),
                    objectType: item.type,
                    geometry: {
                        type: "Point",
                        coordinates: [longitude, latitude], // Меняем местами широту и долготу
                    },
                    properties: {
                        hint: { title: item.name, text: "Дополнительная информация" }, // Содержимое подсказки
                    },
                };
            }
            return null;
        })
        .filter((point): point is Feature => point !== null);

    const marker = useCallback((feature: any) => {
        // console.log(objectType);

        return (
            <YMapMarker
                key={feature.id}
                coordinates={feature.geometry.coordinates}
                onClick={() => setSelectedObjectId(feature.id)}>
                <div
                    className="hover:cursor-pointer"
                    // onMouseOver={() => markerMouseOver(feature.id)}
                    // onMouseOut={() => markerMouseOut(feature.id)}
                >
                    <div className={`${feature.name ? "visible" : "hidden"}`}>{[feature.name]}</div>
                    <div className="w-10 h-10 rounded-3xl border-2 border-blue-main">
                        <Image src={iconMap(feature.objectType)} alt="" width={40} height={40} />
                    </div>
                </div>
            </YMapMarker>
        );
    }, []);

    console.log(points);
    const cluster = useCallback(
        (coordinates: LngLat, features: any) => (
            <YMapMarker coordinates={coordinates}>
                <span
                    style={{
                        borderRadius: "50%",
                        background: "#406BDC",
                        color: "white",
                        width: 42,
                        height: 42,
                        outline: "solid 3px #406BDC",
                        outlineOffset: "3px",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                    }}>
                    {features.length}
                </span>
            </YMapMarker>
        ),
        [],
    );

    function HintWindow(feature: any) {
        const hintContext = useContext(YMapHintContext) as unknown as {
            hint: { title: string; text: string };
        };

        return hintContext ? (
            <div className="hint_window">
                <div className="hint_window__title">{feature.type}</div>
                {/* <div>{hintContext.hint.text}</div> */}
            </div>
        ) : null;
    }

    const onMouseClick: DomEventHandler = useCallback((event) => {
        setMarkerActive(true);
    }, []);

    if (loading) {
        return (
            <div className="w-full flex justify-center items-center" style={{ height: "100vh" }}>
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
                <YMapHint
                    hint={(feature) =>
                        feature?.properties !== undefined && feature.properties.hint
                    }>
                    <HintWindow />
                </YMapHint>
                <YMapListener onClick={onMouseClick} />
            </YMap>
        </YMapComponentsProvider>
    );
};

export default CMap;
