export type Priority = 'P0' | 'P1' | 'P2'

export type TestCategory =
  | 'Happy Path'
  | 'Edge Cases'
  | 'Regression'
  | 'Compliance Checks'

export interface TestCase {
  id: string
  title: string
  steps: string[]
  expectedResult: string
  priority: Priority
}

export interface TestPlanCategory {
  name: TestCategory
  cases: TestCase[]
}

export interface TestPlan {
  featureTitle: string
  generatedAt: string
  categories: TestPlanCategory[]
}
