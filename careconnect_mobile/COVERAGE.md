# Test Coverage

## Requirement

- **Minimum 60% line coverage** for the Flutter app (`careconnect_mobile`).
- **Accessibility tests are included** in coverage (they live in `test/` and run with `flutter test`).

## What counts toward coverage

- All tests under **`test/`**:
  - Unit tests (e.g. `test/providers/task_provider_test.dart`)
  - Widget/screen tests (e.g. `test/screens/dashboard_widget_test.dart`, `test/screens/accessibility_settings_screen_test.dart`)
  - **Accessibility guideline tests** (`test/accessibility_guideline_test.dart`) — tap targets, labels, etc.
- Coverage is collected for code in **`lib/`** when these tests run.

Integration tests under **`integration_test/`** run on a device/emulator and are not included in the same coverage run. They are run separately (e.g. `flutter test integration_test/`).

## How to run coverage

From the project root (`careconnect_mobile`):

```bash
# Run all tests (including accessibility) with coverage
flutter test --coverage
```

This produces `coverage/lcov.info`. To view an HTML report (optional):

```bash
# If you have lcov installed (e.g. brew install lcov)
genhtml coverage/lcov.info -o coverage/html
open coverage/html/index.html
```

## Enforcing the 60% minimum

Use the provided script to run tests and fail if coverage is below 60%:

```bash
./scripts/run_coverage.sh
```

The script:

1. Runs `flutter test --coverage` (all tests, including accessibility).
2. Parses `coverage/lcov.info` for total line coverage.
3. Exits with an error if line coverage is below 60%.

Use this in CI or locally before merging to ensure the 60% requirement is met.

## Increasing coverage

- Add unit tests for providers and models.
- Add widget tests for screens and widgets.
- Keep and extend **accessibility tests** in `test/accessibility_guideline_test.dart` (they count toward coverage and validate tap targets and labels).
