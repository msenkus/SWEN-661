import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';

import 'package:careconnect_mobile/screens/dashboard_screen.dart';

Widget _harness({required GoRouter router}) {
  return ProviderScope(
    child: MaterialApp.router(routerConfig: router),
  );
}

void main() {
  late GoRouter router;

  setUp(() {
    router = GoRouter(
      routes: [
        GoRoute(
          path: '/',
          builder: (_, __) => const DashboardScreen(),
        ),
        GoRoute(
          path: '/accessibility',
          builder: (_, __) =>
              const Scaffold(body: Text('Accessibility Screen')),
        ),
        GoRoute(
          path: '/sos',
          builder: (_, __) =>
              const Scaffold(body: Text('SOS Screen')),
        ),
      ],
    );
  });

  testWidgets('Dashboard renders without crashing', (tester) async {
    await tester.pumpWidget(_harness(router: router));
    expect(find.byType(Scaffold), findsOneWidget);
  });

  testWidgets('AppBar title renders', (tester) async {
    await tester.pumpWidget(_harness(router: router));
    expect(find.text("Today's Tasks"), findsOneWidget);
  });

  testWidgets('Progress card renders', (tester) async {
    await tester.pumpWidget(_harness(router: router));
    expect(find.byKey(const Key('progress_card')), findsOneWidget);
  });

  testWidgets('Quick action buttons render', (tester) async {
    await tester.pumpWidget(_harness(router: router));

    expect(find.text('Medications'), findsOneWidget);
    expect(find.text('Appointments'), findsOneWidget);
    expect(find.text('History'), findsOneWidget);
    expect(find.text('Settings'), findsOneWidget);
  });

  testWidgets('Notification icon renders', (tester) async {
    await tester.pumpWidget(_harness(router: router));
    expect(find.byIcon(Icons.notifications_outlined), findsOneWidget);
  });

  testWidgets('Accessibility button navigates', (tester) async {
    await tester.pumpWidget(_harness(router: router));

    await tester.tap(find.byKey(const Key('btn_accessibility')));
    await tester.pumpAndSettle();

    expect(find.text('Accessibility Screen'), findsOneWidget);
  });

  testWidgets('SOS button renders', (tester) async {
    await tester.pumpWidget(_harness(router: router));
    expect(find.byKey(const Key('btn_sos')), findsOneWidget);
  });

  testWidgets('SOS button navigates', (tester) async {
    await tester.pumpWidget(_harness(router: router));

    await tester.tap(find.byKey(const Key('btn_sos')));
    await tester.pumpAndSettle();

    expect(find.text('SOS Screen'), findsOneWidget);
  });
}
