"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { useToast } from "@/components/ui/use-toast"
import { Download, MoreVertical, Trash2, AlertCircle, CheckCircle, Clock, Loader2, RefreshCcw } from "lucide-react"
import Image from "next/image"

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

function VideoCardSkeleton() {
  return (
    <Card className="overflow-hidden">
      <div className="aspect-video relative bg-muted">
        <div className="absolute top-2 right-2">
          <Skeleton className="h-6 w-24" />
        </div>
      </div>
      <div className="p-4 space-y-4">
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-2">
            <Skeleton className="h-5 w-32" />
            <Skeleton className="h-4 w-24" />
          </div>
          <Skeleton className="h-8 w-8 rounded-full" />
        </div>
        <Skeleton className="h-4 w-full" />
        <div className="flex items-center justify-between">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-4 w-20" />
        </div>
      </div>
    </Card>
  )
}

export function VideoList() {
  // Mock data for videos
  const [videos, setVideos] = useState<Video[]>([
    {
      id: '1',
      title: 'Sample Video 1',
      description: 'A test video',
      location: 'Test Location',
      status: 'COMPLETED',
      createdAt: new Date(),
      thumbnailUrl: 'https://placehold.co/320x180',
      plateCount: 3,
    },
    {
      id: '2',
      title: 'Sample Video 2',
      description: 'Another test video',
      location: 'Another Location',
      status: 'PROCESSING',
      createdAt: new Date(),
      thumbnailUrl: 'https://placehold.co/320x180',
      plateCount: 0,
    },
  ]);
  const [deleteVideoId, setDeleteVideoId] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isRefreshing, setIsRefreshing] = useState(false)
  const { toast } = useToast()

  const handleDownload = async (videoId: string) => {
    toast({
      title: 'Mock Download',
      description: `Pretending to download video ${videoId}`,
    });
  };

  const handleDelete = async () => {
    if (!deleteVideoId) return;
    setVideos(prevVideos => prevVideos.filter(video => video.id !== deleteVideoId));
    toast({
      title: 'Mock Delete',
      description: 'Pretending to delete video',
    });
    setDeleteVideoId(null);
  };

  const getStatusIcon = (status: Video["status"]) => {
    switch (status) {
      case "COMPLETED":
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case "PROCESSING":
        return <Loader2 className="h-4 w-4 text-blue-500 animate-spin" />
      case "PENDING":
        return <Clock className="h-4 w-4 text-yellow-500" />
      case "FAILED":
        return <AlertCircle className="h-4 w-4 text-red-500" />
      default:
        return null
    }
  }

  const getStatusBadge = (status: Video["status"]) => {
    switch (status) {
      case "COMPLETED":
        return (
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
            Completed
          </Badge>
        )
      case "PROCESSING":
        return (
          <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
            Processing
          </Badge>
        )
      case "PENDING":
        return (
          <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
            Pending
          </Badge>
        )
      case "FAILED":
        return (
          <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
            Failed
          </Badge>
        )
      default:
        return null
    }
  }

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {[...Array(6)].map((_, i) => (
          <VideoCardSkeleton key={i} />
        ))}
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h2 className="text-2xl font-semibold tracking-tight">My Videos</h2>
          <p className="text-sm text-muted-foreground">
            Manage your uploaded videos and view processing status
          </p>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => {}}
          disabled={isRefreshing}
        >
          <RefreshCcw className={`h-4 w-4 mr-2 ${isRefreshing ? "animate-spin" : ""}`} />
          Refresh
        </Button>
      </div>

      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription className="flex items-center justify-between">
            <span>{error}</span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {}}
            >
              Try Again
            </Button>
          </AlertDescription>
        </Alert>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {videos.length === 0 ? (
          <div className="col-span-full text-center text-muted-foreground">
            No videos uploaded yet.
          </div>
        ) : (
          videos.map((video) => (
            <Card key={video.id} className="overflow-hidden">
              <div className="aspect-video relative">
                <Image
                  src={video.thumbnailUrl}
                  alt={video.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <div className="absolute top-2 right-2">
                  {getStatusBadge(video.status)}
                </div>
              </div>
              <div className="p-4">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="font-semibold">{video.title}</h3>
                    {video.location && (
                      <p className="text-sm text-muted-foreground">{video.location}</p>
                    )}
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => handleDownload(video.id)}>
                        <Download className="h-4 w-4 mr-2" />
                        Download
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem 
                        onClick={() => setDeleteVideoId(video.id)}
                        className="text-red-600"
                      >
                        <Trash2 className="h-4 w-4 mr-2" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                {video.description && (
                  <p className="mt-2 text-sm text-muted-foreground line-clamp-2">
                    {video.description}
                  </p>
                )}
                <div className="mt-4 flex items-center justify-between text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    {getStatusIcon(video.status)}
                    <span>
                      {video.status === "COMPLETED"
                        ? `${video.plateCount} plates detected`
                        : video.status === "FAILED"
                        ? "Processing failed"
                        : video.status === "PROCESSING"
                        ? "Processing video"
                        : "Queued for processing"}
                    </span>
                  </div>
                  <time dateTime={video.createdAt.toISOString()}>
                    {new Date(video.createdAt).toLocaleDateString()}
                  </time>
                </div>
              </div>
            </Card>
          ))
        )}
      </div>

      <AlertDialog open={!!deleteVideoId} onOpenChange={() => setDeleteVideoId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. The video and all its detected license plates will be permanently deleted.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-red-600">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
