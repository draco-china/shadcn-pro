'use client'

import { useEffect, useState } from 'react'

export function useBulkActionsAnnouncement(selectedCount: number, entityName: string) {
  const [announcement, setAnnouncement] = useState('')

  useEffect(() => {
    if (selectedCount === 0) return

    const message = `${selectedCount} ${entityName}${selectedCount === 1 ? '' : 's'} selected. Bulk actions toolbar is available.`

    queueMicrotask(() => setAnnouncement(message))

    const timer = setTimeout(() => setAnnouncement(''), 3000)
    return () => clearTimeout(timer)
  }, [selectedCount, entityName])

  return announcement
}
