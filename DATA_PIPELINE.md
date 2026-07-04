# Data Pipeline

## Purpose

Define how raw log records become normalized, enriched, correlated evidence — even when the source is seed data.

## Log Source Taxonomy

| Source class      | Examples                                    | Adapter                       |
| ----------------- | ------------------------------------------- | ----------------------------- |
| Authentication    | Okta, Azure AD, Google Workspace, SSO       | `adapters/logs/auth.ts`       |
| Server            | Linux auth/syslog, Windows Event Log        | `adapters/logs/server.ts`     |
| Firewall / Network| pfSense, Palo Alto, Cisco ASA, VPC flow     | `adapters/logs/network.ts`    |
| API gateway       | Kong, Cloudflare, AWS API Gateway           | `adapters/logs/api.ts`        |
| Application       | App-level structured logs                   | `adapters/logs/app.ts`        |
| Cloud control     | AWS CloudTrail, GCP Audit, Azure Activity   | `adapters/logs/cloud.ts`      |

Each adapter is a pure function: `raw → NormalizedEvent[]`. Adapters do not enrich, correlate, or persist.

## Normalized Event Schema (ECS-inspired)

```ts
export interface NormalizedEvent {
  id: EventId;                        // stable hash of source + record
  timestamp: string;                  // ISO 8601 UTC
  source: {
    class: SourceClass;
    vendor: string;
    file?: string;
    line?: number;
  };
  action: string;                     // "auth.login", "network.connect", "cloud.iam.assume"
  outcome: "success" | "failure" | "unknown";
  severity: Severity;                 // pre-enrichment estimate
  actor?: EntityRef;                  // who did it
  target?: EntityRef;                 // what was acted on
  entities: EntityRef[];              // all entities touched by this event
  network?: NetworkFacts;
  http?: HttpFacts;
  cloud?: CloudFacts;
  raw: unknown;                       // original record, kept for evidence
  hash: string;                       // sha256 of raw, chain-of-custody anchor
}

export type EntityRef =
  | { kind: "user"; id: string; label?: string }
  | { kind: "host"; id: string; label?: string }
  | { kind: "ip"; id: string; label?: string }
  | { kind: "service"; id: string; label?: string }
  | { kind: "cloud_resource"; id: string; label?: string; provider: "aws" | "gcp" | "azure" }
  | { kind: "artifact"; id: string; label?: string; artifactType: "file" | "hash" | "token" | "key" };
```

## Pipeline Stages

```text
Ingest → Normalize → Enrich → Correlate → Detect → Investigate
```

1. **Ingest.** Batch upload today; live ingest deferred. Files land in `services/ingest.ts`.
2. **Normalize.** Adapter selected by source hint. Produces `NormalizedEvent[]`.
3. **Enrich.** Attaches entity dossiers, geoIP, ASN, MITRE technique candidates, threat intel matches (Phase 15).
4. **Correlate.** Groups events by shared entities, time proximity, causal signatures. Produces `EventCluster[]`.
5. **Detect.** Rule engine + model scoring propose `Detection[]`. Detections become or attach to `Investigation`s.
6. **Investigate.** Analyst-driven workflow (see `INVESTIGATION_WORKFLOW.md`).

Stages are pure between one another. Each stage's output is cacheable and inspectable.

## Correlation Model

- **Entity graph** — nodes are entities, edges are events referencing multiple entities.
- **Temporal windows** — sliding windows (5m, 30m, 6h, 24h) for burst detection.
- **Signature clusters** — pattern templates (credential-spray, impossible-travel, privilege-escalation-chain) applied to windows.
- **Confidence scoring** — a correlation is a hypothesis; confidence is exposed to the analyst, not hidden.

## MITRE ATT&CK Mapping

- Technique candidates are proposed at Enrich; confirmed at Correlate.
- Techniques attach to events, clusters, and investigations.
- The technique registry (`seed/mitre/`) is versioned by ATT&CK release.
- Coverage is a first-class report (Phase 15).

## Chain of Custody

- Every `NormalizedEvent.raw` is hashed at ingest time; the hash is immutable.
- Evidence items reference events by `EventId`; the raw record is retrievable and verifiable.
- Exported reports include a JSON evidence bundle with hashes and adapter versions.

## Seed Data (Phase 4)

The seed corpus targets *believability*:

- ~2 500 events across 8 investigations, 40 hosts, 120 identities, 30 cloud resources.
- Real-looking hostnames (`sso.prod.acme`, `db-01.eu-west-1.prod`).
- Real-looking IPs (mix of RFC1918 and public, with plausible ASN/geo).
- Timestamps clustered around realistic incident bursts, not evenly spread.
- Two "signature" incidents seeded to show off the workflow: credential-spray → lateral movement → cloud IAM abuse, and a supply-chain artifact planted in CI.

## Contracts

- Adapters are pure. No I/O outside the input record.
- No stage may mutate an upstream artifact.
- All entity references resolve through `services/entities.ts`. Unresolved refs are dropped, not rendered.
- Every event surfaced to the UI must carry a `hash` and `source`.

## Open Questions

- Live streaming pipeline (Kafka / NATS) — out of scope for v1.
- Retention policy for raw records — deferred until live ingest is on the roadmap.
