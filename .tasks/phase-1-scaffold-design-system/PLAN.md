# Phase 1 PLAN — Scaffold + Design System + Home/Tags + 배포

> 상태: PLAN 정제 (2026-09-10). 브랜치 `feat/phase-1-scaffold`, **base = `main`**.
> `feat/ci-gates`는 아직 없다. CI 워크플로(`.github/workflows/ci.yml`)는 **후속**이며 이 Phase 블로커가 아니다.
> 로컬 게이트(`check` / `oxfmt` / `oxlint` / `vitest`)는 그대로 통과해야 한다.
> 머지는 사람만. implementer는 draft PR에서 멈춘다.
> 금지: `src/content.config.ts` · Content Collections · MDX 본문 · `getStaticProps` / `next/*`.
> Astro 설정 파일: **`astro.config.mjs`** (공식 권장). TS 설정은 `tsconfig.json` (`extends: astro/tsconfigs/strict`).
> Collections 설정 파일은 Phase 2에서 **`src/content.config.ts`** (레거시 `src/content/config.ts` 금지).

## SPEC 매핑

| SPEC 목표                                                       | PLAN 단계         |
| --------------------------------------------------------------- | ----------------- |
| Astro v7 static 스캐폴드 (`site`, TS strict, `base` 없음)       | 2                 |
| StyleX unplugin + 토큰/프리미티브/패턴 + variant 계약           | 3                 |
| Storybook 동반 납품 + `build-storybook` 그린 (배포 없음)        | **4** (신규 번호) |
| `/` · `/tags` · `/tags/[tag]` 껍데기+목업                       | 5                 |
| `Base.astro`에서 StyleX CSS 연결 (스파이크 구멍)                | 2 + 5             |
| Pages Actions 배포 (`withastro/action` + `deploy-pages`)        | 6                 |
| yarn classic 잔재 제거                                          | 1                 |
| Next 잔재 `legacy-next/` 보관                                   | 1                 |
| 종료 게이트 (check/format/lint/test, Lighthouse, 런타임 주입 0) | 7                 |
| draft PR (`--base main`, assignee, labels)                      | 8                 |

0단계는 이 브랜치에서 **이미 완료** — 다시 하지 않는다.

## 0. 완료 (재작업 금지)

- oxfmt `0.67.0` + oxlint `1.82.0` 핀, `.oxfmtrc.json` / `.oxlintrc.json` (`ignorePatterns`: `.yarn`, `.agents/skills`, `node_modules`, `dist`, …)
- `bunx oxfmt --check .` 그린 (63 files)
- `bunx oxlint .` exit 0
- 플레이북: verifier = `gpt-5.6-sol-medium`, 머지=사람

## 1. Next 보관 + yarn 잔재 제거

**목적:** Astro 루트와 Next 파일이 충돌하지 않게 하고, `withastro/action`이 `yarn.lock`을 bun보다 먼저 잡지 않게 한다.

**이동 (`git mv`, 삭제 금지)** → `legacy-next/` (Phase 2 이식 후 Phase 4에서 삭제):

- `pages/` · `components/` · `constants/` · `styles/`
- `next.config.js` · `next-env.d.ts`
- `.eslintrc.js` · `.prettierrc`
- 현재 `package.json` 스냅샷을 `legacy-next/package.json`으로 복사 (루트 `package.json`은 2단계에서 재작성)

**삭제:** `.yarn/` · `.yarnrc` · `yarn.lock` (재도입 금지: npm/yarn lockfile).

**편집:**

- `.gitignore` — `dist/`, `.astro/`, `storybook-static/` 추가. Next 전용 `/.next/`, `/out/`는 `legacy-next/` 안까지 커버되게 유지해도 된다.
- `.oxlintrc.json` / `.oxfmtrc.json` `ignorePatterns`에 `legacy-next/**`, `storybook-static/**`, `.astro/**` 추가.

**롤백:** `git mv` 역방향 + lock 복원. `yarn.lock`을 다시 만들면 배포 액션이 bun 대신 yarn을 고른다.

**수락:**

```bash
test ! -e yarn.lock && test ! -e .yarnrc
test -d legacy-next/pages && test -f legacy-next/next.config.js
bunx oxlint .   # exit 0 (legacy-next는 ignore)
```

## 2. Astro static 스캐폴드 + StyleX Vite + CSS 엔트리

**금지:** 기존 더티 트리에서 `bun create astro@latest .` 실행 (덮어씀). 파일은 수동 작성. 통합은 `bun astro add` 우선.

**패키지 (핀은 스파이크와 맞출 것):**

```bash
bun add astro@7.3.2 @stylexjs/stylex@0.19.0 sharp@0.35.4
bun add -d @astrojs/check typescript @stylexjs/unplugin@0.19.0 \
  @stylexjs/eslint-plugin@0.19.0 eslint vitest
```

- `@astrojs/mdx` · `@astrojs/sitemap` · `@astrojs/rss`는 **넣지 않는다** (MDX=Phase 2, sitemap/RSS=Phase 4).
- `packageManager`는 `bun@1.4.2` 유지. `"type": "module"`.
- Node 22 런타임 유지 (`engines.node`: `>=22.12.0`).

**`package.json` scripts:**

```json
{
  "dev": "astro dev",
  "build": "astro build",
  "preview": "astro preview",
  "check": "astro check",
  "format": "oxfmt --check .",
  "lint": "oxlint .",
  "lint:stylex": "eslint -c eslint.stylex.config.js src",
  "test": "vitest run --passWithNoTests",
  "storybook": "storybook dev -p 6006",
  "build-storybook": "storybook build"
}
```

**파일:**

- `astro.config.mjs` — `defineConfig`. `output` 기본이 static이면 명시해도 됨. **`site: 'https://gitgitwi.github.io'`**. **`base` 키 없음** (유저 사이트 루트).
  ```js
  import { defineConfig } from "astro/config";
  import stylex from "@stylexjs/unplugin";

  export default defineConfig({
    site: "https://gitgitwi.github.io",
    vite: {
      plugins: [
        stylex.vite({
          useCSSLayers: true,
          runtimeInjection: false,
        }),
      ],
    },
  });
  ```
  `stylex.vite()`는 다른 Vite 플러그인보다 **앞**.
- `tsconfig.json` — `{ "extends": "astro/tsconfigs/strict", "include": [".astro/types.d.ts", "**/*"], "exclude": ["dist", "legacy-next", "storybook-static"] }`
- `src/env.d.ts` — 커스텀 선언이 필요할 때만. `tsconfig`가 있으면 Astro 타입 reference는 필수는 아님.
- `src/styles/global.css` — **CSS 엔트리** (리셋 + `body` paper/ink). StyleX unplugin은 이 자산에 atomic CSS를 붙인다. 엔트리 없이 빌드하면 `dist/assets/stylex.css`만 생기고 HTML에 link가 빠지는 스파이크 구멍이 재발한다.
- `src/layouts/Base.astro` — `<html lang="ko">`, meta, title slot, **시스템 폰트 스택** (구글폰트 네트워크 금지 — Lighthouse). `import '../styles/global.css'`. `<slot />`.
- `src/pages/index.astro` — 최소 placeholder (`<Base><h1>…</h1></Base>`) — 5단계에서 채움.
- `public/` — 파비콘 있으면 유지/추가. CNAME 없음 (커스텀 도메인 아님).
- `eslint.stylex.config.js` — flat config. `@stylexjs/eslint-plugin`: `@stylexjs/valid-styles: 'error'`, `@stylexjs/no-unused: 'error'`. oxlint와 **별도 패스**.
- `.husky/pre-commit` — `npx pretty-quick` / `npx lint-staged` 제거 → `bunx oxfmt --check .` + `bunx oxlint .` (또는 staged만). `.lintstagedrc.js`는 oxfmt/oxlint로 교체하거나 삭제.
- `bun.lock` 커밋.

**롤백:** `package.json`을 `legacy-next/package.json`에서 되돌리고 Astro 파일 삭제.

**수락:**

```bash
bun run check          # 에러 0
bun run build          # dist/index.html 존재
rg -q 'rel="stylesheet"' dist/index.html
# dist CSS에 StyleX 레이어가 아직 없을 수 있음 (토큰 전). link 자체는 있어야 함.
test ! -f src/content.config.ts
test ! -f src/content/config.ts
```

## 3. StyleX 디자인시스템 (stories 파일은 여기서 같이 작성)

공유 코드 스타일 §1–7: guard 우선, 중첩 ≤2, arrow 기본, 3+인자 object, `undefined` 우선, `as const`. Astro frontmatter도 동일. `styled()`식 외부 재오픈 금지 — 변형은 `variant` prop만.

**토큰** `src/styles/tokens.stylex.ts` — `defineVars`:

```ts
export const tokens = stylex.defineVars({
  color: {
    paper: "#FAFAF8",
    ink: "#1A1A18",
    muted: "#6B6964",
    hairline: "#E8E6E1",
    accent: "#3F6B5A",
    accentInk: "#FAFAF8",
  },
  space: { xs: "0.25rem", sm: "0.5rem", md: "1rem", lg: "1.5rem", xl: "2.5rem" },
  fontSize: { sm: "0.875rem", md: "1rem", lg: "1.25rem", xl: "1.75rem", "2xl": "2.25rem" },
  radius: { sm: "4px", md: "8px" },
  lineHeight: { tight: "1.25", body: "1.6" },
} as const);
```

**테마 자리** `src/styles/themes.ts` — `createTheme` 스텁만 (`paper` / `sage` / `clay` / `ink`). 실값은 Phase 2.

**프리미티브** (`src/components/ui/<Name>.astro` + `<Name>.stylex.ts` + `<Name>.stories.ts` + barrel `src/components/ui/index.ts`):

| 심볼        | variant 계약 (이 외 스타일 prop 없음)     |
| ----------- | ----------------------------------------- |
| `Text`      | `variant: 'body' \| 'muted' \| 'caption'` |
| `Heading`   | `level: 1 \| 2 \| 3 \| 4`                 |
| `Stack`     | `gap: 'sm' \| 'md' \| 'lg'`               |
| `Cluster`   | `gap: 'sm' \| 'md' \| 'lg'`               |
| `Card`      | `padding: 'sm' \| 'md'`                   |
| `Tag`       | `href?: string` (없으면 `<span>`)         |
| `Divider`   | 없음                                      |
| `Prose`     | 없음 (본문 래퍼)                          |
| `Container` | `width: 'default' \| 'narrow'`            |

**패턴** (`src/components/patterns/` + barrel):

| 심볼            | 계약                                                                       |
| --------------- | -------------------------------------------------------------------------- |
| `SiteHeader`    | 사이트명 + Home/Tags `<a>` (next/link 금지)                                |
| `SiteFooter`    | 카피라이트                                                                 |
| `TagList`       | `tags: ReadonlyArray<{ slug: string; label: string }>`                     |
| `ColorwayShell` | `colorway: 'paper' \| 'sage' \| 'clay' \| 'ink'` (`createTheme` className) |

각 stories: CSF3, `title: 'ui/Text'` 또는 `'patterns/SiteHeader'`, `Default` + variant 1개 이상. 슬롯이 있으면 `args`로 문자열.

**테스트 (권장 1파일):** `src/styles/tokens.test.ts` — `describe('tokens')` / 한국어 `it`. 없어도 `--passWithNoTests`로 통과 가능하나 vitest 배선 확인용으로 두는 것을 권장.

**수락:**

```bash
bun run lint:stylex    # exit 0
bunx oxlint .
ls src/components/ui/*.stories.ts src/components/patterns/*.stories.ts | wc -l
# 13 (프리미티브 9 + 패턴 4)
```

## 4. Storybook 동반 납품 (SPEC §4 — 이전 PLAN에 번호 단계 없음)

로컬만. `/components` 공개 페이지·Storybook 배포는 하지 않는다. React/Preact renderer는 Phase 3 퀴즈 island 때.

```bash
bun add -d storybook @storybook/builder-vite @storybook-astro/framework
```

**파일:**

- `.storybook/main.ts` — `framework: '@storybook-astro/framework'`, `stories: ['../src/**/*.stories.@(ts|tsx)']`, builder vite. `renderMode` 기본 `'static'` 유지 (로컬 `storybook dev`는 Controls 동작).
- `.storybook/preview.ts` — `global.css` import (StyleX 엔트리와 동일).
- `viteFinal`에서 `stylex.vite({ useCSSLayers: true, runtimeInjection: false })`를 Astro/Vite 설정과 맞출 것 (astro config를 못 읽으면 여기 명시).

**수락:**

```bash
bun run build-storybook
test -d storybook-static
# 각 ui/pattern 컴포넌트에 짝 stories 존재 (find로 이름 대조)
# storybook-static은 gitignore. 커밋하지 않음.
```

`bun run storybook` (:6006)는 로컬 확인용 — CI 없음. smoke는 `build-storybook`으로 대체.

## 5. Home / Tags 목업 + Base 레이아웃 완성

Collections 없음. 목업만.

**`src/data/mock.ts`:**

```ts
export const mockPosts = [/* slug, title, date, tags[], summary */] as const;
export const mockTags = [/* slug, label */] as const;
```

최소 글 3 · 태그 3. `as const`. 헬퍼는 object param, arrow.

**페이지:**

- `src/layouts/Page.astro` — `Base` + `SiteHeader` / `SiteFooter` + `<slot />`.
- `src/pages/index.astro` — Hero(소개) + 최근글 목록(목업 링크는 `#` 또는 `/tags/...`만; `/articles/...`는 404가 되므로 **태그·홈만** 연결하거나 비활성 텍스트) + `TagList`.
- `src/pages/tags/index.astro` — 전체 태그.
- `src/pages/tags/[tag].astro` — `getStaticPaths`에서 `mockTags` 매핑. **`params` 값은 string만** (Astro 6+). `props`로 해당 태그 글 목록.

```ts
export const getStaticPaths = () =>
  mockTags.map((tag) => ({
    params: { tag: tag.slug },
    props: { tag, posts: mockPosts.filter((p) => p.tags.includes(tag.slug)) },
  }));
```

**수락:**

```bash
bun run build
test -f dist/index.html && test -f dist/tags/index.html
# 목업 태그 중 하나
ls dist/tags/*/index.html
rg -q 'rel="stylesheet"' dist/index.html
rg -q '@layer' dist/assets/*.css
rg -L 'create' dist/assets/*.js >/dev/null || true
# 런타임 주입 0: dist JS에 stylex inject 런타임 없음
! rg -q 'stylex\.inject|runtimeInjection' dist
```

## 6. GitHub Pages Actions 배포

공식 문서 기준 (MCP 2026-09-10): `actions/checkout@v7` · `withastro/action@v6` · `actions/deploy-pages@v5`.
`yarn.lock`이 없어야 bun 자동감지 (`bun.lock`). `oven-sh/setup-bun`은 **쓰지 않음** (액션이 lockfile로 bun 설치).

**교체** `.github/workflows/deploy.yml` — 기존 `JamesIves/github-pages-deploy-action@4.1.4` + Node 14 매트릭스 + `branches: [master]` 전부 삭제.

```yaml
name: Deploy to GitHub Pages
on:
  push:
    branches: [main]
  workflow_dispatch:
permissions:
  contents: read
  pages: write
  id-token: write
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v7
      - uses: withastro/action@v6
        with:
          node-version: 22
  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - id: deployment
        uses: actions/deploy-pages@v5
```

**사람 작업 (implementer 블로커 아님):** Repo Settings → Pages → Source = **GitHub Actions**. 머지 전에는 `main` 푸시 배포가 안 돌 수 있다. SPEC의 “main 푸시→Pages 그린”은 **머지 후 사람 확인**.

**수락:**

```bash
# yarn.lock 없음 + bun.lock 있음 (액션이 bun을 고름)
test -f bun.lock && test ! -e yarn.lock
rg -q 'withastro/action@v6' .github/workflows/deploy.yml
rg -q 'deploy-pages@v5' .github/workflows/deploy.yml
rg -q 'JamesIves' .github/workflows/deploy.yml && exit 1 || exit 0
rg -q 'branches: \[master\]' .github/workflows/deploy.yml && exit 1 || exit 0
```

## 7. 게이트

이 HEAD에서 다시 실행 (PR 본문에 **실제 출력**):

```bash
bun run check
bunx oxfmt --check .
bunx oxlint .
bun run lint:stylex
bunx vitest run
bun run build
bun run build-storybook
```

Lighthouse (로컬 preview, 프로덕션 URL은 머지 전 없음):

```bash
bun run preview &  # http://localhost:4321
bunx lighthouse http://localhost:4321 --only-categories=performance,accessibility \
  --chrome-flags='--headless=new' --quiet --output=json --output-path=/tmp/lh-home.json
bunx lighthouse http://localhost:4321/tags --only-categories=performance,accessibility \
  --chrome-flags='--headless=new' --quiet --output=json --output-path=/tmp/lh-tags.json
```

perf ≥ 90, a11y ≥ 95 (Home·Tags). 실패 시 PLAN-CHANGE (폰트/JS 예산).

런타임 스타일 주입 0: `dist`에 StyleX runtime inject 스크립트 없음 + CSS는 빌드 산출 `@layer`만.

## 8. Draft PR

```bash
gh pr create --draft --base main --assignee @me \
  --label phase-1 --label astro \
  --title "feat(phase-1): 정적 페이지를 Astro로 옮기고 Pages를 Actions로 고정한다" \
  --body-file /tmp/pr-body.md
```

본문: [`docs/conventions/prs.md`](../../docs/conventions/prs.md) — 왜 / AS-IS→TO-BE Mermaid / 효과 / 범위 / **이 HEAD 게이트 출력**.
스택 한 줄: base `main` ← head `feat/phase-1-scaffold`. `feat/ci-gates` 없음 · CI 워크플로 후속(Phase 4 / `feat/ci-gates`)을 범위 다이어그램 NEXT에 적는다.
라벨 없으면 `gh label create phase-1` / `astro` 후 부착.
implementer는 `PR-DRAFT` 후 멈춤. `gh pr ready` · `gh pr merge` 금지.

## 커밋 단위 (한국어 conventional, 본문 1–2줄)

1. `chore(phase-1): Next 잔재를 보관하고 yarn classic을 제거한다`
2. `feat(phase-1): Astro static 스캐폴드와 StyleX Vite를 깐다`
3. `feat(phase-1): StyleX 토큰과 UI 프리미티브를 계약으로 고정한다`
4. `feat(phase-1): Storybook을 로컬 게이트로 붙인다`
5. `feat(phase-1): Home과 Tags 껍데기를 목업으로 연다`
6. `ci(phase-1): Pages 배포를 Actions로 바꾼다`

stories는 해당 컴포넌트 커밋(3)에 동반. 4는 Storybook 설정·빌드 게이트.

## 제외 (이유)

- `src/content.config.ts` / MDX 본문 / articles·til 라우트 — Phase 2.
- `@astrojs/sitemap` · `@astrojs/rss` · Pagefind · 404 고도화 — Phase 4.
- `.github/workflows/ci.yml` — `feat/ci-gates` 후속. 이 PR 블로커 아님.
- Storybook 배포 · `/components` 공개 페이지 — 전 Phase 후 이슈.
- 다크모드 — Phase 4 이후. 토큰만 `createTheme` 확장 가능하게.
- `legacy-next/` 삭제 · `gh-pages` 브랜치 삭제 — Phase 4.

## 파일 스켈레톤 (신규)

```
astro.config.mjs
tsconfig.json                    # 교체
eslint.stylex.config.js
.storybook/main.ts
.storybook/preview.ts
.github/workflows/deploy.yml     # 교체
src/env.d.ts                     # 필요 시
src/styles/global.css
src/styles/tokens.stylex.ts
src/styles/themes.ts
src/styles/tokens.test.ts        # 권장
src/data/mock.ts
src/layouts/Base.astro
src/layouts/Page.astro
src/pages/index.astro
src/pages/tags/index.astro
src/pages/tags/[tag].astro
src/components/ui/{Text,Heading,Stack,Cluster,Card,Tag,Divider,Prose,Container}.{astro,stylex.ts,stories.ts}
src/components/ui/index.ts
src/components/patterns/{SiteHeader,SiteFooter,TagList,ColorwayShell}.{astro,stylex.ts,stories.ts}
src/components/patterns/index.ts
legacy-next/                     # 이동분
```

## Phase 0 StyleX 스파이크 (2026-09-09, `/tmp/stylex-spike`, 본 repo 미오염)

- Astro **7.3.2** (create-astro minimal) + `@stylexjs/{stylex,unplugin,eslint-plugin}@0.19.0`
- `stylex.vite({ useCSSLayers: true, runtimeInjection: false })` → `bun run build` 그린
- 산출: `dist/assets/stylex.css` (`@layer priority1..3`, atomic class). HTML 버튼 class는 추출됨, **런타임 스크립트 0**
- 구멍: 정적 HTML에 stylesheet link가 없음. **CSS 엔트리(`global.css`)를 `Base.astro`에서 import** 해야 Vite가 자산을 만들고 unplugin이 붙인다. link 누락 시 1단계 실패.
- `bun add sharp@0.35.4` 후 재빌드 그린 (이미지 변환은 미사용, 설치·빌드만 실증)

CSS 샘플:

```css
@layer priority1 {
  :root,
  .xibpiy1 {
    --x13fv976: #fafaf8;
    --xk3gggj: #1a1a18;
  }
}
@layer priority3 {
  .xdhsmyj {
    background-color: var(--x13fv976);
  }
}
```

## 승인 요청

- [x] `legacy-next/` 임시보관 전략 동의? — 2026-09-10 진행으로 채택
- [x] light 단일테마 출발 동의? (다크는 Phase 4 이후) — 동 진행
- [x] Phase 1 진행 승인 (사람, 2026-09-10). 머지는 사람.
