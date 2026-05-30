import { createHash } from 'node:crypto'
import { LRUCache } from 'lru-cache'
import type { ShikiTransformer } from 'shiki'
import { codeToHtml } from 'shiki'

// LRU cache for cross-request caching of highlighted code.
// Shiki highlighting is CPU-intensive and deterministic, so caching is safe.
const highlightCache = new LRUCache<string, string>({
  max: 500,
  ttl: 1000 * 60 * 60, // 1 hour.
})

function replaceCommandPrefix(raw: string, search: RegExp, replacement: string) {
  return raw.replace(search, replacement)
}

export const transformers = [
  {
    code(node) {
      if (node.tagName === 'code') {
        const raw = this.source
        node.properties.__raw__ = raw

        if (raw.startsWith('npm install')) {
          node.properties.__npm__ = raw
          node.properties.__yarn__ = replaceCommandPrefix(raw, /^npm install\b/gm, 'yarn add')
          node.properties.__pnpm__ = replaceCommandPrefix(raw, /^npm install\b/gm, 'pnpm add')
          node.properties.__bun__ = replaceCommandPrefix(raw, /^npm install\b/gm, 'bun add')
        } else if (raw.startsWith('npx create-')) {
          node.properties.__npm__ = raw
          node.properties.__yarn__ = replaceCommandPrefix(raw, /^npx create-/gm, 'yarn create ')
          node.properties.__pnpm__ = replaceCommandPrefix(raw, /^npx create-/gm, 'pnpm create ')
          node.properties.__bun__ = replaceCommandPrefix(raw, /^npx\b/gm, 'bunx --bun')
        } else if (raw.startsWith('npm create')) {
          // npm create.
          node.properties.__npm__ = raw
          node.properties.__yarn__ = replaceCommandPrefix(raw, /^npm create\b/gm, 'yarn create')
          node.properties.__pnpm__ = replaceCommandPrefix(raw, /^npm create\b/gm, 'pnpm create')
          node.properties.__bun__ = replaceCommandPrefix(raw, /^npm create\b/gm, 'bun create')
        } else if (raw.startsWith('npx')) {
          // npx.
          node.properties.__npm__ = raw
          node.properties.__yarn__ = replaceCommandPrefix(raw, /^npx\b/gm, 'yarn dlx')
          node.properties.__pnpm__ = replaceCommandPrefix(raw, /^npx\b/gm, 'pnpm dlx')
          node.properties.__bun__ = replaceCommandPrefix(raw, /^npx\b/gm, 'bunx --bun')
        } else if (raw.startsWith('npm run')) {
          // npm run.
          node.properties.__npm__ = raw
          node.properties.__yarn__ = replaceCommandPrefix(raw, /^npm run\b/gm, 'yarn')
          node.properties.__pnpm__ = replaceCommandPrefix(raw, /^npm run\b/gm, 'pnpm')
          node.properties.__bun__ = replaceCommandPrefix(raw, /^npm run\b/gm, 'bun')
        }
      }
    },
  },
] as ShikiTransformer[]

export async function highlightCode(code: string, language: string = 'tsx') {
  // Create cache key from code content and language.
  const cacheKey = createHash('sha256').update(`${language}:${code}`).digest('hex')

  // Check cache first.
  const cached = highlightCache.get(cacheKey)
  if (cached) {
    return cached
  }

  const html = await codeToHtml(code, {
    lang: language,
    themes: {
      dark: 'one-dark-pro',
      light: 'one-light',
    },
    transformers: [
      {
        pre(node) {
          node.properties.class =
            'no-scrollbar min-w-0 overflow-x-auto overflow-y-auto overscroll-x-contain overscroll-y-auto px-4 py-3.5 outline-none has-[[data-highlighted-line]]:px-0 has-[[data-line-numbers]]:px-0 has-[[data-slot=tabs]]:p-0 !bg-transparent'
        },
        code(node) {
          node.properties['data-line-numbers'] = ''
        },
        line(node) {
          node.properties['data-line'] = ''
        },
      },
    ],
  })

  // Cache the result.
  highlightCache.set(cacheKey, html)

  return html
}
