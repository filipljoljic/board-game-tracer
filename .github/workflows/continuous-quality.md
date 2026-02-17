---
engine: claude

on:
  check_run:
    types: [completed]

permissions:
  contents: read
  actions: read
  issues: read
  pull-requests: read

safe-outputs:
  create-pull-request:
    title-prefix: "[fix] "
    labels: [ci-fix]
  add-comment:

tools:
  github:
---

# Continuous Quality

When a CI check run fails, investigate and propose a fix.

## Investigation

1. Read the failed check run logs to identify the error
2. Trace the failure to the root cause in the source code
3. Determine if this is a test failure, build error, lint issue, or runtime error

## Fix

If the root cause can be identified:

1. Create a targeted fix addressing only the root cause
2. Open a PR with:
   - A clear title describing the fix
   - An explanation in the PR body of what failed and why
   - The minimal code change needed to resolve the issue
3. Do NOT change test assertions to make tests pass — fix the source code instead

If the root cause cannot be determined:

1. Add a comment on the associated PR (if one exists) with:
   - The error message and relevant log lines
   - Which files and lines are involved
   - Possible causes to investigate

## Scope

Only investigate failures from the "Tests" workflow. Ignore other check runs.
