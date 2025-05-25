"use client"

import { useEffect, useRef, useState } from "react"
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet'
import * as L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { format } from "date-fns"

interface MapMarker {
  id: string
  plateNumber: string
  lat: number
  lng: number
  timestamp: Date
}

// Mock data for map markers
const mapMarkers = [
  { id: "1", plateNumber: "ABC123", lat: 40.7128, lng: -74.006, timestamp: new Date(2023, 4, 15, 14, 30) },
  { id: "2", plateNumber: "ABC123", lat: 40.7328, lng: -73.986, timestamp: new Date(2023, 4, 14, 9, 15) },
  { id: "3", plateNumber: "ABC123", lat: 40.7228, lng: -74.026, timestamp: new Date(2023, 4, 12, 17, 45) },
  { id: "4", plateNumber: "XYZ789", lat: 40.7028, lng: -74.016, timestamp: new Date(2023, 4, 10, 11, 20) },
  { id: "5", plateNumber: "XYZ789", lat: 40.7428, lng: -73.996, timestamp: new Date(2023, 4, 8, 8, 10) },
  { id: "6", plateNumber: "DEF456", lat: 40.7528, lng: -74.026, timestamp: new Date(2023, 4, 7, 16, 45) },
  { id: "7", plateNumber: "DEF456", lat: 40.7628, lng: -74.036, timestamp: new Date(2023, 4, 6, 12, 30) },
  { id: "8", plateNumber: "GHI789", lat: 40.7728, lng: -74.046, timestamp: new Date(2023, 4, 5, 10, 15) },
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
        center={[40.7128, -74.006]} // Default to NYC coordinates
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
