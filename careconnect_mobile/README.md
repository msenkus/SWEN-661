# careconnect_mobile
# CareConnect Mobile App

CareConnect is a Flutter mobile application for managing daily health tasks such as medications, appointments, physical therapy, and emergency assistance. The app emphasizes accessibility, clear navigation, and reliability.

---

## Tech Stack

- Flutter (Material)
- Dart
- flutter_riverpod (state management)
- go_router (navigation)
- flutter_test (testing)

---

## Build Instructions

### Prerequisites
- Flutter SDK (stable)
- Android Studio or VS Code
- Android emulator or physical device

Verify setup:
flutter doctor

Install Dependencies
flutter pub get

Run the App
flutter run

Testing Instructions

Run All Tests
flutter test

Run Tests With Coverage
flutter test --coverage

Coverage output:
coverage/lcov.info

Known Issues

Medication Screen Overflow:

Some medication cards may overflow on smaller screens due to long text.
Planned fix: adaptive layout using Flexible / TextOverflow.ellipsis.

Authentication:

Login screen uses simulated authentication only.