# Project Structure

## Purpose

Fix the target folder tree, naming rules, and import boundaries. Every file added to the repo must have an obvious home.

## Target Tree

```text
aegis/
├── README.md
├── PRODUCT_VISION.md
├── PRODUCT_IDENTITY.md
├── ARCHITECTURE.md
├── ROADMAP.md
├── FEATURE_MATRIX.md
├── DESIGN_SYSTEM.md
├── VISUAL_LANGUAGE.md
├── COMPONENT_GUIDELINES.md
├── INVESTIGATION_WORKFLOW.md
├── AI_ARCHITECTURE.md
├── DATA_PIPELINE.md
├── CHANGELOG.md
├── TECHNICAL_DEBT.md
├── PROJECT_STRUCTURE.md
│
├── public/
│   └── favicon.ico
│
├── src/
│   ├── router.tsx
│   ├── server.ts
│   ├── start.ts
│   ├── styles.css                    # tokens + Tailwind v4 setup
│   │
│   ├── routes/                       # thin: composition + head() only
│   │   ├── __root.tsx
│   │   ├── index.tsx                 # Mission Control
│   │   ├── investigations.tsx        # layout
│   │   ├── investigations.index.tsx
│   │   ├── investigations.$id.tsx    # layout
│   │   ├── investigations.$id.index.tsx
│   │   ├── investigations.$id.timeline.tsx
│   │   ├── investigations.$id.evidence.tsx
│   │   ├── investigations.$id.graph.tsx
│   │   ├── investigations.$id.report.tsx
│   │   ├── threats.timeline.tsx
│   │   ├── evidence.tsx
│   │   ├── graph.tsx
│   │   ├── assets.tsx
│   │   ├── assets.$id.tsx
│   │   ├── playbooks.tsx
│   │   ├── playbooks.$id.tsx
│   │   ├── knowledge.tsx
│   │   ├── knowledge.$slug.tsx
│   │   ├── analyst.tsx
│   │   ├── reports.tsx
│   │   ├── reports.$id.tsx
│   │   └── settings.tsx (+ children)
│   │
│   ├── design/
│   │   ├── tokens.ts                 # typed mirror of CSS vars
│   │   ├── motion.ts                 # curves, durations
│   │   ├── icons/                    # custom domain glyphs
│   │   └── primitives/               # Surface, Stack, Kbd, Button, ...
│   │
│   ├── components/                   # cross-feature composites
│   │   ├── SeverityChip.tsx
│   │   ├── EntityLink.tsx
│   │   ├── TimestampMeta.tsx
│   │   ├── Citation.tsx
│   │   ├── KeyboardHint.tsx
│   │   ├── PageHeader.tsx
│   │   ├── EmptyState.tsx
│   │   ├── ErrorSurface.tsx
│   │   ├── LoadingSurface.tsx
│   │   └── MitreBadge.tsx
│   │
│   ├── features/
│   │   ├── mission-control/
│   │   ├── investigations/
│   │   ├── timeline/
│   │   ├── evidence/
│   │   ├── graph/
│   │   ├── assets/
│   │   ├── playbooks/
│   │   ├── knowledge/
│   │   ├── analyst/
│   │   ├── reports/
│   │   └── settings/
│   │
│   ├── services/                     # typed contracts over data
│   │   ├── investigations.ts
│   │   ├── events.ts
│   │   ├── entities.ts
│   │   ├── evidence.ts
│   │   ├── assets.ts
│   │   ├── playbooks.ts
│   │   ├── knowledge.ts
│   │   ├── mitre.ts
│   │   └── reports.ts
│   │
│   ├── adapters/
│   │   ├── logs/                     # source → NormalizedEvent[]
│   │   ├── ai/                       # ModelProvider impls
│   │   └── reports/                  # exporters
│   │
│   ├── seed/                         # pure fixtures; imported by services only
│   │   ├── investigations.ts
│   │   ├── events.ts
│   │   ├── entities.ts
│   │   ├── mitre/
│   │   └── knowledge/
│   │
│   ├── lib/                          # pure, no React
│   │   ├── time.ts
│   │   ├── hash.ts
│   │   ├── id.ts
│   │   └── utils.ts
│   │
│   └── hooks/                        # cross-feature hooks only
│
├── package.json
├── tsconfig.json
├── vite.config.ts
├── components.json
├── eslint.config.js
└── bunfig.toml
```

## Naming

| Kind          | Convention                                                                 |
| ------------- | -------------------------------------------------------------------------- |
| Route files   | flat, dot-separated (`investigations.$id.timeline.tsx`)                    |
| Components    | `PascalCase.tsx`                                                           |
| Hooks         | `useVerbNoun.ts`                                                           |
| Services      | `<domain>.ts` — file exports a single interface + factory                  |
| Adapters      | `<family>/<impl>.ts`                                                       |
| Seed          | `<domain>.ts` — pure exports, deterministic                                |
| Types         | co-located as `types.ts` inside a feature; shared in `services/<domain>.ts`|

## Import Boundaries

| From                | May import                                          |
| ------------------- | --------------------------------------------------- |
| `routes/`           | `features/*`, `design/*`, `components/*`, `lib/*`   |
| `features/<a>/`     | `services/*`, `design/*`, `components/*`, `lib/*`   |
| `features/<a>/`     | **may not** import `features/<b>/`                  |
| `components/`       | `design/*`, `lib/*`                                 |
| `services/`         | `adapters/*`, `seed/*`, `lib/*`                     |
| `adapters/`         | `lib/*`                                             |
| `seed/`             | nothing (pure data)                                 |
| `design/`           | `lib/*`                                             |

Enforcement:
- Phase 1–19: convention + review.
- Phase 20: ESLint boundary rules (`eslint-plugin-boundaries` or equivalent).

## File Size Norms

- Route files ≤ 60 lines. If a route grows, extract into `features/<domain>/`.
- Components ≤ 200 lines. Split by responsibility, not by arbitrary line count.
- Service files ≤ 300 lines. Split by concern once the interface exceeds ~8 methods.

## Contracts

- Every new folder documents its purpose in a one-paragraph `README.md` when it is introduced.
- No component file may sit at the root of `src/components/` if it is only used by one feature — move it into that feature.
- Fixtures live only in `seed/`. Never inline in components, services, or routes.

## Open Questions

- Whether hooks should live under each feature (`features/<x>/hooks/`) or a shared `src/hooks/` — defaulting to per-feature, with `src/hooks/` reserved for genuinely cross-feature hooks. Revisit at Phase 7.
