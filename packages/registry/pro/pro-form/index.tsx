'use client'

import { createForm, type Form, type IFormProps } from '@formily/core'
import { createSchemaField, FormProvider, type SchemaReactComponents } from '@formily/react'
import type { ReactNode } from 'react'
import * as React from 'react'
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
import { ProFormActions, ProFormGrid } from './layout'

export type { ProFormActionsProps, ProFormLayoutProps } from './layout'
export type { Form, IFormProps }
export { createForm, ProFormActions, ProFormGrid }
export { DrawerForm, ModalForm } from './overlay-form'

const defaultComponents: SchemaReactComponents = {
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
  return createSchemaField({
    components: { ...defaultComponents, ...extra },
  })
}

export const SchemaField = createSchemaField({
  components: defaultComponents,
})

export interface ProFormProps {
  form?: Form
  formProps?: IFormProps
  children?: ReactNode
  onFinish?: (values: Record<string, unknown>) => void | Promise<void>
  onFinishFailed?: (errors: unknown) => void
  onReset?: () => void | Promise<void>
  /** Submit button label (only effective when hideActions is false) */
  submitText?: string
  /** Whether to show the reset button */
  showReset?: boolean
  /** Reset button label */
  resetText?: string
  /** Hide the default action bar (place ProFormActions yourself) */
  hideActions?: boolean
  /** Action bar alignment */
  actionsAlign?: 'left' | 'center' | 'right'
  /** Number of form columns (passed through to ProFormGrid) */
  columns?: 1 | 2 | 3 | 4
  className?: string
}

export function ProForm({
  form,
  formProps,
  children,
  onFinish,
  onFinishFailed,
  onReset,
  submitText = 'Submit',
  showReset = false,
  resetText = 'Reset',
  hideActions = false,
  actionsAlign = 'left',
  columns,
  className,
}: ProFormProps) {
  const [loading, setLoading] = React.useState(false)
  const internalFormRef = React.useRef<Form | null>(null)

  if (!internalFormRef.current) {
    internalFormRef.current = createForm(formProps)
  }

  const activeForm = form ?? internalFormRef.current

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (loading) return

    setLoading(true)
    try {
      await activeForm.validate()
      await onFinish?.(activeForm.values)
    } catch (err) {
      onFinishFailed?.(err)
    } finally {
      setLoading(false)
    }
  }

  async function handleReset() {
    await activeForm.reset()
    await onReset?.()
  }

  const body = columns ? (
    <ProFormGrid columns={columns} className="mb-4">
      {children}
    </ProFormGrid>
  ) : (
    <div className="space-y-4">{children}</div>
  )

  return (
    <FormProvider form={activeForm}>
      <form onSubmit={handleSubmit} className={className}>
        {body}
        {!hideActions && (
          <ProFormActions
            submitText={submitText}
            showReset={showReset}
            resetText={resetText}
            onReset={handleReset}
            loading={loading}
            align={actionsAlign}
          />
        )}
      </form>
    </FormProvider>
  )
}
