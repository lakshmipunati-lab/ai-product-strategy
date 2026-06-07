import type { TestCase, TestPlan, TestPlanCategory } from '../types'

interface SpecContext {
  featureTitle: string
  hasTax: boolean
  hasRebalance: boolean
  hasCompliance: boolean
  hasOverride: boolean
  hasAudit: boolean
  hasNotification: boolean
  hasWashSale: boolean
  hasDrift: boolean
}

function parseSpec(spec: string): SpecContext {
  const titleMatch = spec.match(/(?:feature|title):\s*(.+)/i)
  const featureTitle = titleMatch?.[1]?.trim() ?? 'Feature Under Test'

  return {
    featureTitle,
    hasTax: /tax|tlh|harvest/i.test(spec),
    hasRebalance: /rebalance|drift|tracking error/i.test(spec),
    hasCompliance: /compliance|regulatory|wash.?sale/i.test(spec),
    hasOverride: /override|approval|advisor/i.test(spec),
    hasAudit: /audit|immutable|retention/i.test(spec),
    hasNotification: /notif|alert/i.test(spec),
    hasWashSale: /wash.?sale/i.test(spec),
    hasDrift: /drift|threshold/i.test(spec),
  }
}

function buildHappyPath(ctx: SpecContext): TestCase[] {
  const driftLabel = ctx.hasDrift ? 'drift threshold breach' : 'trigger condition'
  const taxLabel = ctx.hasTax ? 'TLH evaluation' : 'portfolio action'

  return [
    {
      id: 'TC-HP-001',
      title: `Standard ${taxLabel} on ${driftLabel}`,
      steps: [
        'Configure a test portfolio with drift exceeding the advisor-set threshold',
        'Wait for the monitoring job to detect the breach',
        'Verify the system initiates an automated evaluation',
      ],
      expectedResult: `${taxLabel} job is created within 60 seconds with correct portfolio and threshold metadata`,
      priority: 'P0',
    },
    {
      id: 'TC-HP-002',
      title: ctx.hasWashSale
        ? 'Successful harvest with clean wash-sale window'
        : 'Successful trade execution with valid pre-checks',
      steps: [
        'Set up a portfolio with harvestable loss positions and no conflicting trades in the wash-sale window',
        'Trigger the evaluation workflow',
        'Confirm all pre-trade validations pass',
      ],
      expectedResult: 'Trade proposal is generated with estimated tax benefit and no compliance blocks',
      priority: 'P0',
    },
    {
      id: 'TC-HP-003',
      title: ctx.hasOverride
        ? 'Advisor approves proposed trade via override workflow'
        : 'Authorized user completes approval workflow',
      steps: [
        'Log in as assigned advisor',
        'Open the pending trade proposal in the review queue',
        'Review details and click Approve',
      ],
      expectedResult: 'Trade status updates to Approved; execution proceeds only after explicit approval',
      priority: 'P0',
    },
    {
      id: 'TC-HP-004',
      title: ctx.hasNotification
        ? 'Advisor receives real-time alert on opportunity detection'
        : 'Stakeholders receive status notification on completion',
      steps: [
        'Trigger an evaluation that identifies a valid opportunity',
        'Monitor the notification channel for the assigned advisor',
        'Verify alert payload includes portfolio ID and estimated benefit',
      ],
      expectedResult: 'Notification is delivered in real time with complete trade summary',
      priority: 'P1',
    },
  ]
}

function buildEdgeCases(ctx: SpecContext): TestCase[] {
  return [
    {
      id: 'TC-EC-001',
      title: 'Portfolio with zero harvestable positions',
      steps: [
        'Configure a portfolio where all positions are at a gain',
        'Trigger drift threshold breach',
        'Observe system behavior',
      ],
      expectedResult: 'Evaluation completes gracefully with a no-action result; no trade proposals generated',
      priority: 'P1',
    },
    {
      id: 'TC-EC-002',
      title: ctx.hasDrift
        ? 'Drift exactly at threshold boundary (2.5%)'
        : 'Trigger condition at exact boundary value',
      steps: [
        'Set portfolio drift to exactly match the configured threshold',
        'Run the monitoring cycle',
        'Increment drift by 0.01% and re-run',
      ],
      expectedResult: 'No evaluation at exact boundary; evaluation triggers only when drift exceeds threshold',
      priority: 'P1',
    },
    {
      id: 'TC-EC-003',
      title: ctx.hasWashSale
        ? 'Wash-sale conflict detected across household accounts'
        : 'Cross-account conflict blocks proposed trade',
      steps: [
        'Place a buy order for the same security in a linked household account within the wash-sale window',
        'Trigger TLH evaluation for the loss position',
        'Review validation output',
      ],
      expectedResult: 'Trade is blocked with explicit wash-sale violation reason referencing affected accounts',
      priority: 'P0',
    },
    {
      id: 'TC-EC-004',
      title: 'Concurrent evaluation requests for the same portfolio',
      steps: [
        'Trigger two simultaneous drift breaches for the same portfolio ID',
        'Monitor job queue and database locks',
        'Verify only one evaluation runs',
      ],
      expectedResult: 'Duplicate evaluations are deduplicated; no race conditions or double trade proposals',
      priority: 'P1',
    },
  ]
}

function buildRegression(ctx: SpecContext): TestCase[] {
  const rebalanceRef = ctx.hasRebalance
    ? 'existing rebalance scheduler'
    : 'scheduled portfolio maintenance jobs'

  return [
    {
      id: 'TC-RG-001',
      title: `${rebalanceRef} continues unaffected`,
      steps: [
        'Enable the new feature flag for TLH automation',
        'Run the standard rebalance scheduler on a control portfolio',
        'Compare output against baseline from pre-feature deployment',
      ],
      expectedResult: 'Rebalance jobs complete with identical results to baseline; no scheduling conflicts',
      priority: 'P0',
    },
    {
      id: 'TC-RG-002',
      title: 'Reporting pipeline produces accurate post-harvest positions',
      steps: [
        'Execute an approved harvest trade on a test portfolio',
        'Run end-of-day reporting batch',
        'Validate position holdings and cost basis in reports',
      ],
      expectedResult: 'Reports reflect updated positions, cost basis, and realized loss within tolerance',
      priority: 'P0',
    },
    {
      id: 'TC-RG-003',
      title: 'Index sync and target weight calculations remain stable',
      steps: [
        'Trigger a harvest on a portfolio tracking a custom direct index',
        'Verify index sync job runs post-execution',
        'Compare target weights before and after',
      ],
      expectedResult: 'Index sync completes; portfolio realigns to target weights without sync errors',
      priority: 'P1',
    },
    {
      id: 'TC-RG-004',
      title: 'Legacy API endpoints maintain backward compatibility',
      steps: [
        'Call existing portfolio and trade status API endpoints',
        'Verify response schemas match v2.4 contract',
        'Confirm no new required fields break existing integrations',
      ],
      expectedResult: 'All legacy API consumers receive unchanged response structures',
      priority: 'P1',
    },
  ]
}

function buildCompliance(ctx: SpecContext): TestCase[] {
  return [
    {
      id: 'TC-CP-001',
      title: ctx.hasWashSale
        ? 'Wash-sale window enforcement across 30-day lookback'
        : 'Pre-trade compliance validation within SLA',
      steps: [
        'Seed trade history with buys at days 1, 15, and 29 within the lookback window',
        'Attempt harvest on matching loss positions for each scenario',
        'Measure validation latency',
      ],
      expectedResult: ctx.hasWashSale
        ? 'Trades on days 1–29 are blocked; day 30+ allowed; validation completes within 500ms'
        : 'All compliance checks complete within 500ms with correct pass/fail results',
      priority: 'P0',
    },
    {
      id: 'TC-CP-002',
      title: ctx.hasAudit
        ? 'Audit log immutability and 7-year retention'
        : 'Audit trail completeness for all state transitions',
      steps: [
        'Execute a full approve-and-execute workflow',
        'Attempt to modify or delete audit log entries via API and direct DB access',
        'Verify retention policy configuration',
      ],
      expectedResult: 'All events logged with timestamp, user ID, and rationale; entries are immutable; retention set to 7 years',
      priority: 'P0',
    },
    {
      id: 'TC-CP-003',
      title: 'No unauthorized auto-execution without advisor approval',
      steps: [
        'Trigger a valid TLH opportunity',
        'Do not perform any advisor approval action',
        'Monitor trade execution queue for 24 hours',
      ],
      expectedResult: 'Zero trades execute without a recorded advisor approval in the audit log',
      priority: 'P0',
    },
    {
      id: 'TC-CP-004',
      title: 'Data residency — all processing within approved region',
      steps: [
        'Trace data flow for evaluation, validation, and execution pipelines',
        'Verify no cross-region data transfer occurs',
        'Confirm logs and trade records persist in approved data center',
      ],
      expectedResult: 'All data processing and storage remain within the designated regulatory region',
      priority: 'P1',
    },
  ]
}

function dedupeIds(cases: TestCase[]): TestCase[] {
  const seen = new Set<string>()
  return cases.map((tc, i) => {
    if (!seen.has(tc.id)) {
      seen.add(tc.id)
      return tc
    }
    const fixed = { ...tc, id: `${tc.id}-${i}` }
    seen.add(fixed.id)
    return fixed
  })
}

export function generateTestPlan(spec: string): TestPlan {
  const ctx = parseSpec(spec)

  const categories: TestPlanCategory[] = [
    { name: 'Happy Path', cases: buildHappyPath(ctx) },
    { name: 'Edge Cases', cases: buildEdgeCases(ctx) },
    { name: 'Regression', cases: dedupeIds(buildRegression(ctx)) },
    { name: 'Compliance Checks', cases: buildCompliance(ctx) },
  ]

  return {
    featureTitle: ctx.featureTitle,
    generatedAt: new Date().toISOString(),
    categories,
  }
}

export function simulateGeneration(spec: string, delayMs = 2500): Promise<TestPlan> {
  return new Promise((resolve) => {
    setTimeout(() => resolve(generateTestPlan(spec)), delayMs)
  })
}
