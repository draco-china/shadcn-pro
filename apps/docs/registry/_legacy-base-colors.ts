import { THEMES } from '@/registry/themes'

type CssVars = {
  light: Record<string, string>
  dark: Record<string, string>
}

export type LegacyBaseColor = {
  name: string
  label: string
  cssVars: CssVars
}

function hasCssVars(theme: (typeof THEMES)[number]): theme is (typeof THEMES)[number] & {
  cssVars: CssVars
} {
  return Boolean(theme.cssVars?.light && theme.cssVars?.dark)
}

export const baseColors: LegacyBaseColor[] = THEMES.filter(hasCssVars).map((theme) => ({
  name: theme.name,
  label: theme.title ?? theme.name,
  cssVars: theme.cssVars,
}))

export const baseColorsV4 = Object.fromEntries(
  baseColors.map((theme) => [theme.name, theme.cssVars]),
) as Record<string, CssVars>

export const baseColorsOKLCH = baseColorsV4
