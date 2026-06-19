# Three-Horizon Roadmap & Board Pitch

## Roadmap

### Horizon 1 — Now (0-3 months)
*Quick wins. Ship with existing capabilities.*

| Initiative | Metric | Confidence |
|-----------|--------|-----------|
| Formalize ReleaseIQ as the standard QA test plan tool for all DI platform releases — mandate adoption across PM and QA teams with governance policy | % of releases using ReleaseIQ-generated test plans. Target: 80% within 3 months | H |
| Add thumbs up/down preference feedback to every generated test case — activate the preference flywheel | % of test cases rated per release. Target: 60% rating coverage within 60 days | H |
| Kill ChatGPT personal account usage — issue governance policy and communicate to all engineering and PM staff | Zero ungoverned AI tool incidents in next quarterly audit | H |
| Build PII detection layer at spec input — block sensitive data before it reaches external model API | Zero PII transmission incidents. 100% of flagged inputs logged to security | H |
| Run first formal shadow AI audit and publish findings to engineering and PM leads | Audit report published, all 6 tools triaged and decisions documented | H |

### Horizon 2 — Next (3-9 months)
*Bets. Requires new capabilities or integrations.*

| Initiative | Metric | Confidence |
|-----------|--------|-----------|
| Connect QA defect logs to ReleaseIQ — activate the correction flywheel so past bugs improve future test plans | Defect catch rate improvement of 15% vs. pre-integration baseline | M |
| Build compliance corrections capture flow — log human reviewer edits back into the golden dataset | Compliance check accuracy improvement of 10% month-over-month for 3 consecutive months | M |
| Launch cascading model routing — triage model handles 70% of calls, frontier model reserved for compliance-flagged specs | Blended inference cost reduced from $0.29 to $0.10 per generation | M |
| Introduce internal chargeback model at $25/user/month — make AI cost visible to team budget owners | 100% of ReleaseIQ usage tracked and attributed to team cost centers | M |
| Expand golden dataset to 50 rows covering all major DI feature types — establish monthly eval cadence | Golden dataset eval score >90% accuracy on every monthly run | H |

### Horizon 3 — Bet (9-18 months)
*Moonshots. High uncertainty, high potential.*

| Initiative | Metric | Confidence |
|-----------|--------|-----------|
| Fine-tune a BlackRock DI-specific model on accumulated spec, test plan, and defect data — reduce dependency on external frontier model APIs entirely | External API cost reduced by 50%. Compliance check accuracy exceeds generic frontier model baseline | L |
| Launch Agent Workflow Builder as governed add-on — natural language to QA automation agent with two-person approval gate | 3 approved agent workflows deployed in production within 6 months of launch. Zero compliance incidents | L |
| Expand ReleaseIQ beyond DI platform to other BlackRock product teams — institutional AI tooling standard | 3 additional BlackRock product teams adopting ReleaseIQ. Cross-team flywheel activated | M |
| Build real-time compliance rulebook sync — ReleaseIQ automatically updates compliance check patterns when SEC/FINRA guidance changes | Zero outdated compliance check cases in any release after sync is active | L |

---

## Board Pitch

**Thesis (1 sentence):**
BlackRock's Direct Indexing platform has a 4-week release
cycle that costs $15,000-$20,000 per release in human
QA and documentation time — ReleaseIQ cuts that cost by
30-40% while raising compliance coverage, using AI tooling
we already have, governed by a policy we can enforce today.

---

**The case:**

**1. Why now:**
AI tooling is already inside our walls — Microsoft Copilot
is active under the enterprise agreement, Windsurf is
synced to our repos, and individual team members are using
ungoverned personal AI tools including ChatGPT on
BlackRock content. The question is not whether AI is in
our SDLC. It is whether we govern it or let it govern us.
The window to establish ReleaseIQ as the compliance-approved
standard is 3-6 months before a Microsoft enterprise
mandate or a GitHub Copilot native feature closes it.

**2. What's defensible:**
Four years of BlackRock DI-specific release history,
compliance requirements, wash-sale rule logic, TLH test
patterns, and SEC/FINRA audit trail requirements are
embedded in how our platform operates. No external vendor
can replicate this institutional context without our data.
ReleaseIQ converts that latent advantage into a compounding
flywheel — every release makes the next one smarter.
The moat is domain context, and we already own it.

**3. The economics:**
Current state: $15,000-$20,000 per release in human time,
untracked and invisible to finance.
AI-enabled state: $17.50/user/month in AI COGS vs.
$300-400/user/month in recovered productivity.
ROI: 17-22x at current team size of 20 users.
Total platform cost at scale: $500/month for 20 users
against $6,000-$8,000/month in recovered productivity.
Every 10 additional users adds $250/month in cost and
$3,000/month in value. Margin improves with scale.

---

**The risks:**

**1. Trust / failure modes:**
AI-generated compliance check cases that contain incorrect
regulatory logic could pass through QA and reach production.
A single bad compliance test case does not catch a real
defect — creating false confidence in a non-compliant release.
Mitigation: human-in-the-loop is non-negotiable for all
compliance cases. Confidence scoring surfaces uncertainty.
Golden dataset eval runs monthly. Audit trail is the
compliance artifact for every human review.

**2. Scale / governance:**
Teams that do not adopt ReleaseIQ create dark spots in the
knowledge graph — the flywheel only compounds if adoption
is universal. A single non-adopting team can reintroduce
the ungoverned AI tool risk we are trying to eliminate.
Mitigation: governance policy mandates ReleaseIQ as the
standard for all DI platform releases. Shadow AI audit
runs quarterly. Non-compliance is escalated to engineering
and PM leadership.

**3. Competitive:**
Microsoft can ship native QA test generation inside
Copilot for Finance with no new procurement decision
required — they are already inside BlackRock's enterprise
agreement. If this happens before ReleaseIQ is the
established standard, adoption collapses.
Mitigation: move in Horizon 1. Formalize ReleaseIQ as
the compliance-approved tool before the next Microsoft
product cycle. Once embedded in the SDLC with documented
compliance credentials, replacing it requires a compliance
review — that review process is our moat.

---

**The ask:**
1. Approve ReleaseIQ as the official AI-assisted QA
   tool for the BlackRock Direct Indexing platform SDLC
2. Mandate governance policy across all engineering
   and PM teams — effective immediately
3. Approve $500/month internal chargeback budget for
   20-user rollout in Horizon 1
4. Allocate one sprint per quarter for flywheel
   maintenance — preference feedback, golden dataset
   updates, and compliance corrections capture
5. Schedule quarterly governance review with
   compliance team starting Month 3

---

## M1 Baseline vs. Now

**M1 baseline:**
The BlackRock Direct Indexing platform has a 4-week SDLC
that is slow because humans are manually doing work AI
can already do. Adding AI tooling will make us faster.

**Now:**
The BlackRock Direct Indexing platform's 4-week SDLC
is not slow — it is expensive and opaque. AI is already
inside our walls in ungoverned form. The strategy is not
to add AI but to govern what exists, compound what we
already know, and formalize ReleaseIQ as the compliance-
approved standard before a Microsoft enterprise mandate
makes that decision for us. Speed was never the goal.
Efficient, defensible, compounding releases are the goal.
The difference between M1 and now is the difference
between shipping a tool and building a moat.
