export type FontDefinition = {
  name: string
  title: string
  family: string
  provider: 'google'
  registryVariable: string
  subsets: string[]
  weight?: string[]
  import?: string
  dependency?: string
}

export const FONT_DEFINITIONS: FontDefinition[] = [
  {
    name: 'inter',
    title: 'Inter',
    family: 'Inter',
    provider: 'google',
    registryVariable: '--font-inter',
    subsets: ['latin'],
  },
  {
    name: 'geist',
    title: 'Geist',
    family: 'Geist',
    provider: 'google',
    registryVariable: '--font-geist',
    subsets: ['latin'],
  },
  {
    name: 'figtree',
    title: 'Figtree',
    family: 'Figtree',
    provider: 'google',
    registryVariable: '--font-figtree',
    subsets: ['latin'],
  },
  {
    name: 'jetbrains-mono',
    title: 'JetBrains Mono',
    family: 'JetBrains Mono',
    provider: 'google',
    registryVariable: '--font-jetbrains-mono',
    subsets: ['latin'],
  },
  {
    name: 'noto-sans',
    title: 'Noto Sans',
    family: 'Noto Sans',
    provider: 'google',
    registryVariable: '--font-noto-sans',
    subsets: ['latin'],
  },
  {
    name: 'playfair-display',
    title: 'Playfair Display',
    family: 'Playfair Display',
    provider: 'google',
    registryVariable: '--font-playfair-display',
    subsets: ['latin'],
  },
]
