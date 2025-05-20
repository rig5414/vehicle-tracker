"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Eye, Map } from "lucide-react"
import { format } from "date-fns"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"

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
    plateNumber: "ABC123",
    timestamp: new Date(2023, 4, 15, 14, 30),
    location: "Main St & 5th Ave",
    confidence: 0.98,
    imageUrl: "/placeholder.svg?height=200&width=300",
  },
  {
    id: "2",
    plateNumber: "ABC123",
    timestamp: new Date(2023, 4, 14, 9, 15),
    location: "Park Rd & Oak St",
    confidence: 0.95,
    imageUrl: "/placeholder.svg?height=200&width=300",
  },
  {
    id: "3",
    plateNumber: "ABC123",
    timestamp: new Date(2023, 4, 12, 17, 45),
    location: "River Blvd & Pine Ave",
    confidence: 0.92,
    imageUrl: "/placeholder.svg?height=200&width=300",
  },
  {
    id: "4",
    plateNumber: "ABC123",
    timestamp: new Date(2023, 4, 10, 11, 20),
    location: "Mountain View & Lake Rd",
    confidence: 0.89,
    imageUrl: "/placeholder.svg?height=200&width=300",
  },
  {
    id: "5",
    plateNumber: "ABC123",
    timestamp: new Date(2023, 4, 8, 8, 10),
    location: "Sunset Dr & Beach Ave",
    confidence: 0.87,
    imageUrl: "/placeholder.svg?height=200&width=300",
  },
]

export function SearchResults() {
  const [sightings] = useState<Sighting[]>(mockSightings)
  const [selectedSighting, setSelectedSighting] = useState<Sighting | null>(null)

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 0.95) return "bg-green-500"
    if (confidence >= 0.85) return "bg-yellow-500"
    return "bg-red-500"
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
          {sightings.length === 0 ? (
            <TableRow>
              <TableCell colSpan={5} className="text-center">
                No results found. Try adjusting your search parameters.
              </TableCell>
            </TableRow>
          ) : (
            sightings.map((sighting) => (
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
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline" size="sm" onClick={() => setSelectedSighting(sighting)}>
                          <Eye className="h-4 w-4 mr-1" />
                          View
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-md">
                        <DialogHeader>
                          <DialogTitle>Plate Sighting Details</DialogTitle>
                        </DialogHeader>
                        {selectedSighting && (
                          <div className="space-y-4">
                            <div className="aspect-video overflow-hidden rounded-md">
                              <img
                                src={selectedSighting.imageUrl || "/placeholder.svg"}
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
                        )}
                      </DialogContent>
                    </Dialog>
                    <Button variant="outline" size="sm">
                      <Map className="h-4 w-4 mr-1" />
                      Map
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  )
}
