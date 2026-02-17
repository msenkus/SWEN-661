# CareConnect Mobile

A Flutter mobile app for managing health tasks, medications, appointments, and caregiver communication. Built with accessibility (WCAG 2.1) and screen reader support in mind.

---

## Part 3: Documentation of assignment grade

### Project description

CareConnect Mobile is a Flutter application that helps users manage their health journey: daily tasks (medications, meals, appointments, exercises), progress tracking, and communication with caregivers. The app includes an Emergency SOS flow, accessibility settings (dark mode, high contrast, large text, reduced motion), ASL help resources, and a WCAG 2.1–oriented theme and semantics so that it works well with screen readers (TalkBack, VoiceOver) and meets contrast and touch-target guidelines.

### How to run the app

1. **Prerequisites:** Install the [Flutter SDK](https://flutter.dev) and ensure a device or emulator is available (Android or iOS).
2. From the project root (`careconnect_mobile`):
   ```bash
   flutter pub get
   flutter run
   ```
3. Select the target device when prompted (e.g. Android emulator or iOS simulator).
4. The app will launch to the login screen; you can then sign in and use the dashboard, medications, appointments, profile, and accessibility settings.

### How to run tests

- **All unit and widget tests (including accessibility guideline tests):**
  ```bash
  flutter test
  ```
- **With coverage** (produces `coverage/lcov.info`):
  ```bash
  flutter test --coverage
  ```
- **Enforce minimum 60% line coverage:**
  ```bash
  ./scripts/run_coverage.sh
  ```
- **Accessibility guideline tests only:**
  ```bash
  flutter test test/accessibility_guideline_test.dart
  ```
- **Integration tests** (requires a connected device or emulator):
  ```bash
  flutter test integration_test/
  ```

See [COVERAGE.md](COVERAGE.md) for details on what counts toward coverage and how to generate the HTML report.

### Link to test coverage report

Coverage is generated locally. After running:

```bash
flutter test --coverage
genhtml coverage/lcov.info -o coverage/html
open coverage/html/index.html
```

the report is available at **`coverage/html/index.html`** (open in a browser). If your course uses a published report (e.g. CI artifact or GitHub Pages), add that URL here.

### Known issues or limitations

- Integration tests in `integration_test/` are not included in the same `flutter test --coverage` run; run them separately on a device/emulator.
- High contrast and dark mode preferences are persisted via SharedPreferences and are applied on next app launch or when the theme is re-read.
- Some screens (e.g. SOS, missed tasks) depend on GoRouter and ProviderScope in tests; test harnesses wrap widgets with the appropriate router and `ProviderScope` where needed.
- Maestro E2E flows require Maestro CLI and a running device/emulator; see [.maestro/README.md](.maestro/README.md).

### Team member contributions this week

*(Replace with a short summary of what each team member did this week, e.g. features, tests, docs, bug fixes.)*

### AI usage summary (what did AI help with?)

*(Replace with a brief summary of how AI was used on this assignment. For example: test fixes for GoRouter/ProviderScope in widget tests; adding tests to improve coverage for providers, theme, bottom nav, and screens (SOS, login); drafting README and coverage documentation; debugging failing tests. Be specific and honest per your course’s AI policy.)*

---

## Getting Started (quick reference)

- **Prerequisites:** Flutter SDK (see [flutter.dev](https://flutter.dev)).
- **Run:** `flutter pub get` then `flutter run` (select Android or iOS device/emulator).
- **Test:** `flutter test`
- **Integration tests:** `flutter test integration_test/app_test.dart` (requires a connected device or emulator; see [Flutter integration testing](https://docs.flutter.dev/cookbook/testing/integration/introduction)).
- **Coverage:** Minimum **60% line coverage** required. Run `./scripts/run_coverage.sh` to run all tests (including accessibility tests) with coverage and enforce the minimum. See [COVERAGE.md](COVERAGE.md).

---

## Accessibility

CareConnect implements WCAG 2.1–aligned accessibility and Flutter’s accessibility guidelines. Details are in [ACCESSIBILITY.md](ACCESSIBILITY.md).

### Accessibility Features Implemented

| Feature | Description |
|--------|-------------|
| **Semantics** | All interactive elements (buttons, links, switches, form fields) have `Semantics` with meaningful labels for screen readers. |
| **Screen reader labels** | Labels describe the control and, where relevant, state (e.g. “Dark Mode, switch, on”; “Remember me, checkbox, unchecked”). Headings use `Semantics(header: true)`. |
| **Focus order** | `FocusTraversalGroup` ensures logical keyboard/tab order (top to bottom, left to right). |
| **Color contrast** | Text and UI meet WCAG 2.1 (4.5:1 normal text, 3:1 large text and UI). High Contrast mode uses black/white (21:1). |
| **Touch targets** | All tappable areas are at least **48×48** logical pixels (theme and per-widget checks). |
| **Text scaling** | Support for system text scaling up to **200%** (0.8×–2.0×) in the root builder. |
| **Keyboard** | Full keyboard support: Tab/Enter to move and activate, Escape to go back/dismiss. |
| **Dark mode** | User-selectable dark theme (Profile → Preferences & Accessibility → Dark Mode). |
| **High contrast** | User-selectable high-contrast theme (Profile → Preferences & Accessibility → High Contrast Mode). |
| **Reduced motion** | Option to minimize animations (accessibility settings). |
| **Overscroll** | No stretch/glow overscroll on Android; content does not stretch when scrolling. |

### Running Flutter Accessibility Guideline Tests

The project uses [Flutter’s AccessibilityGuideline](https://api.flutter.dev/flutter/flutter_test/AccessibilityGuideline-class.html) tests to enforce tap target size, labels, and text contrast.

**Run all accessibility guideline tests:**

```bash
flutter test test/accessibility_guideline_test.dart
```

**Guidelines covered:**

- **androidTapTargetGuideline** – Tappable nodes at least 48×48 px (Android).
- **iOSTapTargetGuideline** – Tappable nodes at least 44×44 px (iOS).
- **labeledTapTargetGuideline** – Every tappable node has a semantic label.
- **textContrastGuideline** – Text meets contrast requirements (WCAG).

Screens under test include Login and Accessibility Settings; more screens can be added to the same file.

### Testing with TalkBack (Android)

1. Enable **TalkBack**: Settings → Accessibility → TalkBack → On (or use volume-key shortcut if configured).
2. Navigate: swipe left/right to move focus, double-tap to activate.
3. **Suggested checks:**
   - Login: labels for email, password, show/hide password, Remember me, Forgot password, Sign in, Sign up.
   - Dashboard: “Today’s Tasks”, progress, quick actions (Medications, Appointments, etc.), task list, SOS.
   - Profile: section headings, “Preferences & Accessibility”, list items.
   - Medications: each medication name, time, notes, “Taken” / “Mark as taken”.
   - Accessibility settings: each toggle (High Contrast, Large Text, Dark Mode, etc.) and its state.

### Testing with VoiceOver (iOS)

1. Enable **VoiceOver**: Settings → Accessibility → VoiceOver → On (or ask Siri).
2. Navigate: swipe left/right to move focus, double-tap to activate.
3. Use the same flows as for TalkBack and confirm that every interactive element is announced with a clear label and state where applicable.

### Video: Screen Reader Demonstration (2–3 minutes)

Record a **2–3 minute** video that shows:

1. **Setup** – Enabling TalkBack (Android) or VoiceOver (iOS).
2. **Login** – Moving through the login screen and announcing fields and buttons.
3. **Main flow** – Navigating to Dashboard (or Home), then one of: Medications, Appointments, or Profile.
4. **Accessibility settings** – Opening Preferences & Accessibility and toggling at least one option (e.g. Dark Mode or High Contrast) and showing that the label/state is announced.
5. **Optional** – One more flow (e.g. task list, SOS, or ASL help) to show consistency.

**Tips:** Use a device or emulator with the screen reader on; speak over the video or add captions so the viewer can tell what is being announced.

---

## E2E Tests (Maestro)

The project uses [Maestro](https://maestro.mobile.dev/getting-started/installation) for end-to-end tests (recommended over Detox for this setup).

**Install Maestro:** `curl -Ls "https://get.maestro.mobile.dev" | bash`

**Run all E2E flows:** `maestro test .maestro/flows/`  
**Run one flow:** `maestro test .maestro/flows/01-login-to-dashboard.yaml`

There are **5 critical user flows** in `.maestro/flows/`:

1. **01-login-to-dashboard** – Login with email/password and reach the dashboard.
2. **02-dashboard-to-medications** – From dashboard, open Medications.
3. **03-open-accessibility-settings** – From app bar, open Accessibility settings.
4. **04-profile-preferences** – Profile tab → Preferences & Accessibility.
5. **05-accessibility-navigation** – Accessibility-focused: open settings and assert all key options (High Contrast, Dark Mode, Large Text, ASL Help). Use with **TalkBack** (Android) or **VoiceOver** (iOS) enabled to validate screen reader navigation.

See [.maestro/README.md](.maestro/README.md) for full instructions and accessibility testing notes.

---

## Project Structure

- `lib/` – App code (screens, widgets, theme, providers, router).
- `lib/theme/` – Light, dark, and high-contrast themes; WCAG-oriented colors.
- `lib/providers/` – Dark mode and high contrast persistence (Riverpod + SharedPreferences).
- `test/` – Unit and widget tests; `test/accessibility_guideline_test.dart` for accessibility guidelines.
- `integration_test/` – Flutter integration tests.
- `.maestro/flows/` – Maestro E2E flows (3–5 critical user flows, including accessibility-focused).

## License

Private / educational use as required by your course or institution.
