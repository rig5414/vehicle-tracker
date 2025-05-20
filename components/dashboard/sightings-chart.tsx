"use client"

import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, XAxis, YAxis } from "recharts"

// Mock data for the chart
const data = [
  { date: "Jan", sightings: 120 },
  { date: "Feb", sightings: 145 },
  { date: "Mar", sightings: 162 },
  { date: "Apr", sightings: 178 },
  { date: "May", sightings: 189 },
  { date: "Jun", sightings: 204 },
  { date: "Jul", sightings: 215 },
  { date: "Aug", sightings: 253 },
  { date: "Sep", sightings: 276 },
  { date: "Oct", sightings: 298 },
  { date: "Nov", sightings: 322 },
  { date: "Dec", sightings: 341 },
]

export function SightingsChart() {
  return (
    <ChartContainer className="h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={data}
          margin={{
            top: 10,
            right: 30,
            left: 0,
            bottom: 0,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" tickLine={false} axisLine={false} tickMargin={10} />
          <YAxis tickLine={false} axisLine={false} tickMargin={10} />
          <ChartTooltip
            content={
              <ChartTooltipContent
                className="border-none bg-background p-2 shadow-md"
                items={[
                  {
                    label: "Sightings",
                    value: (value) => `${value} sightings`,
                    color: "hsl(var(--primary))",
                  },
                ]}
              />
            }
          />
          <Area type="monotone" dataKey="sightings" stroke="hsl(var(--primary))" fill="hsl(var(--primary) / 0.2)" />
        </AreaChart>
      </ResponsiveContainer>
    </ChartContainer>
  )
}
