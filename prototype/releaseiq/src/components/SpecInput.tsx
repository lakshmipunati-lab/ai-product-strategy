interface SpecInputProps {
  value: string
  onChange: (value: string) => void
  disabled?: boolean
}

export function SpecInput({ value, onChange, disabled }: SpecInputProps) {
  return (
    <div className="flex h-full flex-col">
      <label htmlFor="feature-spec" className="mb-2 text-sm font-medium text-slate-300">
        Feature Spec
      </label>
      <textarea
        id="feature-spec"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        placeholder="Paste or describe your feature specification..."
        className="min-h-[420px] flex-1 resize-none rounded-lg border border-slate-700 bg-slate-900 p-4 font-mono text-sm leading-relaxed text-slate-200 placeholder:text-slate-600 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 disabled:cursor-not-allowed disabled:opacity-50"
      />
      <p className="mt-2 text-xs text-slate-500">
        {value.length.toLocaleString()} characters
      </p>
    </div>
  )
}
