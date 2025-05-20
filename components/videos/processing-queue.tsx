"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { format } from "date-fns"
import { AlertCircle, CheckCircle, Clock, Loader2, Play, StopCircle } from "lucide-react"

interface ProcessingJob {
  id: string
  videoTitle: string
  status: "PENDING" | "PROCESSING" | "COMPLETED" | "FAILED"
  progress: number
  startTime?: Date
  endTime?: Date
  error?: string
}

// Mock data for processing queue
const mockJobs: ProcessingJob[] = [
  {
    id: "1",
    videoTitle: "Downtown Traffic Cam",
    status: "PROCESSING",
    progress: 65,
    startTime: new Date(Date.now() - 1000 * 60 * 15), // 15 minutes ago
  },
  {
    id: "2",
    videoTitle: "Highway Surveillance",
    status: "PENDING",
    progress: 0,
  },
  {
    id: "3",
    videoTitle: "Parking Lot Camera",
    status: "COMPLETED",
    progress: 100,
    startTime: new Date(Date.now() - 1000 * 60 * 45), // 45 minutes ago
    endTime: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
  },
  {
    id: "4",
    videoTitle: "School Zone Camera",
    status: "FAILED",
    progress: 37,
    startTime: new Date(Date.now() - 1000 * 60 * 60), // 60 minutes ago
    endTime: new Date(Date.now() - 1000 * 60 * 55), // 55 minutes ago
    error: "Video format not supported",
  },
  {
    id: "5",
    videoTitle: "Gas Station Entrance",
    status: "PENDING",
    progress: 0,
  },
]

export function ProcessingQueue() {
  const [jobs] = useState<ProcessingJob[]>(mockJobs)

  const getStatusIcon = (status: ProcessingJob["status"]) => {
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

  const getStatusBadge = (status: ProcessingJob["status"]) => {
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

  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Video</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Progress</TableHead>
            <TableHead>Time</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {jobs.length === 0 ? (
            <TableRow>
              <TableCell colSpan={5} className="text-center">
                No processing jobs in the queue.
              </TableCell>
            </TableRow>
          ) : (
            jobs.map((job) => (
              <TableRow key={job.id}>
                <TableCell className="font-medium">{job.videoTitle}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    {getStatusIcon(job.status)}
                    {getStatusBadge(job.status)}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="space-y-1">
                    <Progress value={job.progress} className="h-2" />
                    <div className="text-xs text-muted-foreground">{job.progress}% complete</div>
                  </div>
                </TableCell>
                <TableCell>
                  {job.status === "PENDING" ? (
                    <span className="text-muted-foreground">Queued</span>
                  ) : job.status === "PROCESSING" ? (
                    <span className="text-muted-foreground">
                      Started {job.startTime ? format(job.startTime, "p") : ""}
                    </span>
                  ) : (
                    <span className="text-muted-foreground">{job.endTime ? format(job.endTime, "p") : ""}</span>
                  )}
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    {job.status === "PENDING" && (
                      <Button variant="outline" size="sm">
                        <Play className="h-4 w-4 mr-1" />
                        Start
                      </Button>
                    )}
                    {job.status === "PROCESSING" && (
                      <Button variant="outline" size="sm">
                        <StopCircle className="h-4 w-4 mr-1" />
                        Stop
                      </Button>
                    )}
                    {job.status === "FAILED" && (
                      <Button variant="outline" size="sm">
                        <Play className="h-4 w-4 mr-1" />
                        Retry
                      </Button>
                    )}
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
