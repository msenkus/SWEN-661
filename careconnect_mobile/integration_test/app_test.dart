import 'package:careconnect_mobile/main.dart';
import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:integration_test/integration_test.dart';

/// Integration tests for CareConnect (Flutter).
/// See: https://docs.flutter.dev/cookbook/testing/integration/introduction
///
/// Run with: flutter test integration_test/app_test.dart
/// (Select a device when prompted, e.g. Android emulator or iOS simulator)

void main() {
  IntegrationTestWidgetsFlutterBinding.ensureInitialized();

  group('CareConnect integration tests', () {
    testWidgets('Login screen loads and shows Sign In', (WidgetTester tester) async {
      await tester.pumpWidget(const ProviderScope(child: CareConnectApp()));
      await tester.pumpAndSettle();

      expect(find.text('Sign In'), findsOneWidget);
      expect(find.text('CareConnect'), findsOneWidget);
    });

    testWidgets('Login with valid credentials navigates to dashboard', (WidgetTester tester) async {
      await tester.pumpWidget(const ProviderScope(child: CareConnectApp()));
      await tester.pumpAndSettle();

      await tester.enterText(find.byKey(const Key('login_email')), 'test@example.com');
      await tester.enterText(find.byKey(const Key('login_password')), 'password123');
      await tester.tap(find.byKey(const Key('login_submit')));
      await tester.pump();

      // App uses a 1.5s delay before navigating; wait for it
      await tester.pump(const Duration(milliseconds: 1600));
      await tester.pumpAndSettle();

      expect(find.text("Today's Tasks"), findsOneWidget);
    });

    testWidgets('Open Accessibility settings from dashboard', (WidgetTester tester) async {
      await tester.pumpWidget(const ProviderScope(child: CareConnectApp()));
      await tester.pumpAndSettle();

      // If we're still on login (e.g. first run), log in first. Router may stay on /dashboard from previous test.
      if (tester.widgetList(find.byKey(const Key('login_email'))).isNotEmpty) {
        await tester.enterText(find.byKey(const Key('login_email')), 'test@example.com');
        await tester.enterText(find.byKey(const Key('login_password')), 'password123');
        await tester.tap(find.byKey(const Key('login_submit')));
        await tester.pump(const Duration(milliseconds: 1600));
        await tester.pumpAndSettle();
      }

      expect(find.text("Today's Tasks"), findsOneWidget);

      await tester.tap(find.byKey(const Key('btn_accessibility')));
      await tester.pumpAndSettle();

      expect(find.text('Accessibility'), findsOneWidget);
      expect(find.byKey(const Key('toggle_high_contrast')), findsOneWidget);
    });
  });
}
