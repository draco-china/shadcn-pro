'use client'

import { CalendarDays, Plus, UserRound } from 'lucide-react'
import { ProButton } from '@/registry/new-york-v4/pro/base/button'
import { ProList } from '@/registry/new-york-v4/pro/list'
import { Badge } from '@/registry/new-york-v4/ui/badge'

type Project = {
  id: string
  name: string
  owner: string
  status: 'active' | 'paused' | 'archived'
  description: string
  updatedAt: string
}

const data: Project[] = [
  {
    id: '1',
    name: 'Billing Portal',
    owner: 'Alice Wang',
    status: 'active',
    description: 'Customer invoices, payment methods, and subscription lifecycle.',
    updatedAt: '2026-05-28',
  },
  {
    id: '2',
    name: 'Operations Console',
    owner: 'Bob Chen',
    status: 'active',
    description: 'Internal queue monitoring and incident handoff workflow.',
    updatedAt: '2026-05-26',
  },
  {
    id: '3',
    name: 'Partner Directory',
    owner: 'Carol Liu',
    status: 'paused',
    description: 'Account mapping, contract metadata, and partner notes.',
    updatedAt: '2026-05-20',
  },
  {
    id: '4',
    name: 'Insights Digest',
    owner: 'David Zhang',
    status: 'active',
    description: 'Weekly executive reporting with saved metric snapshots.',
    updatedAt: '2026-05-18',
  },
  {
    id: '5',
    name: 'Legacy Importer',
    owner: 'Eva Li',
    status: 'archived',
    description: 'One-off migration pipeline for historical customer records.',
    updatedAt: '2026-04-30',
  },
  {
    id: '6',
    name: 'Feature Flags',
    owner: 'Frank Wu',
    status: 'paused',
    description: 'Gradual rollout controls and audit history for product teams.',
    updatedAt: '2026-04-24',
  },
  {
    id: '7',
    name: 'Support Inbox',
    owner: 'Grace Zhao',
    status: 'active',
    description: 'Case routing, SLA visibility, and customer context side panel.',
    updatedAt: '2026-04-16',
  },
  {
    id: '8',
    name: 'Content Review',
    owner: 'Henry Sun',
    status: 'archived',
    description: 'Editorial review states, approvals, and publishing checks.',
    updatedAt: '2026-03-29',
  },
]

const statusLabels = {
  active: 'Active',
  paused: 'Paused',
  archived: 'Archived',
} as const

export default function ProListDemo() {
  return (
    <div className="size-full p-4">
      <ProList
        data={data}
        rowKey="id"
        search={{
          placeholder: 'Search projects...',
          onSearch: (keyword, project) =>
            [project.name, project.owner, project.description]
              .join(' ')
              .toLowerCase()
              .includes(keyword.toLowerCase()),
        }}
        filters={[
          {
            key: 'status',
            placeholder: 'Status',
            options: [
              { label: 'Active', value: 'active' },
              { label: 'Paused', value: 'paused' },
              { label: 'Archived', value: 'archived' },
            ],
          },
        ]}
        variant="outline"
        split
        header={({ total }) => (
          <div className="flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="text-lg font-semibold">Projects</h2>
              <p className="text-sm text-muted-foreground">Manage {total} product workspaces.</p>
            </div>
          </div>
        )}
        toolbar={
          <ProButton variant="default" tooltip="Create project">
            <Plus />
            New
          </ProButton>
        }
        onRefresh={() => {}}
        renderItem={(project) => (
          <div>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
              <div className="min-w-0 space-y-1.5">
                <div className="flex min-w-0 flex-wrap items-center gap-2">
                  <h3 className="truncate font-medium">{project.name}</h3>
                  <Badge variant={project.status === 'active' ? 'default' : 'secondary'}>
                    {statusLabels[project.status]}
                  </Badge>
                </div>
                <p className="line-clamp-2 text-sm text-muted-foreground">
                  {project.description}
                </p>
              </div>
              <ProButton variant="outline" size="sm">
                Open
              </ProButton>
            </div>
            <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-muted-foreground">
              <span className="inline-flex items-center gap-1.5">
                <UserRound className="size-3.5" />
                {project.owner}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <CalendarDays className="size-3.5" />
                {project.updatedAt}
              </span>
            </div>
          </div>
        )}
      />
    </div>
  )
}
