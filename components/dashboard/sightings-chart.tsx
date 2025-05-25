"use client"

import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, XAxis, YAxis } from "recharts"
import { Bar, BarChart, Tooltip } from "recharts"

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

export function TopPlatesChart() {
  const data = [
    { plate: "KAA 123A", count: 42 },
    { plate: "KBC 456B", count: 36 },
    { plate: "KDA 789C", count: 28 },
    { plate: "KCE 234D", count: 21 },
    { plate: "KDF 567E", count: 14 },
  ];
  return (
    <ChartContainer className="h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="plate" tickLine={false} axisLine={false} tickMargin={10} />
          <YAxis tickLine={false} axisLine={false} tickMargin={10} />
          <Tooltip />
          <Bar dataKey="count" fill="hsl(var(--primary))" />
        </BarChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
}

export function SightingsByHourChart() {
  // Mock data: random distribution for 24 hours
  const data = Array.from({ length: 24 }, (_, hour) => ({
    hour: `${hour}:00`,
    sightings: Math.floor(10 + Math.random() * 40 + (hour >= 7 && hour <= 9 ? 40 : 0) + (hour >= 17 && hour <= 19 ? 30 : 0)),
  }));
  return (
    <ChartContainer className="h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="hour" tickLine={false} axisLine={false} tickMargin={10} />
          <YAxis tickLine={false} axisLine={false} tickMargin={10} />
          <Tooltip />
          <Bar dataKey="sightings" fill="hsl(var(--primary))" />
        </BarChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
}
