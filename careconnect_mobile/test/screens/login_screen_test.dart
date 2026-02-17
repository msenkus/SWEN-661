import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:go_router/go_router.dart';

import 'package:careconnect_mobile/screens/login_screen.dart';

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
          builder: (_, __) => const LoginScreen(),
        ),
        GoRoute(
          path: '/dashboard',
          builder: (_, __) => const Scaffold(body: Text('Dashboard')),
        ),
      ],
    );
  });

  testWidgets('Login screen renders', (tester) async {
    await tester.pumpWidget(_harness(router: router));
    expect(find.text('CareConnect'), findsOneWidget);
    expect(find.text('Sign In'), findsOneWidget);
  });

  testWidgets('Email validation shows error for invalid email', (tester) async {
    await tester.pumpWidget(_harness(router: router));
    await tester.enterText(find.byKey(const Key('login_email')), 'invalid');
    await tester.tap(find.byKey(const Key('login_submit')));
    await tester.pumpAndSettle();
    expect(find.text('Enter a valid email'), findsOneWidget);
  });

  testWidgets('Password validation shows error for short password', (tester) async {
    await tester.pumpWidget(_harness(router: router));
    await tester.enterText(find.byKey(const Key('login_email')), 'a@b.com');
    await tester.enterText(find.byKey(const Key('login_password')), '12345');
    await tester.tap(find.byKey(const Key('login_submit')));
    await tester.pumpAndSettle();
    expect(find.text('Password must be at least 6 characters'), findsOneWidget);
  });

  testWidgets('Valid login navigates to dashboard after delay', (tester) async {
    await tester.pumpWidget(_harness(router: router));
    await tester.enterText(find.byKey(const Key('login_email')), 'user@example.com');
    await tester.enterText(find.byKey(const Key('login_password')), 'password123');
    await tester.tap(find.byKey(const Key('login_submit')));
    await tester.pump();
    expect(find.byType(CircularProgressIndicator), findsOneWidget);
    await tester.pump(const Duration(milliseconds: 1600));
    await tester.pumpAndSettle();
    expect(find.text('Dashboard'), findsOneWidget);
  });

  testWidgets('Show password toggle changes visibility', (tester) async {
    await tester.pumpWidget(_harness(router: router));
    await tester.enterText(find.byKey(const Key('login_password')), 'secret');
    expect(find.byIcon(Icons.visibility), findsOneWidget);
    await tester.tap(find.byIcon(Icons.visibility));
    await tester.pumpAndSettle();
    expect(find.byIcon(Icons.visibility_off), findsOneWidget);
  });

  testWidgets('Remember me checkbox toggles', (tester) async {
    await tester.pumpWidget(_harness(router: router));
    await tester.tap(find.byKey(const Key('remember_me_checkbox')));
    await tester.pumpAndSettle();
    await tester.tap(find.text('Remember me'));
    await tester.pumpAndSettle();
  });

  testWidgets('Forgot Password button is tappable', (tester) async {
    await tester.pumpWidget(_harness(router: router));
    await tester.tap(find.text('Forgot Password?'));
    await tester.pumpAndSettle();
  });

  testWidgets('Sign up prompt is tappable', (tester) async {
    await tester.pumpWidget(_harness(router: router));
    await tester.scrollUntilVisible(
      find.text('Sign up for CareConnect'),
      300,
      scrollable: find.byType(Scrollable).first,
    );
    await tester.tap(find.text('Sign up for CareConnect'));
    await tester.pumpAndSettle();
  });
}
