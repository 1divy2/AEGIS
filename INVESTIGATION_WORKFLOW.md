# Investigation Workflow

## Purpose

Describe the canonical analyst journey through AEGIS. Every surface must serve at least one stage of this workflow; if it does not, it does not ship.

## The Journey

```text
Intake  →  Triage  →  Pivot  →  Correlate  →  Evidence  →  Narrative  →  Report  →  Sign-off
```

Each stage has an intent, a primary surface, and the pivots into the next.

### 1. Intake

- **Intent:** An investigation exists. It may have been created from an alert, a manual observation, or an upload of logs.
- **Primary surface:** Mission Control (new investigations lane) → Investigation Workspace on entry.
- **Signals:** Freshness, source, initial severity, entities touched.
- **Pivot out:** Open workspace.

### 2. Triage

- **Intent:** Establish scope in the first 90 seconds. What, who, where, when, how critical.
- **Primary surface:** Investigation Workspace → Overview tab.
- **Analyst asks:** Is this real? Is it contained? What is the blast radius?
- **AI role:** Proposes an initial hypothesis with citations. Never asserts a verdict.
- **Pivot out:** Timeline (when), Graph (where/what), Evidence (proof).

### 3. Pivot

- **Intent:** From any entity — user, host, IP, hash, token — reach every related event in one motion.
- **Primary surface:** Entity dossiers (accessible from every surface via the `EntityLink` composite).
- **Interaction:** `⌘⇧P` opens the pivot palette from any selected entity.
- **AI role:** Suggests the next three pivots given the current context.

### 4. Correlate

- **Intent:** Establish relationships between entities and events across time.
- **Primary surface:** Attack Graph + Threat Timeline, side-by-side.
- **Analyst asks:** Does this chain? What is the sequence? Where does it lead?
- **AI role:** Clusters related events; proposes causal ordering.

### 5. Evidence

- **Intent:** Freeze the facts. Every claim in the narrative points to an evidence item with chain-of-custody.
- **Primary surface:** Evidence Explorer + inline Citation composites.
- **Rule:** Nothing enters the narrative that is not sourced.

### 6. Narrative

- **Intent:** Write the story of the incident, present-tense, precise.
- **Primary surface:** Investigation Workspace → Report tab (draft mode).
- **AI role:** Drafts sections from evidence; the analyst edits.
- **Rule:** Every AI-drafted paragraph shows its source list until the analyst confirms.

### 7. Report

- **Intent:** Turn the narrative into an executive-ready document.
- **Primary surface:** Reports.
- **Deliverables:** Executive summary, incident narrative, MITRE mapping, evidence appendix, remediation.
- **Exports:** Markdown, PDF, JSON evidence bundle.

### 8. Sign-off

- **Intent:** Close the investigation with a defensible verdict and owner.
- **Primary surface:** Reports → sign-off panel.
- **Model:** Verdict (Confirmed / Contained / False Positive / Ongoing), owner, sign-off timestamp. Immutable once signed.

## Cross-Cutting Behaviors

- **Every entity is a link.** Users, hosts, IPs, hashes, cloud resources, services — all render as `EntityLink` and open a dossier on activation.
- **Every timestamp is a pivot.** Clicking a timestamp opens the Threat Timeline scoped to ±5 minutes.
- **Every MITRE technique is a chip.** `MitreBadge` links to the technique dossier.
- **The AI Analyst rail is always present** in the Workspace and preserves per-investigation history.

## UX Non-Negotiables

- Context is never lost. Navigating between Workspace tabs preserves selection, scroll, and AI rail state.
- Pivots never open a modal that hides the calling context. Sheets and split panes only.
- Keyboard-first. Every surface has documented shortcuts registered in the central registry (Phase 19).
- Empty states name the next action ("No evidence yet — upload logs or open an existing investigation").

## Contracts

- A surface may not be added that does not serve at least one stage above.
- Any AI-authored statement in the Narrative or Report must carry a citation to an evidence item.
- Sign-off is one-way; reopening creates a new sign-off event (audit trail preserved).

## Open Questions

- Multi-analyst collaboration on a single investigation — deferred (Phase 19 groundwork, out of scope for v1).
- Real-time updates from a still-active incident — depends on live ingestion (out of scope).
