# Product Identity

## Purpose

Fix the product's name, voice, and positioning so that every string of copy and every pixel of chrome pulls in the same direction.

## Name

**AEGIS** — the shield of Athena. Set in the editorial serif, always in small caps at display sizes, never all-caps in body text.

Wordmark rules:
- Never inside a colored pill.
- Never accompanied by a generic shield icon.
- The mark itself is the logo. Restraint is the brand.

## Tagline

> *Investigations, not alerts.*

Used on the app shell footer and reports. Never on marketing chrome inside the product.

## Voice

- **Precise.** Analysts read fast. Every word earns its place.
- **Sober.** No exclamation points. No emoji. No "🎉".
- **Sourced.** Every AI-authored sentence names its evidence.
- **Human.** The tool speaks *to* an analyst, not *at* a user.

**Bad:** "🚨 Critical alert detected! We found suspicious activity on 3 servers."
**Good:** "Three hosts show credential-spray patterns against `sso.prod` between 02:14 and 02:41 UTC. Open evidence."

## Tone by Surface

| Surface              | Tone                                                     |
| -------------------- | -------------------------------------------------------- |
| Mission Control      | Situational, calm, quiet urgency                         |
| Investigation        | Forensic, precise, present-tense                         |
| AI Analyst           | Deferential, sourced, offers next moves                  |
| Reports              | Executive, past-tense, narrative                         |
| Empty / error states | Direct, no apology theater, one clear next action        |

## Positioning

|                | SIEM (Splunk)          | SOAR (Tines)      | XDR (CrowdStrike)  | **AEGIS**                          |
| -------------- | ---------------------- | ----------------- | ------------------ | ---------------------------------- |
| Primary object | Query                  | Playbook          | Detection          | **Investigation**                  |
| Primary user   | Data engineer          | Automation eng.   | Analyst            | **Analyst + IR lead + CISO**       |
| AI role        | Assistant on the side  | Rule authoring    | Detection scoring  | **Co-analyst across the workflow** |
| Output         | Dashboard              | Executed action   | Alert queue        | **Narrative + evidence chain**     |

AEGIS competes on **investigation velocity and narrative quality**, not on ingestion volume.

## Brand Principles

1. **Craft over chrome.** No decoration that does not carry information.
2. **Density with air.** Analysts want data on screen; the layout must breathe anyway.
3. **Evidence or silence.** If a claim cannot be sourced, it is not shown.
4. **Every screen has a personality.** Mission Control feels different from Reports feels different from the Attack Graph. Consistent tokens, distinct compositions.

## Contracts

- No emoji in product copy, ever.
- No stock security iconography (shields, padlocks, hooded figures).
- The wordmark is the only logo treatment.
- Marketing language ("Powered by AI", "Revolutionary") is forbidden inside the app.

## Open Questions

- Voice for future mobile push notifications — deferred to Phase 17.
