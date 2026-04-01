# Test coverage (CareConnect Web — React + Vite)

## Requirement

- **Minimum 60%** global coverage for **statements, branches, functions, and lines** (`vitest.config.ts` → `coverage.thresholds`).
- The **HTML report** under `coverage/lcov-report/` is committed so it can be opened without running tests.

## What is measured

Coverage is collected for the paths listed under `coverage.include` in `vitest.config.ts` (screens, layouts, store, hooks, selected UI helpers). **E2E** tests (`e2e/`, Playwright) are separate and not included in this report.

The same bundle runs in **modern browsers**; this is one report for the tested **React** surface, not separate per-browser HTML outputs.

## Commands

```bash
cd "CareConnect Web/CareConnect Web"
npm install
npm run test:coverage
```

Or:

```bash
./scripts/run_coverage.sh
```

Open the report:

```bash
open coverage/lcov-report/index.html
```

Raw files such as `coverage/lcov.info` and `coverage/coverage-final.json` stay gitignored when generated locally.
