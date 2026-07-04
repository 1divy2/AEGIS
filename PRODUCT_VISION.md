# Product Vision

## Purpose

Define what AEGIS is, who it is for, and what it refuses to become.

## Thesis

Security analysts do not need another feed of alerts. They need a **workspace** where an investigation has a beginning, a middle, and a defensible end. AEGIS treats each incident as a first-class object with its own timeline, evidence chain, hypotheses, and narrative — not a row in a table.

The AI is not a chatbot bolted onto a dashboard. It is a **co-analyst**: it proposes pivots, correlates events, drafts timelines, and writes the executive narrative — always with citations back to raw evidence the human can inspect.

## Target Operators

1. **Tier-2 / Tier-3 SOC Analyst** — lives in AEGIS during a shift. Needs speed, pivots, keyboard fluency, zero ceremony.
2. **Incident Response Lead** — owns the investigation end-to-end. Needs narrative, evidence integrity, MITRE mapping, and something to hand to legal.
3. **CISO / Security Director** — reads the report, not the tool. Needs an executive summary that is *believable*, sourced, and defensible.

Each persona sees a different surface of the same investigation object.

## What AEGIS Is

- An **investigation workspace**, organized around incidents, not around log sources.
- An **evidence system** — every claim links back to raw records, with chain-of-custody.
- A **narrative engine** — the AI drafts the story; the analyst edits and signs.
- A **pivot machine** — from any entity (IP, user, host, hash) to every related event in one motion.

## What AEGIS Is Not (Anti-Goals)

- Not a SIEM. It does not ingest and index the world.
- Not a SOAR. It does not run production playbooks against live infrastructure.
- Not a ticketing system. It does not replace Jira or ServiceNow.
- Not a chatbot with a database attached.
- Not a generic BI dashboard for security metrics.

## Success Signals

- A Tier-2 analyst opens an investigation and reaches a defensible verdict in under 15 minutes, using only AEGIS.
- The generated executive report is shipped to leadership with edits, not rewrites.
- A screenshot of any single screen is unmistakably *this product*, not a template.
- New analysts learn the pivot model in one shift.

## Contracts

- Every surface must be legible in the context of an active investigation.
- The AI never asserts without a citation the analyst can open.
- The product ships with realistic seed data on day one; empty states are designed, not accidents.

## Open Questions

- Multi-tenant model (org / team / workspace) — deferred to Phase 19.
- Live ingestion vs uploaded batches — Phase 4 defines the seed contract; live is out of scope for v1.
- On-prem / air-gapped deployment posture — noted in `AI_ARCHITECTURE.md`, decided later.
