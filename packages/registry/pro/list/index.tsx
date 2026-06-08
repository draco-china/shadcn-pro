'use client'

import { Inbox, RefreshCw, X } from 'lucide-react'
import {
  type ComponentProps,
  type ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
import { cn } from '@/lib/utils'
import { ProButton, type ProButtonSize } from '../base/button'
import { Input } from '../base/fields/input'
import { Select } from '../base/fields/select'
import { ProPagination } from '../pagination'

export interface ProListPaginationState {
  pageIndex: number
  pageSize: number
}

export interface ProListState {
  pagination: ProListPaginationState
  search: string
  filters: Record<string, string | string[] | undefined>
}

export interface ProListFilter<TData> {
  key: string
  placeholder?: string
  multiple?: boolean
  options: Array<{
    label: ReactNode
    value: string
  }>
  onFilter?: (value: string, record: TData) => boolean
}

export interface ProListRenderContext<TData> {
  data: TData[]
  pageData: TData[]
  total: number
  loading: boolean
  state: ProListState
  setSearch: (value: string) => void
  setFilter: (key: string, value: string | string[] | undefined) => void
  reset: () => void
}

type ProListToolbarSlot<TData> = ReactNode | ((context: ProListRenderContext<TData>) => ReactNode)

type ProListVariant = 'default' | 'outline' | 'ghost'

type ProListDirection = 'vertical' | 'horizontal'

export function ProList<TData>({
  data,
  request,
  initialState,
  onChange,
  rowKey,
  renderItem,
  header,
  toolbar,
  search,
  filters,
  onRefresh,
  pagination,
  loading,
  variant = 'default',
  direction = 'vertical',
  split = false,
  itemClassName,
  emptyText = 'No data',
  layout = 'auto',
  size,
  className,
  listClassName,
}: {
  data?: TData[]
  request?: (
    params: ProListState,
  ) => Promise<{ data: TData[]; total?: number }> | { data: TData[]; total?: number }
  initialState?: Partial<ProListState>
  onChange?: (state: ProListState) => void
  rowKey?: keyof TData | ((record: TData, index: number) => string | number)
  renderItem: (record: TData, index: number, context: ProListRenderContext<TData>) => ReactNode
  header?: ReactNode | ((context: ProListRenderContext<TData>) => ReactNode)
  toolbar?: false | ProListToolbarSlot<TData>
  search?:
    | false
    | {
        placeholder?: string
        onSearch?: (keyword: string, record: TData) => boolean
      }
  filters?: ProListFilter<TData>[]
  onRefresh?: () => void
  pagination?: false
  loading?:
    | boolean
    | {
        rows?: number
      }
  variant?: ProListVariant
  direction?: ProListDirection
  split?: boolean
  itemClassName?: string | ((record: TData, index: number) => string | undefined)
  emptyText?: ReactNode
  layout?: 'full' | 'auto'
  size?: ProButtonSize
  className?: string
  listClassName?: string
}) {
  const [listData, setListData] = useState<TData[]>(data ?? [])
  const [requestLoading, setRequestLoading] = useState(false)
  const [requestError, setRequestError] = useState<unknown>()
  const [requestTotal, setRequestTotal] = useState<number>()
  const [searchValue, setSearchValue] = useState(initialState?.search ?? '')
  const [filterValues, setFilterValues] = useState<Record<string, string | string[] | undefined>>(
    initialState?.filters ?? {},
  )
  const [paginationState, setPaginationState] = useState<ProListPaginationState>(
    initialState?.pagination ?? {
      pageIndex: 0,
      pageSize: 10,
    },
  )
  const mountedRef = useRef(false)
  const state = useMemo<ProListState>(
    () => ({
      pagination: paginationState,
      search: searchValue,
      filters: filterValues,
    }),
    [filterValues, paginationState, searchValue],
  )

  useEffect(() => {
    if (request) return
    setListData(data ?? [])
  }, [data, request])

  useEffect(() => {
    if (!mountedRef.current) {
      mountedRef.current = true
      return
    }
    onChange?.(state)
  }, [onChange, state])

  useEffect(() => {
    if (!request) return

    let canceled = false
    setRequestLoading(true)
    setRequestError(undefined)

    void Promise.resolve(request(state))
      .then((result) => {
        if (canceled) return
        setListData(result.data)
        setRequestTotal(result.total)
      })
      .catch((error) => {
        if (canceled) return
        setRequestError(error)
        setListData([])
        setRequestTotal(undefined)
      })
      .finally(() => {
        if (!canceled) setRequestLoading(false)
      })

    return () => {
      canceled = true
    }
  }, [request, state])

  const resetToFirstPage = useCallback(() => {
    setPaginationState((current) => ({ ...current, pageIndex: 0 }))
  }, [])
  const setSearch = useCallback(
    (value: string) => {
      setSearchValue(value)
      resetToFirstPage()
    },
    [resetToFirstPage],
  )
  const setFilter = useCallback(
    (key: string, value: string | string[] | undefined) => {
      setFilterValues((current) => ({ ...current, [key]: value }))
      resetToFirstPage()
    },
    [resetToFirstPage],
  )
  const reset = useCallback(() => {
    setSearchValue('')
    setFilterValues({})
    resetToFirstPage()
  }, [resetToFirstPage])

  const filteredData = useMemo(() => {
    if (request) return listData

    return listData.filter((record) => {
      if (searchValue && search !== false) {
        const keyword = searchValue.trim()
        if (keyword) {
          const matched = search?.onSearch
            ? search.onSearch(keyword, record)
            : JSON.stringify(record).toLowerCase().includes(keyword.toLowerCase())
          if (!matched) return false
        }
      }

      for (const filter of filters ?? []) {
        const value = filterValues[filter.key]
        const values = Array.isArray(value) ? value : value ? [value] : []
        if (values.length === 0) continue

        const matched = values.some((item) =>
          filter.onFilter
            ? filter.onFilter(item, record)
            : String((record as Record<string, unknown>)[filter.key]) === item,
        )
        if (!matched) return false
      }

      return true
    })
  }, [filterValues, filters, listData, request, search, searchValue])

  const total = request ? (requestTotal ?? listData.length) : filteredData.length
  const pageCount = Math.max(1, Math.ceil(total / paginationState.pageSize))
  const pageData = useMemo(() => {
    if (pagination === false || request) return filteredData
    const start = paginationState.pageIndex * paginationState.pageSize
    return filteredData.slice(start, start + paginationState.pageSize)
  }, [filteredData, pagination, paginationState.pageIndex, paginationState.pageSize, request])
  const loadingRows = typeof loading === 'object' ? (loading.rows ?? 5) : 5
  const loadingEnabled = (loading !== undefined && loading !== false) || requestLoading
  const isFullLayout = (layout ?? 'auto') === 'full'
  const hasFilters = Object.values(filterValues).some((value) =>
    Array.isArray(value) ? value.length > 0 : !!value,
  )
  const hasSearch = searchValue.trim() !== ''
  const context: ProListRenderContext<TData> = {
    data: filteredData,
    pageData,
    total,
    loading: loadingEnabled,
    state,
    setSearch,
    setFilter,
    reset,
  }
  const headerContent = typeof header === 'function' ? header(context) : header
  const toolbarActions =
    toolbar === false ? undefined : typeof toolbar === 'function' ? toolbar(context) : toolbar

  useEffect(() => {
    if (pagination === false || pageCount <= 0 || paginationState.pageIndex < pageCount) return
    setPaginationState((current) => ({ ...current, pageIndex: pageCount - 1 }))
  }, [pageCount, pagination, paginationState.pageIndex])

  return (
    <div
      data-slot="pro-list"
      className={cn(
        'max-w-full',
        isFullLayout ? 'flex h-full min-h-0 flex-col gap-3' : 'space-y-3',
        className,
      )}
    >
      {headerContent != null && <div className="shrink-0">{headerContent}</div>}
      {toolbar !== false && (
        <ProListToolbar
          search={search}
          searchValue={searchValue}
          filters={filters}
          filterValues={filterValues}
          actions={toolbarActions}
          disabled={loadingEnabled}
          hasReset={hasSearch || hasFilters}
          size={size}
          onSearchChange={setSearch}
          onFilterChange={setFilter}
          onReset={reset}
          onRefresh={onRefresh}
        />
      )}
      <div
        data-slot="pro-list-content"
        className={cn(isFullLayout && 'min-h-0 flex-1 overflow-auto')}
      >
        <div
          data-slot="pro-list-items"
          data-variant={variant}
          data-direction={direction}
          data-split={split}
          className={cn(
            getProListItemsClassName({ direction, split }),
            split && pageData.length === 0 && 'border-0',
            listClassName,
          )}
        >
          {loadingEnabled ? (
            <ProListSkeleton rows={loadingRows} />
          ) : pageData.length > 0 ? (
            pageData.map((record, index) => {
              const absoluteIndex =
                pagination === false || request
                  ? index
                  : paginationState.pageIndex * paginationState.pageSize + index
              return (
                <div
                  key={getProListItemKey(record, absoluteIndex, rowKey)}
                  data-slot="pro-list-item"
                  data-variant={variant}
                  data-direction={direction}
                  className={cn(
                    getProListItemClassName({ variant, direction, split }),
                    typeof itemClassName === 'function'
                      ? itemClassName(record, absoluteIndex)
                      : itemClassName,
                  )}
                >
                  {renderItem(record, absoluteIndex, context)}
                </div>
              )
            })
          ) : (
            <ProListEmpty>{requestError ? 'Failed to load data' : emptyText}</ProListEmpty>
          )}
        </div>
      </div>
      {pagination !== false && (
        <div className={isFullLayout ? 'shrink-0' : undefined}>
          <ProPagination
            current={paginationState.pageIndex + 1}
            pageCount={pageCount}
            pageSize={paginationState.pageSize}
            total={total}
            onPageChange={(page) =>
              setPaginationState((current) => ({ ...current, pageIndex: page - 1 }))
            }
            onPageSizeChange={(pageSize) =>
              setPaginationState({
                pageIndex: 0,
                pageSize,
              })
            }
          />
        </div>
      )}
    </div>
  )
}

function ProListToolbar<TData>({
  search,
  searchValue,
  filters,
  filterValues,
  actions,
  disabled,
  hasReset,
  size,
  onSearchChange,
  onFilterChange,
  onReset,
  onRefresh,
}: {
  search?: false | { placeholder?: string }
  searchValue: string
  filters?: ProListFilter<TData>[]
  filterValues: Record<string, string | string[] | undefined>
  actions?: ReactNode
  disabled?: boolean
  hasReset?: boolean
  size?: ProButtonSize
  onSearchChange: (value: string) => void
  onFilterChange: (key: string, value: string | string[] | undefined) => void
  onReset: () => void
  onRefresh?: () => void
}) {
  const toolbarButtonSize = size ?? 'icon'
  const resetButtonSize = size ?? 'sm'

  return (
    <div
      data-slot="pro-list-toolbar"
      className="flex w-full flex-col gap-2 md:flex-row md:items-center md:justify-between"
    >
      <div className="flex min-w-0 flex-1 flex-wrap items-start gap-2 md:items-center">
        {search !== false && (
          <Input
            placeholder={search?.placeholder ?? 'Search...'}
            value={searchValue}
            onChange={(event) => onSearchChange(event.target.value)}
            disabled={disabled}
            allowClear={false}
            inputClassName="h-8"
            className="w-full md:w-[240px]"
          />
        )}
        {(filters ?? []).map((filter) => {
          const rawFilterValue = filterValues[filter.key]
          const values = Array.isArray(rawFilterValue)
            ? rawFilterValue.filter((item): item is string => typeof item === 'string')
            : []
          const filterValue =
            typeof rawFilterValue === 'string'
              ? rawFilterValue
              : values.length === rawFilterValue?.length
                ? values
                : undefined

          return (
            <Select
              key={filter.key}
              options={filter.options}
              placeholder={filter.placeholder ?? filter.key}
              multiple={filter.multiple}
              searchable
              allowClear
              value={filterValue}
              onChange={(value) => onFilterChange(filter.key, value)}
              className="h-8 w-full md:w-[180px]"
            />
          )
        })}
        {hasReset && (
          <ProButton variant="ghost" size={resetButtonSize} disabled={disabled} onClick={onReset}>
            <X />
            Reset
          </ProButton>
        )}
      </div>
      <div className="flex flex-wrap items-center justify-end gap-2 md:ml-auto md:shrink-0">
        {actions}
        {onRefresh && (
          <ProButton
            size={toolbarButtonSize}
            variant="ghost"
            tooltip="Refresh"
            disabled={disabled}
            onClick={onRefresh}
          >
            <RefreshCw />
          </ProButton>
        )}
      </div>
    </div>
  )
}

function ProListEmpty({ children }: { children?: ReactNode }) {
  return (
    <div
      data-slot="pro-list-empty"
      className="flex min-h-40 flex-col items-center justify-center gap-2 rounded-md border border-dashed p-8 text-center text-sm text-muted-foreground"
    >
      <Inbox className="size-8 opacity-40" />
      <span>{children}</span>
    </div>
  )
}

function ProListSkeleton({ rows }: { rows: number }) {
  return (
    <>
      {Array.from({ length: rows }).map((_, index) => (
        <div
          // biome-ignore lint/suspicious/noArrayIndexKey: skeleton rows are placeholders
          key={index}
          data-slot="pro-list-skeleton"
          className="rounded-md border p-4"
        >
          <div className="flex items-start gap-3">
            <div className="size-10 shrink-0 animate-pulse rounded-full bg-muted" />
            <div className="min-w-0 flex-1 space-y-2">
              <div className="h-4 w-1/3 animate-pulse rounded bg-muted" />
              <div className="h-3 w-2/3 animate-pulse rounded bg-muted" />
              <div className="h-3 w-1/2 animate-pulse rounded bg-muted" />
            </div>
          </div>
        </div>
      ))}
    </>
  )
}

function getProListItemsClassName({
  direction,
  split,
}: {
  direction: ProListDirection
  split: boolean
}) {
  if (direction === 'horizontal') return 'grid gap-3 sm:grid-cols-2 xl:grid-cols-3'
  if (split) return 'overflow-hidden rounded-md border bg-background'
  return 'flex flex-col gap-3'
}

function getProListItemClassName({
  variant,
  direction,
  split,
}: {
  variant: ProListVariant
  direction: ProListDirection
  split: boolean
}) {
  if (split && direction === 'vertical') return 'border-b p-4 last:border-b-0'

  return cn(
    'min-w-0 p-4 transition-colors',
    variant === 'default' && 'rounded-md bg-background',
    variant === 'outline' && 'rounded-md border bg-background',
    variant === 'ghost' && 'rounded-md hover:bg-muted/40',
  )
}

function getProListItemKey<TData>(
  record: TData,
  index: number,
  rowKey?: keyof TData | ((record: TData, index: number) => string | number),
) {
  if (typeof rowKey === 'function') return rowKey(record, index)
  if (rowKey) return String(record[rowKey])
  return index
}

export type ProListProps<TData> = ComponentProps<typeof ProList<TData>>
