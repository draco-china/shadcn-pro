"use client"

import { createForm } from "@formily/core"
import { useMemo } from "react"

import { ProForm } from "@/registry/new-york-v4/pro/form/index"

const schema = {
  type: "object",
  properties: {
    name: {
      type: "string",
      title: "Name",
      required: true,
      "x-component-props": { placeholder: "Alice Wang" },
    },
    email: {
      type: "string",
      title: "Email",
      required: true,
      "x-validator": "email",
      "x-component-props": { placeholder: "alice@example.com" },
    },
    role: {
      type: "string",
      title: "Role",
      enum: [
        { label: "Admin", value: "admin" },
        { label: "Editor", value: "editor" },
        { label: "Viewer", value: "viewer" },
      ],
      "x-component-props": {
        placeholder: "Select role",
      },
    },
  },
}

export default function ProFormDocsDemo() {
  const form = useMemo(() => createForm(), [])

  return (
    <div className="w-full max-w-lg p-4">
      <ProForm form={form} schema={schema} submitter={{ submit: { text: "Create account" }, reset: {} }} />
    </div>
  )
}
