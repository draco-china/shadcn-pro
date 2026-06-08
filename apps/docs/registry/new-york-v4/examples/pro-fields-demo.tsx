'use client'

import { type ReactNode, useState } from 'react'

import { ArrayField } from '@/registry/new-york-v4/pro/base/fields/array-field'
import { Checkbox, Switch } from '@/registry/new-york-v4/pro/base/fields/checkbox'
import { DatePicker, DateRangePicker } from '@/registry/new-york-v4/pro/base/fields/date-picker'
import { DateTimePicker, TimePicker } from '@/registry/new-york-v4/pro/base/fields/date-time-picker'
import {
  Captcha,
  Digit,
  DigitRange,
  Input,
  Money,
  Password,
  Slider,
  Textarea,
} from '@/registry/new-york-v4/pro/base/fields/input'
import { Radio, Rate, Segmented } from '@/registry/new-york-v4/pro/base/fields/radio'
import { Cascader, Select, TreeSelect } from '@/registry/new-york-v4/pro/base/fields/select'
import {
  Upload,
  UploadFileList,
  UploadTrigger,
} from '@/registry/new-york-v4/pro/base/fields/upload'

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">{title}</h3>
        <div role="separator" className="mt-2 h-px w-full bg-border" />
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">{children}</div>
    </div>
  )
}

function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="space-y-1.5">
      <label className="text-xs leading-none font-medium text-muted-foreground select-none">
        {label}
      </label>
      {children}
    </div>
  )
}

const locationOptions = [
  {
    label: 'North America',
    value: 'na',
    children: [
      { label: 'United States', value: 'us', children: [{ label: 'New York', value: 'ny' }, { label: 'California', value: 'ca' }] },
      { label: 'Canada', value: 'ca2', children: [{ label: 'Toronto', value: 'tor' }] },
    ],
  },
  {
    label: 'Asia',
    value: 'asia',
    children: [
      { label: 'China', value: 'cn', children: [{ label: 'Beijing', value: 'bj' }, { label: 'Shanghai', value: 'sh' }] },
      { label: 'Japan', value: 'jp', children: [{ label: 'Tokyo', value: 'tok' }] },
    ],
  },
]

const treeOptions = [
  {
    label: 'Engineering',
    value: 'eng',
    children: [
      { label: 'Frontend', value: 'fe' },
      { label: 'Backend', value: 'be' },
      { label: 'DevOps', value: 'devops' },
    ],
  },
  {
    label: 'Product',
    value: 'product',
    children: [
      { label: 'Design', value: 'design' },
      { label: 'Research', value: 'research' },
    ],
  },
]

const statusOptions = [
  { label: 'Backlog', value: 'backlog' },
  { label: 'In progress', value: 'in-progress' },
  { label: 'Done', value: 'done' },
]

export default function ProFieldsDemo() {
  const [date, setDate] = useState<Date>()
  const [dateTime, setDateTime] = useState<Date>()
  const [dateRange, setDateRange] = useState<{ from?: Date; to?: Date }>()
  const [slider, setSlider] = useState(40)
  const [rate, setRate] = useState(3)
  const [money, setMoney] = useState<number>()
  const [digit, setDigit] = useState<number>()
  const [digitRange, setDigitRange] = useState<{ min?: number; max?: number }>()
  const [statusFilter, setStatusFilter] = useState<string[]>(['in-progress'])
  const [contacts, setContacts] = useState([{ name: 'Alice', email: 'alice@example.com' }])

  return (
    <div className="w-full space-y-8 p-6">
      {/* Text inputs */}
      <Section title="Text">
        <Field label="Input"><Input placeholder="Enter text" /></Field>
        <Field label="Password"><Password placeholder="Enter password" /></Field>
        <Field label="Textarea"><Textarea placeholder="Enter multi-line text" rows={3} /></Field>
        <Field label="Captcha">
          <Captcha placeholder="Enter code" onSend={() => {}} />
        </Field>
      </Section>

      {/* Numeric */}
      <Section title="Numeric">
        <Field label="Digit">
          <Digit value={digit} onChange={setDigit} placeholder="0" min={0} max={100} />
        </Field>
        <Field label="Digit Range">
          <DigitRange value={digitRange} onChange={setDigitRange} />
        </Field>
        <Field label="Money">
          <Money
            value={money}
            onChange={setMoney}
            placeholder="0.00"
            prefix="$"
            suffix="USD"
          />
        </Field>
        <Field label="Slider">
          <div className="pt-2">
            <Slider value={slider} onChange={setSlider} min={0} max={100} step={1} />
            <p className="mt-1 text-xs text-muted-foreground">Value: {slider}</p>
          </div>
        </Field>
        <Field label="Rate">
          <Rate value={rate} onChange={setRate} />
        </Field>
      </Section>

      {/* Choice */}
      <Section title="Choice">
        <Field label="Select">
          <Select
            placeholder="Select a role"
            options={[
              { label: 'Admin', value: 'admin' },
              { label: 'Developer', value: 'developer' },
              { label: 'Viewer', value: 'viewer' },
            ]}
          />
        </Field>
        <Field label="Radio">
          <Radio
            options={[
              { label: 'High', value: 'high' },
              { label: 'Medium', value: 'medium' },
              { label: 'Low', value: 'low' },
            ]}
          />
        </Field>
        <Field label="Checkbox">
          <Checkbox>Accept Terms of Service</Checkbox>
        </Field>
        <Field label="Switch">
          <Switch value />
        </Field>
        <Field label="Segmented">
          <Segmented
            options={[
              { label: 'Day', value: 'day' },
              { label: 'Week', value: 'week' },
              { label: 'Month', value: 'month' },
            ]}
            defaultValue="week"
          />
        </Field>
        <Field label="Multi Select">
          <Select
            placeholder="Status"
            multiple
            searchable
            allowClear
            value={statusFilter}
            options={statusOptions}
            onChange={(nextValue) => {
              setStatusFilter(Array.isArray(nextValue) ? nextValue : nextValue ? [nextValue] : [])
            }}
          />
        </Field>
      </Section>

      {/* Date & Time */}
      <Section title="Date & Time">
        <Field label="Date Picker">
          <DatePicker value={date} onChange={setDate} placeholder="Pick a date" />
        </Field>
        <Field label="Date Time Picker">
          <DateTimePicker value={dateTime} onChange={setDateTime} placeholder="Pick date & time" />
        </Field>
        <Field label="Date Range Picker">
          <DateRangePicker value={dateRange} onChange={setDateRange} placeholder="Pick a range" />
        </Field>
        <Field label="Time Picker">
          <TimePicker />
        </Field>
      </Section>

      {/* Advanced */}
      <Section title="Advanced">
        <Field label="Cascader">
          <Cascader options={locationOptions} placeholder="Select location" />
        </Field>
        <Field label="Tree Select">
          <TreeSelect options={treeOptions} placeholder="Select teams" multiple />
        </Field>
        <div className="sm:col-span-2">
          <Field label="Upload">
            <Upload accept="image/*" maxCount={3}>
              <UploadTrigger />
              <UploadFileList />
            </Upload>
          </Field>
        </div>
      </Section>

      {/* Structural */}
      <div className="space-y-4">
        <div>
          <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">Structural</h3>
          <div role="separator" className="mt-2 h-px w-full bg-border" />
        </div>

        <section className="space-y-4">
          <div className="space-y-1">
            <h3 className="text-sm font-medium leading-none">Field Group</h3>
            <p className="text-xs text-muted-foreground">Compose related fields with regular layout.</p>
          </div>
          <div role="separator" className="h-px w-full bg-border" />
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Field label="First Name"><Input placeholder="First name" /></Field>
            <Field label="Last Name"><Input placeholder="Last name" /></Field>
            <Field label="Department">
              <Select
                placeholder="Select department"
                options={[
                  { label: 'Engineering', value: 'eng' },
                  { label: 'Product', value: 'product' },
                  { label: 'Design', value: 'design' },
                ]}
              />
            </Field>
          </div>
        </section>

        <section className="space-y-4 border-l-2 border-border pl-4">
          <div className="space-y-1">
            <h3 className="text-sm font-medium leading-none">Array Field</h3>
            <p className="text-xs text-muted-foreground">
              Drag to reorder. Add or remove items dynamically.
            </p>
          </div>
          <div role="separator" className="h-px w-full bg-border" />
          <ArrayField<{ name: string; email: string }>
            value={contacts}
            onChange={setContacts}
            newItem={() => ({ name: '', email: '' })}
            min={1}
            renderItem={(item, _index, { update }) => (
              <div className="grid grid-cols-2 gap-2">
                <Input
                  placeholder="Name"
                  value={item.name}
                  onChange={(e) => update({ ...item, name: e.target.value })}
                />
                <Input
                  placeholder="Email"
                  value={item.email}
                  onChange={(e) => update({ ...item, email: e.target.value })}
                />
              </div>
            )}
          />
        </section>
      </div>
    </div>
  )
}
