"use client"

import { useState } from "react"
import { Badge } from "@/registry/new-york-v4/ui/badge"
import { Button } from "@/registry/new-york-v4/ui/button"
import { ProButton } from "@/registry/new-york-v4/pro/base/button"
import { Input } from "@/registry/new-york-v4/pro/base/fields/input"
import { Select } from "@/registry/new-york-v4/pro/base/fields/select"
import { ProDescriptions } from "@/registry/new-york-v4/pro/descriptions"
import { FormItem, ProForm } from "@/registry/new-york-v4/pro/form"

interface UserData {
  name: string
  email: string
  role: string
  status: string
  registeredAt: string
  lastLogin: string
  bio: string
}

const DEFAULT_DATA: UserData = {
  name: "Alice Wang",
  email: "alice@example.com",
  role: "admin",
  status: "active",
  registeredAt: "2024-01-15",
  lastLogin: "2025-05-21 09:32",
  bio: "Full-stack engineer focused on frontend architecture and developer experience.",
}

const roleOptions = [
  { label: "Admin", value: "admin" },
  { label: "Developer", value: "developer" },
  { label: "Viewer", value: "viewer" },
]

const statusOptions = [
  { label: "Active", value: "active" },
  { label: "Inactive", value: "inactive" },
  { label: "Suspended", value: "suspended" },
]

const ROLE_LABELS: Record<string, string> = {
  admin: "Admin",
  developer: "Developer",
  viewer: "Viewer",
}

const STATUS_LABELS: Record<string, string> = {
  active: "Active",
  inactive: "Inactive",
  suspended: "Suspended",
}

export default function ProDescriptionsDemo() {
  const [data, setData] = useState<UserData>(DEFAULT_DATA)
  const [mode, setMode] = useState<"view" | "edit">("view")

  async function handleFinish(values: Record<string, unknown>) {
    await new Promise((resolve) => setTimeout(resolve, 600))
    setData((current) => ({ ...current, ...(values as Partial<UserData>) }))
    setMode("view")
  }

  const items = [
    { label: "Name", value: data.name },
    { label: "Email", value: data.email },
    {
      label: "Role",
      value: <Badge variant="outline">{ROLE_LABELS[data.role] ?? data.role}</Badge>,
    },
    {
      label: "Status",
      value: (
        <Badge variant={data.status === "active" ? "default" : "secondary"}>
          {STATUS_LABELS[data.status] ?? data.status}
        </Badge>
      ),
    },
    { label: "Registered", value: data.registeredAt },
    { label: "Last Login", value: data.lastLogin },
    { label: "Bio", value: data.bio, span: 2 },
  ]

  return (
    <div className="w-full max-w-2xl space-y-4 p-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-base font-semibold">User Profile</h3>
          <p className="text-sm text-muted-foreground">
            {mode === "view" ? "View user details." : "Update user information and save changes."}
          </p>
        </div>
        {mode === "view" && (
          <Button size="sm" onClick={() => setMode("edit")}>
            Edit
          </Button>
        )}
      </div>

      {mode === "view" ? (
        <ProDescriptions items={items} columns={2} bordered />
      ) : (
        <ProForm
          onFinish={handleFinish}
          submitter={({ submitting }) => (
            <>
              <ProButton
                type="button"
                variant="outline"
                disabled={submitting}
                onClick={() => setMode("view")}
              >
                Cancel
              </ProButton>
              <ProButton type="submit" loading={submitting} disabled={submitting}>
                {submitting ? "Submitting..." : "Submit"}
              </ProButton>
            </>
          )}
        >
          <FormItem label="Name" required htmlFor="name">
            <Input id="name" name="name" required defaultValue={data.name} placeholder="Full name" />
          </FormItem>
          <FormItem label="Email" required htmlFor="email">
            <Input
              id="email"
              name="email"
              type="email"
              required
              defaultValue={data.email}
              placeholder="user@example.com"
            />
          </FormItem>
          <FormItem label="Role" required htmlFor="role">
            <Select
              id="role"
              name="role"
              required
              defaultValue={data.role}
              placeholder="Select role"
              options={roleOptions}
            />
          </FormItem>
          <FormItem label="Status" required htmlFor="status">
            <Select
              id="status"
              name="status"
              required
              defaultValue={data.status}
              placeholder="Select status"
              options={statusOptions}
            />
          </FormItem>
          <FormItem label="Bio" htmlFor="bio">
            <Input id="bio" name="bio" defaultValue={data.bio} placeholder="Short bio" />
          </FormItem>
        </ProForm>
      )}
    </div>
  )
}
