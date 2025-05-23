import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { RecentSightings } from "@/components/dashboard/recent-sightings"
import { PlateMetrics } from "@/components/dashboard/plate-metrics"
import { SightingsChart } from "@/components/dashboard/sightings-chart"
import { SightingsMap } from "@/components/dashboard/sightings-map"

export default function DashboardPage() {
  return (
    <div className="flex flex-col">
      <DashboardHeader />
      <div className="flex-1 space-y-4 p-8 pt-6">
        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="reports">Reports</TabsTrigger>
          </TabsList>
          <TabsContent value="overview" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Sightings</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">1,248</div>
                  <p className="text-xs text-muted-foreground">+20.1% from last month</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Unique Vehicles</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">324</div>
                  <p className="text-xs text-muted-foreground">+12.5% from last month</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Processed Videos</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">42</div>
                  <p className="text-xs text-muted-foreground">+7.2% from last month</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Detection Rate</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">92.4%</div>
                  <p className="text-xs text-muted-foreground">+3.1% from last month</p>
                </CardContent>
              </Card>
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
              <Card className="col-span-4">
                <CardHeader>
                  <CardTitle>Sightings Over Time</CardTitle>
                </CardHeader>
                <CardContent className="pl-2">
                  <SightingsChart />
                </CardContent>
              </Card>
              <Card className="col-span-3">
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                  <CardDescription>Latest plate sightings across all locations</CardDescription>
                </CardHeader>
                <CardContent>
                  <RecentSightings />
                </CardContent>
              </Card>
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
              <Card className="col-span-4">
                <CardHeader>
                  <CardTitle>Sightings Map</CardTitle>
                  <CardDescription>Geographic distribution of vehicle sightings</CardDescription>
                </CardHeader>
                <CardContent className="pl-2">
                  <SightingsMap />
                </CardContent>
              </Card>
              <Card className="col-span-3">
                <CardHeader>
                  <CardTitle>Top Plate Metrics</CardTitle>
                  <CardDescription>Most frequently spotted license plates</CardDescription>
                </CardHeader>
                <CardContent>
                  <PlateMetrics />
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          <TabsContent value="analytics" className="space-y-4">
            <div className="grid gap-4">
              <Card className="col-span-full">
                <CardHeader>
                  <CardTitle>Advanced Analytics</CardTitle>
                  <CardDescription>Detailed analysis of vehicle sightings and patterns</CardDescription>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {/* Analytics cards */}
                    <Card>
                      <CardHeader>
                        <CardTitle>Pattern Analysis</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="h-[300px] flex items-center justify-center border rounded-md">
                          <p className="text-muted-foreground">Pattern analysis visualization</p>
                        </div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardHeader>
                        <CardTitle>Time Distribution</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="h-[300px] flex items-center justify-center border rounded-md">
                          <p className="text-muted-foreground">Time-based distribution chart</p>
                        </div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardHeader>
                        <CardTitle>Location Clusters</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="h-[300px] flex items-center justify-center border rounded-md">
                          <p className="text-muted-foreground">Location cluster analysis</p>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          <TabsContent value="reports" className="space-y-4">
            <div className="grid gap-4">
              <Card className="col-span-full">
                <CardHeader>
                  <CardTitle>Reports</CardTitle>
                  <CardDescription>Generate and download reports</CardDescription>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {/* Report types */}
                    <Card>
                      <CardHeader>
                        <CardTitle>Daily Summary</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="h-[300px] flex flex-col items-center justify-center gap-4 border rounded-md p-4">
                          <p className="text-muted-foreground text-center">Daily vehicle sightings summary</p>
                          <button className="bg-primary text-primary-foreground px-4 py-2 rounded-md">Generate Report</button>
                        </div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardHeader>
                        <CardTitle>Weekly Analysis</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="h-[300px] flex flex-col items-center justify-center gap-4 border rounded-md p-4">
                          <p className="text-muted-foreground text-center">Weekly trends and patterns</p>
                          <button className="bg-primary text-primary-foreground px-4 py-2 rounded-md">Generate Report</button>
                        </div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardHeader>
                        <CardTitle>Monthly Statistics</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="h-[300px] flex flex-col items-center justify-center gap-4 border rounded-md p-4">
                          <p className="text-muted-foreground text-center">Monthly statistical report and analysis</p>
                          <button className="bg-primary text-primary-foreground px-4 py-2 rounded-md">Generate Report</button>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
