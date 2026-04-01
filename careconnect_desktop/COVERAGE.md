# Test coverage (CareConnect Electron app)

This package is the **Electron** shell (main/preload) plus a **React renderer** (Vite). Automated coverage is from **Jest** in **Node + jsdom**—the same renderer code ships inside the Electron window; **Windows** is the primary `electron-builder` target today, with one shared TypeScript/React codebase.

## Requirement

- **Minimum 60%** global coverage for **statements, branches, functions, and lines** (`jest.config.cjs` → `coverageThreshold`).
- The **HTML report** under `coverage/lcov-report/` is committed so it can be opened without running tests.

## What is measured

- **Renderer:** `src/renderer/screens/**`, `src/renderer/context/**`
- **Main process (partial):** `src/main/ipc.ts`, `src/main/window.ts` (integration-style tests)
- **Shared:** `src/shared/**`

`App.tsx`, layout components, and other main files are intentionally **out of scope** for the current `collectCoverageFrom` list so the threshold stays meaningful; extend that list when you add tests for those modules.

## Commands

```bash
cd careconnect_desktop
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

Raw files such as `coverage/lcov.info` and `coverage/coverage-final.json` remain gitignored when generated locally.
