# Contributing to shadcn-pro

Thank you for your interest in contributing! This guide covers how to set up the project locally and submit changes.

## Prerequisites

- [Bun](https://bun.sh) ≥ 1.1
- Node.js ≥ 20 (for tooling compatibility)
- Git

## Setup

```bash
git clone https://github.com/draco-china/shadcn-pro.git
cd shadcn-pro
bun install
```

## Development

```bash
# Build all packages
bun run build

# Typecheck all packages
bun run typecheck

# Lint & format (Biome)
bun run lint
bun run format

# Run docs locally
cd apps/docs && bun run dev
```

## Project Structure

```
shadcn-pro/
├── packages/
│   ├── cli/          # @draco-china/shadcn-pro CLI
│   └── registry/     # Component source files + registry.json
└── apps/
    └── docs/         # Fumadocs documentation site
```

## Adding a Component

1. Add component files under `packages/registry/components/<category>/<name>/`
2. Register the component in `packages/registry/registry.json`
3. Write a docs page at `apps/docs/content/docs/components/<name>.mdx`
4. Add the component name to `apps/docs/content/docs/components/meta.json`

## Commit Convention

We use [Conventional Commits](https://www.conventionalcommits.org/):

```
feat(pro-table): add column visibility toggle
fix(cli): resolve path on Windows
docs(pro-form): add array field example
chore: update dependencies
```

## Pull Request Process

1. Fork the repository
2. Create a feature branch: `git checkout -b feat/your-feature`
3. Make your changes and commit following the convention above
4. Push and open a Pull Request against `main`
5. Ensure typecheck and lint pass (CI will verify)

## Code Style

- **TypeScript** everywhere — no `any` if avoidable
- **Biome** for formatting and linting (replaces ESLint + Prettier)
- Components should be unstyled by default, styled via shadcn/ui primitives
- All public APIs should be documented with JSDoc comments
