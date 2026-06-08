"use client"

import { useState } from "react"

import { ProPagination } from "@/registry/new-york-v4/pro/pagination"

export default function ProPaginationDemo() {
  const [current, setCurrent] = useState(3)
  const [pageSize, setPageSize] = useState(10)

  return (
    <div className="w-full rounded-lg border p-4">
      <ProPagination
        current={current}
        pageCount={12}
        pageSize={pageSize}
        total={118}
        onPageChange={setCurrent}
        onPageSizeChange={(nextPageSize) => {
          setPageSize(nextPageSize)
          setCurrent(1)
        }}
      />
    </div>
  )
}
