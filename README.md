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

### How to Run Unit Tests

```bash
cd CareConnectApp
npx jest
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
