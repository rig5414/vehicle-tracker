"use client"

import { useEffect, useRef, useState } from "react"
import dynamic from 'next/dynamic'
import 'leaflet/dist/leaflet.css'
import { format } from "date-fns"
import L from "leaflet"

// Dynamically import Leaflet components
const MapContainer = dynamic(
  () => import('react-leaflet').then((mod) => mod.MapContainer),
  { ssr: false }
)

const TileLayer = dynamic(
  () => import('react-leaflet').then((mod) => mod.TileLayer),
  { ssr: false }
)

const Marker = dynamic(
  () => import('react-leaflet').then((mod) => mod.Marker),
  { ssr: false }
)

const Popup = dynamic(
  () => import('react-leaflet').then((mod) => mod.Popup),
  { ssr: false }
)

const Polyline = dynamic(
  () => import('react-leaflet').then((mod) => mod.Polyline),
  { ssr: false }
)

interface MapMarker {
  id: string
  plateNumber: string
  lat: number
  lng: number
  timestamp: Date
}

// Mock data for map markers
const mapMarkers = [
  { id: "1", plateNumber: "KAA 123A", lat: -1.286389, lng: 36.817223, timestamp: new Date(2023, 4, 15, 14, 30) }, // Nairobi
  { id: "2", plateNumber: "KAA 123A", lat: -1.292066, lng: 36.821945, timestamp: new Date(2023, 4, 14, 9, 15) }, // Nairobi
  { id: "3", plateNumber: "KAA 123A", lat: -1.300000, lng: 36.800000, timestamp: new Date(2023, 4, 12, 17, 45) }, // Nairobi
  { id: "4", plateNumber: "KBC 456B", lat: -4.043477, lng: 39.668206, timestamp: new Date(2023, 4, 10, 11, 20) }, // Mombasa
  { id: "5", plateNumber: "KBC 456B", lat: -4.051056, lng: 39.666443, timestamp: new Date(2023, 4, 8, 8, 10) }, // Mombasa
  { id: "6", plateNumber: "KDA 789C", lat: -0.091702, lng: 34.768016, timestamp: new Date(2023, 4, 7, 16, 45) }, // Kisumu
  { id: "7", plateNumber: "KDA 789C", lat: -0.102206, lng: 34.761711, timestamp: new Date(2023, 4, 6, 12, 30) }, // Kisumu
  { id: "8", plateNumber: "KCE 234D", lat: 0.514277, lng: 35.269779, timestamp: new Date(2023, 4, 5, 10, 15) }, // Eldoret
]

// Custom marker icon
const icon = new L.Icon({
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

// Group markers by plate number
const groupMarkersByPlate = (markers: MapMarker[]) => {
  return markers.reduce((groups, marker) => {
    const group = groups[marker.plateNumber] || [];
    groups[marker.plateNumber] = [...group, marker].sort((a, b) => a.timestamp.getTime() - b.timestamp.getTime());
    return groups;
  }, {} as Record<string, MapMarker[]>);
};

interface MapViewProps {
  selectedPlate?: string;
  showPaths?: boolean;
  showMarkers?: boolean;
  currentDate?: Date;
  clusterMarkers?: boolean;
}

export function MapView({ 
  selectedPlate,
  showPaths = true,
  showMarkers = true,
  currentDate,
  clusterMarkers = false
}: MapViewProps) {
  const [map, setMap] = useState<L.Map | null>(null);
  const markerGroups = groupMarkersByPlate(mapMarkers);
  
  // Filter markers based on selected plate and date
  const filteredMarkers = mapMarkers.filter(marker => {
    const matchesPlate = !selectedPlate || marker.plateNumber === selectedPlate;
    const matchesDate = !currentDate || marker.timestamp <= currentDate;
    return matchesPlate && matchesDate;
  });

  // Calculate center and bounds
  useEffect(() => {
    if (map && filteredMarkers.length > 0) {
      const bounds = L.latLngBounds(filteredMarkers.map(m => [m.lat, m.lng]));
      map.fitBounds(bounds, { padding: [50, 50] });
    }
  }, [map, filteredMarkers]);

  return (
    <div className="h-[600px] w-full rounded-lg overflow-hidden">
      <MapContainer
        center={[-1.286389, 36.817223]} // Nairobi, Kenya
        zoom={12}
        style={{ height: "100%", width: "100%" }}
        ref={setMap}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        {Object.entries(markerGroups).map(([plateNumber, markers]) => {
          if (selectedPlate && plateNumber !== selectedPlate) return null;
          
          const filteredGroupMarkers = markers.filter(m => !currentDate || m.timestamp <= currentDate);
          
          return (
            <div key={plateNumber}>
              {showPaths && (
                <Polyline
                  positions={filteredGroupMarkers.map(m => [m.lat, m.lng])}
                  color={`hsl(${(plateNumber.charCodeAt(0) * 100) % 360}, 70%, 50%)`}
                  weight={3}
                  opacity={0.6}
                />
              )}
              {showMarkers && filteredGroupMarkers.map(marker => (
                <Marker
                  key={marker.id}
                  position={[marker.lat, marker.lng]}
                  icon={icon}
                >
                  <Popup>
                    <div className="p-2">
                      <p className="font-semibold">{marker.plateNumber}</p>
                      <p className="text-sm text-muted-foreground">
                        {format(marker.timestamp, "PPp")}
                      </p>
                    </div>
                  </Popup>
                </Marker>
              ))}
            </div>
          );
        })}
      </MapContainer>
    </div>
  )
}
