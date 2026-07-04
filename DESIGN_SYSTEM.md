# Design System

## Purpose

Encode the visual and interaction language as tokens. Components consume tokens; they never hold values.

## Foundations

### Color — Graphite Intelligence

Dark-first. Warm graphite base, parchment ink, restrained ember and crimson for signal.

| Token                | Hex        | Role                                                   |
| -------------------- | ---------- | ------------------------------------------------------ |
| `--graphite-950`     | `#0B0A08`  | App background, deepest surface                        |
| `--graphite-900`     | `#12110F`  | Primary surface                                        |
| `--graphite-800`     | `#1A1815`  | Raised surface (panels)                                |
| `--graphite-700`     | `#1E1C19`  | Elevated surface (cards, popovers)                     |
| `--graphite-600`     | `#2A2622`  | Hairline dividers on raised surfaces                   |
| `--graphite-500`     | `#3A342E`  | Borders, keyboard hint chrome                          |
| `--parchment-50`     | `#F5F1E8`  | Primary ink                                            |
| `--parchment-100`    | `#E8E3D8`  | Body ink                                               |
| `--parchment-300`    | `#B8B1A2`  | Secondary ink                                          |
| `--parchment-500`    | `#7C766A`  | Tertiary ink, metadata                                 |
| `--parchment-700`    | `#4A453D`  | Disabled ink                                           |
| `--ember-500`        | `#D97757`  | Signal accent — active investigation, primary CTA      |
| `--ember-300`        | `#E9A488`  | Ember hover / focus lift                               |
| `--ember-700`        | `#A85535`  | Ember pressed                                          |
| `--crimson-500`      | `#B54545`  | Alert, critical severity                               |
| `--crimson-300`      | `#D07575`  | Crimson lift                                           |
| `--sage-500`         | `#7A8F6E`  | Resolved, healthy signal (used sparingly)              |
| `--brass-500`        | `#B08D57`  | Warning, medium severity                               |
| `--ink-info`         | `#8AA9B8`  | Informational, cool metadata                           |

Semantic tokens (what components consume):

```text
--surface-canvas      = --graphite-950
--surface-panel       = --graphite-900
--surface-raised      = --graphite-800
--surface-elevated    = --graphite-700
--border-subtle       = --graphite-600
--border-strong       = --graphite-500
--ink-primary         = --parchment-50
--ink-body            = --parchment-100
--ink-muted           = --parchment-300
--ink-faint           = --parchment-500
--signal-active       = --ember-500
--signal-critical     = --crimson-500
--signal-warning      = --brass-500
--signal-resolved     = --sage-500
--signal-info         = --ink-info
```

Severity mapping (single source):

| Severity  | Token               |
| --------- | ------------------- |
| Critical  | `--crimson-500`     |
| High      | `--ember-500`       |
| Medium    | `--brass-500`       |
| Low       | `--ink-info`        |
| Resolved  | `--sage-500`        |

### Typography

Three families, no more.

| Role                | Family            | Loaded via              |
| ------------------- | ----------------- | ----------------------- |
| Display / editorial | **Fraunces**      | `@fontsource/fraunces`  |
| UI / body           | **Inter**         | `@fontsource-variable/inter` |
| Metadata / code     | **JetBrains Mono**| `@fontsource-variable/jetbrains-mono` |

Type scale (paired with line-height and tracking):

| Token       | Size    | Line | Tracking | Use                          |
| ----------- | ------- | ---- | -------- | ---------------------------- |
| `display-xl`| 56px    | 60   | -0.02em  | Report hero, splash          |
| `display-l` | 40px    | 44   | -0.02em  | Section titles               |
| `display-m` | 28px    | 34   | -0.01em  | Investigation title          |
| `title-l`   | 20px    | 28   | -0.005em | Panel titles                 |
| `title-m`   | 16px    | 24   | 0        | Card titles                  |
| `body-l`    | 15px    | 24   | 0        | Prose                        |
| `body-m`    | 14px    | 22   | 0        | Default UI                   |
| `body-s`    | 13px    | 20   | 0.005em  | Dense tables                 |
| `meta`      | 12px    | 16   | 0.02em   | Mono metadata, timestamps    |
| `micro`     | 11px    | 14   | 0.06em   | ALL-CAPS labels (sparingly)  |

Display sizes use Fraunces with `opsz` optical size and slight `-0.02em` tracking. Body uses Inter Variable. Metadata is always JetBrains Mono.

### Spacing

4-based scale: `2, 4, 6, 8, 12, 16, 20, 24, 32, 40, 56, 72, 96`. No other values. Components accept token names, never raw px.

### Radii

`--radius-xs` 2px · `--radius-sm` 4px · `--radius-md` 6px · `--radius-lg` 10px · `--radius-xl` 14px. No pill CTAs unless spec'd (avoid Bootstrap look).

### Elevation

Elevation is expressed via **surface color** first, hairline border second, shadow only when floating.

| Level     | Surface           | Border            | Shadow                                   |
| --------- | ----------------- | ----------------- | ---------------------------------------- |
| flat      | `surface-panel`   | none              | none                                     |
| raised    | `surface-raised`  | `border-subtle`   | none                                     |
| elevated  | `surface-elevated`| `border-subtle`   | `0 1px 0 rgba(0,0,0,.6), 0 12px 32px -12px rgba(0,0,0,.7)` |
| floating  | `surface-elevated`| `border-strong`   | `0 24px 60px -20px rgba(0,0,0,.75)`      |

### Motion

Curves:

| Token            | Curve                                    | Use                    |
| ---------------- | ---------------------------------------- | ---------------------- |
| `ease-precise`   | `cubic-bezier(0.2, 0.8, 0.2, 1)`         | Default UI transitions |
| `ease-forensic`  | `cubic-bezier(0.16, 1, 0.3, 1)`          | Panel/route transitions|
| `ease-instant`   | `linear`                                 | Hover state toggles    |

Durations: `instant 80ms`, `quick 140ms`, `standard 220ms`, `considered 380ms`, `deliberate 600ms`. Nothing longer without justification.

Respect `prefers-reduced-motion` — reduce to fades under 120ms.

### Iconography

- **Lucide** as the base set, weight `1.5`.
- Custom domain glyphs (attack, evidence, chain) authored in `design/icons/*.tsx` at 16/20/24 px.
- No stock security clip-art (padlocks, shields, hooded figures).

## Accessibility Contracts

- All text pairs must clear WCAG AA against their surface token — verified in Phase 20.
- Focus rings use `--ember-500` at 2px offset with 2px thickness. Never removed.
- Keyboard-first: every actionable surface reachable via Tab; shortcuts registered centrally.
- Motion respects `prefers-reduced-motion`.
- Color is never the sole signal — pair with icon or label.

## Contracts

- Components **must** reference semantic tokens (`--ink-body`), not raw palette tokens (`--parchment-100`).
- No component may set a hex value inline.
- No component may set a color utility (`text-white`, `bg-black`).
- Density adjustments are a token switch (compact / default / comfortable), not per-component props.

## Open Questions

- Alternate accent themes (deferred to Phase 19).
- Print stylesheet for exported reports (Phase 16 — likely a separate token subset).
