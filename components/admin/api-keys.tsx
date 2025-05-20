"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { format } from "date-fns"
import { Copy, Key, MoreHorizontal, RefreshCw, Trash } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/components/ui/use-toast"

interface ApiKey {
  id: string
  name: string
  key: string
  createdAt: Date
  expiresAt?: Date
  lastUsed?: Date
  status: "ACTIVE" | "EXPIRED" | "REVOKED"
}

// Mock data for API keys
const mockApiKeys: ApiKey[] = [
  {
    id: "1",
    name: "Production API Key",
    key: "vts_prod_1a2b3c4d5e6f7g8h9i0j",
    createdAt: new Date(2023, 1, 15),
    expiresAt: new Date(2024, 1, 15),
    lastUsed: new Date(2023, 4, 15),
    status: "ACTIVE",
  },
  {
    id: "2",
    name: "Development API Key",
    key: "vts_dev_9i8h7g6f5e4d3c2b1a0",
    createdAt: new Date(2023, 2, 10),
    expiresAt: new Date(2024, 2, 10),
    lastUsed: new Date(2023, 4, 14),
    status: "ACTIVE",
  },
  {
    id: "3",
    name: "Testing API Key",
    key: "vts_test_5a4b3c2d1e0f9g8h7i6j",
    createdAt: new Date(2023, 3, 5),
    expiresAt: new Date(2023, 4, 5),
    lastUsed: new Date(2023, 4, 4),
    status: "EXPIRED",
  },
  {
    id: "4",
    name: "Mobile App API Key",
    key: "vts_mobile_1q2w3e4r5t6y7u8i9o0p",
    createdAt: new Date(2023, 3, 20),
    expiresAt: new Date(2024, 3, 20),
    lastUsed: new Date(2023, 4, 12),
    status: "ACTIVE",
  },
  {
    id: "5",
    name: "Partner Integration Key",
    key: "vts_partner_0p9o8i7u6y5t4r3e2w1q",
    createdAt: new Date(2023, 4, 1),
    status: "REVOKED",
  },
]

export function ApiKeys() {
  const [apiKeys] = useState<ApiKey[]>(mockApiKeys)
  const [isAddKeyOpen, setIsAddKeyOpen] = useState(false)
  const [newKeyName, setNewKeyName] = useState("")
  const [newKey, setNewKey] = useState<string | null>(null)
  const { toast } = useToast()

  const handleCopyKey = (key: string) => {
    navigator.clipboard.writeText(key)
    toast({
      title: "API Key Copied",
      description: "The API key has been copied to your clipboard.",
    })
  }

  const handleCreateKey = () => {
    // In a real application, this would call an API to create a new key
    const generatedKey = `vts_${Math.random().toString(36).substring(2, 15)}`
    setNewKey(generatedKey)
  }

  const getStatusBadge = (status: ApiKey["status"]) => {
    switch (status) {
      case "ACTIVE":
        return (
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
            Active
          </Badge>
        )
      case "EXPIRED":
        return (
          <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
            Expired
          </Badge>
        )
      case "REVOKED":
        return (
          <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
            Revoked
          </Badge>
        )
      default:
        return null
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-medium">API Keys</h3>
          <p className="text-sm text-muted-foreground">Manage API keys for external integrations</p>
        </div>
        <Dialog open={isAddKeyOpen} onOpenChange={setIsAddKeyOpen}>
          <DialogTrigger asChild>
            <Button>
              <Key className="h-4 w-4 mr-2" />
              Create API Key
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New API Key</DialogTitle>
              <DialogDescription>Generate a new API key for external integrations</DialogDescription>
            </DialogHeader>
            {!newKey ? (
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="key-name" className="text-right">
                    Key Name
                  </Label>
                  <Input
                    id="key-name"
                    className="col-span-3"
                    value={newKeyName}
                    onChange={(e) => setNewKeyName(e.target.value)}
                    placeholder="e.g. Production API Key"
                  />
                </div>
              </div>
            ) : (
              <div className="space-y-4 py-4">
                <div className="rounded-md bg-muted p-4">
                  <div className="text-sm font-medium mb-2">Your API Key</div>
                  <div className="flex items-center">
                    <code className="rounded bg-muted-foreground/20 px-2 py-1 text-sm font-mono w-full overflow-x-auto">
                      {newKey}
                    </code>
                    <Button variant="ghost" size="icon" className="ml-2" onClick={() => handleCopyKey(newKey)}>
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <div className="text-sm text-muted-foreground">
                  <strong>Important:</strong> This key will only be displayed once. Please copy it now and store it
                  securely.
                </div>
              </div>
            )}
            <DialogFooter>
              {!newKey ? (
                <>
                  <Button variant="outline" onClick={() => setIsAddKeyOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleCreateKey} disabled={!newKeyName.trim()}>
                    Generate Key
                  </Button>
                </>
              ) : (
                <Button
                  onClick={() => {
                    setIsAddKeyOpen(false)
                    setNewKey(null)
                    setNewKeyName("")
                  }}
                >
                  Done
                </Button>
              )}
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Key</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Created</TableHead>
            <TableHead>Expires</TableHead>
            <TableHead>Last Used</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {apiKeys.map((apiKey) => (
            <TableRow key={apiKey.id}>
              <TableCell className="font-medium">{apiKey.name}</TableCell>
              <TableCell>
                <div className="flex items-center space-x-2">
                  <code className="rounded bg-muted px-2 py-1 text-xs font-mono">{apiKey.key.substring(0, 8)}...</code>
                  <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => handleCopyKey(apiKey.key)}>
                    <Copy className="h-3 w-3" />
                  </Button>
                </div>
              </TableCell>
              <TableCell>{getStatusBadge(apiKey.status)}</TableCell>
              <TableCell>{format(apiKey.createdAt, "PP")}</TableCell>
              <TableCell>{apiKey.expiresAt ? format(apiKey.expiresAt, "PP") : "Never"}</TableCell>
              <TableCell>{apiKey.lastUsed ? format(apiKey.lastUsed, "PP") : "Never"}</TableCell>
              <TableCell className="text-right">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => handleCopyKey(apiKey.key)}>
                      <Copy className="h-4 w-4 mr-2" />
                      Copy Key
                    </DropdownMenuItem>
                    {apiKey.status === "ACTIVE" && (
                      <DropdownMenuItem>
                        <RefreshCw className="h-4 w-4 mr-2" />
                        Regenerate
                      </DropdownMenuItem>
                    )}
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="text-destructive">
                      <Trash className="h-4 w-4 mr-2" />
                      {apiKey.status === "ACTIVE" ? "Revoke Key" : "Delete Key"}
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
