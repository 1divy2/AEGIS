# Roadmap — 20 Phases

Each phase is shippable on its own. No phase depends on a later phase. Phases 2–20 are executed in follow-up turns.

Every phase declares: **Objectives**, **Deliverables**, **UX Goals**, **Engineering Goals**, **Architecture Goals**.

---

## Phase 1 — Spec-Kit Foundation

*Note: An initial Repository Audit and Lovable DNA removal (pre-Phase 1) has been completed, transforming the scaffold into a compliant starting point.*

- **Objectives:** Establish the binding documentation set that governs every downstream decision.
- **Deliverables:** 15 root-level markdown documents (see `README.md`).
- **UX Goals:** N/A — but every UX contract for later phases originates here.
- **Engineering Goals:** No source code changes. Contracts written in prose are enforceable in review.
- **Architecture Goals:** Lock feature-first layout, service-layer discipline, adapter seams, provider-agnostic AI contract.

## Phase 2 — Design System & Token Layer

- **Objectives:** Encode Graphite Intelligence as tokens; no component may hardcode values thereafter.
- **Deliverables:** `src/styles.css` token block; `src/design/tokens.ts`; type scale; motion curves; elevation model; font loading via `@fontsource`.
- **UX Goals:** Every future screen feels like it belongs to the same product without looking generic.
- **Engineering Goals:** All tokens as CSS custom properties exposed through Tailwind v4 `@theme inline`. Zero magic numbers in components.
- **Architecture Goals:** Establish `design/` as the only source of visual truth. Set up ESLint rule (Phase 20) hook-point for banning raw color utilities.

## Phase 3 — App Shell & Navigation

- **Objectives:** Build the Mission Control chrome — the enclosure, not the content.
- **Deliverables:** Root layout, primary nav (Mission Control, Investigations, Threat Timeline, Evidence, Attack Graph, Assets, Playbooks, Knowledge, AI Analyst, Reports, Settings), global command bar shell, keyboard model skeleton, footer with the tagline.
- **UX Goals:** The shell must feel handcrafted — not a stock sidebar. Density with breath.
- **Engineering Goals:** Route tree stubbed; every route ships a designed empty state.
- **Architecture Goals:** Nav model driven by a typed manifest; keyboard shortcuts registered through a central registry.

## Phase 4 — Seed Data Fabric & Service Layer

- **Objectives:** Produce realistic enterprise security seed data and expose it through the service contracts.
- **Deliverables:** `seed/*` (investigations, alerts, hosts, users, IPs, cloud resources, events, MITRE mappings); `services/*` typed implementations; TanStack Query keys.
- **UX Goals:** Every future screen has believable data on first render.
- **Engineering Goals:** Fixtures are pure, deterministic, and typed. Services return domain objects, never fixture shapes.
- **Architecture Goals:** Service interfaces are the same shape that a Cloud-backed impl will satisfy later.

## Phase 5 — Mission Control Surface

- **Objectives:** The default screen — situational awareness for a shift, not a metrics dashboard.
- **Deliverables:** Active investigations lane, live threat pulse, unresolved evidence queue, on-shift roster, briefing panel.
- **UX Goals:** An analyst opening a shift knows within 10 seconds what needs attention and what is under control.
- **Engineering Goals:** Every panel is a self-contained composition; no shared "KPI card" primitive.
- **Architecture Goals:** Panels consume services independently; layout is CSS-grid template, not a component grid framework.

## Phase 6 — Investigations Index

- **Objectives:** Browse, filter, and pivot into investigations.
- **Deliverables:** Investigation list with severity, phase, owner, freshness; saved views; keyboard-driven filter model.
- **UX Goals:** Feels like a case ledger, not a data table.
- **Engineering Goals:** Filter state lives in the URL. Selection model supports bulk actions.
- **Architecture Goals:** Establish list-surface pattern reused by Evidence, Assets, Reports.

## Phase 7 — Investigation Workspace

- **Objectives:** The single-incident cockpit — the heart of AEGIS.
- **Deliverables:** Header (severity, phase, owner, MITRE badges); tabbed inner surfaces (Overview, Timeline, Evidence, Graph, Report); persistent AI Analyst rail.
- **UX Goals:** Every pivot from an entity is one keystroke. Context never lost.
- **Engineering Goals:** Investigation context provider scoped to `/investigations/$id`. Sub-surfaces are lazy-loaded.
- **Architecture Goals:** The AI Analyst rail is a portal target, not per-tab duplication.

## Phase 8 — Threat Timeline

- **Objectives:** Interactive timeline of events across the investigation (and cross-investigation view).
- **Deliverables:** Zoomable timeline, event clustering, MITRE tactic swimlanes, annotation model.
- **UX Goals:** Scroll and zoom must feel physical. Clusters expand in place.
- **Engineering Goals:** Virtualized rendering. Time math in `lib/time.ts`.
- **Architecture Goals:** Timeline consumes the normalized event schema; independent of source adapter.

## Phase 9 — Evidence Explorer

- **Objectives:** Inspect and cite raw evidence supporting an investigation.
- **Deliverables:** Evidence list, raw record inspector, hash/chain-of-custody indicators, citation copy.
- **UX Goals:** Feels like a forensic viewer, not a log tail.
- **Engineering Goals:** Diff viewer for related records; monospace metadata layer.
- **Architecture Goals:** Evidence items reference source records by immutable ID.

## Phase 10 — Attack Graph

- **Objectives:** Visualize entity relationships and attack chain progression.
- **Deliverables:** Force-directed graph with role-typed nodes (user, host, IP, service, artifact), edge semantics (auth, network, execution), MITRE-colored path highlighting.
- **UX Goals:** Selecting a node reveals its dossier without leaving the graph. Path from initial access to impact is unmistakable.
- **Engineering Goals:** Graph engine isolated behind an adapter (Cytoscape / Reaflow / custom SVG — decided in Phase 10).
- **Architecture Goals:** Graph state derives from services; view state (zoom, selection) lives in the URL.

## Phase 11 — Assets & Asset Relationship Graph

- **Objectives:** Asset inventory that supports investigation, not IT reporting.
- **Deliverables:** Asset index (hosts, identities, cloud resources, services), asset dossier, relationship view.
- **UX Goals:** From any asset, one motion to every investigation that touched it.
- **Engineering Goals:** Shared graph engine with Phase 10.
- **Architecture Goals:** Assets are entities that appear across investigations, timelines, and evidence — modeled once.

## Phase 12 — Playbooks

- **Objectives:** Codified investigation procedures — reference material, not automation.
- **Deliverables:** Playbook library, playbook viewer with step tracking, "apply to investigation" that copies steps into the workspace.
- **UX Goals:** Reads like a runbook written by a senior analyst.
- **Engineering Goals:** Playbooks authored in MDX-compatible structure; live in `seed/playbooks/*`.
- **Architecture Goals:** Playbook execution state is investigation-scoped.

## Phase 13 — Knowledge Base

- **Objectives:** Institutional memory — prior investigations, threat actor profiles, technique notes.
- **Deliverables:** Search, article viewer, cross-links to investigations and MITRE techniques.
- **UX Goals:** Feels like an internal wiki written by the team, not a marketing site.
- **Engineering Goals:** MDX rendering pipeline. Cross-link resolver.
- **Architecture Goals:** Knowledge is the RAG corpus for Phase 14 AI Analyst.

## Phase 14 — AI Analyst

- **Objectives:** Provider-agnostic co-analyst surface, streamed, with sourced responses.
- **Deliverables:** Chat surface, tool-call visualization, citation chips linking to evidence, streaming responses over seed data via a mock `ModelProvider`.
- **UX Goals:** Every AI sentence has a source. Tool calls are visible, not hidden.
- **Engineering Goals:** `ModelProvider` interface finalized. Mock provider replays scripted transcripts against seed data.
- **Architecture Goals:** Cloud AI provider swap-in requires zero UI change. RAG/LangGraph seams named, not implemented.

## Phase 15 — MITRE ATT&CK Mapping

- **Objectives:** First-class MITRE tactic/technique layer across investigations, timelines, and graphs.
- **Deliverables:** Technique registry, tactic swimlanes, technique dossier, coverage heatmap.
- **UX Goals:** MITRE mapping is contextual — never a separate report to file.
- **Engineering Goals:** Technique data in `seed/mitre/`. Registry typed and versioned.
- **Architecture Goals:** MITRE is a cross-cutting concern with a single service, not per-feature copies.

## Phase 16 — Reports & Executive Narrative Generator

- **Objectives:** Ship-worthy incident reports drafted from the investigation, editable by the analyst, signed and exported.
- **Deliverables:** Report editor, executive summary generator, evidence appendix, export to MD/PDF, sign-off model.
- **UX Goals:** Editing the AI draft feels like editing prose, not filling a form.
- **Engineering Goals:** Report state serializes deterministically; exports are pure functions of state.
- **Architecture Goals:** Report exporters are adapters.

## Phase 17 — Responsive & Density Modes

- **Objectives:** Native-feel on desktop, tablet, mobile from a single codebase; opt-in density modes.
- **Deliverables:** Breakpoint pass across every surface, mobile-first Mission Control, tablet Investigation view, density preference in Settings.
- **UX Goals:** No surface degrades to "sorry, use desktop".
- **Engineering Goals:** Layout primitives are density-aware. Breakpoints named, not literal.
- **Architecture Goals:** Density mode is a token switch, not a component branch.

## Phase 18 — Motion, Micro-interactions, Empty / Loading / Error

- **Objectives:** Interaction quality that reads as intentional, not decorative.
- **Deliverables:** Motion primitives, transitions between investigation surfaces, skeletons, empty states, error boundaries per route.
- **UX Goals:** Every state change is acknowledged; nothing pops in.
- **Engineering Goals:** Motion tokens in `design/motion.ts`. Framer Motion / GSAP evaluated in this phase.
- **Architecture Goals:** Motion is centralized; components consume named transitions.

## Phase 19 — Settings, Preferences, Theming, Keyboard Model

- **Objectives:** Configuration surface that belongs to the same product.
- **Deliverables:** Settings shell, preferences (density, notifications, timezone), keyboard shortcut registry viewer, theme controls (dark-first, alternate accents), multi-workspace scaffold.
- **UX Goals:** Settings is scannable, not a preferences dump.
- **Engineering Goals:** Prefs persisted in localStorage today, service-swappable later.
- **Architecture Goals:** Multi-workspace routing prefix decided and implemented.

## Phase 20 — Hardening

- **Objectives:** Ship-quality pass.
- **Deliverables:** a11y audit (keyboard, contrast, focus, ARIA), performance budget enforcement, ESLint boundary rules, real head metadata across every route, favicon + og assets, integration-ready adapter stubs, launch polish.
- **UX Goals:** Every screen holds up under scrutiny.
- **Engineering Goals:** Perf budgets in CI. Boundary rules block cross-feature imports.
- **Architecture Goals:** Every adapter seam has at least one real implementation or a documented stub.
