'use client'

import { useState } from 'react'
import { ProButton as Button } from '@/registry/new-york-v4/pro/base/button'
import { DrawerForm } from '@/registry/new-york-v4/pro/form'

const roleOptions = [
  { label: 'Admin', value: 'admin' },
  { label: 'Developer', value: 'developer' },
  { label: 'Designer', value: 'designer' },
  { label: 'Viewer', value: 'viewer' },
]

export default function ProFormDrawerDemo() {
  const [result, setResult] = useState<Record<string, unknown> | null>(null)

  return (
    <div className="flex flex-col items-center gap-6 p-6">
      <DrawerForm
        trigger={<Button variant="outline">Edit Profile</Button>}
        title="Edit Profile"
        description="Update your profile information."
        side="right"
        defaultValues={{ notifications: true, rating: 3 }}
        schema={[
          {
            name: 'name',
            label: 'Full Name',
            required: true,
            fieldProps: { placeholder: 'Your name' },
          },
          {
            name: 'bio',
            label: 'Bio',
            valueType: 'textarea',
            fieldProps: { placeholder: 'Tell us about yourself', rows: 4 },
          },
          {
            name: 'role',
            label: 'Role',
            valueType: 'select',
            fieldProps: { placeholder: 'Select role', options: roleOptions },
          },
          {
            name: 'startDate',
            label: 'Start Date',
            valueType: 'date',
            fieldProps: { placeholder: 'Pick a date' },
          },
          {
            name: 'rating',
            label: 'Self Rating',
            valueType: 'rate',
          },
          {
            name: 'notifications',
            label: 'Notifications',
            valueType: 'switch',
            extra: 'Receive email notifications.',
          },
        ]}
        onFinish={async (values) => {
          await new Promise((resolve) => setTimeout(resolve, 800))
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
