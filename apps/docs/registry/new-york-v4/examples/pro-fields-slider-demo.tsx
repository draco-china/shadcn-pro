"use client"

import { createForm } from "@formily/core"
import { Field, FormProvider } from "@formily/react"

import { FormItem } from "@/registry/new-york-v4/pro/pro-form/form-item"
import { FormilySlider } from "@/registry/new-york-v4/pro/pro-form/formily-fields"

const form = createForm()

export default function ProFieldsSliderDemo() {
  return (
    <FormProvider form={form}>
      <div className="w-full max-w-sm space-y-6 p-4">
        <Field
          name="volume"
          title="Volume"
          initialValue={40}
          decorator={[FormItem]}
          component={[
            FormilySlider,
            { min: 0, max: 100, step: 1, showValue: true },
          ]}
        />
        <Field
          name="opacity"
          title="Opacity"
          initialValue={70}
          decorator={[FormItem]}
          component={[
            FormilySlider,
            { min: 0, max: 100, step: 10, showValue: true },
          ]}
        />
        <Field
          name="disabled"
          title="Disabled"
          initialValue={30}
          decorator={[FormItem]}
          component={[
            FormilySlider,
            { min: 0, max: 100, disabled: true, showValue: true },
          ]}
        />
      </div>
    </FormProvider>
  )
}
