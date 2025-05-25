'use client';

import { useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import * as L from 'leaflet';
import 'leaflet/dist/leaflet.css';

interface Sighting {
  id: number;
  lat: number;
  lng: number;
  plate: string;
  timestamp: string;
}

const sampleSightings: Sighting[] = [
  { id: 1, lat: -1.286389, lng: 36.817223, plate: "KAA 123A", timestamp: "2024-03-23 10:00" },
  { id: 2, lat: -4.043477, lng: 39.668206, plate: "KBC 456B", timestamp: "2024-03-23 10:15" },
  { id: 3, lat: -0.091702, lng: 34.768016, plate: "KDA 789C", timestamp: "2024-03-23 10:30" },
];

// Define the icon outside the component to prevent recreation
const icon = new L.Icon({
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

export default function LeafletMap() {
  const mapRef = useRef<L.Map | null>(null);

  useEffect(() => {
    // Cleanup function to properly destroy the map instance
    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, []);

  return (
    <div id="map" className="h-[400px] w-full rounded-lg overflow-hidden">
      <MapContainer
        ref={mapRef}
        center={[-1.286389, 36.817223]}
        zoom={13}
        style={{ height: '100%', width: '100%' }}
        scrollWheelZoom={false}
        // Add key to force remount if needed
        key="primary-map"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {sampleSightings.map((sighting) => (
          <Marker
            key={sighting.id}
            position={[sighting.lat, sighting.lng]}
            icon={icon}
          >
            <Popup>
              <div className="p-2">
                <p className="font-bold">Plate: {sighting.plate}</p>
                <p className="text-sm text-gray-600">Time: {sighting.timestamp}</p>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
