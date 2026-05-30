'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { DrawerForm, SchemaField } from '@/registry/new-york-v4/pro/pro-form/index'

export default function ProFormDrawerDemo() {
  const [result, setResult] = useState<Record<string, unknown> | null>(null)

  return (
    <div className="flex flex-col items-center gap-6 p-6">
      <DrawerForm
        trigger={<Button variant="outline">Edit Profile</Button>}
        title="Edit Profile"
        description="Update your profile information."
        submitText="Save Changes"
        side="right"
        onFinish={async (values) => {
          await new Promise((r) => setTimeout(r, 800))
          setResult(values)
        }}
      >
        <SchemaField.String
          name="name"
          title="Full Name"
          required
          x-decorator="FormItem"
          x-component="Input"
          x-component-props={{ placeholder: 'Your name' }}
        />
        <SchemaField.String
          name="bio"
          title="Bio"
          x-decorator="FormItem"
          x-component="Textarea"
          x-component-props={{ placeholder: 'Tell us about yourself', rows: 4 }}
        />
        <SchemaField.String
          name="role"
          title="Role"
          x-decorator="FormItem"
          x-component="Select"
          x-component-props={{
            placeholder: 'Select role',
            options: [
              { label: 'Admin', value: 'admin' },
              { label: 'Developer', value: 'developer' },
              { label: 'Designer', value: 'designer' },
              { label: 'Viewer', value: 'viewer' },
            ],
          }}
        />
        <SchemaField.String
          name="start_date"
          title="Start Date"
          x-decorator="FormItem"
          x-component="DatePicker"
          x-component-props={{ placeholder: 'Pick a date' }}
        />
        <SchemaField.Number
          name="rating"
          title="Self Rating"
          x-decorator="FormItem"
          x-component="Rate"
          x-component-props={{ count: 5 }}
        />
        <SchemaField.Boolean
          name="notifications"
          title="Notifications"
          default={true}
          description="Receive email notifications."
          x-decorator="FormItem"
          x-component="Switch"
        />
      </DrawerForm>

      {result && (
        <div className="w-full max-w-sm rounded-md border bg-muted/40 p-4">
          <p className="mb-2 text-xs font-semibold uppercase text-muted-foreground">Saved</p>
          <pre className="text-xs">{JSON.stringify(result, null, 2)}</pre>
        </div>
      )}
    </div>
  )
}
