import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:shared_preferences/shared_preferences.dart';

import 'package:careconnect_mobile/providers/high_contrast_provider.dart';

void main() {
  group('HighContrastNotifier', () {
    test('build returns false when preference not set', () async {
      SharedPreferences.setMockInitialValues({});
      final container = ProviderContainer();
      addTearDown(container.dispose);

      final value = await container.read(highContrastProvider.future);
      expect(value, false);
    });

    test('build returns true when preference is true', () async {
      SharedPreferences.setMockInitialValues({'highContrast': true});
      final container = ProviderContainer();
      addTearDown(container.dispose);

      final value = await container.read(highContrastProvider.future);
      expect(value, true);
    });

    test('setHighContrast updates state and persists to SharedPreferences', () async {
      SharedPreferences.setMockInitialValues({});
      final container = ProviderContainer();
      addTearDown(container.dispose);

      await container.read(highContrastProvider.future);
      final notifier = container.read(highContrastProvider.notifier);

      await notifier.setHighContrast(true);
      expect(container.read(highContrastProvider).value, true);

      final prefs = await SharedPreferences.getInstance();
      expect(prefs.getBool('highContrast'), true);

      await notifier.setHighContrast(false);
      expect(container.read(highContrastProvider).value, false);
      expect(prefs.getBool('highContrast'), false);
    });
  });
}
