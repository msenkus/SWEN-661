import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:go_router/go_router.dart';

import 'package:careconnect_mobile/screens/accessibility_settings_screen.dart';

Widget _harness({required GoRouter router}) {
  return MaterialApp.router(routerConfig: router);
}

void main() {
  late GoRouter router;

  setUp(() {
    router = GoRouter(
      routes: [
        GoRoute(
          path: '/',
          builder: (_, __) =>
              const AccessibilitySettingsScreen(),
        ),
        GoRoute(
          path: '/asl-help',
          builder: (_, __) =>
              const Scaffold(body: Text('ASL Help Screen')),
        ),
      ],
    );
  });

  testWidgets('Accessibility screen renders', (tester) async {
    await tester.pumpWidget(_harness(router: router));
    expect(find.byType(Scaffold), findsOneWidget);
  });

  testWidgets('Header card renders', (tester) async {
    await tester.pumpWidget(_harness(router: router));
    expect(find.byKey(const Key('accessibility_header')),
        findsOneWidget);
  });

  testWidgets('Visual section toggles render', (tester) async {
    await tester.pumpWidget(_harness(router: router));

    expect(find.byKey(const Key('toggle_high_contrast')),
        findsOneWidget);
    expect(find.byKey(const Key('toggle_large_text')),
        findsOneWidget);
  });

  testWidgets('Tapping large text toggle updates preview',
      (tester) async {
    await tester.pumpWidget(_harness(router: router));

    // Initial state: large text enabled → bigger font
    final previewBefore =
        tester.widget<Text>(
          find.textContaining('This is how your text'),
        );
    expect(previewBefore.style!.fontSize, 22);

    // Toggle off
    await tester.tap(
      find.byKey(const Key('toggle_large_text_switch')),
    );
    await tester.pump();

    final previewAfter =
        tester.widget<Text>(
          find.textContaining('This is how your text'),
        );
    expect(previewAfter.style!.fontSize, 16);
  });

  testWidgets('Notification chips render', (tester) async {
    await tester.pumpWidget(_harness(router: router));

    expect(find.byKey(const Key('notification_chips')),
        findsOneWidget);
    expect(find.byKey(const Key('chip_Sound')),
        findsOneWidget);
    expect(find.byKey(const Key('chip_Vibration')),
        findsOneWidget);
  });

  testWidgets('Toggling sound alerts removes chip',
      (tester) async {
    await tester.pumpWidget(_harness(router: router));

    expect(find.byKey(const Key('chip_Sound')),
        findsOneWidget);

    await tester.tap(
      find.byKey(const Key('toggle_sound_alerts_switch')),
    );
    await tester.pump();

    expect(find.byKey(const Key('chip_Sound')),
        findsNothing);
  });

  testWidgets('ASL help button navigates', (tester) async {
    await tester.pumpWidget(_harness(router: router));

    await tester.tap(
      find.byKey(const Key('asl_help_button')),
    );
    await tester.pumpAndSettle();

    expect(find.text('ASL Help Screen'), findsOneWidget);
  });
}
