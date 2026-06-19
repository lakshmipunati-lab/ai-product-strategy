# Golden Dataset & Reliability Contract

## Golden Dataset Spec

| # | Input | Expected Output | Edge Case? | Judge Type |
|---|-------|----------------|-----------|-----------|
| 1 | Feature spec: Automated Tax-Loss Harvesting trigger with wash-sale window and advisor override | Test plan with minimum 4 categories, at least 1 compliance check referencing wash-sale rule, P0 happy path case, audit trail test case | N | rule |
| 2 | Feature spec: Portfolio rebalancing on drift threshold breach with ESG screen constraints | Test plan includes ESG screen validation case, drift threshold boundary edge case, and regression case against existing rebalance scheduler | N | rule |
| 3 | Empty spec input (blank text field) | System returns validation error — no test plan generated, user prompted to enter spec content | Y | rule |
| 4 | Spec with no compliance keywords — simple UI label change | Test plan generated with happy path and regression only — no compliance checks incorrectly injected | Y | LLM |
| 5 | Spec with conflicting rules — wash-sale window set to 20 days contradicting standard 30-day requirement | System flags conflict in compliance check section, generates test case specifically for the conflicting rule, does not silently accept the 20-day input | Y | LLM |

**Adversarial rows included:** 3 (rows 3, 4, and 5)

**Coverage gaps identified by partner:**
- No test for concurrent spec submissions from multiple PMs
  hitting the same release — race condition in test plan generation
- No test for extremely long specs (5000+ words) — latency
  and truncation behavior undefined
- No test for specs written in non-standard format
  (bullet points vs. prose vs. table) — output consistency unverified

---

## Confidence UX Design

**Approach:** Tiered confidence with human-in-loop trigger for
compliance-flagged output. Users see confidence level on every
generated test plan. Compliance checks always trigger human
review regardless of confidence score.

**High confidence (>90%):**
Test plan displays immediately with green confidence indicator.
Export buttons active. No review gate. Applies when spec contains
clear, standard DI feature language and maps cleanly to known
test patterns from historical releases.

**Medium confidence (70-90%):**
Test plan displays with amber confidence indicator and inline
note: "Some test cases may need review — spec language was
ambiguous in these areas." Specific low-confidence cases are
flagged with a yellow border. Export still available but user
is prompted to review flagged cases before sending to QA.

**Low confidence (<70%):**
Test plan displays with red confidence indicator and hard
gate: "This spec produced low-confidence output. Please
review all cases before exporting to QA." Export requires
explicit checkbox confirmation. PM is encouraged to refine
the spec and regenerate.

**User control surface:**
- Confidence badge on every generated test plan (green/amber/red)
- Per-case confidence flag on individual test cases below 70%
- "Regenerate with clarification" button on low-confidence output
- Manual override available for PMs with senior role designation
- All compliance check cases require explicit human sign-off
  regardless of confidence score — non-negotiable at BlackRock

---

## Reliability Contract

| Metric | Target | Measurement | Alert Threshold |
|--------|--------|-------------|-----------------|
| **Accuracy** | >90% of generated test cases rated useful by QA without edit | Thumbs up/down rating captured per test case per release cycle | <80% useful rating over 5 consecutive releases |
| **Hallucination rate** | <5% of cases contain factually incorrect compliance requirements | LLM judge scores compliance check cases against BlackRock DI rulebook monthly | >5% hallucination rate on any single compliance category |
| **Latency (p95)** | <8 seconds for standard spec-to-test-plan generation | API response time logged per generation, p95 tracked weekly | >10 seconds p95 triggers cascading routing review |
| **Drift velocity** | <2% accuracy degradation per month without retraining | Monthly golden dataset eval run against fixed test suite | >2% month-over-month drop triggers retraining review |

---

## HITL Architecture

**Trigger 1 — Compliance keyword detected:**
Any spec containing wash-sale, audit, regulatory, override,
ESG, or restricted ticker language automatically routes
generated compliance check cases to a senior PM or
compliance reviewer before QA execution. No bypass.

**Trigger 2 — Low confidence output (<70%):**
Full test plan flagged for PM review before export.
PM must confirm each case or regenerate. QA cannot
receive the plan until PM sign-off is recorded.

**Trigger 3 — Novel spec pattern:**
If spec language does not match any pattern in the
golden dataset within 70% similarity, system flags
as novel input and routes to human review before
generating. Prevents hallucination on unknown feature types.

**Escalation path:**
1. ReleaseIQ flags the case automatically
2. Assigned PM receives in-app notification
3. PM reviews and either approves, edits, or rejects
4. If PM rejects, spec is logged to the golden dataset
   as an adversarial example for next retraining cycle
5. Compliance team receives weekly digest of all
   human-reviewed cases for audit trail purposes

**Audit trail:**
Every human intervention is logged with timestamp,
reviewer ID, action taken, and final approved output.
This log is the compliance artifact for SEC/FINRA
audit purposes — non-negotiable at BlackRock.

---

## Red-Team Findings

**Failure mode identified by partner:**
Spec poisoning — a PM accidentally pastes internal
portfolio data (account numbers, client names, position
sizes) into the spec input field. ReleaseIQ currently
has no PII detection layer. The spec gets sent to an
external model API with sensitive client data embedded.

**Why this was missed:**
The prototype was built to optimize for test plan quality,
not input sanitization. PII in spec inputs was not
considered an attack surface because the assumption was
that PMs would only paste feature descriptions.

**Why this matters at BlackRock:**
A single PII leak to an external model API violates
BlackRock's data handling policies and potentially
SEC Regulation S-P. This is not a theoretical risk —
PMs regularly work with live portfolio data in adjacent
windows and copy-paste errors happen.

**Fix:**
Add a PII detection layer at the spec input stage
before any content is sent to the model API. Flag
and block submissions containing patterns matching
account numbers, SSNs, dollar amounts above threshold,
or known client identifier formats. Log all flagged
submissions for security review. This is a one-sprint
fix that is non-negotiable before any broader rollout.
