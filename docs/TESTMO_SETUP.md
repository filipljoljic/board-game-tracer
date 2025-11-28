# Testmo Setup Guide

This guide will walk you through setting up Testmo for test management and reporting.

## What is Testmo?

Testmo is a modern test management platform that provides:

- **Unified Dashboard**: See all test results in one place (unit, integration, E2E)
- **Historical Tracking**: Track test trends over time
- **Flaky Test Detection**: Identify unreliable tests automatically
- **Rich Reporting**: Beautiful reports with screenshots and traces
- **CI/CD Integration**: Seamless integration with GitHub Actions
- **Test Case Management**: Organize and document test cases

## Step 1: Create a Testmo Account

1. Visit [https://www.testmo.com](https://www.testmo.com)
2. Sign up for a free account (or use your existing account)
3. Create a new Testmo instance (e.g., `your-company.testmo.net`)

## Step 2: Create a Project

1. Log in to your Testmo instance
2. Click "Projects" in the sidebar
3. Click "Create Project"
4. Enter project details:
   - **Name**: Board Game Tracker
   - **Key**: BGT (or your preference)
   - **Description**: Board game session tracker with custom scoring
5. Click "Create Project"
6. Note your **Project ID** (visible in the URL or project settings)

## Step 3: Generate API Token

1. Click your profile icon (top right)
2. Go to "Settings"
3. Navigate to "API & Integrations"
4. Click "Create API Token"
5. Enter a name: "CI/CD Integration"
6. Copy the generated token (you won't see it again!)

## Step 4: Configure Environment Variables

Create a `.env.test` file in the project root:

```bash
# DO NOT COMMIT THIS FILE
# Add .env.test to .gitignore

TESTMO_URL="https://your-instance.testmo.net"
TESTMO_TOKEN="your-api-token-here"
TESTMO_PROJECT_ID="1"  # Your project ID from Step 2
```

**Important**: Never commit API tokens to version control!

## Step 5: Install Testmo CLI

Install the Testmo CLI globally:

```bash
npm install -g @testmo/testmo-cli
```

Verify installation:

```bash
testmo --version
```

## Step 6: Run Tests and Submit Results

### Local Testing

1. Run all tests:

```bash
npm run test:all
```

2. Submit results to Testmo:

```bash
bash scripts/submit-to-testmo.sh "Local Test Run"
```

3. View results in Testmo dashboard

### Automated Submission

The submission script handles everything automatically:

```bash
# Run and submit all tests
npm run test:all && bash scripts/submit-to-testmo.sh
```

## Step 7: Configure CI/CD (GitHub Actions)

### Add GitHub Secrets

1. Go to your GitHub repository
2. Click "Settings" → "Secrets and variables" → "Actions"
3. Add three repository secrets:
   - `TESTMO_URL`: Your Testmo instance URL
   - `TESTMO_TOKEN`: Your API token
   - `TESTMO_PROJECT_ID`: Your project ID

### Workflow Configuration

The workflow in `.github/workflows/test.yml` is already configured to:

1. Run all tests on push and pull requests
2. Generate JUnit XML reports
3. Submit results to Testmo automatically
4. Upload artifacts on failure

## Step 8: Configure Test Suites in Testmo

Organize your tests into logical suites:

1. In Testmo, go to your project
2. Click "Test Cases" → "Suites"
3. Create suites:

   - **Unit Tests** - Business Logic

     - Scoring Functions
     - Leaderboard Logic
     - Template Utilities

   - **Integration Tests** - API Routes

     - Games API
     - Groups API
     - Sessions API
     - Users API

   - **Component Tests** - UI Components

     - Dialogs
     - Forms
     - Tables

   - **E2E Tests** - User Workflows
     - Group Management
     - Session Recording
     - Game Management
     - Statistics

## Step 9: Set Up Test Milestones

Track tests against releases:

1. Go to "Milestones" in Testmo
2. Create milestone: "v1.0.0 Release"
3. Associate test runs with milestones
4. Track progress toward release

## Step 10: Configure Notifications

Stay informed about test failures:

1. Go to "Settings" → "Notifications"
2. Enable email notifications for:
   - Failed test runs
   - New flaky tests detected
   - Test runs completed
3. Configure Slack/Discord webhooks (optional)

## Features to Leverage

### 1. Test Result Trends

View test pass/fail rates over time:

- Navigate to "Runs" → "Trends"
- Analyze test stability
- Identify patterns in failures

### 2. Flaky Test Detection

Automatically identify unreliable tests:

- Testmo tracks tests that fail intermittently
- View flaky test report in dashboard
- Prioritize fixing flaky tests

### 3. Test Duration Tracking

Monitor test performance:

- See which tests are slowest
- Track duration trends
- Optimize slow tests

### 4. Rich Test Reports

Enhance test runs with metadata:

- Browser versions (E2E tests)
- Environment information
- Build numbers
- Git commits and branches

### 5. Test Case Documentation

Document test cases directly in Testmo:

- Write test specifications
- Link automated tests to manual test cases
- Track test coverage

## Viewing Test Results

### Dashboard

Your Testmo dashboard shows:

- Latest test run status
- Pass/fail trends
- Flaky test alerts
- Test duration charts

### Individual Test Runs

Click on any test run to see:

- Detailed results for each test
- Error messages and stack traces
- Screenshots (for E2E tests)
- Test duration breakdown
- Environment metadata

### Comparing Runs

Compare test runs to identify:

- New failures
- Fixed tests
- Performance changes
- Coverage differences

## Best Practices

1. **Submit on Every Run**: Configure CI to submit results automatically
2. **Use Descriptive Names**: Include branch, commit, and timestamp in run names
3. **Add Metadata**: Include environment info, browser versions, etc.
4. **Monitor Trends**: Check dashboard weekly for patterns
5. **Fix Flaky Tests**: Address flaky tests as soon as they're detected
6. **Document Tests**: Link automated tests to manual test cases
7. **Set Up Alerts**: Configure notifications for test failures
8. **Regular Reviews**: Review test reports in team meetings

## Troubleshooting

### Authentication Errors

```
Error: Authentication failed
```

**Solution**: Verify your TESTMO_TOKEN is correct and hasn't expired

### Project Not Found

```
Error: Project not found
```

**Solution**: Check your TESTMO_PROJECT_ID matches your actual project

### No Test Results

```
Error: No test results found
```

**Solution**: Ensure tests have run and generated JUnit XML files in `test-results/`

### Timeout Issues

```
Error: Request timeout
```

**Solution**: Check your TESTMO_URL is correct and accessible

## Support

- **Testmo Documentation**: https://docs.testmo.com
- **Testmo Support**: https://support.testmo.com
- **Project Documentation**: See `docs/TESTING.md`

## Next Steps

After setup:

1. ✅ Create Testmo account
2. ✅ Configure environment variables
3. ✅ Run and submit first test results
4. ✅ Configure CI/CD pipeline
5. ✅ Set up notifications
6. 📊 Monitor dashboard regularly
7. 🔧 Address flaky tests
8. 📈 Track test trends
9. 📝 Document test cases
10. 🎯 Set coverage goals

Congratulations! Your test management platform is ready to use. 🎉
