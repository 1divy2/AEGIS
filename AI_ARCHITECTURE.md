# AI Architecture

## Purpose

Define a provider-agnostic AI layer so the UI is decoupled from any specific model, framework, or vendor. Swapping OpenAI for Anthropic, or a hosted model for Ollama, must require zero UI changes.

## Principles

1. **Provider-agnostic.** The UI depends on `ModelProvider`, never on a vendor SDK.
2. **Sourced or silent.** Every AI-authored assertion carries a citation to an evidence item. No citation → no assertion.
3. **Tool calls are visible.** The analyst sees what the AI queried, not just its answer.
4. **Streaming-first.** Every response streams. No spinner-then-wall-of-text.
5. **Local-friendly.** The contract supports on-device models (Ollama) for air-gapped deployments.

## The Contract

```ts
// adapters/ai/types.ts

export interface ModelProvider {
  readonly id: string;                    // "lovable-gateway" | "openai" | "anthropic" | "gemini" | "ollama" | "mock"
  readonly capabilities: Capability[];    // ["chat", "tools", "embeddings", "vision"]

  chat(input: ChatRequest): AsyncIterable<ChatChunk>;
  embed?(input: EmbedRequest): Promise<EmbedResult>;
}

export interface ChatRequest {
  messages: Message[];
  tools?: ToolSpec[];
  system?: string;
  context?: InvestigationContext;         // scoped RAG context
  temperature?: number;
  signal?: AbortSignal;
}

export type ChatChunk =
  | { type: "token"; text: string }
  | { type: "tool_call"; id: string; name: string; args: unknown }
  | { type: "tool_result"; id: string; result: unknown }
  | { type: "citation"; evidenceId: EvidenceId; span: [number, number] }
  | { type: "done"; usage?: Usage };

export interface ToolSpec {
  name: string;
  description: string;
  input: JSONSchema;
  invoke: (args: unknown, ctx: ToolContext) => Promise<unknown>;
}
```

## Planned Providers

| Provider          | Adapter                      | Phase | Notes                                        |
| ----------------- | ---------------------------- | ----- | -------------------------------------------- |
| Mock (scripted)   | `adapters/ai/mock.ts`        | 14    | Replays deterministic transcripts vs seed    |
| Lovable Gateway   | `adapters/ai/lovable.ts`     | 14+   | Default hosted provider when Cloud enabled   |
| OpenAI            | `adapters/ai/openai.ts`      | later | Direct                                       |
| Anthropic         | `adapters/ai/anthropic.ts`   | later | Direct                                       |
| Gemini            | `adapters/ai/gemini.ts`      | later | Direct                                       |
| Ollama            | `adapters/ai/ollama.ts`      | later | Local / air-gapped                           |

Selection is a user preference (Phase 19), resolved at request time. UI does not know or care.

## RAG / Knowledge

- Corpus lives in `seed/knowledge/*` (Phase 13). Chunked at authoring time.
- Vector store abstracted behind `KnowledgeIndex` — in-memory today, pgvector or a hosted store later.
- Retrieval attached to `ChatRequest.context` as citable evidence, never inlined as opaque prose.

## Graph Orchestration

- LangChain / LangGraph patterns are respected but not required as runtime dependencies in v1.
- A minimal internal `Graph` describes multi-step reasoning (retrieve → correlate → summarize → cite). Nodes are pure functions; state is serializable.
- Substituting LangGraph for the internal implementation is a one-file swap.

## Tools

Tools the AI Analyst may call, all backed by services:

| Tool                       | Backed by                       |
| -------------------------- | ------------------------------- |
| `search_events`            | `services/events.ts`            |
| `get_entity_dossier`       | `services/entities.ts`          |
| `list_related_events`      | `services/events.ts`            |
| `get_investigation_state`  | `services/investigations.ts`    |
| `list_playbook_steps`      | `services/playbooks.ts`         |
| `lookup_mitre_technique`   | `services/mitre.ts`             |

Tools are pure over the service layer. They do **not** mutate state without an explicit `apply` step gated by the analyst.

## Guardrails

- **No autonomous actions.** The AI proposes; the analyst applies.
- **No hallucinated entities.** Entity references must resolve through `services/entities.ts` or they are rejected before render.
- **PII scrubbing on outbound context.** Hostnames and IPs pass; user emails / names are pseudonymized when sent to third-party providers unless the workspace opts in.
- **Token / cost visibility.** Every response reports usage in the debug rail.

## Streaming UX

- Token stream lands into the message body.
- Tool calls render as inline cards *before* the token stream that references them.
- Citations render as chips inline with the token they annotate; hovering reveals the evidence excerpt; activating opens the Evidence Explorer scoped to that item.

## Contracts

- No component may `import { OpenAI }` (or any vendor SDK) directly. Always through `adapters/ai/*`.
- The AI Analyst rail is the same component wherever it appears; its provider is injected.
- Tool implementations live in `services/`, never in the AI adapter.

## Open Questions

- Cost budgeting UI (per user / per investigation) — Phase 19 or later.
- Fine-tuned / distilled models packaged with the app for offline — later.
