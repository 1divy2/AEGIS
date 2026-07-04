# Changelog

All notable changes to AEGIS are documented in this file. Format: [Keep a Changelog](https://keepachangelog.com/en/1.1.0/). Versioning: [SemVer](https://semver.org/).

## [0.6.0] — 2026-07-04 — Phase 6: Investigations Index Completed

### Changed
- `src/routes/investigations/index.tsx`: Implemented basic list display, filtering, sorting, and pagination for investigations.
- `src/routes/index.tsx`: Integrated `AccernatiyThreatPulse` component into the "Live Threat Pulse" panel.

### Added
- `src/components/premium/ReactBitsInvestigationTable.tsx`: Placeholder for a premium data table component.
- `src/components/premium/AccernatiyThreatPulse.tsx`: Placeholder for a premium real-time feed visualization component.
- `src/components/premium/` directory.

---

## [0.5.0] — 2026-07-04 — Phase 5: Mission Control Surface Completed

### Changed
- `src/routes/index.tsx`: Replaced placeholder with a grid-based Mission Control Surface layout. Integrated `useSuspenseQuery` to fetch and display data from `investigationsService` and `alertsService`. Added loader for initial data pre-fetching.
- Applied semantic design system tokens for all styling.

### Added
- Explicit `TODO` comment in `src/routes/index.tsx` for premium real-time feed component integration (evaluating React Bits, Accernatiy, or custom).

---

## [0.4.0] — 2026-07-04 — Phase 4: Seed Data Fabric & Service Layer Completed

### Added
- `src/types/index.ts`: Comprehensive TypeScript interfaces for core domain objects.
- `src/seed/index.ts`: Realistic, interconnected mock data for all domain objects.
- `src/services/types.ts`: Service interfaces for typed contracts.
- `src/services/index.ts`: Implementations of all services using seed data.
- `src/lib/queryKeys.ts`: Structured TanStack Query keys for service operations.

---

## [0.3.0] — 2026-07-04 — Phase 3: App Shell & Navigation Completed

### Changed
- `src/routes/__root.tsx`: Redesigned `RootComponent` to implement the app shell layout with `Sidebar`, `Header`, `main` (`<Outlet />`), and `Footer`. Updated `NotFoundComponent` and `ErrorComponent` to use design system tokens. Populated `Sidebar` with primary navigation links. Implemented `Cmd+K` keyboard model skeleton. Implemented `Header` global command bar shell structure. Implemented `Footer` with tagline and copyright.
- `src/styles.css`: Added CSS variables for `sidebar-width`, `header-height`, and `footer-height`.

---

## [0.2.0] — 2026-07-04 — Phase 2: Design System & Token Layer Completed

### Changed
- `src/styles.css`: Removed `tw-animate-css` import, removed generic color definitions, integrated AEGIS raw palette and semantic color tokens (oklch), radii, font families, type scale CSS variables. Updated `@layer base` for semantic colors.
- `vite.config.ts`: Rewritten to remove `@lovable.dev/vite-tanstack-config` and explicitly include `react`, `tailwindcss`, `tsConfigPaths` plugins.
- `package.json`: Updated with `@fontsource` dependencies.
- `bun.lock`: Updated to reflect new font dependencies.

### Removed
- `components.json`.

### Added
- `src/design/colors.ts`: Raw and semantic color token definitions.
- `src/design/typography.ts`: Type scale definitions.
- `src/design/motion.ts`: Motion curve and duration definitions.
- `src/design/index.ts`: Unified export for design tokens.
- `tailwind.config.ts`: Custom Tailwind configuration integrating all design tokens.
- `postcss.config.js`: PostCSS configuration for Tailwind.
- `@fontsource/fraunces`, `@fontsource-variable/inter`, `@fontsource-variable/jetbrains-mono` dependencies.

---

## [0.1.0] — 2026-07-04 — Repository Audit & Lovable DNA Removed

### Changed
- Updated project `name` in `package.json` to "aegis".
- Updated `src/routes/__root.tsx` metadata to reflect AEGIS branding.
- Updated `src/lib/error-page.ts` content and metadata to reflect AEGIS branding.
- Enabled stricter TypeScript checks (`noUnusedLocals`, `noUnusedParameters`) in `tsconfig.json`.

### Removed
- `.lovable/` directory and contents.
- `src/lib/lovable-error-reporting.ts`.
- `src/.DS_Store` and `public/favicon.ico`.
- Generic placeholder content from `src/routes/index.tsx`.
- `src/routes/README.md`.
- `src/components/ui/` directory, containing generic UI components.
- Unused dependencies from `package.json` including all `@radix-ui/*` packages, `cmdk`, `embla-carousel-react`, `input-otp`, `react-day-picker`, `react-resizable-panels`, `recharts`, `sonner`, `tw-animate-css`, and `vaul`.
- `@lovable.dev/vite-tanstack-config` and `nitro` dev dependencies.

### Added
- New architectural directories: `src/features/`, `src/services/`, `src/adapters/`, `src/design/`, `src/seed/`.
- `TODO` comments for future UI/UX redesigns and feature implementation in relevant files.

---

## [0.0.0] — 2026-07-04 — Spec-Kit Established

### Added
- `README.md` — doc map and orientation.
- `PRODUCT_VISION.md` — thesis, operators, anti-goals.
- `PRODUCT_IDENTITY.md` — name, voice, positioning.
- `ARCHITECTURE.md` — module boundaries, service and adapter seams.
- `PROJECT_STRUCTURE.md` — target folder tree and import rules.
- `FEATURE_MATRIX.md` — surfaces × capabilities × phase.
- `ROADMAP.md` — 20-phase plan.
- `DESIGN_SYSTEM.md` — Graphite Intelligence tokens.
- `VISUAL_LANGUAGE.md` — material metaphors and composition principles.
- `COMPONENT_GUIDELINES.md` — tiers, naming, forbidden patterns.
- `INVESTIGATION_WORKFLOW.md` — the canonical analyst journey.
- `AI_ARCHITECTURE.md` — provider-agnostic `ModelProvider` contract.
- `DATA_PIPELINE.md` — normalization, enrichment, correlation.
- `TECHNICAL_DEBT.md` — living ledger, seeded with known deferrals.

### Committed Direction
- Visual: **Graphite Intelligence**.
- Backend: typed in-memory seed data behind a service layer.
- Framework: TanStack Start on React 19, Vite 7, Tailwind v4.

### Not Changed
- No source code under `src/` was modified in this release.
