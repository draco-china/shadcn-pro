import { Checkbox, Switch } from '../base/fields/checkbox'
import { DatePicker, DateRangePicker } from '../base/fields/date-picker'
import { DateTimePicker, TimePicker } from '../base/fields/date-time-picker'
import { Input, Password, Slider, Textarea } from '../base/fields/input'
import { Radio, Rate, Segmented } from '../base/fields/radio'
import { Select } from '../base/fields/select'

/** Values supported by built-in schema fields. */
export type SchemaFieldValue =
  | string
  | number
  | boolean
  | Date
  | string[]
  | number[]
  | { from?: Date; to?: Date }
  | undefined
  | null

/** Internal schema field state used by built-in renderers. */
export interface SchemaValueField {
  name: string
  value: SchemaFieldValue
  invalid: boolean
  onChange: (value: SchemaFieldValue) => void
  onBlur: () => void
}

/** Built-in schema field renderer names. */
export type SchemaValueType =
  | 'text'
  | 'email'
  | 'password'
  | 'textarea'
  | 'select'
  | 'multiSelect'
  | 'checkbox'
  | 'radio'
  | 'switch'
  | 'date'
  | 'dateRange'
  | 'dateTime'
  | 'time'
  | 'slider'
  | 'rate'
  | 'segmented'

/** Renders the built-in control for one schema item. */
export function renderSchemaField(
  item: {
    name: string
    valueType?: SchemaValueType
    disabled?: boolean
    required?: boolean
    fieldProps?: Record<string, unknown>
  },
  field: SchemaValueField,
) {
  const fieldProps = item.fieldProps ?? {}
  const value = field.value
  const textValue = String(value ?? '')
  const dateValue = value instanceof Date ? value : undefined
  const stringValue = typeof value === 'string' ? value : undefined
  const numberValue = typeof value === 'number' ? value : undefined

  switch (item.valueType ?? 'text') {
    case 'password':
      return (
        <Password
          {...fieldProps}
          id={item.name}
          value={textValue}
          disabled={item.disabled}
          required={item.required}
          aria-invalid={field.invalid}
          onChange={(event) => field.onChange(event.target.value)}
          onBlur={field.onBlur}
        />
      )
    case 'textarea':
      return (
        <Textarea
          {...fieldProps}
          id={item.name}
          value={textValue}
          disabled={item.disabled}
          required={item.required}
          aria-invalid={field.invalid}
          onChange={(event) => field.onChange(event.target.value)}
          onBlur={field.onBlur}
        />
      )
    case 'select':
    case 'multiSelect':
      return (
        <Select
          value={value as string | string[] | undefined}
          disabled={item.disabled}
          required={item.required}
          aria-invalid={field.invalid}
          multiple={item.valueType === 'multiSelect'}
          onChange={field.onChange}
          onBlur={field.onBlur}
          {...fieldProps}
        />
      )
    case 'checkbox':
      return (
        <Checkbox
          value={value as boolean | string[] | undefined}
          disabled={item.disabled}
          aria-invalid={field.invalid}
          onChange={field.onChange}
          onBlur={field.onBlur}
          {...fieldProps}
        />
      )
    case 'radio':
      return (
        <Radio
          name={item.name}
          value={stringValue}
          disabled={item.disabled}
          aria-invalid={field.invalid}
          required={item.required}
          onChange={field.onChange}
          onBlur={field.onBlur}
          {...fieldProps}
        />
      )
    case 'switch':
      return (
        <Switch
          value={Boolean(field.value)}
          disabled={item.disabled}
          aria-invalid={field.invalid}
          onChange={field.onChange}
          onBlur={field.onBlur}
          {...fieldProps}
        />
      )
    case 'date':
      return (
        <DatePicker
          value={dateValue}
          disabled={item.disabled}
          aria-invalid={field.invalid}
          onChange={field.onChange}
          onBlur={field.onBlur}
          {...fieldProps}
        />
      )
    case 'dateRange':
      return (
        <DateRangePicker
          value={value as { from?: Date; to?: Date } | undefined}
          disabled={item.disabled}
          aria-invalid={field.invalid}
          onChange={field.onChange}
          onBlur={field.onBlur}
          {...fieldProps}
        />
      )
    case 'dateTime':
      return (
        <DateTimePicker
          value={dateValue}
          disabled={item.disabled}
          aria-invalid={field.invalid}
          onChange={field.onChange}
          onBlur={field.onBlur}
          {...fieldProps}
        />
      )
    case 'time':
      return (
        <TimePicker
          value={stringValue}
          disabled={item.disabled}
          aria-invalid={field.invalid}
          onChange={field.onChange}
          onBlur={field.onBlur}
          {...fieldProps}
        />
      )
    case 'slider':
      return (
        <Slider
          value={numberValue}
          disabled={item.disabled}
          aria-invalid={field.invalid}
          onChange={field.onChange}
          onBlur={field.onBlur}
          {...fieldProps}
        />
      )
    case 'rate':
      return (
        <Rate
          value={numberValue ?? 0}
          disabled={item.disabled}
          aria-invalid={field.invalid}
          onChange={field.onChange}
          onBlur={field.onBlur}
          {...fieldProps}
        />
      )
    case 'segmented':
      return (
        <Segmented
          value={stringValue}
          disabled={item.disabled}
          aria-invalid={field.invalid}
          onChange={field.onChange}
          onBlur={field.onBlur}
          {...fieldProps}
        />
      )
  }

  return (
    <Input
      {...fieldProps}
      id={item.name}
      type={item.valueType === 'email' ? 'email' : 'text'}
      value={textValue}
      disabled={item.disabled}
      required={item.required}
      aria-invalid={field.invalid}
      onChange={(event) => field.onChange(event.target.value)}
      onBlur={field.onBlur}
    />
  )
}
