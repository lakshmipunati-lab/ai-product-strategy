import type { TestPlan } from '../types'
import { CategorySection } from './CategorySection'
import { ExportBar } from './ExportBar'

interface TestPlanOutputProps {
  plan: TestPlan | null
  loading?: boolean
}

function LoadingSkeleton() {
  return (
    <div className="space-y-4 animate-pulse">
      <div className="h-4 w-48 rounded bg-slate-700" />
      <div className="h-3 w-32 rounded bg-slate-800" />
      {[1, 2, 3, 4].map((i) => (
        <div key={i} className="rounded-lg border border-slate-700/60 bg-slate-800/30 p-4">
          <div className="mb-3 h-4 w-36 rounded bg-slate-700" />
          <div className="space-y-2">
            <div className="h-3 w-full rounded bg-slate-800" />
            <div className="h-3 w-5/6 rounded bg-slate-800" />
            <div className="h-3 w-4/6 rounded bg-slate-800" />
          </div>
        </div>
      ))}
    </div>
  )
}

function EmptyState() {
  return (
    <div className="flex h-full min-h-[420px] flex-col items-center justify-center rounded-lg border border-dashed border-slate-700 bg-slate-900/30 p-8 text-center">
      <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-slate-800">
        <svg className="h-6 w-6 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
          />
        </svg>
      </div>
      <p className="text-sm font-medium text-slate-400">No test plan yet</p>
      <p className="mt-1 max-w-xs text-xs text-slate-500">
        Paste or edit a feature spec, then click Generate Test Plan to see categorized test cases.
      </p>
    </div>
  )
}

export function TestPlanOutput({ plan, loading }: TestPlanOutputProps) {
  const totalCases = plan?.categories.reduce((sum, c) => sum + c.cases.length, 0) ?? 0

  return (
    <div className="flex h-full flex-col">
      <div className="mb-2 flex items-center justify-between">
        <label className="text-sm font-medium text-slate-300">Generated Test Plan</label>
        {plan && !loading && <ExportBar plan={plan} />}
      </div>

      <div className="flex-1 overflow-y-auto rounded-lg border border-slate-700 bg-slate-900/30 p-4">
        {loading && <LoadingSkeleton />}
        {!loading && !plan && <EmptyState />}
        {!loading && plan && (
          <div className="space-y-4">
            <div>
              <h2 className="text-base font-semibold text-white">{plan.featureTitle}</h2>
              <p className="mt-1 text-xs text-slate-500">
                {totalCases} test cases across {plan.categories.length} categories ·{' '}
                {new Date(plan.generatedAt).toLocaleString()}
              </p>
            </div>
            <div className="space-y-3">
              {plan.categories.map((cat) => (
                <CategorySection key={cat.name} category={cat} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
