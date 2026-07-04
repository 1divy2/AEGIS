# AEGIS

**Autonomous Security Intelligence Platform** — a workspace for security analysts to investigate incidents from intake to executive report. Not a SIEM. Not a SOC dashboard. Not a chatbot. An operating environment for investigations.

> Status: **Phase 1 — Spec-Kit Foundation.** No application code yet. Every implementation decision that follows must trace back to one of the documents listed below.

---

## Doc Map

The spec-kit is layered. Read top-to-bottom on first pass; jump laterally after.

**Intent**
- [`PRODUCT_VISION.md`](./PRODUCT_VISION.md) — thesis, operator, anti-goals, success signals
- [`PRODUCT_IDENTITY.md`](./PRODUCT_IDENTITY.md) — name, voice, positioning, brand principles

**Structure**
- [`ARCHITECTURE.md`](./ARCHITECTURE.md) — feature-first layout, service and adapter boundaries
- [`PROJECT_STRUCTURE.md`](./PROJECT_STRUCTURE.md) — folder tree, naming, import boundaries
- [`FEATURE_MATRIX.md`](./FEATURE_MATRIX.md) — surfaces × capabilities × phase × status
- [`ROADMAP.md`](./ROADMAP.md) — the 20-phase plan

**Craft**
- [`DESIGN_SYSTEM.md`](./DESIGN_SYSTEM.md) — tokens, semantic roles, a11y
- [`VISUAL_LANGUAGE.md`](./VISUAL_LANGUAGE.md) — the *why* behind Graphite Intelligence
- [`COMPONENT_GUIDELINES.md`](./COMPONENT_GUIDELINES.md) — primitives, composites, surfaces; forbidden patterns

**Domain**
- [`INVESTIGATION_WORKFLOW.md`](./INVESTIGATION_WORKFLOW.md) — the analyst journey
- [`AI_ARCHITECTURE.md`](./AI_ARCHITECTURE.md) — provider-agnostic AI contract
- [`DATA_PIPELINE.md`](./DATA_PIPELINE.md) — log taxonomy, normalization, correlation

**Living**
- [`CHANGELOG.md`](./CHANGELOG.md)
- [`TECHNICAL_DEBT.md`](./TECHNICAL_DEBT.md)

---

## Method

Spec-Kit-inspired, adapted for a design-led product. Every doc declares **Purpose**, **Non-Goals**, **Contracts**, and **Open Questions**. Contracts are binding: downstream phases may not violate them without a `TECHNICAL_DEBT.md` entry and an accompanying `CHANGELOG.md` note.

## Committed Direction

- **Visual identity:** Graphite Intelligence — warm graphite surfaces, parchment ink, ember and crimson signal. See [`VISUAL_LANGUAGE.md`](./VISUAL_LANGUAGE.md).
- **Backend:** typed in-memory seed data behind a service layer. Lovable Cloud deferred until Phase 14+.
- **Framework:** TanStack Start (React 19, Vite 7, Tailwind v4). File-based routing under `src/routes/`.

## Do Not

- Ship generic KPI-card dashboards, stock sidebars, or template admin panels.
- Import fixtures from UI code — everything flows through `src/services/*`.
- Hardcode colors, spacing, or type — tokens only.
- Couple UI to a vendor AI SDK — everything goes through `ModelProvider`.

## Next

Phase 2 (Design System & Token Layer) + Phase 3 (App Shell). See [`ROADMAP.md`](./ROADMAP.md).
