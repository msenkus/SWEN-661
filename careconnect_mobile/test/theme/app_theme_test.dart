import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';

import 'package:careconnect_mobile/theme/app_theme.dart';

void main() {
  group('AppColors', () {
    test('light colors are defined', () {
      expect(AppColors.backgroundLight, const Color(0xFFFFFFFF));
      expect(AppColors.foregroundLight, const Color(0xFF1F1F1F));
      expect(AppColors.cardLight, const Color(0xFFFFFFFF));
      expect(AppColors.primaryLight, const Color(0xFF030213));
      expect(AppColors.secondaryLight, const Color(0xFFF2F3F7));
      expect(AppColors.accentLight, const Color(0xFFE9EBEF));
      expect(AppColors.mutedLight, const Color(0xFFECECF0));
      expect(AppColors.mutedForegroundLight, const Color(0xFF717182));
      expect(AppColors.errorLight, const Color(0xFFD4183D));
      expect(AppColors.borderLight, const Color(0x1A000000));
      expect(AppColors.inputBackgroundLight, const Color(0xFFF3F3F5));
      expect(AppColors.switchBackgroundLight, const Color(0xFFCBCED4));
      expect(AppColors.chart1, const Color(0xFFE56A1C));
      expect(AppColors.chart2, const Color(0xFF4CA7A3));
      expect(AppColors.chart3, const Color(0xFF3C5D80));
      expect(AppColors.chart4, const Color(0xFFF0C245));
      expect(AppColors.chart5, const Color(0xFFE4B63F));
    });

    test('dark colors are defined', () {
      expect(AppColors.backgroundDark, const Color(0xFF121212));
      expect(AppColors.foregroundDark, const Color(0xFFF5F5F5));
      expect(AppColors.cardDark, const Color(0xFF121212));
      expect(AppColors.primaryDark, const Color(0xFFF5F5F5));
      expect(AppColors.secondaryDark, const Color(0xFF3A3A3A));
      expect(AppColors.accentDark, const Color(0xFF3A3A3A));
      expect(AppColors.mutedDark, const Color(0xFF3A3A3A));
      expect(AppColors.mutedForegroundDark, const Color(0xFFB5B5B5));
      expect(AppColors.errorDark, const Color(0xFF9F3A3A));
      expect(AppColors.borderDark, const Color(0xFF3A3A3A));
    });

    test('high contrast light colors are defined', () {
      expect(AppColors.backgroundHCLight, const Color(0xFFFFFFFF));
      expect(AppColors.foregroundHCLight, const Color(0xFF000000));
      expect(AppColors.cardHCLight, const Color(0xFFFFFFFF));
      expect(AppColors.primaryHCLight, const Color(0xFF000000));
      expect(AppColors.borderHCLight, const Color(0xFF000000));
      expect(AppColors.inputBackgroundHCLight, const Color(0xFFFFFFFF));
      expect(AppColors.errorHCLight, const Color(0xFF000000));
    });

    test('high contrast dark colors are defined', () {
      expect(AppColors.backgroundHCDark, const Color(0xFF000000));
      expect(AppColors.foregroundHCDark, const Color(0xFFFFFFFF));
      expect(AppColors.cardHCDark, const Color(0xFF000000));
      expect(AppColors.primaryHCDark, const Color(0xFFFFFFFF));
      expect(AppColors.borderHCDark, const Color(0xFFFFFFFF));
      expect(AppColors.inputBackgroundHCDark, const Color(0xFF000000));
      expect(AppColors.errorHCDark, const Color(0xFFFFFFFF));
    });
  });

  group('AppRadii', () {
    test('radii are defined', () {
      expect(AppRadii.sm, Radius.circular(6));
      expect(AppRadii.md, Radius.circular(8));
      expect(AppRadii.lg, Radius.circular(10));
      expect(AppRadii.xl, Radius.circular(14));
    });
  });

  group('AppTextStyles', () {
    test('text styles are defined', () {
      expect(AppTextStyles.base.fontSize, 16);
      expect(AppTextStyles.base.height, 1.5);
      expect(AppTextStyles.h1.fontSize, 32);
      expect(AppTextStyles.h2.fontSize, 24);
      expect(AppTextStyles.h3.fontSize, 20);
      expect(AppTextStyles.h4.fontSize, 16);
      expect(AppTextStyles.label.fontSize, 16);
      expect(AppTextStyles.body.fontSize, 16);
      expect(AppTextStyles.small.fontSize, 14);
    });
  });

  group('AppTheme', () {
    testWidgets('lightTheme has correct brightness and scaffold color', (tester) async {
      await tester.pumpWidget(
        MaterialApp(
          theme: AppTheme.lightTheme,
          home: const Scaffold(body: SizedBox()),
        ),
      );
      final theme = Theme.of(tester.element(find.byType(Scaffold)));
      expect(theme.brightness, Brightness.light);
      expect(theme.scaffoldBackgroundColor, AppColors.backgroundLight);
    });

    testWidgets('darkTheme has correct brightness and scaffold color', (tester) async {
      await tester.pumpWidget(
        MaterialApp(
          theme: AppTheme.darkTheme,
          home: const Scaffold(body: SizedBox()),
        ),
      );
      final theme = Theme.of(tester.element(find.byType(Scaffold)));
      expect(theme.brightness, Brightness.dark);
      expect(theme.scaffoldBackgroundColor, AppColors.backgroundDark);
    });

    testWidgets('highContrastLightTheme has correct brightness and colors', (tester) async {
      await tester.pumpWidget(
        MaterialApp(
          theme: AppTheme.highContrastLightTheme,
          home: const Scaffold(body: SizedBox()),
        ),
      );
      final theme = Theme.of(tester.element(find.byType(Scaffold)));
      expect(theme.brightness, Brightness.light);
      expect(theme.scaffoldBackgroundColor, AppColors.backgroundHCLight);
      expect(theme.colorScheme.primary, AppColors.primaryHCLight);
    });

    testWidgets('highContrastDarkTheme has correct brightness and colors', (tester) async {
      await tester.pumpWidget(
        MaterialApp(
          theme: AppTheme.highContrastDarkTheme,
          home: const Scaffold(body: SizedBox()),
        ),
      );
      final theme = Theme.of(tester.element(find.byType(Scaffold)));
      expect(theme.brightness, Brightness.dark);
      expect(theme.scaffoldBackgroundColor, AppColors.backgroundHCDark);
      expect(theme.colorScheme.primary, AppColors.primaryHCDark);
    });

    test('lightTheme uses Material3', () {
      expect(AppTheme.lightTheme.useMaterial3, true);
    });

    test('darkTheme uses Material3', () {
      expect(AppTheme.darkTheme.useMaterial3, true);
    });

    test('highContrastLightTheme uses Material3', () {
      expect(AppTheme.highContrastLightTheme.useMaterial3, true);
    });

    test('highContrastDarkTheme uses Material3', () {
      expect(AppTheme.highContrastDarkTheme.useMaterial3, true);
    });
  });
}
