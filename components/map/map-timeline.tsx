"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { format } from "date-fns"
import { Play, Pause, SkipBack, SkipForward } from "lucide-react"

// Mock data for timeline
const timelineData = {
  startDate: new Date(2023, 4, 5),
  endDate: new Date(2023, 4, 15),
  totalDays: 10,
}

export function MapTimeline() {
  const [currentDay, setCurrentDay] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)

  const currentDate = new Date(timelineData.startDate)
  currentDate.setDate(currentDate.getDate() + currentDay)

  const handleSliderChange = (value: number[]) => {
    setCurrentDay(value[0])
  }

  const togglePlayback = () => {
    setIsPlaying(!isPlaying)
  }

  const resetTimeline = () => {
    setCurrentDay(0)
    setIsPlaying(false)
  }

  const skipForward = () => {
    setCurrentDay(Math.min(currentDay + 1, timelineData.totalDays))
  }

  const skipBackward = () => {
    setCurrentDay(Math.max(currentDay - 1, 0))
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <div className="text-sm text-muted-foreground">Current Date</div>
        <div className="text-xl font-bold">{format(currentDate, "PPP")}</div>
      </div>

      <Slider value={[currentDay]} max={timelineData.totalDays} step={1} onValueChange={handleSliderChange} />

      <div className="flex items-center justify-between text-xs text-muted-foreground">
        <span>{format(timelineData.startDate, "MMM d")}</span>
        <span>{format(timelineData.endDate, "MMM d")}</span>
      </div>

      <div className="flex items-center justify-center space-x-2">
        <Button variant="outline" size="icon" onClick={resetTimeline}>
          <SkipBack className="h-4 w-4" />
        </Button>
        <Button variant="outline" size="icon" onClick={skipBackward}>
          <SkipBack className="h-4 w-4" />
        </Button>
        <Button onClick={togglePlayback}>
          {isPlaying ? <Pause className="h-4 w-4 mr-2" /> : <Play className="h-4 w-4 mr-2" />}
          {isPlaying ? "Pause" : "Play"}
        </Button>
        <Button variant="outline" size="icon" onClick={skipForward}>
          <SkipForward className="h-4 w-4" />
        </Button>
      </div>

      <div className="text-xs text-muted-foreground text-center">Showing vehicle movements for selected date range</div>
    </div>
  )
}
