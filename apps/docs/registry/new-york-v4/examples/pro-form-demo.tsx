'use client'

import { createForm } from '@formily/core'
import { useMemo, useState } from 'react'

import { ProForm, ProFormGrid, SchemaField } from '@/registry/new-york-v4/pro/pro-form/index'

export default function ProFormDemo() {
  const form = useMemo(() => createForm(), [])
  const [result, setResult] = useState<Record<string, unknown> | null>(null)

  async function handleFinish(values: Record<string, unknown>) {
    await new Promise((r) => setTimeout(r, 800))
    setResult(values)
  }

  return (
    <div className="w-full max-w-2xl space-y-6 p-6">
      <div>
        <h2 className="text-lg font-semibold">Team Member Registration</h2>
        <p className="text-sm text-muted-foreground">
          A comprehensive form demonstrating all ProForm field types.
        </p>
      </div>

      <ProForm
        form={form}
        onFinish={handleFinish}
        showReset
        submitText="Submit"
        resetText="Reset"
      >
        <SchemaField>
        {/* Basic info — ObjectField */}
        <SchemaField.Object
          name="basic"
          title="Basic Information"
          x-decorator="FormItem"
          x-component="ObjectField"
          x-component-props={{ variant: 'separated', collapsible: true }}
        >
          <ProFormGrid columns={2}>
            <SchemaField.String
              name="firstName"
              title="First Name"
              required
              x-decorator="FormItem"
              x-component="Input"
              x-component-props={{ placeholder: 'First name' }}
            />
            <SchemaField.String
              name="lastName"
              title="Last Name"
              required
              x-decorator="FormItem"
              x-component="Input"
              x-component-props={{ placeholder: 'Last name' }}
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
              name="password"
              title="Password"
              required
              x-decorator="FormItem"
              x-component="Password"
              x-component-props={{ placeholder: 'Enter password' }}
            />
          </ProFormGrid>
          <SchemaField.String
            name="bio"
            title="Bio"
            description="Up to 200 characters."
            x-decorator="FormItem"
            x-component="Textarea"
            x-component-props={{ placeholder: 'Tell us about yourself', rows: 3 }}
          />
        </SchemaField.Object>

        {/* Role & Settings */}
        <SchemaField.Object
          name="settings"
          title="Role & Settings"
          x-decorator="FormItem"
          x-component="ObjectField"
          x-component-props={{ variant: 'separated', collapsible: true }}
        >
          <ProFormGrid columns={2}>
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
                  { label: 'Designer', value: 'designer' },
                  { label: 'Viewer', value: 'viewer' },
                ],
              }}
            />
            <SchemaField.String
              name="priority"
              title="Priority"
              x-decorator="FormItem"
              x-component="Radio"
              x-component-props={{
                options: [
                  { label: 'High', value: 'high' },
                  { label: 'Medium', value: 'medium' },
                  { label: 'Low', value: 'low' },
                ],
              }}
            />
            <SchemaField.String
              name="plan"
              title="Plan"
              x-decorator="FormItem"
              x-component="Segmented"
              x-component-props={{
                options: [
                  { label: 'Free', value: 'free' },
                  { label: 'Pro', value: 'pro' },
                  { label: 'Enterprise', value: 'enterprise' },
                ],
                defaultValue: 'free',
              }}
            />
            <SchemaField.String
              name="team"
              title="Team"
              x-decorator="FormItem"
              x-component="TreeSelect"
              x-component-props={{
                placeholder: 'Select teams',
                multiple: true,
                options: [
                  {
                    label: 'Engineering', value: 'eng',
                    children: [
                      { label: 'Frontend', value: 'fe' },
                      { label: 'Backend', value: 'be' },
                    ],
                  },
                  {
                    label: 'Product', value: 'product',
                    children: [
                      { label: 'Design', value: 'design' },
                      { label: 'Research', value: 'research' },
                    ],
                  },
                ],
              }}
            />
            <SchemaField.String
              name="location"
              title="Location"
              x-decorator="FormItem"
              x-component="Cascader"
              x-component-props={{
                placeholder: 'Select location',
                options: [
                  {
                    label: 'North America', value: 'na',
                    children: [
                      { label: 'United States', value: 'us', children: [{ label: 'New York', value: 'ny' }, { label: 'California', value: 'ca' }] },
                    ],
                  },
                  {
                    label: 'Asia', value: 'asia',
                    children: [
                      { label: 'China', value: 'cn', children: [{ label: 'Beijing', value: 'bj' }, { label: 'Shanghai', value: 'sh' }] },
                    ],
                  },
                ],
              }}
            />
            <SchemaField.Boolean
              name="active"
              title="Active"
              default={true}
              description="Enable this account immediately."
              x-decorator="FormItem"
              x-component="Switch"
            />
          </ProFormGrid>
        </SchemaField.Object>

        {/* Numeric & Date */}
        <SchemaField.Object
          name="numeric"
          title="Budget & Schedule"
          x-decorator="FormItem"
          x-component="ObjectField"
          x-component-props={{ variant: 'separated', collapsible: true }}
        >
          <ProFormGrid columns={2}>
            <SchemaField.Number
              name="budget"
              title="Budget"
              x-decorator="FormItem"
              x-component="Money"
              x-component-props={{ placeholder: '0.00', currency: 'USD' }}
            />
            <SchemaField.Number
              name="headcount"
              title="Headcount"
              x-decorator="FormItem"
              x-component="Digit"
              x-component-props={{ placeholder: '0', min: 1, max: 500 }}
            />
            <SchemaField.Number
              name="salary_range"
              title="Salary Range (K)"
              x-decorator="FormItem"
              x-component="DigitRange"
              x-component-props={{ min: 0, max: 500 }}
            />
            <SchemaField.Number
              name="progress"
              title="Progress (%)"
              x-decorator="FormItem"
              x-component="Slider"
              x-component-props={{ min: 0, max: 100, step: 5 }}
            />
            <SchemaField.Number
              name="rating"
              title="Team Rating"
              x-decorator="FormItem"
              x-component="Rate"
              x-component-props={{ count: 5 }}
            />
            <SchemaField.String
              name="start_date"
              title="Start Date"
              x-decorator="FormItem"
              x-component="DatePicker"
              x-component-props={{ placeholder: 'Select start date' }}
            />
            <SchemaField.String
              name="period"
              title="Period"
              x-decorator="FormItem"
              x-component="DateRangePicker"
              x-component-props={{ placeholder: 'Select period' }}
            />
            <SchemaField.String
              name="standup_time"
              title="Daily Standup"
              x-decorator="FormItem"
              x-component="TimePicker"
              x-component-props={{ placeholder: 'Pick a time' }}
            />
          </ProFormGrid>
        </SchemaField.Object>

        {/* Contacts — ArrayField */}
        <SchemaField.Array
          name="contacts"
          title="Emergency Contacts"
          x-decorator="FormItem"
          x-component="ArrayField"
          x-component-props={{ addText: 'Add contact', min: 1 }}
        >
          <SchemaField.Object>
            <ProFormGrid columns={2}>
              <SchemaField.String
                name="name"
                title="Name"
                required
                x-decorator="FormItem"
                x-component="Input"
                x-component-props={{ placeholder: 'Contact name' }}
              />
              <SchemaField.String
                name="phone"
                title="Phone"
                x-decorator="FormItem"
                x-component="Input"
                x-component-props={{ placeholder: '+1 (555) 000-0000' }}
              />
            </ProFormGrid>
          </SchemaField.Object>
        </SchemaField.Array>

        {/* Avatar upload */}
        <SchemaField.String
          name="avatar"
          title="Avatar"
          description="Upload a profile picture (PNG, JPG, max 2MB)."
          x-decorator="FormItem"
          x-component="Upload"
          x-component-props={{ accept: 'image/*', maxFiles: 1 }}
        />

        <SchemaField.Boolean
          name="agree"
          title=" "
          required
          x-decorator="FormItem"
          x-component="Checkbox"
          x-content="I agree to the Terms of Service and Privacy Policy"
        />
        </SchemaField>
      </ProForm>

      {result && (
        <div className="rounded-md border bg-muted/40 p-4">
          <p className="mb-2 text-xs font-semibold text-muted-foreground uppercase">Submitted values</p>
          <pre className="text-xs text-foreground overflow-auto max-h-48">
            {JSON.stringify(result, null, 2)}
          </pre>
        </div>
      )}
    </div>
  )
}
