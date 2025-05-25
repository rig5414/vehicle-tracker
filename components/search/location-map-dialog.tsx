"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { useState, useEffect } from 'react';
import * as L from 'leaflet';
import { Card, CardContent } from "../ui/card";
import { Badge } from "@/components/ui/badge";
import 'leaflet/dist/leaflet.css';

interface LocationMapDialogProps {
  isOpen: boolean;
  onClose: () => void;
  sighting: {
    id: string;
    plateNumber: string;
    timestamp: Date;
    location: string;
  };
  sightingsHistory: Array<{
    id: string;
    plateNumber: string;
    timestamp: Date;
    location: string;
    coordinates?: [number, number];
  }>;
}

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

// Mock geocoding function - replace with actual geocoding service
const geocodeLocation = async (location: string): Promise<[number, number]> => {
  // This should be replaced with actual geocoding service
  // For now, returning random coordinates around London
  const baseCoords: [number, number] = [51.505, -0.09];
  return [
    baseCoords[0] + (Math.random() - 0.5) * 0.02,
    baseCoords[1] + (Math.random() - 0.5) * 0.02
  ];
};

export function LocationMapDialog({ isOpen, onClose, sighting, sightingsHistory }: LocationMapDialogProps) {
  const [coordinates, setCoordinates] = useState<[number, number] | null>(null);
  const [mapZoomed, setMapZoomed] = useState(false);
  const [allSightingCoords, setAllSightingCoords] = useState<Array<[number, number]>>([]);
  const [bounds, setBounds] = useState<L.LatLngBounds | null>(null);

  useEffect(() => {
    const loadCoordinates = async () => {
      if (sighting && sighting.location) {
        const coords = await geocodeLocation(sighting.location);
        setCoordinates(coords);
      }

      // Geocode all historical sightings
      const coordsPromises = sightingsHistory.map(s => geocodeLocation(s.location));
      const allCoords = await Promise.all(coordsPromises);
      setAllSightingCoords(allCoords);

      // Calculate bounds to fit all markers
      if (allCoords.length > 0) {
        const bounds = L.latLngBounds(allCoords.map(coord => L.latLng(coord[0], coord[1])));
        setBounds(bounds);
      }
    };

    if (isOpen) {
      loadCoordinates();
    }
  }, [isOpen, sighting, sightingsHistory]);

  if (!isOpen || !coordinates) return null;

  return (
    <Dialog open={isOpen} onOpenChange={() => onClose()}>
      <DialogContent className="max-w-7xl w-full h-[95vh]">
        <DialogHeader className="pb-2">
          <DialogTitle>Location History for {sighting.plateNumber}</DialogTitle>
        </DialogHeader>
        <div className="grid lg:grid-cols-3 gap-4 h-[calc(100%-3rem)]">
          <Card className="lg:col-span-2 h-full">
            <CardContent className="p-0 h-full">
              <div className="h-full w-full rounded-lg overflow-hidden">
                <MapContainer
                  center={coordinates}
                  zoom={13}
                  style={{ height: "100%", width: "100%" }}
                  bounds={bounds || undefined}
                  whenReady={() => setMapZoomed(true)}
                >
                  <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  />
                  {allSightingCoords.map((coords, index) => (
                    <Marker 
                      key={sightingsHistory[index].id}
                      position={coords}
                      icon={icon}
                    >
                      <Popup>
                        <div className="text-sm">
                          <p className="font-semibold">{sightingsHistory[index].location}</p>
                          <p className="text-muted-foreground">
                            {sightingsHistory[index].timestamp.toLocaleString()}
                          </p>
                        </div>
                      </Popup>
                    </Marker>
                  ))}
                </MapContainer>
              </div>
            </CardContent>
          </Card>
          <Card className="h-full flex flex-col">
            <CardContent className="p-4 flex-1 flex flex-col min-h-0">
              <h3 className="font-semibold mb-4">Recent Sightings Timeline</h3>
              <div className="overflow-y-auto flex-1 pr-2">
                {sightingsHistory.map((historySighting, index) => (
                  <div 
                    key={historySighting.id}
                    className="flex items-center justify-between py-2 border-b last:border-0 hover:bg-accent/50 rounded-lg px-2 transition-colors group"
                  >
                    <div className="flex items-start gap-3 min-w-0">
                      <div className="mt-1 flex flex-col items-center">
                        <div className="w-2 h-2 rounded-full bg-primary" />
                        {index !== sightingsHistory.length - 1 && (
                          <div className="w-0.5 flex-1 bg-border mt-1" />
                        )}
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="font-medium truncate">{historySighting.location}</p>
                        <p className="text-sm text-muted-foreground">
                          {historySighting.timestamp.toLocaleString()}
                        </p>
                      </div>
                    </div>
                    <Badge variant="outline" className="ml-2 shrink-0">
                      {index === 0 ? "Latest" : `${index + 1}`}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );
}
