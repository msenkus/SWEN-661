import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';

import 'package:careconnect_mobile/screens/sos_screen.dart';

Widget _harness() {
  return const MaterialApp(
    home: SosScreen(),
  );
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
}
