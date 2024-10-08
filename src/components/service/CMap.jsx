import React, { useCallback, useRef } from 'react';
import {
    YMap,
    YMapMarker,
    YMapDefaultSchemeLayer,
    YMapDefaultFeaturesLayer,
    YMapComponentsProvider,
    YMapDefaultMarker,
    YMapCustomClusterer,
    // ...other components
} from 'ymap3-components';
import { location as LOCATION, features, apiKey, points } from './helpers';

const CMap = () => {
    const marker = useCallback(
        (feature) => <YMapDefaultMarker coordinates={feature.geometry.coordinates} />,
        [],
    );

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
    const ymap3Ref = useRef();
    console.log('API Key:', process.env.REACT_APP_YMAP_KEY);
    const location = { center: [23.685098, 52.093756], zoom: 14.5 };
    return (
        <YMapComponentsProvider apiKey={apiKey}>
            <YMap
                key="map"
                ref={ymap3Ref}
                location={location}
                mode="vector"
                // theme="dark"
            >
                <YMapCustomClusterer
                    marker={marker}
                    cluster={cluster}
                    gridSize={64}
                    features={points}
                />
                <YMapDefaultSchemeLayer />
                <YMapDefaultFeaturesLayer />
                {/* <YMapDefaultMarker coordinates={LOCATION.center} /> */}
                {/* <YMapDefaultMarker coordinates={[37.95, 55.65]} /> */}
            </YMap>
        </YMapComponentsProvider>
    );
};

export default CMap;
