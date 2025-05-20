"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { format } from "date-fns"
import { Eye, MoreHorizontal, Play, Trash } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"

interface Video {
  id: string
  title: string
  description?: string
  location?: string
  status: "PENDING" | "PROCESSING" | "COMPLETED" | "FAILED"
  createdAt: Date
  thumbnailUrl: string
  plateCount: number
}

// Mock data for videos
const mockVideos: Video[] = [
  {
    id: "1",
    title: "Downtown Traffic Cam",
    description: "Traffic footage from downtown intersection",
    location: "Main St & 5th Ave",
    status: "COMPLETED",
    createdAt: new Date(2023, 4, 15),
    thumbnailUrl: "/placeholder.svg?height=200&width=300",
    plateCount: 42,
  },
  {
    id: "2",
    title: "Highway Surveillance",
    description: "Highway surveillance footage",
    location: "I-95 Mile Marker 42",
    status: "COMPLETED",
    createdAt: new Date(2023, 4, 14),
    thumbnailUrl: "/placeholder.svg?height=200&width=300",
    plateCount: 78,
  },
  {
    id: "3",
    title: "Parking Lot Camera",
    description: "Shopping mall parking lot",
    location: "Westfield Mall",
    status: "PROCESSING",
    createdAt: new Date(2023, 4, 13),
    thumbnailUrl: "/placeholder.svg?height=200&width=300",
    plateCount: 0,
  },
  {
    id: "4",
    title: "School Zone Camera",
    description: "School zone traffic monitoring",
    location: "Lincoln Elementary School",
    status: "PENDING",
    createdAt: new Date(2023, 4, 12),
    thumbnailUrl: "/placeholder.svg?height=200&width=300",
    plateCount: 0,
  },
  {
    id: "5",
    title: "Gas Station Entrance",
    description: "Gas station entrance and exit",
    location: "QuikFill Gas Station",
    status: "FAILED",
    createdAt: new Date(2023, 4, 11),
    thumbnailUrl: "/placeholder.svg?height=200&width=300",
    plateCount: 0,
  },
]

export function VideoList() {
  const [videos] = useState<Video[]>(mockVideos)
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null)

  const getStatusColor = (status: Video["status"]) => {
    switch (status) {
      case "COMPLETED":
        return "bg-green-500"
      case "PROCESSING":
        return "bg-blue-500"
      case "PENDING":
        return "bg-yellow-500"
      case "FAILED":
        return "bg-red-500"
      default:
        return "bg-gray-500"
    }
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {videos.map((video) => (
        <Card key={video.id} className="overflow-hidden">
          <div className="aspect-video relative">
            <img
              src={video.thumbnailUrl || "/placeholder.svg"}
              alt={video.title}
              className="object-cover w-full h-full"
            />
            <div className="absolute top-2 right-2">
              <Badge variant="secondary" className="font-medium">
                <div className={`h-2 w-2 rounded-full ${getStatusColor(video.status)} mr-1.5`} />
                {video.status}
              </Badge>
            </div>
          </div>
          <CardHeader className="p-4">
            <div className="flex justify-between items-start">
              <CardTitle className="text-lg">{video.title}</CardTitle>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Actions</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <Eye className="h-4 w-4 mr-2" />
                    View Details
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Play className="h-4 w-4 mr-2" />
                    Play Video
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="text-destructive">
                    <Trash className="h-4 w-4 mr-2" />
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <CardDescription className="line-clamp-2">{video.description || "No description provided"}</CardDescription>
          </CardHeader>
          <CardContent className="p-4 pt-0">
            <div className="text-sm text-muted-foreground">
              <div>Location: {video.location || "Unknown"}</div>
              <div>Uploaded: {format(video.createdAt, "PPP")}</div>
              {video.status === "COMPLETED" && <div>Plates Detected: {video.plateCount}</div>}
            </div>
          </CardContent>
          <CardFooter className="p-4 pt-0">
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" className="w-full" onClick={() => setSelectedVideo(video)}>
                  View Details
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>Video Details</DialogTitle>
                </DialogHeader>
                {selectedVideo && (
                  <div className="space-y-4">
                    <div className="aspect-video overflow-hidden rounded-md">
                      <img
                        src={selectedVideo.thumbnailUrl || "/placeholder.svg"}
                        alt={selectedVideo.title}
                        className="object-cover w-full h-full"
                      />
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-lg font-bold">{selectedVideo.title}</h3>
                      <p className="text-sm text-muted-foreground">
                        {selectedVideo.description || "No description provided"}
                      </p>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <h4 className="font-medium">Status</h4>
                          <Badge variant="secondary">
                            <div className={`h-2 w-2 rounded-full ${getStatusColor(selectedVideo.status)} mr-1.5`} />
                            {selectedVideo.status}
                          </Badge>
                        </div>
                        <div>
                          <h4 className="font-medium">Upload Date</h4>
                          <p>{format(selectedVideo.createdAt, "PPP")}</p>
                        </div>
                        <div>
                          <h4 className="font-medium">Location</h4>
                          <p>{selectedVideo.location || "Unknown"}</p>
                        </div>
                        <div>
                          <h4 className="font-medium">Plates Detected</h4>
                          <p>{selectedVideo.status === "COMPLETED" ? selectedVideo.plateCount : "N/A"}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </DialogContent>
            </Dialog>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}
