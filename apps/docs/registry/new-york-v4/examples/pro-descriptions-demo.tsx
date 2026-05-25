"use client"

import { createForm } from "@formily/core"
import { useMemo, useState } from "react"
import { Badge } from "@/registry/new-york-v4/ui/badge"
import { Button } from "@/registry/new-york-v4/ui/button"
import { ProDescriptions } from "@/registry/new-york-v4/pro/pro-descriptions/index"
import {
  ProForm,
  ProFormActions,
  SchemaField,
} from "@/registry/new-york-v4/pro/pro-form/index"

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

  const form = useMemo(
    () => createForm({ initialValues: { ...data } }),
    // recreate form with latest data each time we enter edit mode
    // biome-ignore lint/correctness/useExhaustiveDependencies: intentional — recreate on mode change
    [mode]
  )

  async function handleFinish(values: Record<string, unknown>) {
    await new Promise((r) => setTimeout(r, 600))
    setData(values as unknown as UserData)
    setMode("view")
  }

  const items = [
    { label: "Name", value: data.name },
    { label: "Email", value: data.email },
    {
      label: "Role",
      value: (
        <Badge variant="outline">{ROLE_LABELS[data.role] ?? data.role}</Badge>
      ),
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
            {mode === "view"
              ? "View user details."
              : "Update user information and save changes."}
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
        <ProForm form={form} onFinish={handleFinish} hideActions>
          <SchemaField>
            <SchemaField.String
              name="name"
              title="Name"
              required
              x-decorator="FormItem"
              x-component="Input"
              x-component-props={{ placeholder: "Full name" }}
            />
            <SchemaField.String
              name="email"
              title="Email"
              required
              x-validator="email"
              x-decorator="FormItem"
              x-component="Input"
              x-component-props={{ placeholder: "user@example.com" }}
            />
            <SchemaField.String
              name="role"
              title="Role"
              required
              x-decorator="FormItem"
              x-component="Select"
              x-component-props={{
                placeholder: "Select role",
                options: [
                  { label: "Admin", value: "admin" },
                  { label: "Developer", value: "developer" },
                  { label: "Viewer", value: "viewer" },
                ],
              }}
            />
            <SchemaField.String
              name="status"
              title="Status"
              required
              x-decorator="FormItem"
              x-component="Select"
              x-component-props={{
                placeholder: "Select status",
                options: [
                  { label: "Active", value: "active" },
                  { label: "Inactive", value: "inactive" },
                  { label: "Suspended", value: "suspended" },
                ],
              }}
            />
            <SchemaField.String
              name="bio"
              title="Bio"
              x-decorator="FormItem"
              x-component="Input"
              x-component-props={{ placeholder: "Short bio" }}
            />
          </SchemaField>
          <div className="flex gap-2 pt-2">
            <Button type="submit">Save</Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => setMode("view")}
            >
              Cancel
            </Button>
          </div>
        </ProForm>
      )}
    </div>
  )
}
