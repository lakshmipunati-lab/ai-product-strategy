import { useState } from 'react'
import type { TestPlan } from '../types'
import {
  copyToClipboard,
  downloadCsv,
  downloadJson,
  downloadMarkdown,
} from '../lib/export'

interface ExportBarProps {
  plan: TestPlan
}

export function ExportBar({ plan }: ExportBarProps) {
  const [toast, setToast] = useState<string | null>(null)

  function showToast(message: string) {
    setToast(message)
    setTimeout(() => setToast(null), 2500)
  }

  async function handleCopy() {
    await copyToClipboard(plan)
    showToast('Copied to clipboard')
  }

  function handleCsv() {
    downloadCsv(plan)
    showToast('CSV downloaded')
  }

  function handleJson() {
    downloadJson(plan)
    showToast('JSON downloaded')
  }

  function handleMarkdown() {
    downloadMarkdown(plan)
    showToast('Markdown downloaded')
  }

  const btnClass =
    'rounded-md border border-slate-600 bg-slate-800 px-3 py-1.5 text-xs font-medium text-slate-200 transition-colors hover:border-slate-500 hover:bg-slate-700'

  return (
    <div className="relative">
      <div className="flex flex-wrap items-center gap-2">
        <span className="mr-1 text-xs font-medium text-slate-500">Export:</span>
        <button type="button" onClick={handleCopy} className={btnClass}>
          Copy
        </button>
        <button type="button" onClick={handleCsv} className={btnClass}>
          CSV
        </button>
        <button type="button" onClick={handleJson} className={btnClass}>
          JSON
        </button>
        <button type="button" onClick={handleMarkdown} className={btnClass}>
          Markdown
        </button>
      </div>
      {toast && (
        <div className="absolute right-0 top-full mt-2 rounded-md border border-slate-600 bg-slate-800 px-3 py-2 text-xs text-slate-200 shadow-lg">
          {toast}
        </div>
      )}
    </div>
  )
}
