---
engine: claude

on:
  issues:
    types: [opened]

permissions:
  contents: read
  issues: read
  pull-requests: read

safe-outputs:
  add-labels:
  add-comment:

tools:
  github:
---

# Continuous Issue Triage

When a new issue is opened, analyze it and perform triage:

## Classification

Apply ONE of these labels based on the issue content:

- `bug` — something is broken or not working as expected
- `feature` — a request for new functionality
- `ui` — visual or design-related issue
- `docs` — documentation is missing or incorrect
- `performance` — slow loading, timeouts, or optimization needs

## Area Detection

Also apply an area label based on which part of the codebase is affected:

- `area:api` — affects backend API routes (app/api/)
- `area:auth` — affects authentication (auth.ts, auth.config.ts)
- `area:components` — affects UI components (components/)
- `area:database` — affects Prisma schema or database queries (prisma/)
- `area:tests` — affects test infrastructure (tests/, e2e/)

## Summary

Add a comment to the issue with:
1. A one-sentence summary of the problem or request
2. Which files/areas are likely involved
3. Suggested priority (low, medium, high) based on impact

Keep the comment concise and helpful. Do not assign the issue.
