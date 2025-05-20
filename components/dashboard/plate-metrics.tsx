import { Progress } from "@/components/ui/progress"

interface PlateMetric {
  plateNumber: string
  count: number
  percentage: number
}

// Mock data for plate metrics
const plateMetrics: PlateMetric[] = [
  {
    plateNumber: "ABC123",
    count: 42,
    percentage: 100,
  },
  {
    plateNumber: "XYZ789",
    count: 36,
    percentage: 85.7,
  },
  {
    plateNumber: "DEF456",
    count: 28,
    percentage: 66.7,
  },
  {
    plateNumber: "GHI789",
    count: 21,
    percentage: 50,
  },
  {
    plateNumber: "JKL012",
    count: 14,
    percentage: 33.3,
  },
]

export function PlateMetrics() {
  return (
    <div className="space-y-8">
      {plateMetrics.map((metric) => (
        <div key={metric.plateNumber} className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="font-medium">{metric.plateNumber}</div>
            <div className="text-sm text-muted-foreground">{metric.count} sightings</div>
          </div>
          <Progress value={metric.percentage} className="h-2" />
        </div>
      ))}
    </div>
  )
}
