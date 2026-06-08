# Three-Axis Vulnerability Diagnostic

## Product
**Product:** BlackRock Direct Indexing Platform (internal SDLC tooling layer)
**Your Role:** Product Manager — feature implementation and platform enhancement

---

## Scores

### Contextual Moat — 4/5
*Workflow depth × switching cost. Would users leave in a weekend if a competitor showed up?*

**Score rationale:** The platform is deeply embedded in BlackRock's compliance,
risk, and portfolio management workflows. PMs, QA, and devs don't just use
the platform — they build their release cadence around it. Switching cost is
extremely high because the SDLC itself is shaped by the platform's constraints.
However, the AI tooling layer (Copilot, Windsurf) sits on top and is loosely
adopted — that layer has almost no moat today.

**Named attacker:** GitHub Copilot Enterprise or Cursor adding native
spec-to-test-case generation — they don't need to touch the platform,
just the workflow around it.

---

### Data Advantage — 3/5
*Proprietary signal that compounds with usage. What do you see that OpenAI doesn't?*

**Score rationale:** BlackRock sits on years of release history, QA defect
logs, PR patterns, and strategy configuration data that no external AI vendor
can access. That's a real advantage — but it's currently unleveraged. The data
exists; the flywheel doesn't. Until defect patterns and test outcomes feed
back into AI tooling, the advantage is latent not compounding.

**Named attacker:** An internal data science team or Aladdin vendor that
gets access to this same historical data and builds a fine-tuned model
before you formalize the flywheel.

---

### Platform Exposure — 2/5
*Encroachment risk × pivot speed. If Apple/Google/OpenAI ships your hero feature
native — then what?*

**Score rationale:** Low exposure because this is an internal enterprise
platform inside one of the most regulated financial institutions in the world.
OpenAI or Microsoft can't ship a native BlackRock compliance-aware QA agent
overnight. The real risk is internal — a top-down mandate to adopt a different
enterprise AI suite (e.g. Microsoft Copilot for Finance) that bypasses your
strategy entirely.

**Named attacker:** Microsoft Copilot for Finance or a BlackRock
enterprise-wide AI mandate that standardizes tooling before your
strategy is formalized.

---

## Top Vulnerability
The AI tooling layer has no adoption standard and no moat — a top-down
enterprise AI mandate could bypass your strategy entirely before the
flywheel has a chance to compound.

## Confidence Level
M — The platform moat is real but the AI layer sitting on top of it
is fragile. Confidence increases significantly once governance and
adoption standards are locked in.
