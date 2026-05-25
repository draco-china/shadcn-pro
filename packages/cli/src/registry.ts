import { existsSync, readFileSync } from 'node:fs'
import path from 'node:path'

export interface RegistryComponent {
  name: string
  category: string
  description: string
  dependencies: string[]
  devDependencies?: string[]
  registryDependencies?: string[]
  files: string[]
  variants?: Record<
    string,
    Record<
      string,
      {
        label: string
        dependencies: string[]
        files: string[]
      }
    >
  >
}

export interface Registry {
  version: string
  baseUrl: string
  components: RegistryComponent[]
}

export interface ShadcnProConfig {
  registry: string
  componentsDir: string
  typescript: boolean
}

/**
 * Build HTTP headers for registry requests.
 * Adds Authorization header when GITHUB_TOKEN env var is set.
 */
function buildAuthHeaders(): Record<string, string> {
  const headers: Record<string, string> = {}
  if (process.env.GITHUB_TOKEN) {
    headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`
  }
  return headers
}

/**
 * Load the shadcn-pro.json config from the current working directory.
 * Returns null if the file doesn't exist or cannot be parsed.
 */
export function loadConfig(): ShadcnProConfig | null {
  const configPath = path.join(process.cwd(), 'shadcn-pro.json')
  if (!existsSync(configPath)) return null
  try {
    return JSON.parse(readFileSync(configPath, 'utf-8')) as ShadcnProConfig
  } catch {
    return null
  }
}

/**
 * Fetch the component registry JSON from the given URL (or from config).
 * Returns null on network error or if no registry URL is available.
 */
export async function fetchRegistry(registryUrl?: string): Promise<Registry | null> {
  const url = registryUrl ?? loadConfig()?.registry
  if (!url) return null

  try {
    const res = await fetch(`${url}/registry.json`, { headers: buildAuthHeaders() })
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    return res.json() as Promise<Registry>
  } catch {
    return null
  }
}

/**
 * Fetch a single file from the registry base URL.
 * Returns the file content as a string, or null on failure.
 */
export async function fetchFile(baseUrl: string, filePath: string): Promise<string | null> {
  try {
    const res = await fetch(`${baseUrl}/${filePath}`, { headers: buildAuthHeaders() })
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    return res.text()
  } catch {
    return null
  }
}
