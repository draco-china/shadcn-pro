import type { ProTableColumnMeta } from '../types'

export const PRO_TABLE_SYSTEM_COLUMN_IDS = ['select', 'drag', 'actions', 'operation'] as const

const PRO_TABLE_SYSTEM_COLUMN_ID_SET = new Set<string>(PRO_TABLE_SYSTEM_COLUMN_IDS)

export function isProTableSystemColumnId(columnId: string) {
  return PRO_TABLE_SYSTEM_COLUMN_ID_SET.has(columnId)
}

export function getProTableSystemColumnDefaults(
  columnId: string | undefined,
): Pick<ProTableColumnMeta, 'pinned' | 'className'> | undefined {
  if (columnId === 'select' || columnId === 'drag') {
    return { pinned: 'left', className: 'w-8' }
  }
  if (columnId === 'actions' || columnId === 'operation') {
    return { pinned: 'right', className: 'w-8' }
  }
  return undefined
}
