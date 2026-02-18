# CareConnect

CareConnect is a mobile application designed to help users manage daily health tasks such as medications, appointments, physical therapy exercises, and emergency assistance. The app features a dashboard with daily task tracking, progress monitoring, accessibility settings (high contrast, large text, sound/vibration alerts, ASL help videos), missed task alerts, and an emergency SOS screen. The app emphasizes accessibility, clear navigation, and reliability.

The project contains two implementations:

- **CareConnectApp** — React Native (primary)
- **careconnect_mobile** — Flutter

---

## React Native App (CareConnectApp)

### Tech Stack & Versions

| Technology | Version |
|---|---|
| React Native | 0.79+ |
| React | 19.x |
| Jest | 29.6.3 (testing) |
| React Testing Library | 13.3.3 (component testing) |
| Maestro | E2E testing |
| lucide-react-native | Icons |

### Prerequisites

- **Node.js** 18+ and **npm**
- **Xcode** (for iOS) or **Android Studio** (for Android)
- **CocoaPods** (for iOS dependencies)

### How to Run the App

1. Install dependencies:

```bash
cd CareConnectApp
npm install
```

2. Install iOS pods:

```bash
cd ios && pod install && cd ..
```

3. Run the app:

```bash
npx react-native run-ios       # iOS simulator
npx react-native run-android   # Android emulator
```

### Testing

The React Native app has three levels of testing: unit/screen tests, integration tests, and end-to-end tests.

#### Unit and Screen Tests (Jest)

Unit tests cover individual screen rendering, user interactions, and navigation calls. Located in `src/__tests__/screens/`.

```bash
cd CareConnectApp
npx jest
```

#### Accessibility Tests (Jest)

Dedicated accessibility tests verify that all screens implement proper accessibility props (`accessibilityRole`, `accessibilityLabel`, `accessibilityHint`, touch target sizes, etc.). Located in `src/__tests__/accessibility/`.

```bash
npx jest src/__tests__/accessibility/
```

#### Integration Tests (Jest)

Integration tests render the full `<App />` component and test multi-screen navigation flows end-to-end within Jest. Located in `src/__tests__/integration/`.

```bash
npx jest src/__tests__/integration/ --verbose
```

**5 integration test flows:**

| Test | Flow |
|------|------|
| Welcome to Login to Dashboard | Full login flow with form input and simulated auth |
| Welcome to Register to Dashboard | Full registration with all form fields |
| Dashboard to Medications and back | Toggles a medication status, then navigates back |
| Dashboard to StepByStepTask and back | Opens exercise task, steps through, returns |
| Dashboard to Appointments to Detail and back | Drills into appointment detail and returns |

#### End-to-End Tests (Maestro)

E2E tests run on a real iOS Simulator or Android Emulator using [Maestro](https://maestro.mobile.dev). Located in `.maestro/`.

**Prerequisites:**

1. Install Maestro CLI:

```bash
curl -Ls "https://get.maestro.mobile.dev" | bash
```

2. Add Maestro to your PATH (add to `~/.zshrc` or `~/.bashrc`):

```bash
export PATH="$HOME/.maestro/bin:$PATH"
```

3. Start the app on a simulator/emulator:

```bash
npm run ios    # or npm run android
```

**Running E2E Tests:**

```bash
# Run all 5 Maestro flows
maestro test .maestro/

# Run a single flow
maestro test .maestro/flow_auth_login.yaml

# Interactive element inspector for debugging
maestro studio
```

**5 E2E test flows:**

| Flow File | Description |
|-----------|-------------|
| `flow_auth_login.yaml` | Login with email/password, verify dashboard |
| `flow_auth_register.yaml` | Register new account with all fields, verify dashboard |
| `flow_medication_management.yaml` | Login, toggle medication status, navigate back |
| `flow_task_completion.yaml` | Login, open step-by-step exercise task, navigate back |
| `flow_accessibility_navigation.yaml` | Login, toggle accessibility settings, visit ASL videos, navigate back |

**Platform App IDs:**

| Platform | App ID |
|----------|--------|
| iOS | `org.reactjs.native.example.CareConnectApp` |
| Android | `com.careconnectapp` |

The Maestro YAML files default to the iOS app ID. To run on Android, pass the app ID via CLI:

```bash
maestro test .maestro/ --app-id com.careconnectapp
```

### How to Run Code Coverage

1. Run tests with coverage:

```bash
cd CareConnectApp
npx jest --coverage
```

This prints a coverage summary table to the terminal and generates an HTML report.

2. Open the HTML report:

```bash
open coverage/lcov-report/index.html
```

### WCAG 2.1 Level AA Accessibility Compliance

CareConnect is designed to meet WCAG 2.1 Level AA standards across all 14 screens.

#### Perceivable

- **1.1.1 Non-Text Content (Level A):** All images have descriptive `accessibilityLabel` values. Decorative elements are hidden from screen readers with `importantForAccessibility="no"` and `accessibilityElementsHidden={true}`.
- **1.3.1 Info and Relationships (Level A):** Semantic roles used throughout (`header`, `button`, `link`, `checkbox`, `switch`, `progressbar`, `tab`, `alert`, `summary`, `image`). Form inputs have associated labels.
- **1.4.3 Contrast Minimum (Level AA):** Dark text on light backgrounds maintains contrast ratio above 4.5:1. High Contrast Mode toggle available in Accessibility Settings.
- **1.4.4 Resize Text (Level AA):** Large Text toggle in Accessibility Settings scales text sizes. Text uses responsive font sizing.

#### Operable

- **2.1.1 Keyboard (Level A):** All interactive elements accessible via screen reader focus traversal. Forms support keyboard input.
- **2.4.3 Focus Order (Level A):** Logical focus order follows visual layout. Modal alerts use `accessibilityViewIsModal={true}` to trap focus.
- **2.4.6 Headings and Labels (Level AA):** Section headings marked with `accessibilityRole="header"`. All buttons and form inputs have descriptive labels and hints.
- **2.5.5 Target Size (Level AAA, implemented for AA best practice):** All interactive elements meet or exceed 44x44px minimum touch targets.

#### Understandable

- **3.1.1 Language of Page (Level A):** `accessibilityLanguage="en-US"` set on WelcomeScreen.
- **3.2.3 Consistent Navigation (Level AA):** Back button placement consistent across all screens. Navigation patterns follow the same state-based model.
- **3.3.1 Error Identification (Level A):** Form buttons include `accessibilityState` for disabled/busy states during async operations.
- **3.3.2 Labels or Instructions (Level A):** All form fields have visible labels, placeholder text, and accessibility hints.

#### Robust

- **4.1.2 Name, Role, Value (Level A):** Every interactive element has an appropriate `accessibilityRole`. Stateful elements expose state via `accessibilityState`. Progress indicators use `accessibilityValue`. Dynamic content uses `accessibilityLiveRegion`.

#### Specialized Accessibility Features

| Feature | Screen | Description |
|---------|--------|-------------|
| ASL Help Videos | ASLHelpScreen | Video library with ASL interpretation and toggleable closed captions |
| Large Text Mode | AccessibilitySettings | Toggle to increase text size app-wide |
| High Contrast Mode | AccessibilitySettings | Toggle for enhanced color contrast |
| Reduced Motion | AccessibilitySettings | Toggle to minimize animations and transitions |
| Sound Alerts | AccessibilitySettings | Configurable audio notifications |
| Vibration Alerts | AccessibilitySettings | Haptic feedback for important events |
| Voice Announcements | AccessibilitySettings | Spoken notification support |
| Visual Alerts | AccessibilitySettings | On-screen notification indicators |
| Emergency SOS | SOSConfirmation | Accessible emergency calling with countdown and assertive announcements |

---

## Flutter App (careconnect_mobile)

### Tech Stack & Versions

| Technology | Version |
|---|---|
| Flutter | 3.38.9 (stable) |
| Dart SDK | ^3.10.4 |
| Riverpod | 2.5.1+ (state management) |
| GoRouter | 14.0.0+ (navigation) |

### Prerequisites

- **Flutter SDK** 3.38.x or later (stable channel)
- **Dart SDK** 3.10.4 or later (included with Flutter)
- **Xcode** (for iOS/macOS) or **Android Studio** (for Android)

Verify your setup:

```bash
flutter doctor
```

### How to Run the App

1. Install dependencies:

```bash
cd careconnect_mobile
flutter pub get
```

2. Run the app:

```bash
flutter run
```

Target a specific platform:

```bash
flutter run -d chrome    # Web
flutter run -d macos     # macOS desktop
flutter run -d ios       # iOS simulator
```

### How to Run Unit Tests

```bash
cd careconnect_mobile
flutter test
```

### How to Run Code Coverage

1. Run tests with coverage:

```bash
cd careconnect_mobile
flutter test --coverage
```

This generates a coverage file at `coverage/lcov.info`.

2. Generate an HTML report (requires `lcov`):

```bash
brew install lcov
genhtml coverage/lcov.info -o coverage/html
open coverage/html/index.html
```
