"use client"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { format } from "date-fns"
import { AlertCircle, CheckCircle, Clock, Loader2 } from "lucide-react"

interface ProcessingJob {
  id: string
  videoTitle: string
  status: "PENDING" | "PROCESSING" | "COMPLETED" | "FAILED"
  progress: number
  startTime?: Date
  endTime?: Date
  error?: string
}

// Hardcoded data for demonstration
const hardcodedJobs: ProcessingJob[] = [
  {
    id: "1",
    videoTitle: "Thika Road - Morning Rush Hour",
    status: "COMPLETED",
    progress: 100,
    startTime: new Date(2025, 4, 25, 7, 30),
    endTime: new Date(2025, 4, 25, 7, 35)
  },
  {
    id: "2",
    videoTitle: "Mombasa Road - Afternoon Traffic",
    status: "PROCESSING",
    progress: 45,
    startTime: new Date(2025, 4, 25, 14, 30)
  },
  {
    id: "3",
    videoTitle: "CBD - Tom Mboya Street",
    status: "PENDING",
    progress: 0
  },
  {
    id: "4",
    videoTitle: "Nyali Bridge Surveillance",
    status: "FAILED",
    progress: 30,
    startTime: new Date(2025, 4, 25, 12, 0),
    endTime: new Date(2025, 4, 25, 12, 2),
    error: "Video format not supported"
  }
]

export function ProcessingQueue() {
  const getStatusBadge = (status: ProcessingJob["status"]) => {
    switch (status) {
      case "PENDING":
        return <Badge variant="secondary"><Clock className="mr-1 h-3 w-3" />Pending</Badge>
      case "PROCESSING":
        return <Badge variant="default"><Loader2 className="mr-1 h-3 w-3 animate-spin" />Processing</Badge>
      case "COMPLETED":
        return <Badge variant="default" className="bg-green-500"><CheckCircle className="mr-1 h-3 w-3" />Completed</Badge>
      case "FAILED":
        return <Badge variant="destructive"><AlertCircle className="mr-1 h-3 w-3" />Failed</Badge>
    }
  }

  return (
    <div className="space-y-4">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Video</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Progress</TableHead>
            <TableHead>Started</TableHead>
            <TableHead>Completed</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {hardcodedJobs.map((job) => (
            <TableRow key={job.id}>
              <TableCell className="font-medium">{job.videoTitle}</TableCell>
              <TableCell>{getStatusBadge(job.status)}</TableCell>
              <TableCell>
                <div className="w-[200px] space-y-1">
                  <Progress value={job.progress} />
                  <p className="text-xs text-muted-foreground">{job.progress}%</p>
                </div>
              </TableCell>
              <TableCell>
                {job.startTime ? format(job.startTime, 'HH:mm:ss') : '-'}
              </TableCell>
              <TableCell>
                {job.endTime ? format(job.endTime, 'HH:mm:ss') : '-'}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
