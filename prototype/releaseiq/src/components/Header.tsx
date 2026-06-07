export function Header() {
  return (
    <header className="border-b border-slate-800 bg-slate-950/80 backdrop-blur-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-600 text-sm font-bold text-white">
            RQ
          </div>
          <div>
            <h1 className="text-lg font-semibold tracking-tight text-white">ReleaseIQ</h1>
            <p className="text-xs text-slate-400">Direct Indexing QA Assistant</p>
          </div>
        </div>
        <span className="rounded-full border border-slate-700 bg-slate-800/50 px-3 py-1 text-xs text-slate-400">
          Internal Prototype
        </span>
      </div>
    </header>
  )
}
