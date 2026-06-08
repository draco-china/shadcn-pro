'use client'

import { useState } from 'react'
import { ProButton as Button } from '@/registry/new-york-v4/pro/base/button'
import { Switch } from '@/registry/new-york-v4/pro/base/fields/checkbox'
import { DatePicker } from '@/registry/new-york-v4/pro/base/fields/date-picker'
import { Input, Textarea } from '@/registry/new-york-v4/pro/base/fields/input'
import { Rate } from '@/registry/new-york-v4/pro/base/fields/radio'
import { Select } from '@/registry/new-york-v4/pro/base/fields/select'
import { DrawerForm, FormItem } from '@/registry/new-york-v4/pro/form'

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
        onFinish={async (values) => {
          await new Promise((resolve) => setTimeout(resolve, 800))
          setResult(values)
        }}
      >
        <FormItem label="Full Name" required htmlFor="name">
          <Input id="name" name="name" required placeholder="Your name" />
        </FormItem>
        <FormItem label="Bio" htmlFor="bio">
          <Textarea id="bio" name="bio" placeholder="Tell us about yourself" rows={4} />
        </FormItem>
        <FormItem label="Role" htmlFor="role">
          <Select id="role" name="role" placeholder="Select role" options={roleOptions} />
        </FormItem>
        <FormItem label="Start Date" htmlFor="start_date">
          <DatePicker id="start_date" name="start_date" placeholder="Pick a date" />
        </FormItem>
        <FormItem label="Self Rating" htmlFor="rating">
          <Rate id="rating" name="rating" />
        </FormItem>
        <FormItem label="Notifications" htmlFor="notifications" extra="Receive email notifications.">
          <Switch id="notifications" name="notifications" value="true" defaultChecked />
        </FormItem>
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
