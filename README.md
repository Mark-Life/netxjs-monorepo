# Next.js Monorepo Template

A turborepo-based monorepo template with Next.js, shadcn/ui, and strict code quality via Ultracite.

## What's Inside

- `apps/web` — Next.js application
- `packages/ui` — shared shadcn/ui component library
- `packages/typescript-config` — shared TypeScript configs

## Stack

- **Runtime**: Bun
- **Language**: TypeScript 7 (the native Go compiler)
- **Build**: Turborepo
- **Linting/Formatting**: Ultracite (Oxlint + Oxfmt)
- **UI**: shadcn/ui + Tailwind CSS
- **Pre-commit**: Husky + Ultracite

## Editor Setup

Open the repo in VS Code or Cursor and accept the prompt to install the recommended extensions (`.vscode/extensions.json`):

- **TypeScript 7** (`TypeScriptTeam.native-preview`) — **required**, see below
- **Oxc** (`oxc.oxc-vscode`) — Oxlint diagnostics + Oxfmt formatting, set as the default formatter
- **Tailwind CSS IntelliSense** — autocomplete inside `cn` / `cva` / `tv`
- **Bun** — run and debug Bun scripts
- **Pretty TypeScript Errors** / **Error Lens** — readable, inline diagnostics

The TypeScript 7 extension is not optional. TypeScript 7 is a native binary and no longer ships the JavaScript compiler API, so VS Code's built-in TypeScript extension cannot run it — without this extension the editor falls back to its own bundled compiler and reports diagnostics that disagree with `bun run typecheck`. The extension discovers the workspace `typescript` automatically, so no `typescript.tsdk` setting is needed (and setting one would break it). It requires VS Code 1.126+.

Format-on-save, import sorting, and lint auto-fix run on every save via the Oxc extension. An `.editorconfig` keeps other editors consistent, and `F5` debugs the Next.js app (`.vscode/launch.json`).

Lint rules and ignore patterns live in `oxlint.config.ts`; formatter settings live in `oxfmt.config.ts`. Both extend Ultracite's presets and only record where this repo departs from them.

On top of Ultracite, `tools/oxlint/anti-slop/` holds an Oxlint plugin vendored from [dmmulroy/anti-slop](https://github.com/dmmulroy/anti-slop). Its rules reject low-evidence TypeScript: `unknown` in public signatures, chained `as` casts, `typeof` checks on values the compiler already knows, index signatures used as dictionaries. The copy is ours to edit, not a pinned dependency. It is a workspace (`@workspace/anti-slop`) so `bun run typecheck` covers it, and its own `tsconfig.json` sets `allowImportingTsExtensions` — the plugin imports its rules with explicit `.ts` paths, which is what lets Oxlint load them from source. `@oxlint/plugins` must stay on the same exact version as `oxlint`; `bun run upgrade` bumps both together.

The plugin also ships an opt-in Effect rule group at `tools/oxlint/anti-slop/effect/`. It is not registered, because nothing here depends on Effect. To enable it, add `{ name: "anti-slop-effect", specifier: "./tools/oxlint/anti-slop/effect/index.ts" }` to `jsPlugins` and set `"anti-slop-effect/no-service-constructor-imports": "error"`.

## Create a New Project

Using GitHub CLI:

```bash
gh repo create my-app --template Mark-Life/netxjs-monorepo --private --clone
cd my-app
bun install
bun run upgrade
```

Or from GitHub UI: click **"Use this template"** > **"Create a new repository"**, then:

```bash
git clone https://github.com/YOUR_USERNAME/my-app.git
cd my-app
bun install
bun run upgrade
```

The `upgrade` command updates Next.js, refreshes all shadcn/ui components, updates dependencies, and runs lint fixes.

## Commands

| Command | Description |
| --- | --- |
| `bun dev` | Start all apps in dev mode (web → https://web.localhost:8443) |
| `bun run build` | Build all apps and packages |
| `bun run typecheck` | Type-check all apps and packages |
| `bun run lint` | Lint all apps and packages |
| `bun run fix` | Auto-fix formatting and lint issues |
| `bun run check` | Check for lint/format issues |
| `bun run upgrade` | Upgrade Next.js, shadcn/ui, and all deps |

The web app runs behind [portless](https://portless.sh) at `https://web.localhost:8443` — automatic HTTPS, no port juggling. It binds the unprivileged port `8443` (via `PORTLESS_PORT` in the `dev` script) so it never needs `sudo`; the first run still adds a local certificate authority to your trust store once. Prefer a clean `https://web.localhost` with no port? Drop `PORTLESS_PORT` from the script and accept a one-time `sudo` for port 443. To bypass portless entirely, run `bun run dev:app` in `apps/web` for plain `http://localhost:3000`. Change the subdomain via the `portless` key in `apps/web/package.json`.

## Adding Components

Add shadcn/ui components to the shared `ui` package:

```bash
bunx shadcn@latest add button -c packages/ui
```

Then import from `@workspace/ui`:

```tsx
import { Button } from "@workspace/ui/components/button";
```
