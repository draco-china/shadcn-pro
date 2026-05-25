"use client"

import { createForm } from "@formily/core"
import { useMemo } from "react"

import { ProForm, SchemaField } from "@/registry/new-york-v4/pro/pro-form/index"

export default function ProFormDocsDemo() {
  const form = useMemo(() => createForm(), [])

  return (
    <div className="w-full max-w-lg p-4">
      <ProForm form={form} submitText="Create account" showReset>
        <SchemaField>
          <SchemaField.String
            name="name"
            title="Name"
            required
            x-decorator="FormItem"
            x-component="Input"
            x-component-props={{ placeholder: "Alice Wang" }}
          />
          <SchemaField.String
            name="email"
            title="Email"
            required
            x-validator="email"
            x-decorator="FormItem"
            x-component="Input"
            x-component-props={{ placeholder: "alice@example.com" }}
          />
          <SchemaField.String
            name="role"
            title="Role"
            x-decorator="FormItem"
            x-component="Select"
            x-component-props={{
              placeholder: "Select role",
              options: [
                { label: "Admin", value: "admin" },
                { label: "Editor", value: "editor" },
                { label: "Viewer", value: "viewer" },
              ],
            }}
          />
        </SchemaField>
      </ProForm>
    </div>
  )
}
