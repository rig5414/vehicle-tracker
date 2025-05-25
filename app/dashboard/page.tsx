import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { RecentSightings } from "@/components/dashboard/recent-sightings"
import { PlateMetrics } from "@/components/dashboard/plate-metrics"
import { SightingsChart, TopPlatesChart, SightingsByHourChart } from "@/components/dashboard/sightings-chart"
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
            <div className="grid gap-4 gap-y-8 lg:grid-cols-3">
              <Card>
                <CardHeader>
                  <CardTitle>Top Plates (Kenya)</CardTitle>
                  <CardDescription>Most frequently sighted Kenyan plates</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    <li className="flex justify-between"><span>KAA 123A</span><span className="font-bold">42</span></li>
                    <li className="flex justify-between"><span>KBC 456B</span><span className="font-bold">36</span></li>
                    <li className="flex justify-between"><span>KDA 789C</span><span className="font-bold">28</span></li>
                    <li className="flex justify-between"><span>KCE 234D</span><span className="font-bold">21</span></li>
                    <li className="flex justify-between"><span>KDF 567E</span><span className="font-bold">14</span></li>
                  </ul>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Sightings by Hour</CardTitle>
                  <CardDescription>Distribution of sightings by hour of day (Kenyan time)</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    <li className="flex justify-between"><span>07:00</span><span className="font-bold">82</span></li>
                    <li className="flex justify-between"><span>08:00</span><span className="font-bold">76</span></li>
                    <li className="flex justify-between"><span>09:00</span><span className="font-bold">65</span></li>
                    <li className="flex justify-between"><span>17:00</span><span className="font-bold">71</span></li>
                    <li className="flex justify-between"><span>18:00</span><span className="font-bold">68</span></li>
                    <li className="flex justify-between"><span>Other hours</span><span className="font-bold">30-50</span></li>
                  </ul>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Top Locations</CardTitle>
                  <CardDescription>Most common sighting locations in Kenya</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    <li className="flex justify-between"><span>Nairobi, Moi Avenue</span><span className="font-bold">52</span></li>
                    <li className="flex justify-between"><span>Mombasa, Moi Avenue</span><span className="font-bold">37</span></li>
                    <li className="flex justify-between"><span>Kisumu, Main Market</span><span className="font-bold">29</span></li>
                    <li className="flex justify-between"><span>Eldoret, Uganda Road</span><span className="font-bold">18</span></li>
                    <li className="flex justify-between"><span>Thika, Kenyatta Highway</span><span className="font-bold">12</span></li>
                  </ul>
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
