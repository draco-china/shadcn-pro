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

```text
shadcn-pro/
├── packages/
│   ├── cli/          # @draco-china/shadcn-pro CLI
│   └── registry/     # Component source files + registry.json
└── apps/
    └── docs/         # Fumadocs documentation site
```

## Adding a Component

1. Add component files under `packages/registry/pro/<component>/` or the matching `pro-viewer` / `pro-fields` subpath.
2. Register the component in `packages/registry/registry.json`
3. Keep the docs mirror in sync under `apps/docs/registry/new-york-v4/pro/`
4. Write a docs page at `apps/docs/content/docs/components/<name>.mdx`
5. Add the component name to `apps/docs/content/docs/components/meta.json`
6. Run `bun --cwd apps/docs scripts/generate-blocks-data.ts` when registry files or examples change.
7. Validate with `bun run --cwd packages/registry validate` and `git diff --check`.

### Registry Metadata

- `dependencies` lists npm packages that must be installed for the component to compile.
- `registryDependencies` lists shadcn/ui registry components such as `button`, `card`, or `popover` that the CLI should include.
- `files` is the source of truth for copied component files. Keep every path in sync with the docs mirror and generated block data.

## Commit Convention

We use [Conventional Commits](https://www.conventionalcommits.org/):

```text
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
