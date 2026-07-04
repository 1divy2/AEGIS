# Visual Language — Graphite Intelligence

## Purpose

Explain *why* AEGIS looks the way it does, so future contributors extend the language without diluting it.

## The Metaphor

A **field notebook on a graphite desk under a warm lamp**.

- **Graphite** is the surface — warm, matte, absorbing light. Not black. Not blue. Not "cyber".
- **Parchment** is the ink — off-white, warm, readable across long shifts.
- **Ember** is the lamp — a single warm accent that means *this is where your attention belongs*.
- **Crimson** is the mark of severity — used only when it is earned.

This is a serious tool for serious work, without theatrics. It rejects the neon-terminal cliché and the sanitized SaaS pastel in equal measure.

## Material Rules

- Surfaces are **matte**, never glossy. No gradients longer than 6% delta. No frosted glass.
- Borders are **hairline** (1px, `--border-subtle`). They exist to define regions, not to decorate them.
- Shadows are used only when an element **floats** — popovers, dialogs, dragged items.
- Textures are permitted at very low opacity (≤3%) in hero regions only. Grain, never noise.

## Typographic Personality

- **Fraunces (display)** carries the editorial voice — investigation titles, report headers, section moments. Optical-size aware; heavier at large sizes, lighter at small.
- **Inter (body)** is the neutral workhorse — dense but generous. Variable weight.
- **JetBrains Mono (meta)** carries every hash, timestamp, IP, and identifier. Metadata is always mono; mono is only metadata.

Mixing rule: display + body + mono, never two display families, never two body families.

## Density with Air

- Dense information is fine when the surrounding rhythm is calm. The rule: **breath before density**. Top-of-screen has space; the working region is dense.
- Line length in prose surfaces (Reports, Knowledge) capped at ~72ch.
- Tables are dense (28px row height) but every third row does not stripe — the eye tracks columns.

## Signal Discipline

The palette has exactly one attention color per role:

- **Ember** = *this is where you are working*. Active investigation, primary CTA, current selection.
- **Crimson** = *this is critical*. Not for hover, not for CTAs, not for links.
- **Brass** = *warning*. Not for informational.
- **Sage** = *resolved*. Used quietly; never as a "success!" celebration.
- **Info blue** = *neutral metadata* (freshness, source). Cool foil to warm surfaces.

Never introduce a sixth accent. If a new state needs a color, it needs a *reason*, then a token, then a review.

## Composition Principles

1. **Every screen has a personality.** Mission Control breathes. Investigation cockpit is dense. Report reads as prose. Same tokens, different rhythms.
2. **Corners over containers.** Regions defined by hairlines and background steps, not by nested cards.
3. **The gutter is the grid.** Consistent 24px outer gutter, 16px inner. No hero uses full-bleed unless it earns it.
4. **Metadata sits on the shoulder.** Timestamps, IDs, hashes — mono, muted, right-shoulder of the content they describe. Never in-line with prose.
5. **Empty states are designed.** Never "No results." — always a sentence, an illustration or restrained glyph, and one clear next action.

## Screenshot-Worthy Moments

Every phase must produce at least one screen that would stand alone as a portfolio piece:

- Phase 5: Mission Control cold-open at shift start.
- Phase 7: Investigation cockpit with the AI Analyst rail mid-response.
- Phase 8: Threat Timeline zoomed to a burst of authentication failures.
- Phase 10: Attack Graph with the path from initial access to impact highlighted.
- Phase 16: A finished report as it renders in the editor.

If a phase cannot produce a screenshot moment, the phase is not done.

## Forbidden Aesthetics

- Neon cyan on black ("cyber" template).
- Purple/indigo gradients on white ("AI slop" template).
- Glassmorphism ("2021 Dribbble" template).
- Cartoon security clip art (shields, padlocks, hoodie figures).
- Emoji anywhere in product chrome.
- Metric cards with a giant number, a percentage arrow, and a sparkline. If we ship a number, it earns its shape.

## Contracts

- New surfaces must state which material metaphor they extend.
- New color introductions require a semantic role, not just a hex.
- No component may exist that only makes sense on one page — either promote it or delete it.
