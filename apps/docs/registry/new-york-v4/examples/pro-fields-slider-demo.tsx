"use client"

import { FormItem } from "@/registry/new-york-v4/pro/form"
import { Slider } from "@/registry/new-york-v4/pro/base/fields/input"

export default function ProFieldsSliderDemo() {
  return (
    <div className="w-full max-w-sm space-y-6 p-4">
      <FormItem label="Volume">
        <Slider name="volume" defaultValue={40} min={0} max={100} step={1} />
      </FormItem>
      <FormItem label="Opacity">
        <Slider name="opacity" defaultValue={70} min={0} max={100} step={10} />
      </FormItem>
      <FormItem label="Disabled">
        <Slider name="disabled" defaultValue={30} min={0} max={100} disabled />
      </FormItem>
    </div>
  )
}
