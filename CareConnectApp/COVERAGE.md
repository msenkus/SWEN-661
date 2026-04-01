# Test coverage (React Native)

## Requirement

- **Minimum 60%** global coverage for **statements, branches, functions, and lines** (enforced in `jest.config.js`).
- The **HTML report** under `coverage/lcov-report/` is committed so reviewers can open it without running tests.

## What it covers

- Jest runs in Node and instruments **`App.tsx`** and **`src/**/*.js`** (excluding `src/__tests__/**`).
- **iOS and Android** ship the same JavaScript bundle; this is one report for shared app code, not separate native per-platform metrics.

## App router (`App.tsx`)

Integration tests cover most routes. **`App`** accepts an optional **`initialScreen`** prop (used in tests) to mount a specific screen so every `switch` branch—including **`profile`**, **`missed-tasks`**, and the **`default`** fallback—can be exercised without dead code in production UI.

## Commands

```bash
cd CareConnectApp
npm install          # first time
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

Raw artifacts (`coverage/lcov.info`, `coverage/coverage-final.json`, and duplicate HTML outside `lcov-report/`) stay gitignored when present locally.
