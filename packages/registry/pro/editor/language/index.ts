const LANGUAGE_LABELS: Record<string, string> = {
  css: 'CSS',
  go: 'Go',
  html: 'HTML',
  java: 'Java',
  javascript: 'JavaScript',
  json: 'JSON',
  markdown: 'Markdown',
  python: 'Python',
  rust: 'Rust',
  shell: 'Shell',
  sql: 'SQL',
  tsx: 'TSX',
  typescript: 'TypeScript',
  yaml: 'YAML',
}

export function getLanguageLabel(language: string) {
  return LANGUAGE_LABELS[language] ?? language
}

export function getEditorPath(language: string) {
  if (language === 'tsx') return 'file:///index.tsx'
  if (language === 'typescript') return 'file:///index.ts'
  if (language === 'javascript') return 'file:///index.jsx'
  return `file:///index.${language}`
}

export function getMonacoLanguage(language: string) {
  return language === 'tsx' ? 'typescript' : language
}
