import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { MapView } from "@/components/map/map-view"
import { MapControls } from "@/components/map/map-controls"
import { MapTimeline } from "@/components/map/map-timeline"

export default function MapPage() {
  return (
    <div className="container mx-auto py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Map View</h1>
        <p className="text-muted-foreground mt-2">Visualize vehicle sightings and track movement patterns</p>
      </div>

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
    </div>
  )
}
