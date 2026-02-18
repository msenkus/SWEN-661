# CareConnect - React Native

CareConnect is an accessible healthcare companion app built with React Native. It helps users manage daily tasks, medications, appointments, and emergency contacts with a focus on inclusive design and WCAG 2.1 Level AA compliance.

## Screens

The app includes 14 screens with state-based navigation (defined in `App.tsx`):

| Screen | Description |
|--------|-------------|
| WelcomeScreen | Landing page with login/register options |
| LoginScreen | Email and password sign-in form |
| RegisterScreen | New account registration form |
| TodayDashboard | Daily schedule, progress tracker, and quick actions |
| MedicationsScreen | Medication list with taken/missed status toggles |
| AppointmentList | Upcoming appointments with filters |
| AppointmentDetail | Individual appointment info, directions, and actions |
| StepByStepTask | Guided exercise task with step-by-step instructions |
| TaskHistoryScreen | Weekly task completion history and stats |
| AccessibilitySettings | Customizable accessibility preferences |
| ASLHelpScreen | ASL help video library with captions |
| ProfileScreen | Patient profile with medical info and emergency contacts |
| SOSConfirmation | Emergency SOS call confirmation with countdown |
| MissedTaskAlert | Modal alert for missed daily tasks |

## Getting Started

> **Note**: Make sure you have completed the [React Native Environment Setup](https://reactnative.dev/docs/set-up-your-environment) guide before proceeding.

### Install Dependencies

```sh
npm install
```

### iOS Setup

```sh
bundle install
bundle exec pod install
```

### Start Metro

```sh
npm start
```

### Run the App

```sh
# iOS
npm run ios

# Android
npm run android
```

## Testing

The app has three levels of testing: unit/screen tests, integration tests, and end-to-end tests.

### Unit and Screen Tests (Jest)

Unit tests cover individual screen rendering, user interactions, and navigation calls. Located in `src/__tests__/screens/`.

```sh
# Run all Jest tests
npx jest

# Run with coverage report
npx jest --coverage

# Run a specific test file
npx jest src/__tests__/screens/LoginScreen.test.tsx
```

### Accessibility Tests (Jest)

Dedicated accessibility tests verify that all screens implement proper accessibility props (`accessibilityRole`, `accessibilityLabel`, `accessibilityHint`, touch target sizes, etc.). Located in `src/__tests__/accessibility/`.

```sh
npx jest src/__tests__/accessibility/
```

### Integration Tests (Jest)

Integration tests render the full `<App />` component and test multi-screen navigation flows end-to-end within Jest. Located in `src/__tests__/integration/`.

```sh
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

### End-to-End Tests (Maestro)

E2E tests run on a real iOS Simulator or Android Emulator using [Maestro](https://maestro.mobile.dev). Located in `.maestro/`.

#### Prerequisites

1. **Install Maestro CLI:**

```sh
curl -Ls "https://get.maestro.mobile.dev" | bash
```

2. **Add Maestro to your PATH** (add to `~/.zshrc` or `~/.bashrc`):

```sh
export PATH="$HOME/.maestro/bin:$PATH"
```

3. **Start the app** on a simulator/emulator:

```sh
npm run ios    # or npm run android
```

#### Running E2E Tests

```sh
# Run all 5 Maestro flows
maestro test .maestro/

# Run a single flow
maestro test .maestro/flow_auth_login.yaml
```

#### Debugging

```sh
# Interactive element inspector in the browser
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

#### Platform App IDs

| Platform | App ID |
|----------|--------|
| iOS | `org.reactjs.native.example.CareConnectApp` |
| Android | `com.careconnectapp` |

The Maestro YAML files default to the iOS app ID. To run on Android, update the `appId` field in each YAML file or pass it via CLI:

```sh
maestro test .maestro/ --app-id com.careconnectapp
```

## WCAG 2.1 Level AA Accessibility Compliance

CareConnect is designed to meet WCAG 2.1 Level AA standards across all 14 screens. The following outlines how each relevant success criterion is addressed.

### Perceivable

#### 1.1.1 Non-Text Content (Level A)
- All images have descriptive `accessibilityLabel` values (e.g., "Elderly couple enjoying life", "Profile photo of Eleanor Rigby")
- Decorative elements (gradients, overlays) are hidden from screen readers with `importantForAccessibility="no"` and `accessibilityElementsHidden={true}`
- Icons are paired with text labels or enclosed in accessible parent containers

#### 1.3.1 Info and Relationships (Level A)
- Semantic roles are used throughout: `header`, `button`, `link`, `checkbox`, `switch`, `progressbar`, `tab`, `alert`, `summary`, `image`
- Headings marked with `accessibilityRole="header"` for proper screen reader navigation
- Form inputs have associated visible labels and `accessibilityLabel` props
- Related content is grouped within accessible containers

#### 1.4.3 Contrast (Minimum) (Level AA)
- Dark text (#0F172A, #334155) on light backgrounds (#FFFFFF, #F8FAFC) maintains a contrast ratio above 4.5:1
- White text on colored backgrounds (#2563EB, #22C55E, #EF4444) meets contrast requirements
- High Contrast Mode toggle available in Accessibility Settings for enhanced visibility

#### 1.4.4 Resize Text (Level AA)
- Base font sizes range from 12px to 36px with readable line heights
- Large Text toggle in Accessibility Settings scales text from 14px to 20px
- Text uses responsive font sizing (`adjustsFontSizeToFit` where appropriate)

### Operable

#### 2.1.1 Keyboard (Level A)
- All interactive elements are accessible via screen reader focus traversal
- Form fields support keyboard input with `keyboardShouldPersistTaps="handled"` on scroll containers
- Logical focus order follows visual layout (top-to-bottom, left-to-right)

#### 2.4.3 Focus Order (Level A)
- Navigation follows a consistent, logical order within each screen
- Back buttons are consistently placed at the top-left of each screen
- Modal alerts (MissedTaskAlert) use `accessibilityViewIsModal={true}` to trap focus

#### 2.4.6 Headings and Labels (Level AA)
- Section headings are marked with `accessibilityRole="header"` (e.g., "Today's Schedule", "Medications", "Visual", "Audio")
- All buttons have descriptive `accessibilityLabel` values explaining their purpose
- All form inputs have `accessibilityLabel` and `accessibilityHint` describing expected input

#### 2.5.5 Target Size (Level AAA, implemented for AA best practice)
- All interactive elements meet or exceed 44x44px minimum touch targets
- Buttons use `minHeight: 48` throughout the app
- Icon-only buttons (back, toggle visibility) enforce `minWidth: 44, minHeight: 44`

### Understandable

#### 3.1.1 Language of Page (Level A)
- `accessibilityLanguage="en-US"` set on WelcomeScreen for iOS screen readers

#### 3.2.3 Consistent Navigation (Level AA)
- Back button placement is consistent across all screens (top-left with ArrowLeft icon)
- Quick action grid layout is consistent on the dashboard
- Navigation patterns follow the same state-based model throughout the app

#### 3.3.1 Error Identification (Level A)
- Form buttons include `accessibilityState={{ disabled: loading, busy: loading }}` during async operations
- Loading states show `ActivityIndicator` to provide visual feedback

#### 3.3.2 Labels or Instructions (Level A)
- All form fields have visible labels, placeholder text, and accessibility hints
- Hints describe expected format (e.g., "Enter your email to sign in", "Create a password for your account")

### Robust

#### 4.1.2 Name, Role, Value (Level A)
- Every interactive element has an appropriate `accessibilityRole`
- Stateful elements expose their state via `accessibilityState` (`checked`, `selected`, `disabled`, `busy`)
- Progress indicators use `accessibilityValue` with `min`, `max`, and `now` values
- Dynamic content uses `accessibilityLiveRegion` ("polite" for step progress, "assertive" for emergency countdowns)

### Specialized Accessibility Features

| Feature | Screen | Description |
|---------|--------|-------------|
| ASL Help Videos | ASLHelpScreen | Video library with ASL interpretation and toggleable closed captions |
| Large Text Mode | AccessibilitySettings | Toggle to increase text size app-wide with real-time preview |
| High Contrast Mode | AccessibilitySettings | Toggle for enhanced color contrast |
| Reduced Motion | AccessibilitySettings | Toggle to minimize animations and transitions |
| Sound Alerts | AccessibilitySettings | Configurable audio notifications |
| Vibration Alerts | AccessibilitySettings | Haptic feedback for important events |
| Voice Announcements | AccessibilitySettings | Spoken notification support |
| Visual Alerts | AccessibilitySettings | On-screen notification indicators |
| Emergency SOS | SOSConfirmation | Accessible emergency calling with countdown and assertive announcements |

## Project Structure

```
CareConnectApp/
  App.tsx                        # Root component with state-based navigation
  src/
    screens/                     # 14 app screens
    __tests__/
      screens/                   # Unit tests for each screen
      accessibility/             # Accessibility-specific tests
      integration/               # Full-app integration tests
      unit/                      # Navigation logic tests
  .maestro/                      # Maestro E2E test flows
  __mocks__/                     # Jest mocks (Ionicons)
  jest.config.js                 # Jest configuration
```

## Troubleshooting

If you're having issues, see the [React Native Troubleshooting](https://reactnative.dev/docs/troubleshooting) page.
