import { useState } from 'react'
import { Header } from './components/Header'
import { SpecInput } from './components/SpecInput'
import { GenerateButton } from './components/GenerateButton'
import { TestPlanOutput } from './components/TestPlanOutput'
import { SAMPLE_SPEC } from './data/sampleSpec'
import { simulateGeneration } from './lib/mockGenerator'
import type { TestPlan } from './types'

export default function App() {
  const [spec, setSpec] = useState(SAMPLE_SPEC)
  const [plan, setPlan] = useState<TestPlan | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleGenerate() {
    if (!spec.trim()) {
      setError('Please enter a feature spec before generating.')
      return
    }

    setError(null)
    setLoading(true)
    setPlan(null)

    try {
      const result = await simulateGeneration(spec)
      setPlan(result)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="mx-auto w-full max-w-7xl flex-1 px-6 py-8">
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-white">Spec to Test Plan</h2>
          <p className="mt-1 text-sm text-slate-400">
            AI analyzes your feature specification and generates a full QA test plan with regression
            and compliance cases.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          <div>
            <SpecInput value={spec} onChange={setSpec} disabled={loading} />
            {error && (
              <p className="mt-2 text-sm text-red-400" role="alert">
                {error}
              </p>
            )}
            <GenerateButton onClick={handleGenerate} loading={loading} disabled={!spec.trim()} />
          </div>
          <TestPlanOutput plan={plan} loading={loading} />
        </div>
      </main>
    </div>
  )
}
