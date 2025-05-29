"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import dynamic from "next/dynamic";

// Import map components with noSSR
const MapView = dynamic(
  () => import("@/components/map/map-view").then((mod) => mod.MapView),
  { 
    ssr: false,
    loading: () => (
      <div className="w-full h-[600px] flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    )
  }
);

const MapControls = dynamic(
  () => import("@/components/map/map-controls").then((mod) => mod.MapControls),
  { ssr: false }
);

const MapTimeline = dynamic(
  () => import("@/components/map/map-timeline").then((mod) => mod.MapTimeline),
  { ssr: false }
);

export default function MapClient() {
  return (
    <div className="grid gap-6 grid-cols-1 lg:grid-cols-4">
      <Card className="lg:col-span-3">
        <CardHeader>
          <CardTitle>Vehicle Sightings Map</CardTitle>
          <CardDescription>Geographic visualization of all vehicle sightings</CardDescription>
        </CardHeader>
        <CardContent>
          <MapView />
        </CardContent>
      </Card>

      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Map Controls</CardTitle>
            <CardDescription>Filter and customize the map view</CardDescription>
          </CardHeader>
          <CardContent>
            <MapControls />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Timeline</CardTitle>
            <CardDescription>View sightings over time</CardDescription>
          </CardHeader>
          <CardContent>
            <MapTimeline />
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 