# Design System — gitgitwi Technical Blog

> Visual direction and implementation contract for `gitgitwi.github.io`.
> Source mock: [`.tasks/visual-concept-by-gpt-09-10.png`](../../.tasks/visual-concept-by-gpt-09-10.png) (2026-09-10).
> Phase that applies this: [`.tasks/phase-1.5-visual-design/`](../../.tasks/phase-1.5-visual-design/).
> This file is the canonical `docs/conventions/design.md`. Do not keep a second copy at repo root.

The mock is a layout north star. Where it disagrees with this contract, **this file wins** — except code blocks: the mock is dark; implementation uses **Prism.js + a Vitesse Light–like theme** on the warm canvas (see §11).

---

## 1. Design Intent

### Core feeling

The site should feel:

- **Elegant** — refined rather than decorative.
- **Warm** — soft beige instead of a cold white canvas.
- **Technical** — modern developer-tool aesthetics, code, diagrams, and experimental WebGL are welcome.
- **Editorial** — typography and whitespace should make long-form writing feel intentional.
- **Personal** — handwriting/brush typography is used selectively to create a recognizable author identity.
- **Quietly experimental** — advanced visual effects may appear as accents, but never interfere with reading.

### Design keywords

`warm` · `editorial` · `minimal` · `technical` · `organic` · `precise` · `experimental`

### Avoid

- Generic SaaS dashboard aesthetics.
- Excessive rounded cards.
- Heavy gradients everywhere.
- Excessive shadows.
- Neon/cyberpunk styling.
- Dense layouts with little whitespace.
- Decorative animation that competes with article content.
- Using the handwritten typeface for ordinary UI text.

---

## 2. Visual Concept

The visual system is built around a contrast between:

1. **Warm editorial canvas** — bright beige background.
2. **Mint-green technical accent** — the primary brand signal.
3. **Neutral typography** — Pretendard or Noto Sans for readable UI/body text.
4. **Geist Mono** — code, metadata, technical labels, and machine-like details.
5. **Handwritten display type** — article titles, hero statements, and selected section headings.
6. **Generative visuals** — Three.js/WebGL shaders can provide subtle identity moments.

The intended result is a technical blog that feels closer to an independent editorial publication than a documentation portal.

---

## 3. Color

### Core palette

Use a warm neutral base rather than pure white.

```css
:root {
  --color-canvas: #F7F5EE;
  --color-surface: #FCFBF7;
  --color-surface-muted: #EFEEE7;

  --color-ink: #171A18;
  --color-ink-secondary: #4D534E;
  --color-ink-tertiary: #7A807B;

  --color-border: #DDDCD3;
  --color-border-strong: #C9C9BF;

  --color-accent: #16A36A;
  --color-accent-hover: #108A59;
  --color-accent-soft: #DDF4E9;
  --color-accent-ink: #087044;

  --color-code-bg: #F1EFE6;
  --color-code-ink: #393a34;
  --color-code-border: #DDDCD3;
}
```

### Color roles

| Role | Token | Purpose |
|---|---|---|
| Canvas | `--color-canvas` | Global page background |
| Surface | `--color-surface` | Cards, elevated content |
| Muted surface | `--color-surface-muted` | Secondary sections |
| Ink | `--color-ink` | Primary text |
| Secondary ink | `--color-ink-secondary` | Supporting text |
| Tertiary ink | `--color-ink-tertiary` | Metadata/placeholders |
| Border | `--color-border` | Default separators |
| Strong border | `--color-border-strong` | Active/important boundaries |
| Accent | `--color-accent` | Mintlify-inspired primary accent |
| Accent soft | `--color-accent-soft` | Callouts, selected states |
| Code background | `--color-code-bg` | Prism block canvas — warm, near page background |
| Code ink | `--color-code-ink` | Prism default text |

### Rules

- Do not use pure `#000` for normal text.
- Do not use pure `#FFF` as the global background.
- Mint green should be a **signal**, not the dominant page color.
- Most pages should remain visually neutral until the accent appears.
- Green should communicate interaction, emphasis, selection, or identity.
- Maintain sufficient contrast for all body text and controls.

Concept mock hex vs this contract (implementation uses **this contract**):

- Canvas `#FBF6EF` (mock) → `#F7F5EE` here (slightly greener paper).
- Accent `#10B981` (Tailwind emerald on the mock) → `#16A36A` here (less saturated mint).
- Surface `#FFFFFF` (mock cards) → `#FCFBF7` here (not pure white).
- Code blocks: mock is charcoal. **Do not ship that.** Prism + Vitesse Light–like on `--color-code-bg`.

---

## 4. Typography

### Primary font

Preferred order:

```css
font-family:
  "Pretendard",
  "Noto Sans KR",
  "Noto Sans",
  system-ui,
  sans-serif;
```

Use the primary sans-serif font for:

- Navigation
- Body text
- Buttons
- Cards
- Forms
- Metadata when readability is more important than technical character

### Monospace

Use **Geist Mono** for:

- Code
- Tags
- Technical metadata
- Dates when presented as a technical label
- File paths
- Version numbers
- Keyboard shortcuts
- Small technical UI elements

```css
font-family: "Geist Mono", ui-monospace, monospace;
```

### Display / handwritten font

Use a handwriting or brush-calligraphy typeface for:

- Homepage hero statement
- Article title
- Major editorial headings
- Occasional visual annotations

The display face must remain **sparse**.

Never use it for:

- Body copy
- Navigation
- Buttons
- Form controls
- Code
- Dense technical content

### Typography hierarchy

```text
Display / Hero
↓
Article Title
↓
Section Heading
↓
Body
↓
Metadata / Caption
↓
Technical Label
```

The hierarchy should come primarily from **scale, weight, and whitespace**, not many different colors.

---

## 5. Layout

### Mobile-first

Design the smallest viewport first.

The mobile layout should be a complete design, not a collapsed desktop layout.

Primary priorities:

1. Reading width
2. Typography
3. Navigation
4. Touch targets
5. Progressive visual decoration

### Content width

Desktop content should be centered and constrained.

Recommended maximum widths:

```css
--layout-max: 1180px;
--reading-max: 720px;
--wide-reading-max: 900px;
```

Use:

- `1180px` for site-level layouts.
- `720px` for article prose.
- `900px` for diagrams, tables, media, and wide technical examples.

Never allow normal article text to span the entire desktop viewport.

### Horizontal padding

```text
Mobile: 20px
Tablet: 28px
Desktop: 32px
Large desktop: 40px
```

### Grid philosophy

Use generous whitespace.

Prefer:

```text
content
       whitespace
content
```

over:

```text
[card][card][card][card]
```

The site should feel composed, not densely packed.

---

## 6. Spacing

Use a consistent 4px-based scale.

```css
--space-1: 4px;
--space-2: 8px;
--space-3: 12px;
--space-4: 16px;
--space-5: 20px;
--space-6: 24px;
--space-8: 32px;
--space-10: 40px;
--space-12: 48px;
--space-16: 64px;
--space-20: 80px;
--space-24: 96px;
--space-32: 128px;
```

Use larger spacing to separate **ideas**, not just components.

A major section should feel significantly separated from the previous section.

---

## 7. Radius, Borders & Elevation

### Radius

Prefer restrained rounding.

```css
--radius-sm: 6px;
--radius-md: 10px;
--radius-lg: 16px;
--radius-pill: 999px;
```

Use:

- `sm` for controls and small UI.
- `md` for cards and code containers.
- `lg` only for prominent visual surfaces.
- Pill radius only for tags, badges, and compact controls.

Avoid making every component pill-shaped.

### Borders

Borders should be subtle and slightly warm.

```css
border: 1px solid var(--color-border);
```

Use borders more often than shadows.

### Shadows

Default state:

```text
No shadow.
```

Use extremely subtle elevation only when a surface genuinely needs separation from the canvas.

---

## 8. Navigation

The header should be visually quiet.

### Desktop

```text
┌────────────────────────────────────────────────────────────┐
│ gitgitwi                         Blog   Wiki   About   ··· │
└────────────────────────────────────────────────────────────┘
```

- Keep the header compact.
- Logo/wordmark on the left.
- Primary navigation on the right.
- Avoid large application-style navigation bars.
- A thin border or whitespace may separate the header from content.

### Mobile

Use a compact header with:

- Wordmark/logo
- Menu trigger
- Optional theme/search action

Navigation should never consume excessive vertical space.

---

## 9. Homepage

The homepage is the strongest expression of the site's identity.

### Hero

Recommended composition:

```text
small technical label

A handwritten,
personal statement.

Short explanation of
what this blog is about.

[ Browse posts ]   [ Wiki ]

                  generative / shader visual
```

The handwritten headline should be the visual focal point.

A subtle shader, generative object, or abstract green form can occupy the opposite side on desktop and move below the text on mobile.

### Latest posts

Use editorial list/card patterns rather than a SaaS card grid.

Each post should expose:

- Date
- Title
- Short description
- Tags
- Optional reading time

Keep cards visually light.

---

## 10. Article Page

Article pages are the most important part of the system.

### Structure

```text
Header
  ↓
Article metadata
  ↓
Handwritten article title
  ↓
Description / introduction
  ↓
Hero visual or cover
  ↓
Article content
  ↓
Related / next articles
  ↓
Footer
```

### Reading experience

The article body should be optimized for long-form reading:

- Narrow measure
- Generous line-height
- Clear heading hierarchy
- Strong paragraph rhythm
- Minimal distractions
- Wide media can escape the prose column when useful

### Article title

Use the display/handwritten font selectively.

The title should feel authored, not like a documentation heading.

### Metadata

Metadata uses Geist Mono or a restrained sans-serif style.

Example:

```text
2026.09.10   ·   8 min read   ·   TYPESCRIPT
```

---

## 11. Article Components

### Paragraph

Readable, calm, and high contrast.

### Headings

Headings should create hierarchy through:

- Size
- Weight
- Vertical spacing

Avoid excessive accent color.

### Inline code

Use a subtle muted surface.

```text
background: var(--color-surface-muted)
font-family: Geist Mono
```

### Code block

Highlighter: **Prism.js** (`markdown.syntaxHighlight: 'prism'` + `@astrojs/prism`). Not Shiki.

Theme: **Vitesse Light–like**, retinted to canvas + accent — not a dark terminal, not `github-dark`.

```text
canvas #F7F5EE
  → code bg #F1EFE6 (one step quieter)
  → keyword / function #16A36A (accent)
  → ink #393a34 (Vitesse Light foreground)
```

Prism token colors (custom CSS, `src/styles/prism-vitesse-light.css`):

```css
code[class*="language-"],
pre[class*="language-"] {
  background: var(--color-code-bg);
  color: var(--color-code-ink);
  font-family: "Geist Mono", ui-monospace, monospace;
}
.token.comment,
.token.prolog { color: #a0ada0; }
.token.keyword { color: var(--color-accent-ink); }
.token.function { color: var(--color-accent); }
.token.string { color: #b56959; }
.token.number,
.token.boolean { color: #2f798a; }
.token.punctuation { color: #7A807B; }
```

Code blocks should support:

- Language label
- Copy action
- Line numbers when useful
- Highlighted lines
- Horizontal scrolling on mobile

Do not load a dark Prism theme (`prism-okaidia`, `tomorrow-night`, default `prism.css` on black).

### Blockquote

Editorial rather than heavy.

Use a subtle left accent border and generous spacing.

### Callout

Use the accent color sparingly.

Recommended variants:

- Note
- Tip
- Warning
- Important

The default note should feel like part of the article, not a dashboard alert.

### Images / Figures

Images should have:

- Captions when useful
- Clear relationship to surrounding prose
- Optional wide layout
- Lazy loading
- Appropriate alt text

### Tables

Tables may use the wide-reading width and horizontal scrolling on mobile.

---

## 12. Wiki

The wiki should feel related to the blog but more systematic.

### Visual relationship

Blog:

> Editorial + personal

Wiki:

> Structured + technical

Reuse:

- Same canvas
- Same typography
- Same green accent
- Same code styling
- Same spacing system

But allow the wiki to use more conventional documentation patterns.

### Desktop

```text
┌───────────────────────────────────────────────────────────┐
│ Header                                                    │
├──────────────┬────────────────────────────────────────────┤
│ Sidebar      │ Content                                    │
│              │                                             │
│ Getting      │ Handwritten / editorial page title         │
│ Started      │                                             │
│ TypeScript   │ Intro                                       │
│ React        │                                             │
│ Architecture│ Sections                                    │
│              │ Code                                        │
└──────────────┴────────────────────────────────────────────┘
```

The sidebar should remain visually lightweight.

### Mobile

Sidebar becomes:

- Drawer
- Collapsible navigation
- Or top-level section selector

Never let documentation navigation push the actual content too far down.

---

## 13. Design System Components

Initial component inventory:

### Foundations

- Typography
- Color
- Spacing
- Container
- Divider
- Icon

### Navigation

- Header
- Navigation
- MobileMenu
- Breadcrumb
- TableOfContents
- Sidebar

### Content

- Article
- PostCard
- PostList
- Tag
- Category
- Metadata
- Figure
- CodeBlock
- InlineCode
- Blockquote
- Callout
- Table
- Footnote

### Interaction

- Button
- Link
- IconButton
- CopyButton
- Search
- Tooltip
- Toast

### Wiki

- WikiLayout
- WikiSidebar
- WikiSearch
- WikiSection

### Visual

- ShaderBackground
- GenerativeOrb
- DecorativeGrid
- NoiseTexture

---

## 14. Motion

Motion should reinforce the technical/editorial character.

### Principles

- Subtle
- Fast
- Purposeful
- Never required for comprehension

Recommended timing:

```css
--duration-fast: 120ms;
--duration-normal: 200ms;
--duration-slow: 400ms;
```

Use motion for:

- Link hover
- Button feedback
- Navigation transitions
- Card reveal
- Copy confirmation
- Page entrance
- Shader interaction

Avoid:

- Constant bouncing
- Excessive parallax
- Long page transitions
- Animation on every element

### Reduced motion

Respect:

```css
@media (prefers-reduced-motion: reduce)
```

Disable or substantially reduce non-essential animation.

---

## 15. Three.js / WebGL

Generative visuals are allowed and encouraged as part of the site's technical identity.

### Good uses

- Homepage hero visual
- Article cover
- Ambient background
- Interactive experiment
- Visualization accompanying a technical article

### Visual direction

Prefer:

- Organic forms
- Soft mint/green light
- Grain/noise
- Fluid shader movement
- Abstract geometry
- Subtle depth

Avoid:

- Generic spinning 3D cubes
- Neon cyberpunk palettes
- Overly saturated gradients
- Full-screen effects behind readable text

### Performance rules

WebGL must be progressive enhancement.

Requirements:

- Never block article rendering.
- Provide a static fallback.
- Lazy-load heavy scenes when possible.
- Respect reduced-motion preferences.
- Avoid unnecessary GPU work on mobile.
- Ensure text remains readable if WebGL fails.

---

## 16. Responsive Behavior

### Mobile

Priority:

```text
Reading > Navigation > Content > Decoration
```

Characteristics:

- Single-column layout
- 20px horizontal padding
- Full-width code blocks with horizontal scroll
- Reduced decorative effects
- Smaller display typography
- Touch-friendly controls

### Tablet

Introduce:

- More generous horizontal padding
- Wider media
- Optional two-column sections

### Desktop

Introduce:

- Centered max-width container
- Wider visual compositions
- Article prose + optional side TOC
- Hero split layouts
- Larger decorative WebGL elements

---

## 17. Accessibility

Accessibility is part of the design system.

Requirements:

- Keyboard-accessible interactions
- Visible focus states
- Semantic HTML
- Correct heading hierarchy
- Sufficient color contrast
- Meaningful alt text
- Reduced-motion support
- Touch targets of approximately 44px where practical
- Do not communicate meaning through color alone

Decorative visuals must not contain essential information.

---

## 18. Content Density

The blog should feel spacious.

Prefer:

```text
short paragraph

       whitespace

heading

short paragraph

       whitespace

code
```

Avoid:

```text
heading
paragraph paragraph paragraph paragraph
table card card card
paragraph paragraph
```

Whitespace is a structural element.

---

## 19. Brand Expression

The site's strongest brand signals should be:

1. Warm beige canvas
2. Mint-green accent
3. Handwritten editorial typography
4. Geist Mono technical details
5. Generative/WebGL visual moments
6. Calm, generous whitespace

If a future component does not fit these principles, reconsider the component before adding more decoration.

---

## 20. Do / Don't

### Do

- Use warm neutrals.
- Keep green accents intentional.
- Give articles generous reading width.
- Mix editorial typography with technical monospace.
- Use generative visuals as identity.
- Prefer whitespace over extra UI.
- Keep the interface quiet so content can be expressive.
- Make mobile the baseline.

### Don't

- Turn the blog into a SaaS dashboard.
- Use cards for everything.
- Make every heading green.
- Use handwritten fonts everywhere.
- Put WebGL behind dense text.
- Use giant shadows.
- Overuse rounded corners.
- Sacrifice performance for visual effects.

---

## 21. Design Token Architecture

Keep tokens layered.

### Primitive

Raw values:

```text
color.green.500
color.neutral.100
space.4
radius.md
```

### Semantic

Meaningful roles:

```text
color.canvas
color.surface
color.ink
color.accent
color.border
```

### Component

Component-specific decisions:

```text
button.background
article.code.background
header.border
callout.note.background
```

Components should consume semantic tokens whenever possible rather than raw color values.

---

## 22. Astro Implementation Principles

The design system should remain framework-friendly.

Recommended structure:

```text
src/
  components/
    ui/
    layout/
    content/
      CodeBlock/     # Prism wrapper: lang, copy, optional line numbers
    wiki/
  styles/
    tokens.stylex.ts
    globals.css
    prism-vitesse-light.css
```

Astro: `markdown.syntaxHighlight: 'prism'`. Install `@astrojs/prism`. Load `prism-vitesse-light.css` from `Base.astro` (same hole as StyleX CSS — a `<link>` or import, not Vite-html injection).

Keep visual primitives independent from page-specific content.

Prefer composable components over page-level styling.

---

## 23. Future Design-System Documentation

When the visual direction stabilizes, expand this file into:

```text
01 Philosophy
02 Color
03 Typography
04 Spacing
05 Layout
06 Radius
07 Borders & Elevation
08 Motion
09 Iconography
10 Components
11 Article UX
12 Wiki UX
13 Accessibility
14 Responsive Behavior
15 Performance
16 Do / Don't
```

This document is intentionally a **design direction + implementation contract**, not a pixel-perfect specification. Exact values should evolve after the first implementation pass and real article content is rendered.

---

## 24. North Star

> **A warm, personal editorial space for technical ideas — precise enough for code, expressive enough to feel authored.**
