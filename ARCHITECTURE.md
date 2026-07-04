# Architecture

## Purpose

Define the runtime, module boundaries, and adapter seams so features can be added or replaced without cross-cutting rewrites.

## Runtime

- **TanStack Start v1** on Vite 7, React 19, TypeScript strict.
- **Tailwind v4** via `src/styles.css` (native `@import`, no legacy config).
- **File-based routing** under `src/routes/` — flat dot-separated names.
- **TanStack Query** for server-shape data (even against seed services).
- **Deployment target:** Cloudflare Workers via TanStack Start's edge adapter.

## Module Boundaries

```text
src/
├── routes/          # thin — composition + metadata only
├── features/        # investigation, threats, evidence, assets, ...
│   └── <feature>/
│       ├── components/
│       ├── hooks/
│       ├── types.ts
│       └── index.ts        # public surface only
├── services/        # typed contracts over data (seed today, cloud later)
├── adapters/        # log-source parsers, AI providers, export formats
├── design/          # tokens, primitives, motion, iconography
├── components/      # cross-feature composites (never feature-specific)
├── lib/             # pure utilities, no React
└── seed/            # fixtures — imported ONLY by services
```

**Import rules (enforced by convention; ESLint boundary rule in Phase 20):**

- `routes/` → `features/*`, `design/*`, `components/*`.
- `features/*` → `services/*`, `design/*`, `components/*`, `lib/*`.
- `features/a` **may not** import from `features/b`.
- `services/*` → `adapters/*`, `seed/*`, `lib/*`. Never from `features/` or `routes/`.
- `components/` → `design/*`, `lib/*`. Never from `features/` or `services/`.
- `seed/` → nothing. Pure data.

## Service Layer

Every UI read goes through a service. Services return typed domain objects, never raw fixtures.

```ts
// services/investigations.ts
export interface InvestigationsService {
  list(query: InvestigationQuery): Promise<Investigation[]>;
  get(id: InvestigationId): Promise<Investigation>;
  timeline(id: InvestigationId): Promise<TimelineEvent[]>;
  evidence(id: InvestigationId): Promise<EvidenceItem[]>;
}
```

Today: backed by `seed/`. Tomorrow: backed by Lovable Cloud or a real API. UI is unaware.

## Adapter Seams

Three adapter families are contract-only in Phase 1 and implemented later:

1. **Log source adapters** (`adapters/logs/*`) — normalize raw logs into the ECS-inspired schema in `DATA_PIPELINE.md`.
2. **AI providers** (`adapters/ai/*`) — implement `ModelProvider` from `AI_ARCHITECTURE.md`. OpenAI, Anthropic, Gemini, Ollama, Lovable AI Gateway.
3. **Report exporters** (`adapters/reports/*`) — Markdown, PDF, PPTX, JSON evidence bundle.

## State Model

- **Server-shape state** → TanStack Query, keyed by the service call.
- **Route state** → TanStack Router search params (filter, view, selection).
- **Ephemeral UI state** → local `useState` / `useReducer`.
- **Cross-feature state** → explicit context providers scoped to the smallest subtree. No global store in v1.

## Routing Strategy

- `/` — Mission Control
- `/investigations`, `/investigations/$id`, `/investigations/$id/timeline`, `/.../evidence`, `/.../graph`, `/.../report`
- `/threats/timeline`
- `/evidence`
- `/graph` — cross-investigation attack graph
- `/assets`, `/assets/$id`
- `/playbooks`, `/playbooks/$id`
- `/knowledge`, `/knowledge/$slug`
- `/analyst` — AI Analyst chat surface (investigation-aware when opened from one)
- `/reports`, `/reports/$id`
- `/settings/*`

Each route owns its own `head()`, loading state, error state, and empty state.

## Rendering

- SSR by default via TanStack Start.
- Interactive-heavy surfaces (Attack Graph, Timeline) mark themselves client-only.
- No `useEffect + fetch` for initial data — use `ensureQueryData` in loaders + `useSuspenseQuery` in components.

## Contracts

- No component imports a fixture directly.
- No component imports a vendor AI SDK.
- No feature imports another feature.
- Every route has a designed empty, loading, and error state.

## Open Questions

- WebSocket / streaming for live investigation updates — Phase 14 for AI streaming; live ingestion deferred.
- Multi-workspace routing prefix (`/w/$workspaceId/...`) — decided at Phase 19.
