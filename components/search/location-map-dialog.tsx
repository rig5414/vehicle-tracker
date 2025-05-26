"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useState, useEffect } from 'react';
import { Card, CardContent } from "../ui/card";
import { Badge } from "@/components/ui/badge";
import dynamic from 'next/dynamic';
import * as L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Dynamically import react-leaflet components with no SSR
const Map = dynamic(
  () => import('react-leaflet').then((mod) => mod.MapContainer),
  { ssr: false }
);

const TileLayerComponent = dynamic(
  () => import('react-leaflet').then((mod) => mod.TileLayer),
  { ssr: false }
);

const MarkerComponent = dynamic(
  () => import('react-leaflet').then((mod) => mod.Marker),
  { ssr: false }
);

const PopupComponent = dynamic(
  () => import('react-leaflet').then((mod) => mod.Popup),
  { ssr: false }
);

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
  // Kenyan locations for demonstration
  const locations: Record<string, [number, number]> = {
    'Nairobi': [-1.286389, 36.817223],
    'Mombasa': [-4.043477, 39.668206],
    'Kisumu': [-0.091702, 34.768016],
    'Eldoret': [0.514277, 35.269779],
    'Thika': [-1.0334, 37.0693],
    'Nakuru': [-0.303099, 36.080025],
    'Moi Avenue, Nairobi': [-1.28333, 36.81667],
    'Mombasa Road, Nairobi': [-1.3200, 36.8500],
    'Main Market, Kisumu': [-0.102206, 34.761711],
    'Thika Superhighway, Nairobi': [-1.2000, 36.9000],
  };
  for (const key in locations) {
    if (location.includes(key)) {
      return locations[key];
    }
  }
  // Default to Nairobi
  return [-1.286389, 36.817223];
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
        <div className="relative h-full w-full">
          {coordinates && (
            <Map
              center={coordinates}
              zoom={13}
              className="h-[calc(95vh-4rem)] w-full rounded-md"
              bounds={bounds || undefined}
            >
              <TileLayerComponent
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              />
              {allSightingCoords.map((coords, index) => (
                <MarkerComponent
                  key={sightingsHistory[index].id}
                  position={coords}
                  icon={icon}
                >
                  <PopupComponent>
                    <div className="p-2">
                      <p className="font-semibold">{sightingsHistory[index].plateNumber}</p>
                      <p className="text-sm">{sightingsHistory[index].location}</p>
                      <p className="text-xs text-gray-600">
                        {sightingsHistory[index].timestamp.toLocaleString()}
                      </p>
                    </div>
                  </PopupComponent>
                </MarkerComponent>
              ))}
            </Map>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
