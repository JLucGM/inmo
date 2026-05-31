import { useRef, useState, useEffect } from 'react';
import Map, { Marker, NavigationControl, Popup } from 'react-map-gl/maplibre';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import { MapPin } from 'lucide-react';
import { Link } from '@inertiajs/react';

function parseCoordinate(coordinate) {
  if (!coordinate) return null;
  const parts = coordinate.split(',').map(s => parseFloat(s.trim()));
  if (parts.length !== 2 || isNaN(parts[0]) || isNaN(parts[1])) return null;
  return { latitude: parts[0], longitude: parts[1] };
}

export default function PropertyMapView({
  properties,
  coordinate,
  className,
  hoveredPropertyId,
  setting,
}) {
  const mapRef = useRef(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [popupInfo, setPopupInfo] = useState(null);

  const markers = coordinate
    ? [parseCoordinate(coordinate)].filter(Boolean)
    : (properties || [])
        .map(p => {
          const coords = parseCoordinate(p.coordinate);
          return coords ? { ...p, ...coords } : null;
        })
        .filter(Boolean);

  useEffect(() => {
    if (!mapLoaded || markers.length === 0) return;
    const map = mapRef.current?.getMap();
    if (!map) return;

    const bounds = new maplibregl.LngLatBounds();
    markers.forEach(m => bounds.extend([m.longitude, m.latitude]));
    map.fitBounds(bounds, { padding: 50, maxZoom: 16 });
  }, [mapLoaded, markers.length]);

  const defaultView = markers.length > 0
    ? { latitude: markers[0].latitude, longitude: markers[0].longitude, zoom: 12 }
    : { latitude: 10, longitude: -66, zoom: 5 };

  return (
    <div className={`h-full rounded-xl overflow-hidden border dark:border-gray-800 ${className || ''}`}>
      <Map
        ref={mapRef}
        initialViewState={defaultView}
        mapStyle="https://basemaps.cartocdn.com/gl/positron-gl-style/style.json"
        mapLib={maplibregl}
        attributionControl={false}
        onLoad={() => setMapLoaded(true)}
        style={{ width: '100%', height: '100%' }}
      >
        <NavigationControl position="bottom-right" />
        {markers.map((m, i) => {
          const isHovered = m.id === hoveredPropertyId;
          return (
            <Marker
              key={m.id || i}
              longitude={m.longitude}
              latitude={m.latitude}
              anchor="bottom"
              onClick={(e) => {
                e.originalEvent.stopPropagation();
                if (m.slug) setPopupInfo(m);
              }}
            >
              <MapPin
                className={`-mb-2 drop-shadow-md transition-all duration-200 ${
                  isHovered
                    ? 'text-black w-10 h-10 scale-125'
                    : 'text-red-500 w-8 h-8'
                } ${m.slug ? 'cursor-pointer' : ''}`}
              />
            </Marker>
          );
        })}
        {popupInfo && (
          <Popup
            longitude={popupInfo.longitude}
            latitude={popupInfo.latitude}
            anchor="bottom"
            onClose={() => setPopupInfo(null)}
            closeButton={true}
            className="z-50"
            offset={15}
          >
            <Link
              href={route('property.show', popupInfo.slug)}
              className="flex gap-3 items-start no-underline"
            >
              {popupInfo.media?.[0]?.original_url ? (
                <img
                  src={popupInfo.media[0].original_url}
                  alt={popupInfo.name}
                  className="w-10 h-10 rounded-md object-cover flex-shrink-0"
                />
              ) : (
                <div className="w-10 h-10 rounded-md bg-gray-100 flex items-center justify-center flex-shrink-0">
                  <span className="text-gray-400 text-xs">—</span>
                </div>
              )}
              <div className="min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">
                  {popupInfo.name}
                </p>
                <p className="text-xs text-gray-500 truncate">
                  {popupInfo.country?.name || ''}{popupInfo.country?.name && popupInfo.state?.name ? ', ' : ''}{popupInfo.state?.name || ''}
                </p>
                <p className="text-xs font-semibold text-gray-900">
                  {setting?.currency?.symbol || '$'}{popupInfo.price}
                </p>
              </div>
            </Link>
          </Popup>
        )}
      </Map>
    </div>
  );
}
