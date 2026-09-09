# AGENTS.md — gitgitWi.github.io

> Canonical agent instructions. `CLAUDE.md` is a symlink to this file — do not edit it separately.
> This file stays minimal. Follow links for details. Language: English (repo convention).

## 1. Always read first

- `.tasks/ROADMAP.md` — roadmap, gates, approval flow (Korean).
- Current phase `.tasks/phase-N-*/SPEC.md` + `PLAN.md` — scope and steps.
- Code style canonical: `~/Codes/works@est/est-work/wiki/conventions/shared-code-style.md`
  (7 rules: guard-first, max 2 nesting, arrows, object params, `undefined`, array methods, `as const`).

## 2. Hard constraints

- No work on unapproved phases (see ROADMAP approval flow).
- pm = bun (`bun install/add/run`), Node 22 kept for Astro runtime. Never reintroduce yarn/npm lockfiles.
- Astro Docs MCP first (`https://mcp.docs.astro.build/mcp`) — verify APIs there before coding.

## 3. Commands

`bun install` · `bun run dev|build|preview|check` · `bunx prettier --check .` · `bunx eslint .` · `bunx vitest run`

## 4. Done gates (every change)

`check` + `format` + `lint` + `test` green → then PR. CI (`.github/workflows/ci.yml`) enforces the same.

## 5. Workflow

- Branch per phase: `feat/phase-N-*`, stacked (`--base` = parent phase branch). See ROADMAP.
- Commits: logical units, conventional commits, Korean. Body 1–2 lines, max 3.
- PRs/comments in Korean. Test titles in Korean (`describe` = symbol name).

## 6. Links

- Astro: https://docs.astro.build · StyleX: https://stylexjs.com · Storybook (Phase 1+): local `bun run storybook`
- `llm-wiki-template`: https://github.com/gitgitWi/llm-wiki-template (wiki content source, `visibility` gate applies)
