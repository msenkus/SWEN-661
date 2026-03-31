#!/usr/bin/env bash
# Run Jest with coverage; fails if below thresholds in jest.config.js (60%+).
set -e
cd "$(dirname "$0")/.."
npm run test:coverage
echo ""
echo "HTML report: coverage/lcov-report/index.html"
