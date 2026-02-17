#!/usr/bin/env bash
# Run Flutter tests with coverage and enforce minimum 60% line coverage.
# Includes all tests in test/ (unit, widget, and accessibility tests).
set -e

cd "$(dirname "$0")/.."
COVERAGE_DIR=coverage
MIN_COVERAGE=60

echo "Running Flutter tests with coverage (includes accessibility tests)..."
flutter test --coverage

if [ ! -f "$COVERAGE_DIR/lcov.info" ]; then
  echo "Error: $COVERAGE_DIR/lcov.info not found"
  exit 1
fi

# Parse total line coverage from lcov.info (sum LH / sum LF)
TOTAL_LF=$(grep -E '^LF:' "$COVERAGE_DIR/lcov.info" | awk -F: '{ sum += $2 } END { print sum }')
TOTAL_LH=$(grep -E '^LH:' "$COVERAGE_DIR/lcov.info" | awk -F: '{ sum += $2 } END { print sum }')

if [ -z "$TOTAL_LF" ] || [ "$TOTAL_LF" -eq 0 ]; then
  echo "Error: Could not parse coverage (no LF lines)"
  exit 1
fi

COVERAGE_PCT=$(( TOTAL_LH * 100 / TOTAL_LF ))
echo ""
echo "Coverage: $TOTAL_LH / $TOTAL_LF lines ($COVERAGE_PCT%)"
echo "Minimum required: $MIN_COVERAGE%"

if [ "$COVERAGE_PCT" -lt "$MIN_COVERAGE" ]; then
  echo "FAIL: Coverage $COVERAGE_PCT% is below minimum $MIN_COVERAGE%"
  exit 1
fi

echo "PASS: Coverage meets minimum $MIN_COVERAGE%"
exit 0
