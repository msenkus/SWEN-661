# Maestro E2E Tests

End-to-end tests for CareConnect (Flutter) using [Maestro](https://maestro.mobile.dev/).

## Installation

1. Install Maestro (one-time):
   ```bash
   curl -Ls "https://get.maestro.mobile.dev" | bash
   ```
   If `maestro` is not found, add it to PATH:
   ```bash
   echo 'export PATH="$HOME/.maestro/bin:$PATH"' >> ~/.zshrc && source ~/.zshrc
   ```

## Before running flows (required)

Maestro must be able to **launch** the app. If you see **"Unable to launch app com.example.careconnect_mobile"**, the app is not installed or no device is selected.

**Step 1 – Start an Android device**

- Start an Android emulator (Android Studio → Device Manager → Run), or connect a physical Android device with USB debugging on.

**Step 2 – Install the app on that device**

From the project root (`careconnect_mobile`):

```bash
# List devices; note the device id (e.g. emulator-5554)
flutter devices
```

Then either:

**Option A – Install debug build (recommended)**

```bash
flutter build apk --debug
flutter install -d emulator-5554
```

If `flutter install` tries to use a release APK and fails, install the debug APK directly with adb:

```bash
adb -s emulator-5554 install build/app/outputs/flutter-apk/app-debug.apk
```

(Replace `emulator-5554` with your device id from `flutter devices`.)

**Option B – Run once, then quit (app stays installed)**

```bash
flutter run -d emulator-5554
# When the app is open, press 'q' to quit (app stays installed)
```

**Step 3 – Run Maestro**

```bash
maestro test .maestro/flows/
```

**Note:** The flow files use the **Android** application ID `com.example.careconnect_mobile`. For **iOS** the bundle ID is `com.example.careconnectMobile`; use an Android device/emulator for the flows as written, or duplicate flows and set `appId: com.example.careconnectMobile` for iOS.

## Running Tests

- **All flows:**
  ```bash
  maestro test .maestro/flows/
  ```
- **Single flow:**
  ```bash
  maestro test .maestro/flows/01-login-to-dashboard.yaml
  ```
- **With a specific app (if multiple installed):**
  ```bash
  maestro test --app-id com.example.careconnect_mobile .maestro/flows/
  ```

## Why coordinate taps and limited assertions?

On **Android**, Flutter’s semantics (e.g. `Semantics(label: '...')`) are not always exposed to the accessibility tree that Maestro uses. So:

- **Login**: We tap the email and password fields by **position** (e.g. `50%, 42%` and `pressKey: tab`) and assert on "Today's Tasks" (app bar has explicit Semantics).
- **Medications**: We tap the first quick action by **position** (`25%, 48%`) and assert the **app bar title** "Medications" (Semantics added in app).
- **Profile**: We tap the **Profile** tab by **position** (`90%, 97%`) and assert the Profile screen app bar.
- **Accessibility**: We assert only the **app bar** "Accessibility"; list items like "High Contrast Mode" often aren’t findable by Maestro.

So the flows are written to **succeed on Android** by using coordinates where text isn’t in the tree, and by asserting only on app bar titles we expose via Semantics. For full content checks, use **Flutter integration tests** or **manual + TalkBack**.

## Flows (3–5 critical user flows)

| Flow | Description |
|------|-------------|
| `01-login-to-dashboard.yaml` | **Login → Dashboard** – Enter credentials, submit, assert dashboard. |
| `02-dashboard-to-medications.yaml` | **Dashboard → Medications** – Login, tap Medications, assert medications screen. |
| `03-open-accessibility-settings.yaml` | **App bar → Accessibility** – Login, tap Accessibility settings icon, assert Accessibility screen. |
| `04-profile-preferences.yaml` | **Profile → Preferences** – Login, tap Profile, tap Preferences & Accessibility, assert settings. |
| `05-accessibility-navigation.yaml` | **Accessibility-focused** – Login, open Accessibility settings, assert Accessibility screen. Use with TalkBack/VoiceOver for manual screen reader validation. |

## Accessibility-focused testing

- **Flow 05** asserts that every important accessibility setting is visible (and thus focusable/announceable).
- To validate **screen reader navigation**: enable **TalkBack** (Android) or **VoiceOver** (iOS), then run:
  ```bash
  maestro test .maestro/flows/05-accessibility-navigation.yaml
  ```
  Confirm that each step (Sign In, Email, Password, Dashboard, Accessibility settings, toggles) is announced correctly.

## App ID

- Android: `com.example.careconnect_mobile`
- iOS: `com.example.careconnectMobile` (flows are written for Android; use Android device/emulator).

## Troubleshooting

**"Unable to launch app com.example.careconnect_mobile"**

1. Confirm an **Android** emulator or device is running: `flutter devices`
2. Install the app on it: `flutter install -d <device-id>`
3. Run Maestro again: `maestro test .maestro/flows/`

**Multiple devices:** If more than one device is connected, Maestro may pick the wrong one. Unplug other devices or shut down other emulators, or use `maestro test -e deviceId=<id> .maestro/flows/` (see `maestro test --help`).
