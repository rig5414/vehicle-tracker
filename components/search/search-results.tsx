"use client"

import { useState, useContext, useMemo } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Eye, Map } from "lucide-react"
import { format } from "date-fns"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import dynamic from 'next/dynamic'
import { SearchContext } from "./search-form"

// Dynamically import the LocationMapDialog with SSR disabled
const LocationMapDialog = dynamic(
  () => import('./location-map-dialog').then((mod) => mod.LocationMapDialog),
  { ssr: false }
)

interface Sighting {
  id: string
  plateNumber: string
  timestamp: Date
  location: string
  confidence: number
  imageUrl?: string
}

// Mock data for search results
const mockSightings: Sighting[] = [
  {
    id: "1",
    plateNumber: "KAA 123A",
    timestamp: new Date(2023, 4, 15, 14, 30),
    location: "Nairobi, Moi Avenue",
    confidence: 0.98,
    imageUrl: "/placeholder.svg?height=200&width=300",
  },
  {
    id: "2",
    plateNumber: "KAA 123A",
    timestamp: new Date(2023, 4, 14, 9, 15),
    location: "Nairobi, Kenyatta Avenue",
    confidence: 0.95,
    imageUrl: "/placeholder.svg?height=200&width=300",
  },
  {
    id: "3",
    plateNumber: "KBC 456B",
    timestamp: new Date(2023, 4, 12, 17, 45),
    location: "Mombasa, Moi Avenue",
    confidence: 0.92,
    imageUrl: "/placeholder.svg?height=200&width=300",
  },
  {
    id: "4",
    plateNumber: "KDA 789C",
    timestamp: new Date(2023, 4, 10, 11, 20),
    location: "Kisumu, Main Market",
    confidence: 0.89,
    imageUrl: "/placeholder.svg?height=200&width=300",
  },
  {
    id: "5",
    plateNumber: "KCE 234D",
    timestamp: new Date(2023, 4, 8, 8, 10),
    location: "Eldoret, Uganda Road",
    confidence: 0.87,
    imageUrl: "/placeholder.svg?height=200&width=300",
  },
]

export function SearchResults() {
  const { params, loading } = useContext(SearchContext)
  const [selectedSighting, setSelectedSighting] = useState<Sighting | null>(null)
  const [dialogType, setDialogType] = useState<null | 'view' | 'map'>(null)

  const filteredSightings = useMemo(() => {
    return mockSightings.filter(s => {
      const plateMatch = params.plateNumber === "" || s.plateNumber.replace(/\s/g, "").toLowerCase().includes(params.plateNumber.replace(/\s/g, "").toLowerCase())
      const locationMatch = !params.location || s.location.toLowerCase().includes(params.location.toLowerCase())
      // Time range filtering can be added here if needed
      return plateMatch && locationMatch
    })
  }, [params])

  if (loading) {
    return <div className="py-8 text-center text-muted-foreground">Loading results...</div>
  }

  if (filteredSightings.length === 0) {
    return <div className="py-8 text-center text-muted-foreground">No results found. Try adjusting your search parameters.</div>
  }

  const getConfidenceColor = (confidence: number): string => {
    if (confidence >= 0.95) return "bg-green-500"
    if (confidence >= 0.85) return "bg-yellow-500"
    return "bg-red-500"
  }

  // Get historical sightings for the selected plate number
  const getSightingsHistory = (plateNumber: string): Sighting[] => {
    return mockSightings.filter(s => s.plateNumber === plateNumber)
      .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
  }

  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Plate Number</TableHead>
            <TableHead>Date & Time</TableHead>
            <TableHead>Location</TableHead>
            <TableHead>Confidence</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredSightings.map((sighting) => (
            <TableRow key={sighting.id}>
              <TableCell className="font-medium">{sighting.plateNumber}</TableCell>
              <TableCell>{format(sighting.timestamp, "PPP p")}</TableCell>
              <TableCell>{sighting.location}</TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <div className={`h-2 w-2 rounded-full ${getConfidenceColor(sighting.confidence)}`} />
                  <span>{(sighting.confidence * 100).toFixed(1)}%</span>
                </div>
              </TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setSelectedSighting(sighting);
                      setDialogType('view');
                    }}
                  >
                    <Eye className="h-4 w-4 mr-1" />
                    View
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setSelectedSighting(sighting);
                      setDialogType('map');
                    }}
                  >
                    <Map className="h-4 w-4 mr-1" />
                    Map
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Unified Dialog for View and Map */}
      {selectedSighting && dialogType === 'view' && (
        <Dialog open={true} onOpenChange={() => { setSelectedSighting(null); setDialogType(null); }}>
          <DialogContent className="sm:max-w-3xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Plate Sighting Details</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="aspect-video overflow-hidden rounded-md">
                <img
                  src={selectedSighting.imageUrl ?? "/placeholder.svg"}
                  alt={`License plate ${selectedSighting.plateNumber}`}
                  className="object-cover w-full h-full"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="text-sm font-medium">Plate Number</h4>
                  <p className="text-lg font-bold">{selectedSighting.plateNumber}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium">Confidence</h4>
                  <Badge variant="outline">{(selectedSighting.confidence * 100).toFixed(1)}%</Badge>
                </div>
                <div>
                  <h4 className="text-sm font-medium">Date & Time</h4>
                  <p>{format(selectedSighting.timestamp, "PPP p")}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium">Location</h4>
                  <p>{selectedSighting.location}</p>
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
      {selectedSighting && dialogType === 'map' && (
        <Dialog open={true} onOpenChange={() => { setSelectedSighting(null); setDialogType(null); }}>
          <DialogContent className="max-w-7xl w-full h-[95vh]">
            <DialogHeader className="pb-2">
              <DialogTitle>Location History for {selectedSighting.plateNumber}</DialogTitle>
            </DialogHeader>
            <div className="mb-4">
              <div className="flex flex-wrap gap-4 items-center">
                <span className="font-semibold">Plate:</span> {selectedSighting.plateNumber}
                <span className="font-semibold">Location:</span> {selectedSighting.location}
                <span className="font-semibold">Date & Time:</span> {format(selectedSighting.timestamp, "PPP p")}
              </div>
            </div>
            <LocationMapDialog
              isOpen={true}
              onClose={() => { setSelectedSighting(null); setDialogType(null); }}
              sighting={selectedSighting}
              sightingsHistory={getSightingsHistory(selectedSighting.plateNumber)}
            />
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}
