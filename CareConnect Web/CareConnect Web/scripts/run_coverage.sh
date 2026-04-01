#!/usr/bin/env bash
# Run Vitest with coverage; fails if below thresholds in vitest.config.ts (60%+).
set -e
cd "$(dirname "$0")/.."
npm run test:coverage
echo ""
echo "HTML report: coverage/lcov-report/index.html"
