'use client'

import { useState } from 'react'

import { FacetedFilter } from '@/registry/new-york-v4/pro/pro-fields/faceted-filter'
import { Label } from '@/components/ui/label'

const statusOptions = [
  { label: 'Backlog', value: 'backlog' },
  { label: 'In progress', value: 'in-progress' },
  { label: 'Done', value: 'done' },
]

const priorityOptions = [
  { label: 'Low', value: 'low' },
  { label: 'Medium', value: 'medium' },
  { label: 'High', value: 'high' },
]

const statusFacets = new Map([
  ['backlog', 12],
  ['in-progress', 8],
  ['done', 24],
])

const priorityFacets = new Map([
  ['low', 6],
  ['medium', 18],
  ['high', 5],
])

export default function ProFieldsFacetedFilterDemo() {
  const [status, setStatus] = useState<string[]>(['in-progress'])
  const [priority, setPriority] = useState<string | undefined>('high')

  return (
    <div className="w-full max-w-md space-y-6 p-4">
      <div className="space-y-2">
        <Label className="text-xs text-muted-foreground">Multi-select</Label>
        <FacetedFilter
          placeholder="Status"
          value={status}
          options={statusOptions}
          facets={statusFacets}
          onChange={(nextValue) => {
            setStatus(Array.isArray(nextValue) ? nextValue : nextValue ? [nextValue] : [])
          }}
        />
      </div>
      <div className="space-y-2">
        <Label className="text-xs text-muted-foreground">Single-select</Label>
        <FacetedFilter
          placeholder="Priority"
          mode="single"
          value={priority}
          options={priorityOptions}
          facets={priorityFacets}
          onChange={(nextValue) => {
            setPriority(typeof nextValue === 'string' ? nextValue : undefined)
          }}
        />
      </div>
    </div>
  )
}
