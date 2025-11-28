# Testing Section for README.md

Add this section to your main README.md file:

---

## 🧪 Testing

This project has comprehensive test coverage using modern testing tools.

### Test Stack

- **Vitest** - Fast unit and integration tests
- **Playwright** - End-to-end browser testing
- **React Testing Library** - Component testing
- **Testmo** - Test management and reporting

### Quick Start

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run E2E tests
npm run test:e2e

# Run all tests with coverage
npm run test:coverage
```

### Test Structure

```
├── e2e/                      # Playwright E2E tests
│   ├── pages/               # Page object models
│   └── *.spec.ts           # E2E test files
├── tests/
│   ├── helpers/            # Test utilities
│   ├── fixtures/           # Test data
│   └── mocks/              # MSW handlers
├── lib/**/*.test.ts        # Unit tests (business logic)
├── components/**/*.test.tsx # Component tests
└── app/api/**/*.test.ts    # API integration tests
```

### Coverage Goals

- ✅ Business Logic: 100%
- ✅ API Routes: 100%
- ✅ Components: 70%+
- ✅ E2E: Critical paths

### CI/CD

Tests run automatically on every push and pull request via GitHub Actions. Results are reported to Testmo for tracking and analysis.

### Documentation

- **Full Testing Guide**: [docs/TESTING.md](docs/TESTING.md)
- **Testmo Setup**: [docs/TESTMO_SETUP.md](docs/TESTMO_SETUP.md)
- **Testing Patterns**: [.cursor/rules/testing-patterns.mdc](.cursor/rules/testing-patterns.mdc)

### Test Commands Reference

| Command                  | Description                |
| ------------------------ | -------------------------- |
| `npm test`               | Run unit/integration tests |
| `npm run test:watch`     | Run tests in watch mode    |
| `npm run test:ui`        | Open Vitest UI             |
| `npm run test:coverage`  | Run tests with coverage    |
| `npm run test:e2e`       | Run Playwright E2E tests   |
| `npm run test:e2e:ui`    | Open Playwright UI mode    |
| `npm run test:e2e:debug` | Debug E2E tests            |
| `npm run test:all`       | Run all tests              |

---

## 📊 Test Results

[![Tests](https://github.com/your-username/board-game-tracker/actions/workflows/test.yml/badge.svg)](https://github.com/your-username/board-game-tracker/actions/workflows/test.yml)

View detailed test reports and trends in [Testmo](https://your-instance.testmo.net)
