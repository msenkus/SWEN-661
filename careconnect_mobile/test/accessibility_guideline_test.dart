import 'package:careconnect_mobile/screens/accessibility_settings_screen.dart';
import 'package:careconnect_mobile/screens/login_screen.dart';
import 'package:careconnect_mobile/theme/app_theme.dart';
import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';

/// Accessibility Guideline tests per Flutter API:
/// https://api.flutter.dev/flutter/flutter_test/AccessibilityGuideline-class.html
///
/// Run with: flutter test test/accessibility_guideline_test.dart

Widget _wrap(Widget child) {
  return ProviderScope(
    child: MaterialApp(
      theme: AppTheme.lightTheme,
      darkTheme: AppTheme.darkTheme,
      home: child,
    ),
  );
}

Widget _wrapRouter(GoRouter router) {
  return ProviderScope(
    child: MaterialApp.router(
      theme: AppTheme.lightTheme,
      darkTheme: AppTheme.darkTheme,
      routerConfig: router,
    ),
  );
}

void main() {
  group('Accessibility Guidelines', () {
    testWidgets('LoginScreen meets androidTapTargetGuideline (48x48)',
        (WidgetTester tester) async {
      final SemanticsHandle handle = tester.ensureSemantics();
      await tester.pumpWidget(_wrap(const LoginScreen()));
      await tester.pumpAndSettle();
      await expectLater(tester, meetsGuideline(androidTapTargetGuideline));
      handle.dispose();
    });

    testWidgets('LoginScreen meets labeledTapTargetGuideline',
        (WidgetTester tester) async {
      final SemanticsHandle handle = tester.ensureSemantics();
      await tester.pumpWidget(_wrap(const LoginScreen()));
      await tester.pumpAndSettle();
      await expectLater(tester, meetsGuideline(labeledTapTargetGuideline));
      handle.dispose();
    });

    testWidgets('LoginScreen meets iOSTapTargetGuideline (44x44)',
        (WidgetTester tester) async {
      final SemanticsHandle handle = tester.ensureSemantics();
      await tester.pumpWidget(_wrap(const LoginScreen()));
      await tester.pumpAndSettle();
      await expectLater(tester, meetsGuideline(iOSTapTargetGuideline));
      handle.dispose();
    });

    testWidgets('AccessibilitySettingsScreen meets androidTapTargetGuideline',
        (WidgetTester tester) async {
      final SemanticsHandle handle = tester.ensureSemantics();
      final router = GoRouter(
        routes: [
          GoRoute(
            path: '/',
            builder: (_, __) => const AccessibilitySettingsScreen(),
          ),
        ],
      );
      await tester.pumpWidget(_wrapRouter(router));
      await tester.pumpAndSettle();
      await expectLater(tester, meetsGuideline(androidTapTargetGuideline));
      handle.dispose();
    });

    testWidgets('AccessibilitySettingsScreen meets labeledTapTargetGuideline',
        (WidgetTester tester) async {
      final SemanticsHandle handle = tester.ensureSemantics();
      final router = GoRouter(
        routes: [
          GoRoute(
            path: '/',
            builder: (_, __) => const AccessibilitySettingsScreen(),
          ),
        ],
      );
      await tester.pumpWidget(_wrapRouter(router));
      await tester.pumpAndSettle();
      await expectLater(tester, meetsGuideline(labeledTapTargetGuideline));
      handle.dispose();
    });

    testWidgets('AccessibilitySettingsScreen meets textContrastGuideline',
        (WidgetTester tester) async {
      final SemanticsHandle handle = tester.ensureSemantics();
      final router = GoRouter(
        routes: [
          GoRoute(
            path: '/',
            builder: (_, __) => const AccessibilitySettingsScreen(),
          ),
        ],
      );
      await tester.pumpWidget(_wrapRouter(router));
      await tester.pumpAndSettle();
      await expectLater(tester, meetsGuideline(textContrastGuideline));
      handle.dispose();
    });
  });
}
