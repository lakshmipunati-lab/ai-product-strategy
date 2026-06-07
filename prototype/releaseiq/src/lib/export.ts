import type { TestPlan } from '../types'

function escapeCsv(value: string): string {
  if (value.includes(',') || value.includes('"') || value.includes('\n')) {
    return `"${value.replace(/"/g, '""')}"`
  }
  return value
}

export function toMarkdown(plan: TestPlan): string {
  const lines: string[] = [
    `# Test Plan: ${plan.featureTitle}`,
    '',
    `Generated: ${new Date(plan.generatedAt).toLocaleString()}`,
    '',
  ]

  for (const category of plan.categories) {
    lines.push(`## ${category.name}`, '')
    for (const tc of category.cases) {
      lines.push(`### ${tc.id}: ${tc.title}`, '')
      lines.push(`**Priority:** ${tc.priority}`, '')
      lines.push('**Steps:**')
      tc.steps.forEach((step, i) => lines.push(`${i + 1}. ${step}`))
      lines.push('', `**Expected Result:** ${tc.expectedResult}`, '')
    }
  }

  return lines.join('\n')
}

export function toCsv(plan: TestPlan): string {
  const header = 'ID,Category,Title,Steps,Expected Result,Priority'
  const rows = plan.categories.flatMap((cat) =>
    cat.cases.map((tc) =>
      [
        escapeCsv(tc.id),
        escapeCsv(cat.name),
        escapeCsv(tc.title),
        escapeCsv(tc.steps.join(' | ')),
        escapeCsv(tc.expectedResult),
        escapeCsv(tc.priority),
      ].join(','),
    ),
  )
  return [header, ...rows].join('\n')
}

export function toJson(plan: TestPlan): string {
  return JSON.stringify(plan, null, 2)
}

export async function copyToClipboard(plan: TestPlan): Promise<void> {
  await navigator.clipboard.writeText(toMarkdown(plan))
}

export function downloadFile(content: string, filename: string, mimeType: string): void {
  const blob = new Blob([content], { type: mimeType })
  const url = URL.createObjectURL(blob)
  const anchor = document.createElement('a')
  anchor.href = url
  anchor.download = filename
  anchor.click()
  URL.revokeObjectURL(url)
}

export function downloadMarkdown(plan: TestPlan): void {
  const slug = plan.featureTitle.toLowerCase().replace(/[^a-z0-9]+/g, '-').slice(0, 40)
  downloadFile(toMarkdown(plan), `test-plan-${slug}.md`, 'text/markdown')
}

export function downloadCsv(plan: TestPlan): void {
  const slug = plan.featureTitle.toLowerCase().replace(/[^a-z0-9]+/g, '-').slice(0, 40)
  downloadFile(toCsv(plan), `test-plan-${slug}.csv`, 'text/csv')
}

export function downloadJson(plan: TestPlan): void {
  const slug = plan.featureTitle.toLowerCase().replace(/[^a-z0-9]+/g, '-').slice(0, 40)
  downloadFile(toJson(plan), `test-plan-${slug}.json`, 'application/json')
}
