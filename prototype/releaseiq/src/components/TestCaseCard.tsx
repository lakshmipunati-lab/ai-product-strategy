import type { TestCase } from '../types'

const priorityStyles = {
  P0: 'bg-red-500/10 text-red-400 border-red-500/20',
  P1: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
  P2: 'bg-slate-500/10 text-slate-400 border-slate-500/20',
}

interface TestCaseCardProps {
  testCase: TestCase
}

export function TestCaseCard({ testCase }: TestCaseCardProps) {
  return (
    <div className="rounded-lg border border-slate-700/60 bg-slate-900/50 p-4">
      <div className="mb-2 flex items-start justify-between gap-3">
        <div>
          <span className="font-mono text-xs text-blue-400">{testCase.id}</span>
          <h4 className="mt-0.5 text-sm font-medium text-slate-100">{testCase.title}</h4>
        </div>
        <span
          className={`shrink-0 rounded border px-2 py-0.5 text-xs font-medium ${priorityStyles[testCase.priority]}`}
        >
          {testCase.priority}
        </span>
      </div>
      <div className="mb-3">
        <p className="mb-1 text-xs font-medium uppercase tracking-wide text-slate-500">Steps</p>
        <ol className="list-inside list-decimal space-y-1 text-sm text-slate-300">
          {testCase.steps.map((step, i) => (
            <li key={i}>{step}</li>
          ))}
        </ol>
      </div>
      <div>
        <p className="mb-1 text-xs font-medium uppercase tracking-wide text-slate-500">
          Expected Result
        </p>
        <p className="text-sm text-slate-300">{testCase.expectedResult}</p>
      </div>
    </div>
  )
}
