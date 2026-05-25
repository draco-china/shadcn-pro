'use client'

import { Check, Copy, Terminal } from 'lucide-react'
import * as React from 'react'
import { copyToClipboardWithMeta } from '@/components/copy-button'
import { useConfig } from '@/hooks/use-config'
import { Button } from '@/registry/new-york-v4/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/registry/new-york-v4/ui/tabs'

function transformCommand(
  command: string | undefined,
  packageManager: 'pnpm' | 'npm' | 'yarn' | 'bun',
) {
  if (!command || packageManager === 'npm') {
    return command
  }

  if (command.startsWith('npm install')) {
    return command
      .replace(
        /^npm install\b/gm,
        packageManager === 'pnpm' ? 'pnpm add' : packageManager === 'yarn' ? 'yarn add' : 'bun add',
      )
      .replace(
        /^npx\b/gm,
        packageManager === 'pnpm'
          ? 'pnpm dlx'
          : packageManager === 'yarn'
            ? 'yarn dlx'
            : 'bunx --bun',
      )
  }

  if (command.startsWith('npx create-')) {
    return command
      .replace(
        /^npx create-/gm,
        packageManager === 'pnpm'
          ? 'pnpm create '
          : packageManager === 'yarn'
            ? 'yarn create '
            : 'bunx --bun create-',
      )
      .replace(
        /^npx\b/gm,
        packageManager === 'pnpm'
          ? 'pnpm dlx'
          : packageManager === 'yarn'
            ? 'yarn dlx'
            : 'bunx --bun',
      )
  }

  if (command.startsWith('npm create')) {
    return command.replace(
      /^npm create\b/gm,
      packageManager === 'pnpm'
        ? 'pnpm create'
        : packageManager === 'yarn'
          ? 'yarn create'
          : 'bun create',
    )
  }

  if (command.startsWith('npx')) {
    return command.replace(
      /^npx\b/gm,
      packageManager === 'pnpm'
        ? 'pnpm dlx'
        : packageManager === 'yarn'
          ? 'yarn dlx'
          : 'bunx --bun',
    )
  }

  if (command.startsWith('npm run')) {
    return command.replace(
      /^npm run\b/gm,
      packageManager === 'pnpm' ? 'pnpm' : packageManager === 'yarn' ? 'yarn' : 'bun',
    )
  }

  return command
}

export function CodeBlockCommand({
  __npm__,
  __yarn__,
  __pnpm__,
  __bun__,
}: React.ComponentProps<'pre'> & {
  __npm__?: string
  __yarn__?: string
  __pnpm__?: string
  __bun__?: string
}) {
  const [config, setConfig] = useConfig()
  const [hasCopied, setHasCopied] = React.useState(false)

  React.useEffect(() => {
    if (hasCopied) {
      const timer = setTimeout(() => setHasCopied(false), 2000)
      return () => clearTimeout(timer)
    }
  }, [hasCopied])

  const packageManager = config.packageManager || 'pnpm'
  const tabs = React.useMemo(() => {
    const command = __npm__ ?? __pnpm__ ?? __yarn__ ?? __bun__

    return {
      pnpm: transformCommand(command, 'pnpm') ?? __pnpm__,
      npm: __npm__ ?? command,
      yarn: transformCommand(command, 'yarn') ?? __yarn__,
      bun: transformCommand(command, 'bun') ?? __bun__,
    }
  }, [__npm__, __pnpm__, __yarn__, __bun__])

  const copyCommand = React.useCallback(() => {
    const command = tabs[packageManager]

    if (!command) {
      return
    }

    copyToClipboardWithMeta(command, {
      name: 'copy_npm_command',
      properties: {
        command,
        pm: packageManager,
      },
    })
    setHasCopied(true)
  }, [packageManager, tabs])

  return (
    <div className="overflow-x-auto">
      <Tabs
        value={packageManager}
        className="gap-0"
        onValueChange={(value) => {
          setConfig({
            ...config,
            packageManager: value as 'pnpm' | 'npm' | 'yarn' | 'bun',
          })
        }}
      >
        <div className="flex items-center gap-2 border-b border-border/50 px-3 py-1">
          <div className="flex size-4 items-center justify-center rounded-[1px] bg-foreground opacity-70">
            <Terminal className="size-3 text-code" />
          </div>
          <TabsList className="rounded-none bg-transparent p-0">
            {Object.entries(tabs).map(([key]) => {
              return (
                <TabsTrigger
                  key={key}
                  value={key}
                  className="h-7 border border-transparent pt-0.5 shadow-none! data-[state=active]:border-input data-[state=active]:bg-background!"
                >
                  {key}
                </TabsTrigger>
              )
            })}
          </TabsList>
        </div>
        <div className="no-scrollbar overflow-x-auto">
          {Object.entries(tabs).map(([key, value]) => {
            return (
              <TabsContent key={key} value={key} className="mt-0 px-4 py-3.5">
                <pre>
                  <code className="relative font-mono text-sm leading-none" data-language="bash">
                    {value}
                  </code>
                </pre>
              </TabsContent>
            )
          })}
        </div>
      </Tabs>
      <Button
        data-slot="copy-button"
        size="icon"
        variant="ghost"
        className="absolute top-2 right-2 z-10 size-7 opacity-70 hover:opacity-100 focus-visible:opacity-100"
        onClick={copyCommand}
      >
        <span className="sr-only">Copy</span>
        {hasCopied ? <Check /> : <Copy />}
      </Button>
    </div>
  )
}
