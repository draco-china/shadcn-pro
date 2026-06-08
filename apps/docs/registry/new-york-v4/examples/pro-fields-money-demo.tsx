"use client"

import { FormItem } from "@/registry/new-york-v4/pro/form"
import { Money } from "@/registry/new-york-v4/pro/base/fields/input"

export default function ProFieldsMoneyDemo() {
  return (
    <div className="w-full max-w-sm space-y-6 p-4">
      <FormItem label="Price (USD)">
        <Money name="price" placeholder="0.00" />
      </FormItem>
      <FormItem label="Budget (EUR)">
        <Money name="budget" prefix={<span className="px-3">€</span>} placeholder="0.00" />
      </FormItem>
      <FormItem label="Amount (JPY)">
        <Money name="amount" prefix={<span className="px-3">¥</span>} placeholder="0" />
      </FormItem>
    </div>
  )
}
