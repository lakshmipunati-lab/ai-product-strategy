export const SAMPLE_SPEC = `Feature: Automated Tax-Loss Harvesting Trigger

Overview:
Enable the direct indexing platform to automatically evaluate and execute tax-loss harvesting (TLH) when a portfolio's tracking error exceeds a configurable drift threshold.

Requirements:
1. Drift Monitoring — Continuously monitor portfolio drift against the target index. When drift exceeds the advisor-configured threshold (default: 2.5%), trigger a TLH evaluation job.
2. Wash-Sale Compliance — Before executing any harvest trade, validate against the 30-day wash-sale window across all linked accounts and household positions. Block trades that would violate wash-sale rules.
3. Advisor Override Workflow — Advisors must be able to review, approve, or reject proposed TLH trades via the platform UI. Auto-execution is disabled until explicit advisor approval is recorded.
4. Audit Trail — Every TLH evaluation, trade proposal, approval/rejection, and execution must be logged with timestamp, user ID, portfolio ID, and rationale. Logs must be immutable and retained for 7 years per regulatory requirements.
5. Notification — Send real-time alerts to the assigned advisor when a TLH opportunity is identified, including estimated tax benefit and affected positions.

Acceptance Criteria:
- TLH evaluation completes within 60 seconds of drift threshold breach
- Wash-sale validation covers all accounts in the household within 500ms
- Advisor override actions are reflected in the audit log within 1 second
- Zero unauthorized auto-executions without recorded advisor approval`
