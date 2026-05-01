import React, { useState, useEffect, useCallback } from 'react';
import Map, { Marker, NavigationControl } from 'react-map-gl/maplibre';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import { MapPin } from 'lucide-react';

export default function LocationPickerMap({ value, onChange, className = "" }) {
    // default center: Bogotá
    const defaultCenter = { lat: 4.6097, lng: -74.0817 }; 

    const [marker, setMarker] = useState(null);
    const [viewState, setViewState] = useState({
        longitude: defaultCenter.lng,
        latitude: defaultCenter.lat,
        zoom: 12
    });
    
    // Bandera para evitar sobrescrituras cíclicas si el componente vuelve a renderizar
    const [isInitialized, setIsInitialized] = useState(false);

    useEffect(() => {
        if (value && !isInitialized) {
            const parts = value.split(',').map(s => parseFloat(s.trim()));
            if (parts.length === 2 && !isNaN(parts[0]) && !isNaN(parts[1])) {
                const lat = parts[0];
                const lng = parts[1];
                setMarker({ lat, lng });
                setViewState(prev => ({ ...prev, latitude: lat, longitude: lng, zoom: 15 }));
                setIsInitialized(true);
            }
        }
    }, [value, isInitialized]);

    const updateLocation = useCallback((lat, lng) => {
        setMarker({ lat, lng });
        if (onChange) {
            onChange(`${lat.toFixed(6)}, ${lng.toFixed(6)}`);
        }
    }, [onChange]);

    const onMarkerDragEnd = useCallback((event) => {
        const lngLat = event.lngLat;
        updateLocation(lngLat.lat, lngLat.lng);
    }, [updateLocation]);

    const onMapClick = useCallback((event) => {
        const lngLat = event.lngLat;
        updateLocation(lngLat.lat, lngLat.lng);
    }, [updateLocation]);

    return (
        <div className={`relative w-full h-[400px] rounded-lg overflow-hidden border dark:border-gray-800 ${className}`}>
            <Map
                {...viewState}
                onMove={evt => setViewState(evt.viewState)}
                onClick={onMapClick}
                mapStyle="https://basemaps.cartocdn.com/gl/positron-gl-style/style.json"
                mapLib={maplibregl}
                cursor={marker ? 'pointer' : 'crosshair'}
                attributionControl={false}
            >
                <NavigationControl position="bottom-right" />
                
                {marker && (
                    <Marker
                        longitude={marker.lng}
                        latitude={marker.lat}
                        anchor="bottom"
                        draggable
                        onDragEnd={onMarkerDragEnd}
                    >
                        <MapPin className="text-red-500 w-8 h-8 fill-red-100/50 drop-shadow-md cursor-grab active:cursor-grabbing hover:scale-110 transition-transform" />
                    </Marker>
                )}
            </Map>
            <div className="absolute top-3 left-3 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm px-3 py-2 rounded-md text-sm font-medium shadow-sm border dark:border-gray-700 z-10 pointer-events-none">
                {marker 
                    ? `Lat: ${marker.lat.toFixed(4)} | Lng: ${marker.lng.toFixed(4)}` 
                    : 'Haz clic en el mapa para ubicar'}
            </div>
            {!marker && (
                <div className="absolute inset-0 bg-black/5 pointer-events-none z-[5]" />
            )}
        </div>
    );
}
