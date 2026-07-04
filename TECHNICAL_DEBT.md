# Technical Debt

Living ledger of intentional deferrals. Every entry names the trade-off, the owner phase, and the trigger that forces it back onto the plan.

| # | Item                                          | Reason deferred                                            | Owed by       | Trigger to repay                          |
| - | --------------------------------------------- | ---------------------------------------------------------- | ------------- | ----------------------------------------- |
| 1 | No real log ingestion                         | v1 is a workspace, not a SIEM                              | post-v1       | First customer needs live sources         |
| 2 | No authentication                             | Seed-data-only build; Cloud not enabled                    | Phase 14+     | Cloud enabled                             |
| 3 | Seed data instead of persisted store          | Speed of iteration on UX and design                        | Phase 14+     | Cloud enabled                             |
| 4 | No ESLint import-boundary rules               | Convention enforced by review until Phase 20               | Phase 20      | First cross-feature import in review      |
| 5 | No perf budgets in CI                         | Nothing to measure yet                                     | Phase 20      | First surface ships                       |
| 6 | No a11y audit tooling                         | Manual review in each phase; formal audit at hardening     | Phase 20      | Any keyboard/contrast regression          |
| 7 | No storybook / ladle                          | Docs cover intent; visual coverage lands with motion pass  | Phase 18      | Design system grows past ~20 primitives   |
| 8 | Graph engine not chosen                       | Requires prototype against real graph density              | Phase 10      | Attack Graph phase begins                 |
| 9 | Motion library not chosen                     | Framer Motion vs Motion One vs GSAP; evaluated with data   | Phase 18      | Motion pass begins                        |
| 10 | Multi-workspace routing prefix                | Single-workspace v1                                        | Phase 19      | Second workspace concept enters spec      |
| 11 | Report PDF export renderer                    | Deferred until report editor ships                         | Phase 16      | First report ready to export              |
| 12 | AI provider adapters (real vendors)           | Mock provider suffices for UX build                        | post-Phase 14 | Cloud + first real provider requested     |
| 13 | Vector store implementation                   | In-memory suffices for seed corpus                         | post-Phase 14 | Corpus grows past ~1k chunks              |
| 15 | Redesign of generic error page and root error/not found components | Requires Design System (Phase 2) and Motion/Micro-interactions (Phase 18) for world-class UI/UX | Phase 18      | Phase 2 (Design System) is established. |
| 16 | Speckit CLI installation and initialization       | Technical issues with global installation/`npx` in the current environment | N/A           | Successful global installation of `speckit` CLI. |

## Rules

- No entry gets removed without a corresponding `CHANGELOG.md` note.
- New deferrals added during a phase go here **in the same commit** that introduces them.
- Any deferral without a `Trigger to repay` is not a deferral — it is scope reduction and belongs in `FEATURE_MATRIX.md` as `⌀`.
