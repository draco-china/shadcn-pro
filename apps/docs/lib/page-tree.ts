import type { source } from '@/lib/source'

export type PageTreeNode = (typeof source.pageTree)['children'][number]
export type PageTreeFolder = Extract<PageTreeNode, { type: 'folder' }>
export type PageTreePage = Extract<PageTreeNode, { type: 'page' }>

// Recursively find all pages in a folder tree.
export function getAllPagesFromFolder(folder: PageTreeFolder): PageTreePage[] {
  const pages: PageTreePage[] = []

  for (const child of folder.children) {
    if (child.type === 'page') {
      pages.push(child)
    } else if (child.type === 'folder') {
      pages.push(...getAllPagesFromFolder(child))
    }
  }

  return pages
}

// Get the pages from a folder, returning all direct page children.
export function getPagesFromFolder(folder: PageTreeFolder, _currentBase: string): PageTreePage[] {
  return folder.children.filter((child): child is PageTreePage => child.type === 'page')
}

// Get current base (radix or base) from pathname.
export function getCurrentBase(pathname: string): string {
  const baseMatch = pathname.match(/\/docs\/components\/(radix|base)\//)
  return baseMatch ? baseMatch[1] : 'radix' // Default to radix.
}
