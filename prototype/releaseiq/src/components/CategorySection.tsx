import { useState } from 'react'
import type { TestPlanCategory } from '../types'
import { TestCaseCard } from './TestCaseCard'

const categoryColors: Record<string, string> = {
  'Happy Path': 'text-emerald-400',
  'Edge Cases': 'text-amber-400',
  Regression: 'text-purple-400',
  'Compliance Checks': 'text-blue-400',
}

interface CategorySectionProps {
  category: TestPlanCategory
  defaultOpen?: boolean
}

export function CategorySection({ category, defaultOpen = true }: CategorySectionProps) {
  const [open, setOpen] = useState(defaultOpen)
  const color = categoryColors[category.name] ?? 'text-slate-400'

  return (
    <div className="rounded-lg border border-slate-700/60 bg-slate-800/30">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between px-4 py-3 text-left hover:bg-slate-800/50"
      >
        <div className="flex items-center gap-2">
          <span className={`text-sm font-semibold ${color}`}>{category.name}</span>
          <span className="rounded-full bg-slate-700 px-2 py-0.5 text-xs text-slate-300">
            {category.cases.length}
          </span>
        </div>
        <span className="text-slate-500">{open ? '−' : '+'}</span>
      </button>
      {open && (
        <div className="space-y-3 border-t border-slate-700/60 p-4">
          {category.cases.map((tc) => (
            <TestCaseCard key={tc.id} testCase={tc} />
          ))}
        </div>
      )}
    </div>
  )
}
