"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { useToast } from "@/components/ui/use-toast"

const formSchema = z.object({
  detectionThreshold: z.number().min(0.5).max(1),
  maxConcurrentJobs: z.number().int().min(1).max(10),
  retentionPeriod: z.number().int().min(1).max(365),
  enableNotifications: z.boolean().default(true),
  notificationEmail: z.string().email().optional(),
  mapProvider: z.string().default("google"),
  enableAuditLog: z.boolean().default(true),
  enablePublicAPI: z.boolean().default(false),
})

export function SystemSettings() {
  const { toast } = useToast()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      detectionThreshold: 0.8,
      maxConcurrentJobs: 3,
      retentionPeriod: 90,
      enableNotifications: true,
      notificationEmail: "admin@example.com",
      mapProvider: "google",
      enableAuditLog: true,
      enablePublicAPI: false,
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values)
    toast({
      title: "Settings Updated",
      description: "Your system settings have been updated successfully.",
    })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium">Detection Settings</h3>
              <p className="text-sm text-muted-foreground">Configure license plate detection parameters</p>
            </div>

            <FormField
              control={form.control}
              name="detectionThreshold"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Detection Confidence Threshold</FormLabel>
                  <FormControl>
                    <div className="space-y-2">
                      <Slider
                        min={0.5}
                        max={1}
                        step={0.01}
                        value={[field.value]}
                        onValueChange={(value) => field.onChange(value[0])}
                      />
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>0.5</span>
                        <span>{field.value.toFixed(2)}</span>
                        <span>1.0</span>
                      </div>
                    </div>
                  </FormControl>
                  <FormDescription>
                    Minimum confidence score required for a detection to be considered valid
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="maxConcurrentJobs"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Max Concurrent Processing Jobs</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      min={1}
                      max={10}
                      {...field}
                      onChange={(e) => field.onChange(Number.parseInt(e.target.value))}
                    />
                  </FormControl>
                  <FormDescription>Maximum number of video processing jobs to run simultaneously</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="retentionPeriod"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Data Retention Period (days)</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      min={1}
                      max={365}
                      {...field}
                      onChange={(e) => field.onChange(Number.parseInt(e.target.value))}
                    />
                  </FormControl>
                  <FormDescription>Number of days to retain plate sighting data</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium">System Configuration</h3>
              <p className="text-sm text-muted-foreground">General system settings and integrations</p>
            </div>

            <FormField
              control={form.control}
              name="mapProvider"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Map Provider</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a map provider" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="google">Google Maps</SelectItem>
                      <SelectItem value="mapbox">Mapbox</SelectItem>
                      <SelectItem value="osm">OpenStreetMap</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormDescription>Provider for map visualization</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="enableNotifications"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3">
                  <div className="space-y-0.5">
                    <FormLabel>Email Notifications</FormLabel>
                    <FormDescription>Receive email notifications for important events</FormDescription>
                  </div>
                  <FormControl>
                    <Switch checked={field.value} onCheckedChange={field.onChange} />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="notificationEmail"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Notification Email</FormLabel>
                  <FormControl>
                    <Input type="email" {...field} />
                  </FormControl>
                  <FormDescription>Email address for system notifications</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="enableAuditLog"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3">
                  <div className="space-y-0.5">
                    <FormLabel>Audit Logging</FormLabel>
                    <FormDescription>Log all user actions for security and compliance</FormDescription>
                  </div>
                  <FormControl>
                    <Switch checked={field.value} onCheckedChange={field.onChange} />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="enablePublicAPI"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3">
                  <div className="space-y-0.5">
                    <FormLabel>Public API Access</FormLabel>
                    <FormDescription>Allow external access to the system API</FormDescription>
                  </div>
                  <FormControl>
                    <Switch checked={field.value} onCheckedChange={field.onChange} />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
        </div>

        <Button type="submit">Save Settings</Button>
      </form>
    </Form>
  )
}
