'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { ModalForm, SchemaField } from '@/registry/new-york-v4/pro/pro-form/index'

export default function ProFormModalDemo() {
  const [result, setResult] = useState<Record<string, unknown> | null>(null)

  return (
    <div className="flex flex-col items-center gap-6 p-6">
      <ModalForm
        trigger={<Button>New Member</Button>}
        title="Add Team Member"
        description="Fill in the details below to add a new team member."
        submitText="Add Member"
        onFinish={async (values) => {
          await new Promise((r) => setTimeout(r, 800))
          setResult(values)
        }}
      >
        <SchemaField>
        <SchemaField.String
          name="name"
          title="Name"
          required
          x-decorator="FormItem"
          x-component="Input"
          x-component-props={{ placeholder: 'Full name' }}
        />
        <SchemaField.String
          name="email"
          title="Email"
          required
          x-validator="email"
          x-decorator="FormItem"
          x-component="Input"
          x-component-props={{ placeholder: 'user@example.com' }}
        />
        <SchemaField.String
          name="role"
          title="Role"
          required
          x-decorator="FormItem"
          x-component="Select"
          x-component-props={{
            placeholder: 'Select a role',
            options: [
              { label: 'Admin', value: 'admin' },
              { label: 'Developer', value: 'developer' },
              { label: 'Viewer', value: 'viewer' },
            ],
          }}
        />
        <SchemaField.Boolean
          name="active"
          title="Active"
          default={true}
          x-decorator="FormItem"
          x-component="Switch"
        />
        </SchemaField>
      </ModalForm>

      {result && (
        <div className="w-full max-w-sm rounded-md border bg-muted/40 p-4">
          <p className="mb-2 text-xs font-semibold uppercase text-muted-foreground">Submitted</p>
          <pre className="text-xs">{JSON.stringify(result, null, 2)}</pre>
        </div>
      )}
    </div>
  )
}
