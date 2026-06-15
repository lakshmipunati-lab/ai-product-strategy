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
| **Inference (cascading/triage)** | ~$1 | Lightweight triage model (GPT-3.5 or Haiku class) for keyword extraction, spec classification, and routing before hitting the primary model |
| **Infrastructure** | ~$2 | Vercel/cloud hosting, API gateway, logging. Low because no persistent storage or auth layer yet |
| **Data/storage** | ~$0.50 | Test plan output storage, spec history, feedback signal capture (thumbs up/down ratings). Minimal at current scale |
| **Human-in-the-loop** | ~$3 | PM review time to validate generated test plans before QA execution. Estimated at 10 min per generation × internal loaded cost |
| **Total AI COGS** | ~$14.50 | Per user per month at current usage estimates |

---

## Cascading Strategy

**Triage model:** Claude Haiku or GPT-3.5-turbo — handles keyword
extraction, spec classification, and routing decisions. Cost:
~$0.002 per call.

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

## Stress Tests

| Scenario | Impact on Margin | Response |
|---|---|---|
| **Inference costs 3x** | COGS rises from $14.50 to ~$28. Margin inverts at $25 seat price — loss of ~$3 per user per month | Activate cascading strategy aggressively — push 85% of calls to triage model. Raise seat price to $35. Negotiate volume discount with model provider. |
| **Heaviest segment doubles** | Agent builder users consuming 2x inference push COGS up ~$6 per heavy user | Enforce usage guardrails immediately. Cap agent builder at 20 generations per month on base tier. Heavy users auto-upgrade to add-on pricing. |
| **Model provider raises prices 50%** | Frontier model cost per generation rises from $0.15 to $0.22. Total COGS rises to ~$18.50 | Switch 20% of frontier model calls to open-source alternative (Llama 3 or Mistral hosted on internal BlackRock infrastructure). Evaluate fine-tuned smaller model on BlackRock DI corpus. |

---

## Board One-Pager

**Before (traditional SaaS):**
Each release cycle costs approximately 2 weeks of QA manual
testing time + 3-5 hours of PM documentation per feature.
At BlackRock loaded labor rates, this represents ~$15,000-$20,000
per release in human time cost alone. Defect escape rate and
rework cost are not tracked but estimated at 1-2 additional
engineer days per release.

**After (AI-enabled):**
ReleaseIQ generates a full QA test plan in under 60 seconds
from a feature spec. Estimated QA manual effort reduction of
30-40% per release cycle. PM documentation time reduced by
2-3 hours per feature. At $25/user/month for 20 users, total
platform cost is $500/month — against an estimated $6,000-$8,000
per month in recovered human productivity.

**Net margin shift:**
$500/month AI tooling cost vs. $6,000-$8,000/month in recovered
productivity = 12-16x ROI at current team size. As adoption
scales to 50+ users, fixed infrastructure costs flatten while
productivity gains compound — margin improves with scale.
Every 10 additional users adds $250/month in cost and
~$3,000/month in recovered productivity.
