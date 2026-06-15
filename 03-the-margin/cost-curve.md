# Cost Curve & Pricing Strategy

## Packaging Decision

| | Feature | Bundle or Add-on |
|---|---|---|
| **Leader** | Spec-to-test-plan generation | Bundle — core value |
| **Filler** | Auto-generated PR summaries | Bundle — low cost, high perceived value |
| **Killer** | Agent workflow builder | Add-on — heavy inference, compliance risk, <15% usage |

**70% rule applied:** Agent builder usage estimated at <15% of users.
Confirmed add-on. Do not bundle until compliance guardrails are in
place and usage crosses 70% threshold.

---

## Cost Model

| Cost Category | Per-User/Month | Notes |
|---|---|---|
| **Inference (primary model)** | ~$8 | Claude Sonnet or GPT-4o class model. Est. 50 spec-to-test-plan generations per PM/QA per month at ~$0.15 per generation |
| **Inference (cascading/triage)** | ~$1 | Lightweight triage model (Haiku class) for keyword extraction, spec classification, and routing before hitting primary model |
| **Infrastructure** | ~$2 | Cloud hosting, API gateway, logging. Low because no persistent storage or auth layer yet |
| **Data/storage** | ~$0.50 | Test plan output storage, spec history, feedback signal capture |
| **Human-in-the-loop** | ~$3 | PM review time to validate generated test plans before QA execution. Est. 10 min per generation × internal loaded cost |
| **Total AI COGS** | ~$14.50 | Per user per month at current usage estimates |

---

## Margin Calculator Output

### Inputs
- Avg requests/user/month: 50
- Blended cost/request: $0.29
- Revenue/user/month: $25
- Non-AI COGS/user/month: $3

### Current Margin
- AI COGS/user: $14.50
- Total COGS/user: $17.50
- Gross margin: 30.0% ($7.50/user)

### Stress Test
| Scenario | AI COGS | Margin |
|----------|---------|--------|
| 3x Cost | $43.50 | -86.0% ($-21.50/user) |
| 2x Usage | $29.00 | -28.0% ($-7.00/user) |

---

## Cascading Strategy

**Triage model:** Claude Haiku or GPT-3.5-turbo — handles keyword
extraction, spec classification, and routing decisions.
Cost: ~$0.002 per call.

**Frontier model:** Claude Sonnet or GPT-4o — handles full
spec-to-test-plan generation, compliance check generation,
and edge case reasoning. Cost: ~$0.15 per generation.

**Routing rule:** If spec input is under 200 words and contains
no compliance keywords (wash-sale, audit, regulatory, override),
route to triage model only. If spec contains compliance keywords
or exceeds 200 words, escalate to frontier model automatically.

**Expected cascade ratio:** 70% triage-only / 30% frontier model.
Compliance-heavy DI specs will skew toward frontier model more
than a typical SaaS product — this ratio reflects BlackRock's
regulatory environment.

---

## Pricing Model

**Current pricing:** Internal tooling — no direct charge to teams.
Cost absorbed by platform budget. No usage tracking or chargeback
mechanism exists today.

**Proposed AI pricing:** Internal chargeback model at $25 per
user per month for teams using ReleaseIQ. Covers COGS of $14.50
with ~40% margin for maintenance, iteration, and governance overhead.

**Model:** Seat-based with usage guardrails — each licensed user
gets 100 generations per month. Heavy users (agent builder access)
move to usage-based add-on tier at $0.50 per agent workflow
generation above the base allocation.

**Rationale:** Seat-based is easiest to forecast and budget at
BlackRock's enterprise level. Usage guardrails prevent runaway
inference costs from heavy users while keeping the model
predictable for finance and procurement.

---

## Stress Test Response Plan

**3x inference cost scenario:**
Primary defense is cascading — push 90% of calls to triage
model (Haiku class at $0.002/call) and reserve frontier model
only for compliance-flagged specs. This reduces blended cost
from $0.29 to ~$0.08/request, restoring positive margin even
at 3x pricing.

Secondary defense: internal hosting of open-source model
(Llama 3) for standard test plan generation, reserving
API calls for compliance-critical output only.

**2x usage scenario:**
Enforce usage guardrails immediately. Cap standard tier at
100 generations per month. Heavy users auto-upgrade to
add-on pricing at $0.50 per generation above cap.

**Model provider raises prices 50%:**
Switch 20% of frontier model calls to open-source alternative
hosted on internal BlackRock infrastructure. Evaluate
fine-tuned smaller model on BlackRock DI corpus to reduce
dependency on external API pricing entirely.

---

## Stress Tests Summary

| Scenario | Impact on Margin | Response |
|---|---|---|
| **Inference costs 3x** | COGS rises to ~$43.50. Margin inverts to -86% | Aggressive cascade to triage model, raise seat price to $35, negotiate volume discount |
| **Heaviest segment doubles** | COGS up ~$6 per heavy user | Enforce usage caps, auto-upgrade heavy users to add-on tier |
| **Model provider raises prices 50%** | Frontier cost rises from $0.15 to $0.22. COGS rises to ~$18.50 | Shift 20% of calls to open-source alternative on internal infrastructure |

---

## Board One-Pager

### Before — Traditional SaaS
- Revenue: $0/seat × 20 seats
  *(internal cost center, no chargeback or revenue attribution today)*
- COGS: ~$15,000/month fixed
  *(human QA and PM time across release cycles — not tracked or visible)*
- Gross margin: undefined
  *(pure cost center with no unit economics)*

### After — AI-Powered
- Revenue: $25 base/seat + $0.50 × usage outcomes
  *(seat-based chargeback with usage add-on for agent builder)*
- COGS: $17.50/user/month variable
  *(scales with usage, controllable via cascading strategy)*
- Gross margin: 30% ($7.50/user/month)

### Net Margin Shift
- Δ margin %: from undefined to +30%
- Δ gross $: +$7.50/user/month at current scale
- Δ productivity value: $300-400/user/month in recovered
  PM and QA time replaced by $17.50/user/month in AI COGS

**Narrative:** Margin % moves from an invisible cost center to a
tracked 30% gross margin product. The real win is not the margin
percentage — it is making the cost of human labor visible and
replacing it with a compounding AI system that gets cheaper
per-output as usage scales. NRR grows as each new team that
adopts ReleaseIQ adds $7.50/month in margin while their
human productivity savings compound independently.

The 3x stress test is a pricing problem, not a viability
problem. Cascading strategy reduces blended cost from $0.29
to $0.08/request under cost pressure, protecting margin
without touching the value proposition. The hedge is
already designed into the architecture.

**The number that matters to the CFO:**
$17.50/user/month AI cost vs. $300-400/user/month in
recovered productivity = 17-22x ROI at current team size.
Every 10 additional users adds $250/month in AI cost and
~$3,000/month in recovered productivity. The margin
improves with scale — not despite it.
