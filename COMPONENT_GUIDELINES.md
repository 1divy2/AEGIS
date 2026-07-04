# Component Guidelines

## Purpose

Define what belongs where, and what must never be built.

## Three Tiers

### 1. Primitives — `src/design/primitives/*`

Unopinionated building blocks that consume tokens directly. Ship with variants; do not ship with product-specific behavior.

Examples: `Surface`, `Stack`, `Cluster`, `Divider`, `Kbd`, `Badge`, `Chip`, `Tag`, `Meta`, `Field`, `Button`, `IconButton`, `Tooltip`, `Popover`, `Dialog`, `Sheet`, `Tabs`, `Segmented`, `Toggle`, `Select`, `Command`, `Toast`.

Rules:
- Zero domain knowledge (no `severity`, no `investigation`).
- Prop names in the design vocabulary (`tone`, `emphasis`, `size`, `density`).
- Shadcn is a *source*, not a *default*. Fork into `design/primitives/` and re-token before use.

### 2. Composites — `src/components/*`

Cross-feature compositions used by two or more features. Own no state that a feature owns.

Examples: `SeverityChip`, `EntityLink`, `TimestampMeta`, `Citation`, `KeyboardHint`, `PageHeader`, `Toolbar`, `SplitPane`, `EmptyState`, `ErrorSurface`, `LoadingSurface`, `MitreBadge`.

Rules:
- May import primitives and `design/*`. May not import `features/*`.
- Every composite ships with an empty/loading/error variant where applicable.

### 3. Surfaces — `src/features/<feature>/components/*`

Feature-specific compositions. May know about their feature's domain types.

Examples: `InvestigationHeader`, `TimelineTrack`, `EvidenceInspector`, `AttackPathHighlight`, `MissionBriefingPanel`.

Rules:
- May import primitives, composites, `design/*`, and `services/*` (via feature hooks).
- May not import from another feature.

## Naming

- Files: `PascalCase.tsx`.
- Components: `PascalCase`.
- Hooks: `useVerbNoun`.
- Domain types: `Investigation`, `EvidenceItem` (singular; collections are `Investigation[]`).
- Boolean props: `is/has/can` prefixed (`isDense`, `hasCitations`).
- Event props: `onVerb` (`onSelect`, `onDismiss`).

## Prop Conventions

- Every interactive component accepts `size` (`sm | md | lg`) and `tone` (`neutral | active | critical | warning | resolved | info`) where meaningful.
- No `variant="primary"` — use `emphasis="primary" | "secondary" | "quiet"`.
- No boolean floods — group into `state` when three or more toggle together.
- Density controlled at the layout level, not per component.

## Forbidden Patterns

- **Generic KPI card grid.** If a screen has 4 identical cards with a number and a delta, redesign it.
- **Stock left sidebar with icons and labels.** The navigation is handcrafted.
- **Full-width data tables with no editorial framing.** Tables live inside a designed context.
- **Modal-for-everything.** Prefer sheets, split panes, inline editors.
- **Toast for critical errors.** Errors that matter get a surface.
- **Illustration packs (unDraw, Storyset).** Empty states use restrained typographic + glyph compositions.

## Third-Party Libraries

- **shadcn/ui** — source for primitive shapes; must be re-tokened.
- **Framer Motion / Motion** — permitted from Phase 18 for motion primitives.
- **Cytoscape / Reaflow / d3-force** — evaluated at Phase 10 for graph rendering.
- **MDX** — Phase 12 (Playbooks) and Phase 13 (Knowledge).
- **React Bits / Aceternity / Magic UI** — permitted only when a component clears the "not generic" bar.

## Contracts

- Every primitive has a `design/primitives/README.md` entry with visual example (added in Phase 2).
- Every composite has an accompanying story or usage example (added in Phase 18).
- Adding a component requires: name, tier, tokens consumed, and the surface it debuts on.

## Open Questions

- Whether to build a lightweight in-repo story mechanism vs Ladle vs Storybook — decided Phase 18.
