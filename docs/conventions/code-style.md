# 코드 스타일 — gitgitWi.github.io

> 정본: `~/Codes/works@est/est-work/wiki/conventions/shared-code-style.md` (2026-08-31 병합).
> 마커 안은 verbatim 복사 — **수정 금지**. 본 블로그 규칙은 마커 밖에만 둔다.
> 사람과 에이전트 모두 보는 문서. 작업 전용 문서(phase SPEC/PLAN, playbook)는 `.tasks/` 참조.

<!-- shared-convention:start -->

## Shared Code Style

These rules apply to all `alan-*` React repositories (web, mobile, core, b2b-template). They are generated from a single source — **do not edit inside the markers**; repo-specific rules go outside them. Platform differences are recorded in the delta table at the end, not resolved by overriding these rules.

Scope: **new code**, and files migrated as they are touched. Pre-existing files do not need a blanket rewrite.

### 1. Early return and guard clauses

Reject invalid state at the top of a function. Do not wrap the entire body in an `if` or `try`.

```ts
// Good
const processUser = (user: User | undefined) => {
  if (!user) return;
  // main logic at top level
};

// Bad — unnecessary nesting
const processUser = (user: User | undefined) => {
  if (user) {
    // entire body nested
  }
};
```

### 2. Function separation — max 2 levels of nesting

Control-flow nesting (`if` / `try` / `for`) has a maximum of **2 levels**. Deeper than that, extract a named helper.

```ts
// Good — extracted
const parseResponse = (raw: unknown) => {
  const validated = validateSchema(raw);
  return transformToModel(validated);
};

const fetchUser = async (id: string) => {
  const response = await api.get(id);
  return parseResponse(response);
};
```

### 3. Arrow functions by default

Use arrow functions for all utility, helper, and factory functions. Reserve the `function` keyword for two cases only:

- React components — `export function LoginForm() { … }`
- Generators — `function* paginate() { … }`

```ts
// Good
const formatDate = (date: Date) => { … };
export function LoginForm() { … }        // component

// Bad
export function createSttHandler(opts: Options) { … }   // factory, not a component
```

### 4. Object parameters for 3+ arguments

A function with three or more parameters takes a single object argument with a separate named type.

```ts
type DownloadExamArgs = {
  channelId: string;
  sessionId: string;
  params: DownloadExamParams;
};

const downloadExam = async ({ channelId, sessionId, params }: DownloadExamArgs) => { … };
```

### 5. Prefer `undefined` over `null`

Use `undefined` for absent values, and an empty string `""` for absent string fields. Use `null` only where a third-party API requires it — for example React's `useRef<T>(null)`, which types the ref as `T | null`.

```ts
// Good
let cancelWatchdog: (() => void) | undefined;

// Bad
let cancelWatchdog: (() => void) | null = null;
```

### 6. Array methods over for-loops

Prefer `map` / `filter` / `find` / `some` / `every` / `reduce` over `for`. Use `for` only when an array method cannot express the logic cleanly — sequential `await`, or per-item cleanup that needs its own `try`/`catch`.

### 7. `as const` for literal types

Apply `as const` to constant object and array literals so they get literal types.

```ts
return { ok: true } as const;
```

### Platform deltas — do not unify

These differ **on purpose**. Each repo follows its own column; the difference comes from the runtime or the consumption boundary, so unifying them would give some repos a wrong rule.

| Topic                   | alan-frontend (web)                                            | alan-mobile (RN / Expo)                                                                    | alan-frontend-core                                                                            | alan-b2b-template |
| ----------------------- | -------------------------------------------------------------- | ------------------------------------------------------------------------------------------ | --------------------------------------------------------------------------------------------- | ----------------- |
| Timers                  | `window.setTimeout` / `window.clearTimeout` — returns `number` | bare `setTimeout` — returns a `Timeout` object; type it as `ReturnType<typeof setTimeout>` | n/a (cross-platform slices avoid timers)                                                      | follows web       |
| `RefObject` nullability | n/a                                                            | React's `useRef<T>(null)` forces `T \| null` — do not fight it                             | n/a                                                                                           | follows web       |
| Barrel exports          | **used** — `index.ts` re-exports per feature                   | **not used** — direct file imports only                                                    | **forbidden** — deep-path exports only; the `exports` map in `package.json` is the public API | follows core      |

### Language

- LLM-facing documents (this file, `CLAUDE.md`, `AGENTS.md`, convention docs): **English**.
- Commit messages, PR titles and bodies, GitHub issues, code comments: **Korean**.
- Test titles (`it` / `test`): **Korean** across all repos — test code is read by developers, so write it in Korean; identifiers and platform keywords stay as-is. `describe` blocks name the symbol under test.
- These are orthogonal — an English convention document does not make commit messages or test titles English.

<!-- shared-convention:end -->

## 본 블로그 델타 (마커 밖 — 여기만 수정 가능)

- Timers: `window.setTimeout` / `window.clearTimeout` (web 규칙).
- Barrel exports: 사용 — `index.ts` per-feature re-export (web 규칙).
- Astro 컴포넌트: `---` fence 안 로직도 §1–7 동일 적용 (guard 우선, helper 추출).
- 본 `.tasks/*.md` 협업 문서는 한국어 유지 + 코드 식별자 원문.
- 커밋: [`commits.md`](commits.md).
- PR 본문: [`prs.md`](prs.md) — 한국어, 사람 대상. 표 없이 Mermaid.
