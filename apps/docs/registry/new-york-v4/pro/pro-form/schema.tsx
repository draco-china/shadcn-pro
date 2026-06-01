'use client'

import { createSchemaField, type SchemaReactComponents } from '@formily/react'
import type * as React from 'react'
import { FormItem } from './form-item'
import {
  FormilyArrayField,
  FormilyCaptcha,
  FormilyCascader,
  FormilyCheckbox,
  FormilyDatePicker,
  FormilyDateRangePicker,
  FormilyDateTimePicker,
  FormilyDigit,
  FormilyDigitRange,
  FormilyInput,
  FormilyMoney,
  FormilyObjectField,
  FormilyRadio,
  FormilyRate,
  FormilySegmented,
  FormilySelect,
  FormilySlider,
  FormilySwitch,
  FormilyTextarea,
  FormilyTimePicker,
  FormilyTreeSelect,
  FormilyUpload,
} from './formily-fields'

export const defaultSchemaComponents: SchemaReactComponents = {
  FormItem,
  Input: FormilyInput,
  Textarea: FormilyTextarea,
  Select: FormilySelect,
  Checkbox: FormilyCheckbox,
  Switch: FormilySwitch,
  Radio: FormilyRadio,
  DatePicker: FormilyDatePicker,
  DateRangePicker: FormilyDateRangePicker,
  DateTimePicker: FormilyDateTimePicker,
  TimePicker: FormilyTimePicker,
  Digit: FormilyDigit,
  DigitRange: FormilyDigitRange,
  Slider: FormilySlider,
  Rate: FormilyRate,
  Segmented: FormilySegmented,
  Cascader: FormilyCascader,
  TreeSelect: FormilyTreeSelect,
  Upload: FormilyUpload,
  Captcha: FormilyCaptcha,
  Money: FormilyMoney,
  ArrayField: FormilyArrayField,
  ObjectField: FormilyObjectField,
}

export function createSchemaFieldWithComponents(extra?: SchemaReactComponents) {
  const BaseSchemaField = createSchemaField({
    components: { ...defaultSchemaComponents, ...extra },
  })

  return Object.assign(function ProSchemaField(
    props: React.ComponentProps<typeof BaseSchemaField>,
  ) {
    return (
      <BaseSchemaField
        {...props}
        schema={props.schema ? normalizeSchema(props.schema) : props.schema}
      />
    )
  }, BaseSchemaField)
}

export const SchemaField = createSchemaFieldWithComponents()

export type ProFormSchema = React.ComponentProps<typeof SchemaField>['schema']

type SchemaNode = ProFormSchema & {
  type?: string
  enum?: unknown[]
  properties?: Record<string, SchemaNode>
  items?: SchemaNode
  'x-component'?: string
  'x-decorator'?: string
  'x-component-props'?: Record<string, unknown>
  'x-validator'?: unknown
}

type ZodLikeSchema = {
  safeParse?: (value: unknown) => ZodLikeResult
  safeParseAsync?: (value: unknown) => Promise<ZodLikeResult>
}

type ZodLikeResult =
  | { success: true }
  | {
      success: false
      error?: {
        issues?: { message?: string }[]
        errors?: { message?: string }[]
      }
    }

function normalizeSchema(schema: ProFormSchema): ProFormSchema {
  return normalizeSchemaNode(schema as SchemaNode, true) as ProFormSchema
}

function normalizeSchemaNode(schema: SchemaNode, isRoot = false): SchemaNode {
  if (!schema || typeof schema !== 'object') return schema

  const next: SchemaNode = { ...schema }
  const hasProperties = Boolean(next.properties)

  if (!isRoot && !hasProperties && !next['x-decorator']) {
    next['x-decorator'] = 'FormItem'
  }

  if (!next['x-component']) {
    const component = inferComponent(next)
    if (component) next['x-component'] = component
  }

  if (next['x-validator']) {
    next['x-validator'] = normalizeZodValidator(next['x-validator'])
  }

  if (next.enum && !next['x-component-props']) {
    next['x-component-props'] = {
      options: next.enum.map((item) =>
        typeof item === 'object' && item !== null && 'value' in item
          ? item
          : { label: String(item), value: String(item) },
      ),
    }
  }

  if (next.properties) {
    next.properties = Object.fromEntries(
      Object.entries(next.properties).map(([key, value]) => [key, normalizeSchemaNode(value)]),
    )
  }

  if (next.items && typeof next.items === 'object') {
    next.items = normalizeSchemaNode(next.items, true)
  }

  return next
}

function normalizeZodValidator(validator: unknown): unknown {
  if (!isZodLikeSchema(validator)) return validator

  return {
    validator: async (value: unknown) => {
      const result = validator.safeParseAsync
        ? await validator.safeParseAsync(value)
        : validator.safeParse?.(value)

      if (!result || result.success) return ''

      return getZodLikeErrorMessage(result)
    },
  }
}

function getZodLikeErrorMessage(result: Extract<ZodLikeResult, { success: false }>) {
  return result.error?.issues?.[0]?.message ?? result.error?.errors?.[0]?.message ?? 'Invalid value'
}

function isZodLikeSchema(value: unknown): value is ZodLikeSchema {
  return Boolean(
    value &&
      typeof value === 'object' &&
      ('safeParse' in value || 'safeParseAsync' in value) &&
      (typeof (value as ZodLikeSchema).safeParse === 'function' ||
        typeof (value as ZodLikeSchema).safeParseAsync === 'function'),
  )
}

function inferComponent(schema: SchemaNode) {
  if (schema.enum) return 'Select'

  switch (schema.type) {
    case 'string':
      return 'Input'
    case 'number':
    case 'integer':
      return 'Digit'
    case 'boolean':
      return 'Switch'
    case 'array':
      return 'ArrayField'
    case 'object':
      return schema.properties ? undefined : 'ObjectField'
    default:
      return undefined
  }
}
