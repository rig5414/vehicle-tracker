import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { VideoUpload } from "@/components/videos/video-upload"
import { VideoList } from "@/components/videos/video-list"
import { ProcessingQueue } from "@/components/videos/processing-queue"

export default function VideosPage() {
  return (
    <div className="container mx-auto py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Video Processing</h1>
        <p className="text-muted-foreground mt-2">Upload and process video footage to detect license plates</p>
      </div>

      <Tabs defaultValue="upload" className="space-y-6">
        <TabsList>
          <TabsTrigger value="upload">Upload</TabsTrigger>
          <TabsTrigger value="videos">My Videos</TabsTrigger>
          <TabsTrigger value="queue">Processing Queue</TabsTrigger>
        </TabsList>

        <TabsContent value="upload" className="w-full space-y-4">
          <div className="grid gap-4">
            <Card className="col-span-full">
              <CardHeader>
                <CardTitle>Upload Video</CardTitle>
                <CardDescription>Upload video footage for license plate detection</CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <VideoUpload />
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="videos" className="w-full space-y-4">
          <div className="grid gap-4">
            <Card className="col-span-full">
              <CardHeader>
                <CardTitle>My Videos</CardTitle>
                <CardDescription>View and manage your uploaded videos</CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <VideoList />
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="queue" className="w-full space-y-4">
          <div className="grid gap-4">
            <Card className="col-span-full">
              <CardHeader>
                <CardTitle>Processing Queue</CardTitle>
                <CardDescription>Monitor the status of video processing jobs</CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <ProcessingQueue />
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
