#!/bin/bash

# Testmo Test Result Submission Script
# This script submits test results to Testmo for tracking and analysis

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${GREEN}Testmo Test Result Submission${NC}"
echo "================================"

# Check if Testmo CLI is installed
if ! command -v testmo &> /dev/null; then
    echo -e "${YELLOW}Testmo CLI not found. Installing...${NC}"
    npm install -g @testmo/testmo-cli
fi

# Load environment variables from .env.test if it exists
if [ -f .env.test ]; then
    echo -e "${GREEN}Loading environment from .env.test${NC}"
    export $(cat .env.test | grep -v '^#' | xargs)
fi

# Validate required environment variables
if [ -z "$TESTMO_URL" ]; then
    echo -e "${RED}Error: TESTMO_URL environment variable is not set${NC}"
    echo "Please set TESTMO_URL in .env.test or as an environment variable"
    exit 1
fi

if [ -z "$TESTMO_TOKEN" ]; then
    echo -e "${RED}Error: TESTMO_TOKEN environment variable is not set${NC}"
    echo "Please set TESTMO_TOKEN in .env.test or as an environment variable"
    exit 1
fi

# Set default project ID if not provided
TESTMO_PROJECT_ID=${TESTMO_PROJECT_ID:-1}

# Get git information for test run metadata
GIT_BRANCH=$(git rev-parse --abbrev-ref HEAD 2>/dev/null || echo "unknown")
GIT_COMMIT=$(git rev-parse --short HEAD 2>/dev/null || echo "unknown")
GIT_AUTHOR=$(git log -1 --pretty=format:'%an' 2>/dev/null || echo "unknown")

# Generate test run name
TIMESTAMP=$(date +"%Y-%m-%d %H:%M:%S")
TEST_RUN_NAME="${1:-Local Test Run} - $GIT_BRANCH@$GIT_COMMIT - $TIMESTAMP"

echo ""
echo "Configuration:"
echo "  Testmo URL: $TESTMO_URL"
echo "  Project ID: $TESTMO_PROJECT_ID"
echo "  Test Run: $TEST_RUN_NAME"
echo "  Branch: $GIT_BRANCH"
echo "  Commit: $GIT_COMMIT"
echo "  Author: $GIT_AUTHOR"
echo ""

# Check if test results exist
if [ ! -d "test-results" ] || [ -z "$(ls -A test-results/*.xml 2>/dev/null)" ]; then
    echo -e "${RED}Error: No test results found in test-results/ directory${NC}"
    echo "Please run tests first:"
    echo "  npm run test:unit"
    echo "  npm run test:e2e"
    exit 1
fi

# Count test result files
RESULT_COUNT=$(ls -1 test-results/*.xml 2>/dev/null | wc -l)
echo -e "${GREEN}Found $RESULT_COUNT test result file(s)${NC}"
ls -lh test-results/*.xml

echo ""
echo -e "${GREEN}Submitting test results to Testmo...${NC}"

# Submit test results
testmo automation:run:submit \
  --instance "$TESTMO_URL" \
  --project-id "$TESTMO_PROJECT_ID" \
  --name "$TEST_RUN_NAME" \
  --source "local" \
  --results test-results/*.xml \
  -- echo "Test results submitted successfully"

if [ $? -eq 0 ]; then
    echo ""
    echo -e "${GREEN}✓ Test results submitted successfully!${NC}"
    echo -e "View results at: $TESTMO_URL/automation/runs"
else
    echo ""
    echo -e "${RED}✗ Failed to submit test results${NC}"
    exit 1
fi


