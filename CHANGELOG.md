# Changelog

All notable changes to AEGIS are documented in this file. Format: [Keep a Changelog](https://keepachangelog.com/en/1.1.0/). Versioning: [SemVer](https://semver.org/).

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
