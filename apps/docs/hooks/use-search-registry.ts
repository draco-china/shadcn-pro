'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { useCallback, useDeferredValue, useEffect, useRef, useState } from 'react'

import { useMounted } from '@/hooks/use-mounted'
import globalRegistries from '@/registry/directory.json'

const PAGE_SIZE = 10

export type DirectoryRegistry = {
  name: string
  description: string
  homepage: string
  logo: string
}

const directoryRegistries = globalRegistries as DirectoryRegistry[]

const normalizeQuery = (query: string) =>
  query.toLowerCase().replaceAll(' ', '').replaceAll('@', '')

function finderFn(registry: DirectoryRegistry, query: string) {
  const normalizedName = normalizeQuery(registry.name)
  const normalizedDecription = normalizeQuery(registry.description)
  const normalizedQuery = normalizeQuery(query)

  return normalizedName.includes(normalizedQuery) || normalizedDecription.includes(normalizedQuery)
}

const searchDirectory = (query: string) => {
  if (!query) return directoryRegistries
  return directoryRegistries.filter((registry) => finderFn(registry, query))
}

export function useSearchRegistry() {
  const mounted = useMounted()
  const router = useRouter()
  const searchParams = useSearchParams()

  const rawQuery = searchParams.get('q') ?? ''
  const rawPage = Number.parseInt(searchParams.get('page') ?? '1', 10)

  const [inputValue, setInputValue] = useState(rawQuery)
  const deferredQuery = useDeferredValue(inputValue)

  // debounce URL update
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const updateUrl = useCallback(
    (q: string, page: number) => {
      if (debounceRef.current) clearTimeout(debounceRef.current)
      debounceRef.current = setTimeout(() => {
        const params = new URLSearchParams(searchParams.toString())
        if (q) {
          params.set('q', q)
        } else {
          params.delete('q')
        }
        if (page > 1) {
          params.set('page', String(page))
        } else {
          params.delete('page')
        }
        router.push(`?${params.toString()}`, { scroll: false })
      }, 250)
    },
    [router, searchParams],
  )

  useEffect(() => {
    updateUrl(deferredQuery, 1)
  }, [deferredQuery, updateUrl])

  const currentQuery = mounted ? deferredQuery : ''
  const currentPageValue = mounted ? (Number.isNaN(rawPage) ? 1 : rawPage) : 1

  const registries = searchDirectory(currentQuery)
  const totalPages = Math.ceil(registries.length / PAGE_SIZE)
  const currentPage = Math.max(1, Math.min(currentPageValue, totalPages))

  const paginatedRegistries = registries.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE,
  )

  const setPage = useCallback(
    (page: number) => {
      updateUrl(deferredQuery, page)
    },
    [deferredQuery, updateUrl],
  )

  return {
    isLoading: !mounted,
    query: inputValue,
    setQuery: (value: string) => {
      setInputValue(value)
    },
    registries,
    paginatedRegistries,
    page: currentPage,
    totalPages,
    setPage,
  }
}
