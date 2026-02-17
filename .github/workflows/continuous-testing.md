---
engine: claude

on:
  pull_request:
    types: [opened, synchronize]

permissions:
  contents: read
  issues: read
  pull-requests: read

safe-outputs:
  create-pull-request:
    title-prefix: "[tests] "
    labels: [automated-tests]
  add-comment:

tools:
  github:
---

# Continuous Testing

When a pull request is opened or updated, analyze the changed files for test coverage gaps.

## Analysis

1. Identify all files modified in the PR
2. For each modified file, check if corresponding test files exist in the `tests/` directory
3. Look at the existing test patterns in `tests/` to understand the project's testing conventions (Vitest, MSW mocks, test helpers)

## Action

If any modified source file lacks adequate test coverage:

1. Write new test files following the existing patterns found in `tests/`
2. Use Vitest as the test framework
3. Use MSW (Mock Service Worker) for API mocking where appropriate
4. Include edge cases and error scenarios, not just happy paths
5. Open a new PR with the generated tests, targeting the same base branch

If all modified files already have adequate test coverage, add a comment on the PR confirming this.

## Conventions

- Test files go in `tests/` mirroring the source structure
- Use `describe` and `it` blocks
- Follow the existing mock patterns in `tests/helpers/`
- Import from `@/` path alias
