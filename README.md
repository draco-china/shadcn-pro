<!-- markdownlint-disable MD033 MD041 -->

<div align="center">

[![Typing SVG](https://readme-typing-svg.demolab.com?font=Fira+Code&weight=600&size=28&pause=1000&color=00B8D9&center=true&vCenter=true&width=600&lines=shadcn-pro;Pro+components+for+shadcn%2Fui;Copy+%26+own.+No+lock-in.)](https://git.io/typing-svg)

[![CI](https://img.shields.io/github/actions/workflow/status/draco-china/shadcn-pro/ci.yml?style=for-the-badge&label=CI&logo=githubactions&logoColor=white)](https://github.com/draco-china/shadcn-pro/actions/workflows/ci.yml)
[![registry](https://img.shields.io/badge/registry-shadcn-00B8D9?style=for-the-badge&logo=shadcnui&logoColor=white)](https://draco-china.github.io/shadcn-pro/r/shadcn-pro.json)
[![docs](https://img.shields.io/badge/docs-online-00B8D9?style=for-the-badge&logo=gitbook&logoColor=white)](https://draco-china.github.io/shadcn-pro)
[![license](https://img.shields.io/badge/license-MIT-blue?style=for-the-badge&logo=opensourceinitiative&logoColor=white)](https://github.com/draco-china/shadcn-pro/blob/main/LICENSE)

Production-ready pro components for [shadcn/ui](https://ui.shadcn.com) — inspired by Ant Design Pro, rebuilt for the modern stack.
Copy into your project. Own it completely. No shadcn-pro runtime dependency, no version lock-in.

</div>

## ✨ Components

| Component | Stack | Description |
| --- | --- | --- |
| `pro-form` | shadcn/ui | Composable form layout, actions, ModalForm & DrawerForm |
| `pro-table` | TanStack Table + shadcn/ui | Headless data table with search, filters, sort & pagination |
| `pro-fields` | shadcn/ui | Standalone field primitives (Input, Select, DatePicker, Upload, Captcha, TreeSelect…) |
| `pro-editor` | Monaco | Code and markdown editor with controlled language, theme, and view mode |
| `pro-descriptions` | shadcn/ui | Key-value description panels |
| `image-viewer` | shadcn/ui | Full-screen image viewer with zoom, rotate & multi-image navigation |
| `code-viewer` | Shiki | Syntax-highlighted read-only code viewer |
| `diff-viewer` | Diff + Shiki | Side-by-side and unified code diff viewer |
| `html-viewer` | shadcn/ui | Sandboxed HTML preview surface |
| `markdown-viewer` | React Markdown + CodeViewer | GitHub Flavored Markdown renderer with shared code blocks |

## 🚀 Quick Start

Install any component with the official shadcn CLI:

```bash
npx shadcn@latest add https://draco-china.github.io/shadcn-pro/r/pro-form.json
```

```tsx
import { Input } from '@/components/pro/base/fields/input'
import { Select } from '@/components/pro/base/fields/select'
import { FormItem, ProForm } from '@/components/pro/form'

const roleOptions = [
  { label: 'Admin', value: 'admin' },
  { label: 'User', value: 'user' },
]

export default function Page() {
  return (
    <ProForm onFinish={console.log}>
      <FormItem label="Username" required htmlFor="username">
        <Input id="username" name="username" required />
      </FormItem>
      <FormItem label="Role" htmlFor="role">
        <Select id="role" name="role" options={roleOptions} />
      </FormItem>
    </ProForm>
  )
}
```

## 🛠️ Tech Stack

[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)](https://nextjs.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com)
[![TanStack Table](https://img.shields.io/badge/TanStack%20Table-FF4154?style=for-the-badge&logo=reacttable&logoColor=white)](https://tanstack.com/table)
[![Radix UI](https://img.shields.io/badge/Radix%20UI-161618?style=for-the-badge&logo=radixui&logoColor=white)](https://www.radix-ui.com)
[![Turborepo](https://img.shields.io/badge/Turborepo-EF4444?style=for-the-badge&logo=turborepo&logoColor=white)](https://turbo.build)
[![Bun](https://img.shields.io/badge/Bun-14151A?style=for-the-badge&logo=bun&logoColor=white)](https://bun.sh)

## 💡 Philosophy

- **Copy, don't install** — components live in your codebase, styled with your Tailwind tokens
- **Composable** — build forms and tables from typed primitives that stay easy to customize
- **shadcn/ui native** — built on Radix primitives, same design language
- **Zero opinions on state** — bring your own server state (SWR, React Query, etc.)

## 🧑‍💻 Development

```bash
bun install
bun dev              # start docs site
bun turbo build      # build all packages
bunx biome ci .      # lint & format check
(cd packages/registry && bun run validate)
```

## 📄 License

MIT © [draco-china](https://github.com/draco-china)
