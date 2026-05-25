"use client"

import { useState, type ReactNode } from "react"
import { Search } from "lucide-react"

import { ArrayField } from "@/registry/new-york-v4/pro/pro-fields/array-field"
import { CaptchaBase } from "@/registry/new-york-v4/pro/pro-fields/captcha"
import { CascaderBase } from "@/registry/new-york-v4/pro/pro-fields/cascader"
import { CheckboxBase } from "@/registry/new-york-v4/pro/pro-fields/checkbox"
import { DatePickerBase } from "@/registry/new-york-v4/pro/pro-fields/date-picker"
import {
  DateRangePickerBase,
  type DateRangeValue,
} from "@/registry/new-york-v4/pro/pro-fields/date-range-picker"
import { DateTimePickerBase } from "@/registry/new-york-v4/pro/pro-fields/date-time-picker"
import { DigitBase } from "@/registry/new-york-v4/pro/pro-fields/digit"
import {
  DigitRangeBase,
  type DigitRangeValue,
} from "@/registry/new-york-v4/pro/pro-fields/digit-range"
import { Input } from "@/registry/new-york-v4/pro/pro-fields/input"
import { MoneyBase } from "@/registry/new-york-v4/pro/pro-fields/money"
import { ObjectField } from "@/registry/new-york-v4/pro/pro-fields/object-field"
import { Password } from "@/registry/new-york-v4/pro/pro-fields/password"
import { RadioBase } from "@/registry/new-york-v4/pro/pro-fields/radio"
import { RateBase } from "@/registry/new-york-v4/pro/pro-fields/rate"
import { SegmentedBase } from "@/registry/new-york-v4/pro/pro-fields/segmented"
import { SelectBase } from "@/registry/new-york-v4/pro/pro-fields/select"
import { SliderBase } from "@/registry/new-york-v4/pro/pro-fields/slider"
import { SwitchBase } from "@/registry/new-york-v4/pro/pro-fields/switch"
import { TextareaBase } from "@/registry/new-york-v4/pro/pro-fields/textarea"
import { TimePickerBase } from "@/registry/new-york-v4/pro/pro-fields/time-picker"
import { TreeSelectBase } from "@/registry/new-york-v4/pro/pro-fields/tree-select"
import {
  UploadBase,
  type UploadFile,
} from "@/registry/new-york-v4/pro/pro-fields/upload"

const roleOptions = [
  { label: "Admin", value: "admin" },
  { label: "Editor", value: "editor" },
  { label: "Viewer", value: "viewer" },
]

const regionOptions = [
  {
    label: "China",
    value: "china",
    children: [
      { label: "Shanghai", value: "shanghai" },
      { label: "Hangzhou", value: "hangzhou" },
    ],
  },
  {
    label: "United States",
    value: "us",
    children: [
      { label: "New York", value: "new-york" },
      { label: "San Francisco", value: "san-francisco" },
    ],
  },
]

const teamOptions = [
  {
    label: "Product",
    value: "product",
    children: [
      { label: "Design", value: "design" },
      { label: "Research", value: "research" },
    ],
  },
  {
    label: "Engineering",
    value: "engineering",
    children: [
      { label: "Frontend", value: "frontend" },
      { label: "Platform", value: "platform" },
    ],
  },
]

function FieldPreview({
  title,
  children,
}: {
  title: string
  children: ReactNode
}) {
  return (
    <div className="space-y-2 rounded-md border bg-background/60 p-3">
      <div className="text-sm font-medium">{title}</div>
      {children}
    </div>
  )
}

export default function ProFieldsDocsDemo() {
  const [enabled, setEnabled] = useState(true)
  const [checked, setChecked] = useState(true)
  const [role, setRole] = useState<string | undefined>("admin")
  const [priority, setPriority] = useState("medium")
  const [segment, setSegment] = useState("weekly")
  const [score, setScore] = useState(4)
  const [quantity, setQuantity] = useState<number | undefined>(12)
  const [range, setRange] = useState<DigitRangeValue | undefined>({
    min: 100,
    max: 500,
  })
  const [amount, setAmount] = useState<number | undefined>(1280)
  const [date, setDate] = useState<Date | undefined>(
    () => new Date(2026, 4, 25)
  )
  const [dateRange, setDateRange] = useState<DateRangeValue | undefined>({
    from: new Date(2026, 4, 25),
    to: new Date(2026, 4, 29),
  })
  const [dateTime, setDateTime] = useState<Date | undefined>(
    () => new Date(2026, 4, 25, 9, 30)
  )
  const [time, setTime] = useState<string | undefined>("09:30:00")
  const [region, setRegion] = useState<string[]>(["china", "shanghai"])
  const [team, setTeam] = useState<string[]>(["frontend"])
  const [files, setFiles] = useState<UploadFile[]>([
    { uid: "1", name: "contract.pdf", status: "done" as const, size: 248000 },
  ])
  const [items, setItems] = useState([{ name: "Primary contact" }])

  return (
    <div className="grid w-full gap-3 p-4 sm:grid-cols-2 xl:grid-cols-3">
      <FieldPreview title="Input">
        <Input
          prefix={<Search size={16} />}
          placeholder="Search fields..."
          allowClear
        />
      </FieldPreview>
      <FieldPreview title="Password">
        <Password placeholder="Enter password" />
      </FieldPreview>
      <FieldPreview title="Textarea">
        <TextareaBase placeholder="Write a note" rows={2} />
      </FieldPreview>
      <FieldPreview title="Digit">
        <DigitBase value={quantity} onChange={setQuantity} allowClear />
      </FieldPreview>
      <FieldPreview title="DigitRange">
        <DigitRangeBase value={range} onChange={setRange} allowClear />
      </FieldPreview>
      <FieldPreview title="Money">
        <MoneyBase value={amount} onChange={setAmount} currency="$" />
      </FieldPreview>
      <FieldPreview title="Select">
        <SelectBase
          value={role}
          onChange={setRole}
          options={roleOptions}
          allowClear
        />
      </FieldPreview>
      <FieldPreview title="Checkbox">
        <CheckboxBase value={checked} onChange={setChecked}>
          Accept terms
        </CheckboxBase>
      </FieldPreview>
      <FieldPreview title="Switch">
        <label className="flex items-center gap-3 text-sm">
          <SwitchBase value={enabled} onChange={setEnabled} />
          Enable notifications
        </label>
      </FieldPreview>
      <FieldPreview title="Radio">
        <RadioBase
          value={priority}
          onChange={setPriority}
          options={[
            { label: "High", value: "high" },
            { label: "Medium", value: "medium" },
            { label: "Low", value: "low" },
          ]}
        />
      </FieldPreview>
      <FieldPreview title="Segmented">
        <SegmentedBase
          value={segment}
          onChange={setSegment}
          options={[
            { label: "Daily", value: "daily" },
            { label: "Weekly", value: "weekly" },
            { label: "Monthly", value: "monthly" },
          ]}
        />
      </FieldPreview>
      <FieldPreview title="Slider">
        <SliderBase defaultValue={64} showValue />
      </FieldPreview>
      <FieldPreview title="Rate">
        <RateBase value={score} onChange={setScore} />
      </FieldPreview>
      <FieldPreview title="DatePicker">
        <DatePickerBase value={date} onChange={setDate} allowClear />
      </FieldPreview>
      <FieldPreview title="DateRangePicker">
        <DateRangePickerBase
          value={dateRange}
          onChange={setDateRange}
          allowClear
        />
      </FieldPreview>
      <FieldPreview title="DateTimePicker">
        <DateTimePickerBase value={dateTime} onChange={setDateTime} />
      </FieldPreview>
      <FieldPreview title="TimePicker">
        <TimePickerBase value={time} onChange={setTime} allowClear />
      </FieldPreview>
      <FieldPreview title="Cascader">
        <CascaderBase
          value={region}
          onChange={setRegion}
          options={regionOptions}
          allowClear
        />
      </FieldPreview>
      <FieldPreview title="TreeSelect">
        <TreeSelectBase
          value={team}
          onChange={setTeam}
          options={teamOptions}
          allowClear
        />
      </FieldPreview>
      <FieldPreview title="Upload">
        <UploadBase value={files} onChange={setFiles} maxCount={2} />
      </FieldPreview>
      <FieldPreview title="Captcha">
        <CaptchaBase
          buttonText="Send code"
          countdown={30}
          placeholder="Verification code"
        />
      </FieldPreview>
      <FieldPreview title="ArrayField">
        <ArrayField
          value={items}
          addText="Add contact"
          onAdd={() =>
            setItems((current) => [...current, { name: "New contact" }])
          }
          onRemove={(index) =>
            setItems((current) => current.filter((_, i) => i !== index))
          }
          onMoveUp={(index) =>
            setItems((current) => {
              if (index === 0) return current
              const next = [...current]
              ;[next[index - 1], next[index]] = [next[index], next[index - 1]]
              return next
            })
          }
          onMoveDown={(index) =>
            setItems((current) => {
              if (index === current.length - 1) return current
              const next = [...current]
              ;[next[index], next[index + 1]] = [next[index + 1], next[index]]
              return next
            })
          }
          renderItem={(item) => <Input value={item.name} readOnly />}
        />
      </FieldPreview>
      <FieldPreview title="ObjectField">
        <ObjectField title="Profile" collapsible contentClassName="space-y-2">
          <Input placeholder="Display name" />
          <SelectBase placeholder="Department" options={roleOptions} />
        </ObjectField>
      </FieldPreview>
    </div>
  )
}
