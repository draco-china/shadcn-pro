<!-- markdownlint-disable MD033 MD041 -->

<div align="center">

[![Typing SVG](https://readme-typing-svg.demolab.com?font=Fira+Code&weight=600&size=28&pause=1000&color=00B8D9&center=true&vCenter=true&width=600&lines=shadcn-pro;Pro+components+for+shadcn%2Fui;Copy+%26+own.+No+lock-in.)](https://git.io/typing-svg)

[![CI](https://img.shields.io/github/actions/workflow/status/draco-china/shadcn-pro/ci.yml?style=for-the-badge&label=CI&logo=githubactions&logoColor=white)](https://github.com/draco-china/shadcn-pro/actions/workflows/ci.yml)
[![version](https://img.shields.io/github/package-json/v/draco-china/shadcn-pro?style=for-the-badge&label=shadcn-pro&color=00B8D9&logo=npm&logoColor=white)](https://github.com/draco-china/shadcn-pro/pkgs/npm/shadcn-pro)
[![docs](https://img.shields.io/badge/docs-online-00B8D9?style=for-the-badge&logo=gitbook&logoColor=white)](https://draco-china.github.io/shadcn-pro)
[![license](https://img.shields.io/badge/license-MIT-blue?style=for-the-badge&logo=opensourceinitiative&logoColor=white)](https://github.com/draco-china/shadcn-pro/blob/main/LICENSE)

Production-ready pro components for [shadcn/ui](https://ui.shadcn.com) — inspired by Ant Design Pro, rebuilt for the modern stack.
Copy into your project. Own it completely. No shadcn-pro runtime dependency, no version lock-in.

</div>

## ✨ Components

| Component | Stack | Description |
| --- | --- | --- |
| `pro-form` | Formily + shadcn/ui | Schema-driven forms with validation, linkage & dynamic fields |
| `pro-table` | TanStack Table + shadcn/ui | Headless data table with search, filters, sort & pagination |
| `pro-fields` | shadcn/ui | Standalone field primitives (Input, Select, DatePicker, Upload, Captcha, FacetedFilter…) |
| `pro-input` | shadcn/ui | Enhanced input with prefix, suffix, clear, and password helpers |
| `pro-editor` | Monaco | Code and markdown editor with controlled language, theme, and view mode |
| `pro-descriptions` | shadcn/ui | Key-value description panels |
| `image-viewer` | shadcn/ui | Full-screen image viewer with zoom, rotate & multi-image navigation |
| `code-viewer` | Shiki | Syntax-highlighted read-only code viewer |
| `diff-viewer` | Diff + Shiki | Side-by-side and unified code diff viewer |
| `html-viewer` | shadcn/ui | Sandboxed HTML preview surface |
| `markdown-viewer` | React Markdown + CodeViewer | GitHub Flavored Markdown renderer with shared code blocks |

## 🚀 Quick Start

shadcn-pro is published to **GitHub Packages**. Add the registry to your project's `.npmrc`:

```bash
# .npmrc (project root)
@draco-china:registry=https://npm.pkg.github.com
```

Then install any component:

```bash
npx @draco-china/shadcn-pro@latest add pro-form
```

```tsx
import { ProForm, SchemaField, createForm } from '@/components/pro/pro-form'

const form = createForm()

export default function Page() {
  return (
    <ProForm form={form} onFinish={console.log}>
      <SchemaField
        schema={{
          type: 'object',
          properties: {
            username: {
              type: 'string',
              title: 'Username',
              required: true,
              'x-component': 'Input',
            },
            role: {
              type: 'string',
              title: 'Role',
              'x-component': 'Select',
              enum: [
                { label: 'Admin', value: 'admin' },
                { label: 'User', value: 'user' },
              ],
            },
          },
        }}
      />
    </ProForm>
  )
}
```

## 🛠️ Tech Stack

[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)](https://nextjs.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com)
[![Formily](https://img.shields.io/badge/Formily-6E3FF3?style=for-the-badge&logoColor=white)](https://formilyjs.org)
[![TanStack Table](https://img.shields.io/badge/TanStack%20Table-FF4154?style=for-the-badge&logo=reacttable&logoColor=white)](https://tanstack.com/table)
[![Radix UI](https://img.shields.io/badge/Radix%20UI-161618?style=for-the-badge&logo=radixui&logoColor=white)](https://www.radix-ui.com)
[![Turborepo](https://img.shields.io/badge/Turborepo-EF4444?style=for-the-badge&logo=turborepo&logoColor=white)](https://turbo.build)
[![Bun](https://img.shields.io/badge/Bun-14151A?style=for-the-badge&logo=bun&logoColor=white)](https://bun.sh)

## 💡 Philosophy

- **Copy, don't install** — components live in your codebase, styled with your Tailwind tokens
- **Schema-driven** — define complex forms and tables as plain JSON/TS objects
- **shadcn/ui native** — built on Radix primitives, same design language
- **Zero opinions on state** — bring your own server state (SWR, React Query, etc.)

## 🧑‍💻 Development

```bash
bun install
bun dev              # start docs site
bun turbo build      # build all packages
bunx biome ci .      # lint & format check
bun run --cwd packages/registry validate
```

## 📄 License

MIT © [draco-china](https://github.com/draco-china)
