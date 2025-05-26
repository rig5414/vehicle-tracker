"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useState, useEffect } from 'react';
import { Card, CardContent } from "../ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Clock } from "lucide-react";
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

// Custom marker icons for current and historical sightings
const currentIcon = new L.Icon({
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  iconSize: [30, 48],
  iconAnchor: [15, 48],
  popupAnchor: [1, -40],
  shadowSize: [48, 48]
});

const historyIcon = new L.Icon({
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  iconSize: [20, 32],
  iconAnchor: [10, 32],
  popupAnchor: [1, -28],
  shadowSize: [32, 32]
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
  const [allSightingCoords, setAllSightingCoords] = useState<Array<[number, number]>>([]);
  const [bounds, setBounds] = useState<L.LatLngBounds | null>(null);
  const [selectedSighting, setSelectedSighting] = useState<string | null>(null);

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

      // Calculate bounds to fit all markers with padding
      if (allCoords.length > 0) {
        const bounds = L.latLngBounds(allCoords.map(coord => L.latLng(coord[0], coord[1])));
        setBounds(bounds.pad(0.1)); // Add 10% padding
      }
    };

    if (isOpen) {
      loadCoordinates();
      setSelectedSighting(null);
    }
  }, [isOpen, sighting, sightingsHistory]);

  if (!isOpen || !coordinates) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-[65vw] w-full h-[65vh] p-0 gap-0 rounded-md bg-gray-900 border-gray-700">
        {/* Header */}
        <div className="flex items-center gap-3 p-6 pb-4 border-b border-gray-700 bg-gray-900">
          <div className="p-2 bg-blue-600 rounded-lg">
            <MapPin className="h-5 w-5 text-white" />
          </div>
          <div>
            <DialogTitle className="text-xl font-semibold text-white">
              Location History for {sighting.plateNumber}
            </DialogTitle>
            <p className="text-sm text-gray-300 mt-1">
              {sightingsHistory.length} sighting{sightingsHistory.length !== 1 ? 's' : ''} recorded
            </p>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex flex-1 overflow-hidden">
          {/* Map Container */}
          <div className="flex-1 relative">
            {coordinates && (
              <Map
                center={coordinates}
                zoom={12}
                className="h-full w-full"
                bounds={bounds || undefined}
                style={{ height: '100%', width: '100%' }}
              >
                <TileLayerComponent
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                {allSightingCoords.map((coords, index) => {
                  const isCurrentSighting = sightingsHistory[index].id === sighting.id;
                  return (
                    <MarkerComponent
                      key={sightingsHistory[index].id}
                      position={coords}
                      icon={isCurrentSighting ? currentIcon : historyIcon}
                      eventHandlers={{
                        click: () => setSelectedSighting(sightingsHistory[index].id),
                      }}
                    >
                      <PopupComponent>
                        <div className="p-3 min-w-[200px]">
                          <div className="flex items-center gap-2 mb-2">
                            <Badge variant={isCurrentSighting ? "default" : "secondary"}>
                              {isCurrentSighting ? "Current" : "Historical"}
                            </Badge>
                          </div>
                          <p className="font-semibold text-lg mb-1">
                            {sightingsHistory[index].plateNumber}
                          </p>
                          <div className="flex items-center gap-1 text-sm text-gray-600 mb-2">
                            <MapPin className="h-3 w-3" />
                            <span>{sightingsHistory[index].location}</span>
                          </div>
                          <div className="flex items-center gap-1 text-xs text-gray-500">
                            <Clock className="h-3 w-3" />
                            <span>{sightingsHistory[index].timestamp.toLocaleString()}</span>
                          </div>
                        </div>
                      </PopupComponent>
                    </MarkerComponent>
                  );
                })}
              </Map>
            )}
          </div>

          {/* Sidebar */}
          <div className="w-80 border-l border-gray-700 bg-gray-900 flex flex-col">
            <div className="p-4 border-b border-gray-700 bg-gray-800">
              <h3 className="font-semibold text-white mb-2">Sighting History</h3>
              <p className="text-sm text-gray-300">
                Click on markers or items below to view details
              </p>
            </div>
            
            <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-900">
              {sightingsHistory
                .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
                .map((historySighting, index) => {
                  const isSelected = selectedSighting === historySighting.id;
                  const isCurrent = historySighting.id === sighting.id;
                  
                  return (
                    <Card 
                      key={historySighting.id}
                      className={`cursor-pointer transition-all duration-200 hover:shadow-lg border ${
                        isSelected 
                          ? 'ring-2 ring-blue-400 shadow-lg border-blue-400 bg-gray-800' 
                          : isCurrent 
                            ? 'border-blue-500 bg-gray-800/80' 
                            : 'border-gray-700 bg-gray-800/50 hover:border-gray-600 hover:bg-gray-800'
                      }`}
                      onClick={() => setSelectedSighting(
                        selectedSighting === historySighting.id ? null : historySighting.id
                      )}
                    >
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between mb-2">
                          <Badge 
                            variant={isCurrent ? "default" : "secondary"}
                            className={`text-xs ${
                              isCurrent 
                                ? "bg-blue-600 text-white hover:bg-blue-700" 
                                : "bg-gray-700 text-gray-200 hover:bg-gray-600"
                            }`}
                          >
                            {isCurrent ? "Current" : `#${sightingsHistory.length - index}`}
                          </Badge>
                          <span className="text-xs text-gray-400">
                            {historySighting.timestamp.toLocaleDateString()}
                          </span>
                        </div>
                        
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <MapPin className="h-4 w-4 text-gray-400 flex-shrink-0" />
                            <span className="text-sm font-medium text-white truncate">
                              {historySighting.location}
                            </span>
                          </div>
                          
                          <div className="flex items-center gap-2">
                            <Clock className="h-4 w-4 text-gray-400 flex-shrink-0" />
                            <span className="text-xs text-gray-300">
                              {historySighting.timestamp.toLocaleTimeString()}
                            </span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}