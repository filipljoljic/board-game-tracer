---
on:
  pull_request:
    types: [closed]
    branches: [main]

permissions:
  contents: read
  issues: read
  pull-requests: read

safe-outputs:
  create-pull-request:
    title-prefix: "[docs] "
    labels: [documentation]

tools:
  github:
---

# Continuous Documentation

When a PR is merged to main, check if the documentation needs updating.

## Analysis

1. Review all files changed in the merged PR
2. Compare the changes against `DOCUMENTATION.md` to detect drift
3. Focus on:
   - API route changes (app/api/) — check if endpoints, parameters, or responses changed
   - Database schema changes (prisma/schema.prisma) — check if models or relations changed
   - New components or pages — check if they're documented
   - Authentication changes — check if auth flow documentation is still accurate

## Action

If documentation drift is detected:

1. Open a PR that updates the relevant sections of `DOCUMENTATION.md`
2. Match the existing documentation style and structure
3. Only update sections affected by the merged changes
4. Include a brief summary of what changed and why the docs need updating

If no drift is detected, take no action.

## Guidelines

- Do NOT rewrite the entire documentation — only update what changed
- Preserve existing formatting and section structure
- Link to relevant source files where helpful
- Keep API documentation accurate with current request/response shapes
