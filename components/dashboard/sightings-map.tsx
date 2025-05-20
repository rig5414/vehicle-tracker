"use client"

import { useEffect, useRef } from "react"

// Mock data for map markers
const mapMarkers = [
  { lat: 40.7128, lng: -74.006, count: 42 },
  { lat: 40.7328, lng: -73.986, count: 36 },
  { lat: 40.7228, lng: -74.026, count: 28 },
  { lat: 40.7028, lng: -74.016, count: 21 },
  { lat: 40.7428, lng: -73.996, count: 14 },
]

export function SightingsMap() {
  const mapRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // This is a placeholder for a real map implementation
    // In a real application, you would use a library like Mapbox, Google Maps, or Leaflet
    if (mapRef.current) {
      const canvas = document.createElement("canvas")
      canvas.width = mapRef.current.clientWidth
      canvas.height = mapRef.current.clientHeight
      mapRef.current.appendChild(canvas)

      const ctx = canvas.getContext("2d")
      if (ctx) {
        // Draw a simple map background
        ctx.fillStyle = "#f0f0f0"
        ctx.fillRect(0, 0, canvas.width, canvas.height)

        // Draw some grid lines
        ctx.strokeStyle = "#ddd"
        ctx.lineWidth = 1
        for (let i = 0; i < canvas.width; i += 40) {
          ctx.beginPath()
          ctx.moveTo(i, 0)
          ctx.lineTo(i, canvas.height)
          ctx.stroke()
        }
        for (let i = 0; i < canvas.height; i += 40) {
          ctx.beginPath()
          ctx.moveTo(0, i)
          ctx.lineTo(canvas.width, i)
          ctx.stroke()
        }

        // Draw markers
        mapMarkers.forEach((marker) => {
          // Convert lat/lng to x/y (simplified for demonstration)
          const x = ((marker.lng + 74.006) * 1000) % canvas.width
          const y = ((40.7128 - marker.lat) * 1000) % canvas.height

          // Draw marker
          ctx.beginPath()
          ctx.arc(x, y, marker.count / 3, 0, 2 * Math.PI)
          ctx.fillStyle = "rgba(37, 99, 235, 0.6)"
          ctx.fill()
          ctx.strokeStyle = "rgba(37, 99, 235, 1)"
          ctx.stroke()
        })

        // Add a note that this is a placeholder
        ctx.fillStyle = "#666"
        ctx.font = "14px Arial"
        ctx.fillText("Map Placeholder - Integrate with real map service", 20, 30)
      }

      return () => {
        if (mapRef.current && canvas.parentNode === mapRef.current) {
          mapRef.current.removeChild(canvas)
        }
      }
    }
  }, [])

  return (
    <div ref={mapRef} className="h-[300px] w-full rounded-md border" aria-label="Map showing vehicle sightings"></div>
  )
}
