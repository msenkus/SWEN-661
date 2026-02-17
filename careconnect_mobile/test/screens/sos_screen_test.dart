import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:go_router/go_router.dart';

import 'package:careconnect_mobile/screens/sos_screen.dart';

Widget _harness() {
  final router = GoRouter(
    routes: [
      GoRoute(
        path: '/',
        builder: (_, __) => const SosScreen(),
      ),
      GoRoute(
        path: '/dashboard',
        builder: (_, __) => const Scaffold(body: Text('Dashboard')),
      ),
    ],
  );
  return MaterialApp.router(routerConfig: router);
}

void main() {
  testWidgets('SOS screen renders', (tester) async {
    await tester.pumpWidget(_harness());
    expect(find.byType(Scaffold), findsOneWidget);
  });

  testWidgets('AppBar title renders', (tester) async {
    await tester.pumpWidget(_harness());
    expect(find.text('Emergency SOS'), findsOneWidget);
  });

  testWidgets('Warning message renders', (tester) async {
    await tester.pumpWidget(_harness());

    expect(
      find.textContaining('Emergency Assistance'),
      findsOneWidget,
    );
  });

  testWidgets('Slide instruction text renders', (tester) async {
    await tester.pumpWidget(_harness());

    expect(
      find.text('Slide to Call Emergency Services'),
      findsOneWidget,
    );
    expect(
      find.textContaining('Slide all the way right'),
      findsOneWidget,
    );
  });

  testWidgets('Emergency contacts list renders', (tester) async {
    await tester.pumpWidget(_harness());

    expect(find.text('Emergency Contacts'), findsOneWidget);
    expect(find.text('Emergency Services'), findsOneWidget);
    expect(find.text('Mary Johnson (Daughter)'), findsOneWidget);
    expect(find.text('John Smith (Son)'), findsOneWidget);
  });

  testWidgets('Contact chips render', (tester) async {
    await tester.pumpWidget(_harness());

    expect(find.byType(Chip), findsWidgets);
    expect(find.text('emergency'), findsOneWidget);
    expect(find.text('family'), findsWidgets);
  });

  testWidgets('Info box renders', (tester) async {
    await tester.pumpWidget(_harness());

    expect(
      find.textContaining('Important: Always call 911'),
      findsOneWidget,
    );
  });

  testWidgets('Back button navigates to dashboard when cannot pop', (tester) async {
    await tester.pumpWidget(_harness());
    await tester.tap(find.byIcon(Icons.arrow_back));
    await tester.pumpAndSettle();
    expect(find.text('Dashboard'), findsOneWidget);
  });

  testWidgets('Countdown appears when slider dragged past threshold and Cancel resets', (tester) async {
    await tester.pumpWidget(_harness());
    await tester.pumpAndSettle();
    final knob = find.byKey(const Key('sos_slider_knob'));
    await tester.drag(knob, const Offset(700, 0));
    await tester.pumpAndSettle();
    expect(find.text('Cancel'), findsOneWidget);
    expect(find.textContaining('Calling in'), findsOneWidget);

    await tester.tap(find.text('Cancel'));
    await tester.pumpAndSettle();
    expect(find.text('Slide to Call Emergency Services'), findsOneWidget);
  });

  testWidgets('Slider resets when released before 80%', (tester) async {
    await tester.pumpWidget(_harness());
    await tester.pumpAndSettle();
    final knob = find.byKey(const Key('sos_slider_knob'));
    await tester.drag(knob, const Offset(200, 0));
    await tester.pumpAndSettle();
    expect(find.text('Slide to Call Emergency Services'), findsOneWidget);
  });

  testWidgets('Activated screen shows after countdown and End Call resets', (tester) async {
    await tester.pumpWidget(_harness());
    await tester.pumpAndSettle();
    final knob = find.byKey(const Key('sos_slider_knob'));
    await tester.drag(knob, const Offset(700, 0));
    await tester.pump();
    await tester.pump(const Duration(seconds: 1));
    await tester.pump(const Duration(seconds: 1));
    await tester.pump(const Duration(seconds: 1));
    await tester.pump();
    expect(find.text('Calling Emergency Contact'), findsOneWidget);
    expect(find.text('End Call'), findsOneWidget);

    await tester.tap(find.text('End Call'));
    await tester.pumpAndSettle();
    expect(find.text('Slide to Call Emergency Services'), findsOneWidget);
  });

  testWidgets('Doctor contact chip uses default color', (tester) async {
    await tester.pumpWidget(_harness());
    expect(find.text('Dr. Sarah Johnson'), findsOneWidget);
    expect(find.text('doctor'), findsOneWidget);
  });
}
