import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
// import L from 'leaflet'; // Remove top-level import
import { Badge } from "@/components/ui/badge";
import { MapPin, Clock } from "lucide-react";

// Import Leaflet CSS
import 'leaflet/dist/leaflet.css';

interface MapComponentProps {
  center: [number, number];
  sightings: Array<{
    coords: [number, number];
    sighting: {
      id: string;
      plateNumber: string;
      timestamp: Date;
      location: string;
    };
  }>;
  currentSightingId: string;
  onMarkerClick: (id: string) => void;
}

// Move icon creation inside useEffect
// const currentIcon = new L.Icon({...});
// const historyIcon = new L.Icon({...});

export default function MapComponent({ center, sightings, currentSightingId, onMarkerClick }: MapComponentProps) {
  const [bounds, setBounds] = useState<L.LatLngBounds | null>(null);
  const [leafletLoaded, setLeafletLoaded] = useState(false);
  const [currentIcon, setCurrentIcon] = useState<L.Icon | null>(null);
  const [historyIcon, setHistoryIcon] = useState<L.Icon | null>(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);

    // Import leaflet and create icons client-side
    import('leaflet').then(L => {
      // Fix for default markers in Leaflet with webpack
      delete (L.Icon.Default.prototype as any)._getIconUrl;
      L.Icon.Default.mergeOptions({
        iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
        iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41]
      });

      // Create custom icons
      const current = new L.Icon({
        iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
        iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
        iconSize: [30, 48],
        iconAnchor: [15, 48],
        popupAnchor: [1, -40],
        shadowSize: [48, 48]
      });

      const history = new L.Icon({
        iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
        iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
        iconSize: [20, 32],
        iconAnchor: [10, 32],
        popupAnchor: [1, -28],
        shadowSize: [32, 32]
      });

      setCurrentIcon(current);
      setHistoryIcon(history);
      setLeafletLoaded(true);

      if (sightings.length > 0) {
        const coords = sightings.map(s => s.coords);
        const bounds = L.latLngBounds(coords.map(coord => L.latLng(coord[0], coord[1])));
        setBounds(bounds.pad(0.1)); // Add 10% padding
      }
    });
  }, [sightings]);

  return (
    <>
      {isClient ? (
        <MapContainer
          center={center}
          zoom={12}
          className="h-full w-full"
          bounds={bounds || undefined}
          style={{ height: '100%', width: '100%' }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          {leafletLoaded && currentIcon && historyIcon && sightings.map(({ coords, sighting }) => {
            const isCurrentSighting = sighting.id === currentSightingId;
            return (
              <Marker
                key={sighting.id}
                position={coords}
                icon={isCurrentSighting ? currentIcon : historyIcon}
                eventHandlers={{
                  click: () => onMarkerClick(sighting.id),
                }}
              >
                <Popup>
                  <div className="p-3 min-w-[200px]">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant={isCurrentSighting ? "default" : "secondary"}>
                        {isCurrentSighting ? "Current" : "Historical"}
                      </Badge>
                    </div>
                    <p className="font-semibold text-lg mb-1">
                      {sighting.plateNumber}
                    </p>
                    <div className="flex items-center gap-1 text-sm text-gray-600 mb-2">
                      <MapPin className="h-3 w-3" />
                      <span>{sighting.location}</span>
                    </div>
                    <div className="flex items-center gap-1 text-xs text-gray-500">
                      <Clock className="h-3 w-3" />
                      <span>{sighting.timestamp.toLocaleString()}</span>
                    </div>
                  </div>
                </Popup>
              </Marker>
            );
          })}
        </MapContainer>
      ) : null}
    </>
  );
}