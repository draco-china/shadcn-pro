'use client'

import { useState } from 'react'

import { ArrayField } from '@/registry/new-york-v4/pro/pro-fields/array-field'
import { Captcha } from '@/registry/new-york-v4/pro/pro-fields/captcha'
import { Cascader } from '@/registry/new-york-v4/pro/pro-fields/cascader'
import { CheckboxBase } from '@/registry/new-york-v4/pro/pro-fields/checkbox'
import { DatePicker } from '@/registry/new-york-v4/pro/pro-fields/date-picker'
import { DateRangePicker } from '@/registry/new-york-v4/pro/pro-fields/date-range-picker'
import { DateTimePicker } from '@/registry/new-york-v4/pro/pro-fields/date-time-picker'
import { Digit } from '@/registry/new-york-v4/pro/pro-fields/digit'
import { DigitRange } from '@/registry/new-york-v4/pro/pro-fields/digit-range'
import { Input } from '@/registry/new-york-v4/pro/pro-fields/input'
import { Money } from '@/registry/new-york-v4/pro/pro-fields/money'
import { ObjectField } from '@/registry/new-york-v4/pro/pro-fields/object-field'
import { Password } from '@/registry/new-york-v4/pro/pro-fields/password'
import { RadioBase } from '@/registry/new-york-v4/pro/pro-fields/radio'
import { Rate } from '@/registry/new-york-v4/pro/pro-fields/rate'
import { Segmented } from '@/registry/new-york-v4/pro/pro-fields/segmented'
import { SelectBase } from '@/registry/new-york-v4/pro/pro-fields/select'
import { Slider } from '@/registry/new-york-v4/pro/pro-fields/slider'
import { SwitchBase } from '@/registry/new-york-v4/pro/pro-fields/switch'
import { Textarea } from '@/registry/new-york-v4/pro/pro-fields/textarea'
import { TimePicker } from '@/registry/new-york-v4/pro/pro-fields/time-picker'
import { TreeSelect } from '@/registry/new-york-v4/pro/pro-fields/tree-select'
import { Upload } from '@/registry/new-york-v4/pro/pro-fields/upload'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">{title}</h3>
        <Separator className="mt-2" />
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">{children}</div>
    </div>
  )
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="space-y-1.5">
      <Label className="text-xs text-muted-foreground">{label}</Label>
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

export default function ProFieldsDemo() {
  const [date, setDate] = useState<Date>()
  const [dateTime, setDateTime] = useState<Date>()
  const [dateRange, setDateRange] = useState<{ from?: Date; to?: Date }>()
  const [slider, setSlider] = useState([40])
  const [rate, setRate] = useState(3)
  const [money, setMoney] = useState<number>()
  const [digit, setDigit] = useState<number>()
  const [digitRange, setDigitRange] = useState<[number, number]>()
  const [contacts, setContacts] = useState([{ name: 'Alice', email: 'alice@example.com' }])

  return (
    <div className="w-full space-y-8 p-6">
      {/* Text inputs */}
      <Section title="Text">
        <Field label="Input"><Input placeholder="Enter text" /></Field>
        <Field label="Password"><Password placeholder="Enter password" /></Field>
        <Field label="Textarea"><Textarea placeholder="Enter multi-line text" rows={3} /></Field>
        <Field label="Captcha">
          <Captcha placeholder="Enter code" onSend={async () => { await new Promise(r => setTimeout(r, 1000)) }} />
        </Field>
      </Section>

      {/* Numeric */}
      <Section title="Numeric">
        <Field label="Digit">
          <Digit value={digit} onChange={setDigit} placeholder="0" min={0} max={100} />
        </Field>
        <Field label="Digit Range">
          <DigitRange value={digitRange} onChange={setDigitRange} min={0} max={100} />
        </Field>
        <Field label="Money">
          <Money value={money} onChange={setMoney} placeholder="0.00" currency="USD" />
        </Field>
        <Field label="Slider">
          <div className="pt-2">
            <Slider value={slider} onValueChange={setSlider} min={0} max={100} step={1} />
            <p className="mt-1 text-xs text-muted-foreground">Value: {slider[0]}</p>
          </div>
        </Field>
        <Field label="Rate">
          <Rate value={rate} onChange={setRate} count={5} />
        </Field>
      </Section>

      {/* Choice */}
      <Section title="Choice">
        <Field label="Select">
          <SelectBase
            placeholder="Select a role"
            options={[
              { label: 'Admin', value: 'admin' },
              { label: 'Developer', value: 'developer' },
              { label: 'Viewer', value: 'viewer' },
            ]}
          />
        </Field>
        <Field label="Radio">
          <RadioBase
            options={[
              { label: 'High', value: 'high' },
              { label: 'Medium', value: 'medium' },
              { label: 'Low', value: 'low' },
            ]}
          />
        </Field>
        <Field label="Checkbox">
          <CheckboxBase>Accept Terms of Service</CheckboxBase>
        </Field>
        <Field label="Switch">
          <SwitchBase defaultChecked />
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
          <TimePicker placeholder="Pick a time" />
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
            <Upload accept="image/*" maxFiles={3} />
          </Field>
        </div>
      </Section>

      {/* Structural */}
      <div className="space-y-4">
        <div>
          <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">Structural</h3>
          <Separator className="mt-2" />
        </div>

        <ObjectField
          title="Object Field"
          description="Group related fields into a collapsible section."
          variant="separated"
          collapsible
        >
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Field label="First Name"><Input placeholder="First name" /></Field>
            <Field label="Last Name"><Input placeholder="Last name" /></Field>
            <Field label="Department">
              <SelectBase
                placeholder="Select department"
                options={[
                  { label: 'Engineering', value: 'eng' },
                  { label: 'Product', value: 'product' },
                  { label: 'Design', value: 'design' },
                ]}
              />
            </Field>
          </div>
        </ObjectField>

        <ObjectField
          title="Array Field"
          description="Drag to reorder. Add or remove items dynamically."
          variant="bordered"
        >
          <ArrayField<{ name: string; email: string }>
            value={contacts}
            onChange={setContacts}
            newItem={() => ({ name: '', email: '' })}
            addText="Add contact"
            min={1}
            renderItem={(item, _index, { update }) => (
              <div className="grid grid-cols-2 gap-2">
                <Input
                  placeholder="Name"
                  value={item.name}
                  onChange={(e) => update({ name: e.target.value })}
                />
                <Input
                  placeholder="Email"
                  value={item.email}
                  onChange={(e) => update({ email: e.target.value })}
                />
              </div>
            )}
          />
        </ObjectField>
      </div>
    </div>
  )
}
