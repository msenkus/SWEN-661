import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:shared_preferences/shared_preferences.dart';

import 'package:careconnect_mobile/providers/dark_mode_provider.dart';

void main() {
  group('DarkModeNotifier', () {
    test('build returns false when preference not set', () async {
      SharedPreferences.setMockInitialValues({});
      final container = ProviderContainer();
      addTearDown(container.dispose);

      final value = await container.read(darkModeProvider.future);
      expect(value, false);
    });

    test('build returns true when preference is true', () async {
      SharedPreferences.setMockInitialValues({'darkMode': true});
      final container = ProviderContainer();
      addTearDown(container.dispose);

      final value = await container.read(darkModeProvider.future);
      expect(value, true);
    });

    test('setDarkMode updates state and persists to SharedPreferences', () async {
      SharedPreferences.setMockInitialValues({});
      final container = ProviderContainer();
      addTearDown(container.dispose);

      await container.read(darkModeProvider.future);
      final notifier = container.read(darkModeProvider.notifier);

      await notifier.setDarkMode(true);
      expect(container.read(darkModeProvider).value, true);

      final prefs = await SharedPreferences.getInstance();
      expect(prefs.getBool('darkMode'), true);

      await notifier.setDarkMode(false);
      expect(container.read(darkModeProvider).value, false);
      expect(prefs.getBool('darkMode'), false);
    });
  });
}
