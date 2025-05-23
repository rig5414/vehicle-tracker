import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { ArrowRight, Car, Map, Search, Video } from "lucide-react"

export default function Home() {
  return (
    <div className="container mx-auto py-10">
      <div className="flex flex-col items-center text-center mb-10">
        <h1 className="text-4xl font-bold tracking-tight">Vehicle Tracking System</h1>
        <p className="text-muted-foreground mt-4 max-w-2xl">
          A comprehensive solution for tracking vehicles through license plate detection, with powerful search
          capabilities and analytics.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="flex flex-col h-full">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2">
              <Car className="h-5 w-5" />
              Dashboard
            </CardTitle>
            <CardDescription>View key metrics and analytics</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col flex-grow">
            <div className="flex-grow" />
            <Link href="/dashboard">
              <Button className="w-full">
                Go to Dashboard
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </CardContent>
        </Card>

        <Card className="flex flex-col h-full">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2">
              <Search className="h-5 w-5" />
              Search
            </CardTitle>
            <CardDescription>Find vehicles by plate number</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col flex-grow">
            <div className="flex-grow" />
            <Link href="/search">
              <Button className="w-full">
                Search Vehicles
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </CardContent>
        </Card>

        <Card className="flex flex-col h-full">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2">
              <Map className="h-5 w-5" />
              Map View
            </CardTitle>
            <CardDescription>Track vehicle locations and movement</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col flex-grow">
            <div className="flex-grow" />
            <Link href="/map">
              <Button className="w-full">
                View Map
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </CardContent>
        </Card>

        <Card className="flex flex-col h-full">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2">
              <Video className="h-5 w-5" />
              Video Processing
            </CardTitle>
            <CardDescription>Upload and process video footage</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col flex-grow">
            <div className="flex-grow" />
            <Link href="/videos">
              <Button className="w-full">
                Process Videos
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
