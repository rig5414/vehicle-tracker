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
    plateNumber: "KAA 123A",
    location: "Thika",
    timestamp: new Date(Date.now() - 1000 * 60 * 5), // 5 minutes ago
  },
  {
    id: "2",
    plateNumber: "KDA 456B",
    location: "Nairobi",
    timestamp: new Date(Date.now() - 1000 * 60 * 12), // 12 minutes ago
  },
  {
    id: "3",
    plateNumber: "KCG 789C",
    location: "Nairobi",
    timestamp: new Date(Date.now() - 1000 * 60 * 25), // 25 minutes ago
  },
  {
    id: "4",
    plateNumber: "KBV 101D",
    location: "Nairobi",
    timestamp: new Date(Date.now() - 1000 * 60 * 42), // 42 minutes ago
  },
  {
    id: "5",
    plateNumber: "KDA 102E",
    location: "Nairobi",
    timestamp: new Date(Date.now() - 1000 * 60 * 67), // 67 minutes ago
  },
]

const sortedSightings = [...recentSightings].sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());

export function RecentSightings() {
  return (
    <div className="space-y-4">
      {sortedSightings.map((sighting) => (
        <div key={sighting.id} className="flex items-center border rounded-md p-3">
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
