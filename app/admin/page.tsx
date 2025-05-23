import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { UserManagement } from "@/components/admin/user-management"
import { SystemSettings } from "@/components/admin/system-settings"
import { ApiKeys } from "@/components/admin/api-keys"

export default function AdminPage() {
  return (
    <div className="container mx-auto py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Admin Settings</h1>
        <p className="text-muted-foreground mt-2">Manage users, system settings, and API keys</p>
      </div>

      <Tabs defaultValue="users" className="space-y-6">
        <TabsList>
          <TabsTrigger value="users">User Management</TabsTrigger>
          <TabsTrigger value="settings">System Settings</TabsTrigger>
          <TabsTrigger value="api">API Keys</TabsTrigger>
        </TabsList>

        <TabsContent value="users" className="w-full space-y-4">
          <div className="grid gap-4">
            <Card className="col-span-full">
              <CardHeader>
                <CardTitle>User Management</CardTitle>
                <CardDescription>Add, edit, or remove users from the system</CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <UserManagement />
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="settings" className="w-full space-y-4">
          <div className="grid gap-4">
            <Card className="col-span-full">
              <CardHeader>
                <CardTitle>System Settings</CardTitle>
                <CardDescription>Configure system-wide settings and preferences</CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <SystemSettings />
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="api" className="w-full space-y-4">
          <div className="grid gap-4">
            <Card className="col-span-full">
              <CardHeader>
                <CardTitle>API Keys</CardTitle>
                <CardDescription>Manage API keys for external integrations</CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <ApiKeys />
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
