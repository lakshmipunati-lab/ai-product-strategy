# Compounding System Design

## Feedback Loops

| Loop | Input | Output | Compounds? | Status |
|------|-------|--------|-----------|--------|
| **Correction** | QA marks test cases pass/fail after execution | Failed cases flagged for review, patterns feed next generation cycle | Y | broken — pass/fail data exists in QA logs but is not connected to ReleaseIQ |
| **Preference** | PM thumbs up/down rating on individual test cases | System learns which case types BlackRock DI teams value most | Y | missing — no rating mechanism exists in prototype today |
| **Domain Context** | New feature specs added by PMs each release cycle | Spec pattern library grows, improving coverage on adjacent feature types | Y | active — spec input is captured but not yet structured for reuse |
| **Compliance Signal** | Human reviewer approves or rejects compliance check cases | Compliance rulebook inside ReleaseIQ stays current with regulatory changes | Y | broken — human reviews happen but findings are not logged back into the system |

**Broken loop identified by partner:**
The compliance signal loop — human reviewers are catching
errors in compliance check cases but their corrections
are not being written back into the system. Every reviewer
is fixing the same mistakes independently. The institutional
knowledge from each review evaporates after the session ends.

**Fix plan:**
Build a lightweight "correction capture" flow into the
human review step. When a reviewer edits or rejects a
compliance check case, they select a reason from a
structured dropdown (incorrect rule, wrong threshold,
missing wash-sale reference, etc.) and the correction
is logged to a compliance corrections table. This table
is reviewed monthly and used to update the golden dataset
and retrain the compliance check generation layer.
Cost: one sprint. Impact: compliance accuracy compounds
instead of resetting with every new reviewer.

---

## Context Connectivity

**Where knowledge flows today:**
Feature specs live in individual PM documents with no
shared repository. QA defect logs exist in the QA
tracking system but are not accessible to ReleaseIQ.
Compliance review findings live in email threads and
are never aggregated. Each release cycle starts from
zero institutional knowledge.

**Where it silos:**
- PM specs: individual ownership, no cross-PM visibility
- QA defect logs: accessible to QA only, not connected
  to spec or test plan generation
- Compliance findings: email-only, no structured capture
- Windsurf repo sync: available to devs who use it,
  invisible to PMs and QA

**How ReleaseIQ fixes this:**
Every spec input, generated test plan, QA rating, and
compliance correction flows through a single system.
For the first time, a PM writing a TLH spec can see
what test cases caught bugs in the last TLH release.
A QA engineer can see which spec patterns historically
produce the most edge case failures. Context that
currently lives in people's heads becomes a shared
institutional asset.

**Remaining silo risk:**
Teams that do not adopt ReleaseIQ create dark spots
in the knowledge graph. A single non-adopting team
breaks the cross-team compounding effect. This is
why governance and mandated adoption standards are
the most urgent strategic priority — not the
technology itself.

---

## Governance Policy

**Scope:**
All AI tooling used in the BlackRock Direct Indexing
platform SDLC — including but not limited to Microsoft
Copilot, Windsurf, ReleaseIQ, and any future AI tools
adopted by engineering, PM, or QA teams. Covers spec
writing, code generation, test plan generation, PR
review assistance, and agent workflow building.

**Autonomy boundaries:**
- ReleaseIQ may generate test plans autonomously for
  non-compliance features (confidence >90%)
- ReleaseIQ may NOT autonomously approve or export
  compliance check cases — human sign-off required
- Microsoft Copilot may assist code generation but
  may NOT commit code autonomously to main branch
- Windsurf may search and summarize repo content
  but may NOT write or modify files autonomously
- Agent workflows require explicit PM approval before
  activation — no autonomous agent deployment

**Escalation triggers:**
- Any AI output touching compliance logic (wash-sale,
  audit trail, regulatory reporting) → senior PM review
- Any AI suggestion modifying portfolio calculation
  logic → compliance team review before implementation
- Any new AI tool adoption request → governance review
  before installation on BlackRock infrastructure
- PII detected in any AI input → immediate block,
  security team notification within 24 hours

**Audit cadence:**
- Weekly: AI tool usage log reviewed by PM lead
- Monthly: Golden dataset eval run, compliance
  correction table reviewed, accuracy metrics reported
- Quarterly: Full governance policy review, shadow
  AI audit repeated, vendor contract review
- Annually: External compliance audit of AI tooling
  against SEC/FINRA requirements

**Regulatory exposure:**
- SEC Regulation S-P: Client data must not be
  transmitted to external model APIs. PII detection
  layer is a compliance requirement, not optional.
- EU AI Act: Direct indexing platforms serving
  EU clients may fall under high-risk AI system
  classification. Audit trail and human oversight
  requirements align with EU AI Act Article 14
  (human oversight) and Article 17 (quality management).
- FINRA: AI-generated compliance check cases used
  in QA testing must be traceable to human-approved
  source rules. Audit log is the compliance artifact.

---

## Agent Topology

**Agent 1 — Spec Analyzer**
What it can do: Parse feature spec, extract keywords,
classify compliance risk level, route to triage or
frontier model.
What it cannot do: Modify the spec, access external
data sources, store spec content outside ReleaseIQ.
Who approves: Automatic — no human approval required
for classification decisions.

**Agent 2 — Test Plan Generator**
What it can do: Generate categorized test cases from
spec input, apply golden dataset patterns, assign
priority labels and test case IDs.
What it cannot do: Access live portfolio data, execute
tests autonomously, approve its own output for QA use.
Who approves: PM approves before export to QA.
Compliance cases require senior PM or compliance
reviewer sign-off.

**Agent 3 — Compliance Checker (proposed)**
What it can do: Cross-reference generated compliance
check cases against the BlackRock DI compliance
rulebook, flag cases that reference incorrect
thresholds or missing regulatory requirements.
What it cannot do: Override human compliance reviewer,
modify the rulebook autonomously, approve cases
for production use.
Who approves: Compliance team reviews and approves
rulebook updates quarterly. Individual case flags
reviewed by senior PM.

**Agent 4 — Workflow Builder (add-on, not yet active)**
What it can do: Accept natural language description
of a QA automation workflow and generate agent
configuration code for review.
What it cannot do: Deploy agent configurations
autonomously, access production systems, modify
existing automation without explicit approval.
Who approves: Engineering lead reviews generated
configuration, compliance team approves if workflow
touches portfolio or compliance logic. Two-person
approval required before deployment.

---

## Shadow AI Audit

| Tool | Owner | Risk Level | Decision |
|------|-------|-----------|----------|
| **Microsoft Copilot (M365)** | IT / enterprise license | H | govern — already active under enterprise agreement, no usage standards defined, data handling policy unclear for DI-specific content |
| **Windsurf** | Individual devs | H | govern — repo sync creates data exposure risk, adoption is inconsistent, no BlackRock security review documented |
| **ChatGPT (personal accounts)** | Individual PMs and devs | H | kill — personal accounts have no enterprise data protection, high PII exposure risk, no audit trail |
| **GitHub Copilot (individual licenses)** | Individual devs | M | govern — some devs may have personal Copilot subscriptions outside enterprise agreement, creates shadow spend and ungoverned data exposure |
| **Notion AI / Docs AI** | Individual PMs | M | govern — used for spec drafting, spec content may include unreleased feature details, data residency unclear |
| **Grammarly / writing assistants** | Individual PMs | L | keep — low risk, no code or compliance content, standard enterprise acceptable use |

**Total tools found:** 6

**Tools after triage:**
- Keep: 1 (Grammarly)
- Govern: 4 (Microsoft Copilot, Windsurf,
  GitHub Copilot individual, Notion AI)
- Kill: 1 (ChatGPT personal accounts)

**Estimated hidden spend:**
- GitHub Copilot individual licenses: ~$19/user/month
  × est. 8 users = $152/month ungoverned
- Notion AI: ~$8/user/month × est. 5 users =
  $40/month ungoverned
- Total estimated shadow spend: ~$192/month
- Total annual hidden spend: ~$2,300
- Compliance risk value at stake: significantly
  higher — a single PII incident via ungoverned
  ChatGPT use could trigger SEC Regulation S-P
  enforcement action
