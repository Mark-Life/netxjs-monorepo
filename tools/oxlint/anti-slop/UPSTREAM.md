# Upstream provenance

- Source: https://github.com/dmmulroy/anti-slop
- Synced revision: `c44ef22ca116d0ba62a3ff663a0bd13a3f3fa40b` (2026-09, merge of PR #36)
- Copied path: `skills/install-anti-slop/assets/anti-slop/` (the bundled plugin, no tests)
- Original vendoring base: `6d53855` (bytes matched except the local edit below)
- Last sync: 2026-10-05, three-way merge of base, local and incoming

## Local changes

- `package.json`: makes the plugin the `@workspace/anti-slop` workspace so `bun run typecheck` covers it.
- `tsconfig.json`: sets `allowImportingTsExtensions` so the `.ts` import paths compile; Oxlint loads the plugin from source.
- `shared/dictionary-types.ts`: `unsafeMembers[0] ?? null` in the intersection branch, needed under `noUncheckedIndexedAccess`.

## Registration

`oxlint.config.ts` registers `index.ts` with every generic rule at `error`. `oxc/no-accumulating-spread` comes from Ultracite's core preset. The Effect group in `effect/` is not registered because the repo does not depend on `effect`.

`vendor/eslint-stylistic/` keeps its own `LICENSE` and `UPSTREAM.md`.
