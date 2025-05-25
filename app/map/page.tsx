import MapClient from "./MapClient";

export default function MapPage() {
  return (
    <div className="container mx-auto py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Map View</h1>
        <p className="text-muted-foreground mt-2">Visualize vehicle sightings and track movement patterns</p>
      </div>
      <MapClient />
    </div>
  );
}
