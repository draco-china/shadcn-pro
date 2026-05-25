'use client'

import { createForm } from '@formily/core'
import { useMemo, useState } from 'react'
import { ProForm, ProFormGrid, ProFormActions, SchemaField } from '@/registry/new-york-v4/pro/pro-form/index'

const form = createForm()

export default function ProFormDemo() {
  const [result, setResult] = useState<Record<string, unknown> | null>(null)

  async function handleFinish(values: Record<string, unknown>) {
    await new Promise((r) => setTimeout(r, 800))
    setResult(values)
  }

  return (
    <div className="w-full max-w-lg space-y-4 p-4">
      <div>
        <h3 className="text-base font-semibold">ProForm Basic Example</h3>
        <p className="text-sm text-muted-foreground">Schema-driven, auto-validation, submit loading</p>
      </div>

      <ProForm
        form={form}
        onFinish={handleFinish}
        showReset
        submitText="Submit"
        resetText="Reset"
      >
        <SchemaField>
          <SchemaField.String
            name="name"
            title="Name"
            required
            x-decorator="FormItem"
            x-component="Input"
            x-component-props={{ placeholder: 'Enter your name' }}
          />
          <SchemaField.String
            name="email"
            title="Email"
            required
            description="We will never share your email with anyone."
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
                { label: 'Guest', value: 'viewer' },
              ],
            }}
          />
          <SchemaField.String
            name="bio"
            title="Bio"
            description="Up to 200 characters"
            x-decorator="FormItem"
            x-component="Textarea"
            x-component-props={{ placeholder: 'Enter your bio (optional)', rows: 3 }}
          />
          <SchemaField.Boolean
            name="active"
            title="Enable account"
            default={true}
            description="When disabled, this account cannot log in."
            x-decorator="FormItem"
            x-component="Switch"
          />
        </SchemaField>
      </ProForm>

      {result && (
        <div className="rounded-md border bg-muted/40 p-3">
          <p className="text-xs font-medium text-muted-foreground mb-1">Submitted values:</p>
          <pre className="text-xs">{JSON.stringify(result, null, 2)}</pre>
        </div>
      )}
    </div>
  )
}
