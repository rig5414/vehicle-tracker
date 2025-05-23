"use client"

import dynamic from 'next/dynamic'

// Dynamically import the map components with no SSR
const MapWithNoSSR = dynamic(
  () => import('./map-component').then((mod) => mod.MapComponent),
  {
    ssr: false,
    loading: () => (
      <div className="h-[400px] w-full flex items-center justify-center bg-muted/20 rounded-md">
        <p className="text-muted-foreground">Loading map...</p>
      </div>
    ),
  }
)

export function SightingsMap() {
  return (
    <div>
      <MapWithNoSSR />
    </div>
  )
}
