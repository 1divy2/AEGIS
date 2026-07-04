# Feature Matrix

Single source of truth for what exists, where, and when. Update on every phase completion alongside `CHANGELOG.md`.

**Status legend:** `—` not started · `◐` in progress · `●` shipped · `⌀` intentionally out of scope

## Surfaces

| Surface                     | Route                          | Phase | Status |
| --------------------------- | ------------------------------ | ----- | ------ |
| Mission Control             | `/`                            | 5     | —      |
| Investigations Index        | `/investigations`              | 6     | —      |
| Investigation Workspace     | `/investigations/$id`          | 7     | —      |
| Threat Timeline             | `/threats/timeline`            | 8     | —      |
| Evidence Explorer           | `/evidence`                    | 9     | —      |
| Attack Graph                | `/graph`                       | 10    | —      |
| Assets                      | `/assets`, `/assets/$id`       | 11    | —      |
| Playbooks                   | `/playbooks`, `/playbooks/$id` | 12    | —      |
| Knowledge Base              | `/knowledge`, `/knowledge/$id` | 13    | —      |
| AI Analyst                  | `/analyst`                     | 14    | —      |
| Reports                     | `/reports`, `/reports/$id`     | 16    | —      |
| Settings                    | `/settings/*`                  | 19    | —      |

## Capabilities

| Capability                              | Surface(s)                          | Phase | Status |
| --------------------------------------- | ----------------------------------- | ----- | ------ |
| Design token system                     | all                                 | 2     | —      |
| App shell + primary navigation          | all                                 | 3     | —      |
| Seed data + service layer               | all                                 | 4     | —      |
| Investigation object model              | Investigations, Workspace           | 4, 7  | —      |
| Evidence chain-of-custody               | Evidence, Workspace                 | 9     | —      |
| MITRE ATT&CK mapping                    | Workspace, Timeline, Graph, Reports | 15    | —      |
| Provider-agnostic AI (`ModelProvider`)  | AI Analyst                          | 14    | —      |
| Streamed tool-call visualization        | AI Analyst                          | 14    | —      |
| Executive narrative generator           | Reports                             | 16    | —      |
| Report export (MD, PDF, JSON bundle)    | Reports                             | 16    | —      |
| Responsive parity (desktop/tablet/mob.) | all                                 | 17    | —      |
| Motion + transitions                    | all                                 | 18    | —      |
| Keyboard shortcut registry              | all                                 | 3, 19 | —      |
| Multi-workspace                         | shell                               | 19    | —      |
| a11y hardening + perf budgets           | all                                 | 20    | —      |

## Adapters

| Adapter family     | Interface location                | Impls (planned)                              | Phase | Status |
| ------------------ | --------------------------------- | -------------------------------------------- | ----- | ------ |
| Log source         | `adapters/logs/types.ts`          | Auth, Firewall, API, App, Cloud, Server      | 4     | —      |
| AI provider        | `adapters/ai/types.ts`            | Mock, Lovable Gateway, OpenAI, Anthropic, Gemini, Ollama | 14 | — |
| Report exporter    | `adapters/reports/types.ts`       | Markdown, PDF, PPTX, JSON evidence bundle    | 16    | —      |

## Explicitly Out of Scope (v1)

| Item                                     | Reason                                          |
| ---------------------------------------- | ----------------------------------------------- |
| Live log ingestion pipeline              | AEGIS is a workspace, not a SIEM (`⌀`)          |
| Production SOAR automation               | Playbooks are reference, not execution (`⌀`)    |
| Native mobile apps                       | Responsive web covers every persona (`⌀`)       |
| Billing / plans / seats                  | Not a product-market concern in v1 (`⌀`)        |
