import 'package:flutter_test/flutter_test.dart';
import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';

import 'package:careconnect_mobile/screens/missed_task_alert_screen.dart';

void main() {
  testWidgets('ASL button renders', (tester) async {
    await tester.pumpWidget(
      ProviderScope(
        child: MaterialApp(
          home: const MissedTaskAlertScreen(),
        ),
      ),
    );

    expect(find.textContaining('ASL'), findsOneWidget);
  });
}
