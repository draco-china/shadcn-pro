'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { DrawerForm } from '@/registry/new-york-v4/pro/pro-form/index'

const schema = {
  type: 'object',
  properties: {
    name: {
      type: 'string',
      title: 'Full Name',
      required: true,
      'x-component-props': { placeholder: 'Your name' },
    },
    bio: {
      type: 'string',
      title: 'Bio',
      'x-component': 'Textarea',
      'x-component-props': { placeholder: 'Tell us about yourself', rows: 4 },
    },
    role: {
      type: 'string',
      title: 'Role',
      enum: [
        { label: 'Admin', value: 'admin' },
        { label: 'Developer', value: 'developer' },
        { label: 'Designer', value: 'designer' },
        { label: 'Viewer', value: 'viewer' },
      ],
      'x-component-props': {
        placeholder: 'Select role',
      },
    },
    start_date: {
      type: 'string',
      title: 'Start Date',
      'x-component': 'DatePicker',
      'x-component-props': { placeholder: 'Pick a date' },
    },
    rating: {
      type: 'number',
      title: 'Self Rating',
      'x-component': 'Rate',
      'x-component-props': { count: 5 },
    },
    notifications: {
      type: 'boolean',
      title: 'Notifications',
      default: true,
      description: 'Receive email notifications.',
    },
  },
}

export default function ProFormDrawerDemo() {
  const [result, setResult] = useState<Record<string, unknown> | null>(null)

  return (
    <div className="flex flex-col items-center gap-6 p-6">
      <DrawerForm
        trigger={<Button variant="outline">Edit Profile</Button>}
        title="Edit Profile"
        description="Update your profile information."
        submitter={{ submit: { text: "Save Changes" } }}
        side="right"
        schema={schema}
        onFinish={async (values) => {
          await new Promise((r) => setTimeout(r, 800))
          setResult(values)
        }}
      />

      {result && (
        <div className="w-full max-w-sm rounded-md border bg-muted/40 p-4">
          <p className="mb-2 text-xs font-semibold uppercase text-muted-foreground">Saved</p>
          <pre className="text-xs">{JSON.stringify(result, null, 2)}</pre>
        </div>
      )}
    </div>
  )
}
