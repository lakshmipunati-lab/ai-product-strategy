# Data Flywheel Map

> Score each loop 1-5. Your weakest loop is where competitors attack first.
> The four loops below are the M2 starting point - adapt if your product has 2 or 6 loops instead of 4.

## Flywheel Loops

| Loop | What It Measures | Score 1 | Score 5 | Score |
|------|------------------|---------|---------|-------|
| **Correction** | Do users fix AI outputs? Is that signal captured and reused? | No capture | Automated retraining | 2/5 |
| **Preference** | Does the product learn individual / team preferences over time? | Stateless | Deep personalization | 2/5 |
| **Domain Context** | Does usage in one area improve quality in adjacent areas? | Siloed | Cross-domain transfer | 4/5 |
| **Network** | Does each new user / team make the product better for everyone? | Isolated | Strong network effects | 2/5 |

### Correction Loop - 2/5
**What you capture today:**
QA defect logs per release and bug reports filed post-deploy exist but 
are not fed back into AI tooling. ReleaseIQ generates test plans with 
no awareness of which cases caught real bugs in previous releases.

**How it compounds:**
Defect patterns teach ReleaseIQ which test categories surface real bugs 
vs. noise for BlackRock DI specifically — coverage gets smarter and more 
targeted with every release cycle.

---

### Preference Loop - 2/5
**What you capture today:**
PM edits to generated test plans and which cases QA actually executes 
vs. skips are not systematically recorded. There is no feedback mechanism 
inside ReleaseIQ today.

**How it compounds:**
System learns BlackRock-specific testing preferences over time — which 
compliance checks matter most, which edge cases are always skipped, which 
happy path flows need more depth — creating personalization no generic 
tool can match.

---

### Domain Context Loop - 4/5
**What you capture today:**
Four-week SDLC structure, SEC/FINRA compliance requirements, direct 
indexing feature patterns, wash-sale rules, TLH logic, and advisor 
override workflows are all embedded in how the platform operates today.

**How it compounds:**
Every release adds institutional knowledge about what good DI software 
looks like. A test plan generated for a TLH feature improves coverage 
for rebalancing features because the underlying compliance context 
transfers. Competitors cannot replicate this without years of 
BlackRock-specific exposure.

---

### Network Loop - 2/5
**What you capture today:**
Multiple PMs use the platform on related features but their spec patterns 
and test outputs are not shared or aggregated into a common learning layer.

**How it compounds:**
When 10 PMs generate test plans for related DI features, their collective 
inputs create a richer training set than any single user could produce — 
shared spec patterns surface gaps no individual PM would catch alone.

---

**Total Flywheel Score: 10/20**

**Weakest Loop:** Preference — no mechanism exists today to capture 
whether generated test cases were useful, edited, or ignored.

**Fix for weakest loop:** Build a simple thumbs up/down rating on each 
generated test case inside ReleaseIQ. Every rating is a preference signal 
that improves future generation for BlackRock DI specifically. Cost: 
one sprint. Value: converts stateless output into a compounding asset.

---

## Encroachment Threat Assessment

### 1. Platform Encroachment
**Attacker:** Microsoft Copilot for Finance
**Vector:** Enterprise-wide AI mandate pushed top-down through BlackRock 
IT procurement, standardizing on Microsoft tooling before ReleaseIQ 
establishes adoption norms
**Time-to-threat:** 6-12 months
**% of value at risk:** 60% — replaces the AI tooling layer entirely 
while leaving the core platform intact

### 2. Vertical Competitor
**Attacker:** GitHub Copilot Enterprise with native test generation
**Vector:** Ships spec-to-test-plan natively inside the dev workflow, 
capturing PM and QA users before ReleaseIQ becomes a habit
**Time-to-threat:** 3-6 months
**% of value at risk:** 40% — captures the QA automation use case 
without needing to touch the compliance layer

### 3. Adjacent Expansion
**Attacker:** Internal BlackRock data science or Aladdin vendor team
**Vector:** Gains access to historical defect and release data and 
builds a fine-tuned internal model before the flywheel is formalized
**Time-to-threat:** 12-18 months
**% of value at risk:** 80% — owns the data advantage entirely if 
they move first

---

## 90-Day Encroachment Plan

**Attacker:** Microsoft Copilot for Finance

**Attack vector:** Target the Preference loop — the weakest point. 
No feedback mechanism means no switching cost and no compounding data.

**Weeks 1-4 - what they ship:**
Copilot for Finance integrates with Azure DevOps and generates test 
plans from user stories natively. Pilots with 2-3 BlackRock engineering 
teams through existing Microsoft enterprise agreement.

**Weeks 5-8 - how they poach users:**
IT champions the cost efficiency of consolidating on existing Microsoft 
licenses. PMs adopt Copilot because it lives inside tools they already 
use — no new login, no new workflow.

**Weeks 9-12 - why users don't come back:**
Copilot learns team preferences through Microsoft Graph data — calendar, 
email, Teams — building a preference model ReleaseIQ cannot match without 
its own feedback loop. Switching cost inverts.

**Your defense:**
Move immediately on the Preference loop fix — ship thumbs up/down 
ratings in ReleaseIQ within the next sprint. Then formalize AI tooling 
governance policy before the next procurement cycle. Make ReleaseIQ 
the standard before Microsoft makes Copilot the default.
