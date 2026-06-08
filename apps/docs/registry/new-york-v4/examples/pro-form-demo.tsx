'use client'

import { useState } from 'react'

import { Switch } from '@/registry/new-york-v4/pro/base/fields/checkbox'
import { Input, Textarea } from '@/registry/new-york-v4/pro/base/fields/input'
import { Select } from '@/registry/new-york-v4/pro/base/fields/select'
import { FormItem, ProForm } from '@/registry/new-york-v4/pro/form'

const roleOptions = [
  { label: 'Admin', value: 'admin' },
  { label: 'Developer', value: 'developer' },
  { label: 'Designer', value: 'designer' },
  { label: 'Viewer', value: 'viewer' },
]

export default function ProFormDemo() {
  const [result, setResult] = useState<Record<string, unknown> | null>(null)

  async function handleFinish(values: Record<string, unknown>) {
    await new Promise((resolve) => setTimeout(resolve, 800))
    setResult(values)
  }

  return (
    <div className="w-full max-w-2xl space-y-6 p-6">
      <div>
        <h2 className="text-lg font-semibold">Team Member Registration</h2>
        <p className="text-sm text-muted-foreground">
          A composed ProForm using shadcn-pro fields directly.
        </p>
      </div>

      <ProForm onFinish={handleFinish}>
        <div className="grid gap-4 sm:grid-cols-2">
          <FormItem label="First Name" required htmlFor="firstName">
            <Input id="firstName" name="firstName" placeholder="First name" />
          </FormItem>
          <FormItem label="Last Name" required htmlFor="lastName">
            <Input id="lastName" name="lastName" placeholder="Last name" />
          </FormItem>
          <FormItem label="Email" required htmlFor="email">
            <Input id="email" name="email" type="email" placeholder="user@example.com" />
          </FormItem>
          <FormItem label="Role" required htmlFor="role">
            <Select id="role" name="role" placeholder="Select a role" options={roleOptions} />
          </FormItem>
          <FormItem
            label="Bio"
            htmlFor="bio"
            description="Shown as helper text below the field."
            className="sm:col-span-2"
          >
            <Textarea id="bio" name="bio" placeholder="Tell us about yourself" rows={3} />
          </FormItem>
          <FormItem label="Active" htmlFor="active" extra="Enable this account immediately.">
            <Switch id="active" name="active" value="true" defaultChecked />
          </FormItem>
        </div>
      </ProForm>

      {result && (
        <pre className="rounded-md bg-muted p-3 text-xs">{JSON.stringify(result, null, 2)}</pre>
      )}
    </div>
  )
}
