import { MapContainer, TileLayer } from 'react-leaflet';
import "leaflet/dist/leaflet.css";

export default function MapView({children, ...props}) {
  

  return (
    <MapContainer style={{ height: 536 }} className='bg-red-600' {...props} zoom={13} scrollWheelZoom={false}>
      <TileLayer
        attribution='&copy; knots agency'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {children}
      
      
    </MapContainer>
  );
}