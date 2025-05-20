import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { formatDistanceToNow } from "date-fns"

interface Sighting {
  id: string
  plateNumber: string
  location: string
  timestamp: Date
}

// Mock data for recent sightings
const recentSightings: Sighting[] = [
  {
    id: "1",
    plateNumber: "ABC123",
    location: "Main St & 5th Ave",
    timestamp: new Date(Date.now() - 1000 * 60 * 5), // 5 minutes ago
  },
  {
    id: "2",
    plateNumber: "XYZ789",
    location: "Park Rd & Oak St",
    timestamp: new Date(Date.now() - 1000 * 60 * 12), // 12 minutes ago
  },
  {
    id: "3",
    plateNumber: "DEF456",
    location: "River Blvd & Pine Ave",
    timestamp: new Date(Date.now() - 1000 * 60 * 25), // 25 minutes ago
  },
  {
    id: "4",
    plateNumber: "GHI789",
    location: "Mountain View & Lake Rd",
    timestamp: new Date(Date.now() - 1000 * 60 * 42), // 42 minutes ago
  },
  {
    id: "5",
    plateNumber: "JKL012",
    location: "Sunset Dr & Beach Ave",
    timestamp: new Date(Date.now() - 1000 * 60 * 67), // 67 minutes ago
  },
]

export function RecentSightings() {
  return (
    <div className="space-y-8">
      {recentSightings.map((sighting) => (
        <div key={sighting.id} className="flex items-center">
          <Avatar className="h-9 w-9">
            <AvatarFallback className="bg-primary text-primary-foreground">
              {sighting.plateNumber.substring(0, 2)}
            </AvatarFallback>
          </Avatar>
          <div className="ml-4 space-y-1">
            <p className="text-sm font-medium leading-none">{sighting.plateNumber}</p>
            <p className="text-sm text-muted-foreground">{sighting.location}</p>
          </div>
          <div className="ml-auto text-sm text-muted-foreground">
            {formatDistanceToNow(sighting.timestamp, { addSuffix: true })}
          </div>
        </div>
      ))}
    </div>
  )
}
