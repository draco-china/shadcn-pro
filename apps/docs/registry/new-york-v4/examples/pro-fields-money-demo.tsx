"use client"

import { createForm } from "@formily/core"
import { Field, FormProvider } from "@formily/react"

import { FormItem } from "@/registry/new-york-v4/pro/pro-form/form-item"
import { FormilyMoney } from "@/registry/new-york-v4/pro/pro-form/formily-fields"

const form = createForm()

export default function ProFieldsMoneyDemo() {
  return (
    <FormProvider form={form}>
      <div className="w-full max-w-sm space-y-6 p-4">
        <Field
          name="price"
          title="Price (USD)"
          decorator={[FormItem]}
          component={[
            FormilyMoney,
            { currency: "$", precision: 2, placeholder: "0.00" },
          ]}
        />
        <Field
          name="budget"
          title="Budget (EUR)"
          decorator={[FormItem]}
          component={[
            FormilyMoney,
            { currency: "€", precision: 2, placeholder: "0.00" },
          ]}
        />
        <Field
          name="amount"
          title="Amount (JPY)"
          decorator={[FormItem]}
          component={[
            FormilyMoney,
            { currency: "¥", precision: 0, placeholder: "0" },
          ]}
        />
      </div>
    </FormProvider>
  )
}
