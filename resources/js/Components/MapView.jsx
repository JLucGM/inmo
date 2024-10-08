import { MapContainer, Marker, Popup, TileLayer, useMapEvents } from 'react-leaflet';
import "leaflet/dist/leaflet.css";
import { useState } from 'react';

export default function MapView({children, props}) {
  

  return (
    <MapContainer style={{ height: 536 }} className='bg-red-600' center={[51.505, -0.09]} zoom={13} scrollWheelZoom={false}>
      <TileLayer
        attribution='&copy; knots agency'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {children}
      
      
    </MapContainer>
  );
}