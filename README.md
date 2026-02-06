# CareConnect Mobile

CareConnect is a Flutter mobile application designed to help users manage daily health tasks such as medications, appointments, physical therapy exercises, and emergency assistance. The app features a dashboard with daily task tracking, progress monitoring, accessibility settings (high contrast, large text, sound/vibration alerts, ASL help videos), missed task alerts, and an emergency SOS screen. The app emphasizes accessibility, clear navigation, and reliability.

---

## Tech Stack & Versions

| Technology | Version |
|---|---|
| Flutter | 3.38.9 (stable) |
| Dart SDK | ^3.10.4 |
| Riverpod | 2.5.1+ (state management) |
| GoRouter | 14.0.0+ (navigation) |

---

## Prerequisites

- **Flutter SDK** 3.38.x or later (stable channel)
- **Dart SDK** 3.10.4 or later (included with Flutter)
- **Xcode** (for iOS/macOS) or **Android Studio** (for Android)
- A simulator/emulator or physical device

Verify your setup:

```bash
flutter doctor
```

---

## How to Run the Application

1. Install dependencies:

```bash
cd careconnect_mobile
flutter pub get
```

2. Run the app:

```bash
flutter run
```

This will launch the app on your connected device or emulator. You can also target a specific platform:

```bash
flutter run -d chrome    # Web
flutter run -d macos     # macOS desktop
flutter run -d ios       # iOS simulator
```

---

## How to Run Unit Tests

Run all tests from the `careconnect_mobile` directory:

```bash
cd careconnect_mobile
flutter test
```

---

## How to Run Code Coverage

1. Run tests with coverage enabled:

```bash
cd careconnect_mobile
flutter test --coverage
```

This generates a coverage file at `coverage/lcov.info`.

2. To generate an HTML report (requires `lcov`):

```bash
brew install lcov
genhtml coverage/lcov.info -o coverage/html
open coverage/html/index.html
```

The HTML report will open in your browser showing line-by-line coverage for each source file.
