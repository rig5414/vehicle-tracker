"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import dynamic from "next/dynamic";

const MapView = dynamic(() => import("@/components/map/map-view"), { ssr: false });
const MapControls = dynamic(() => import("@/components/map/map-controls"), { ssr: false });
const MapTimeline = dynamic(() => import("@/components/map/map-timeline"), { ssr: false });

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