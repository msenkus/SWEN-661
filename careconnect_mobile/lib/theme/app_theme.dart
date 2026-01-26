import 'package:flutter/material.dart';

class AppColors {
  // ===== Light =====
  static const backgroundLight = Color(0xFFFFFFFF);
  static const foregroundLight = Color(0xFF1F1F1F);
  static const cardLight = Color(0xFFFFFFFF);

  static const primaryLight = Color(0xFF030213);
  static const secondaryLight = Color(0xFFF2F3F7);
  static const accentLight = Color(0xFFE9EBEF);

  static const mutedLight = Color(0xFFECECF0);
  static const mutedForegroundLight = Color(0xFF717182);

  static const errorLight = Color(0xFFD4183D);

  static const borderLight = Color(0x1A000000);

  static const inputBackgroundLight = Color(0xFFF3F3F5);
  static const switchBackgroundLight = Color(0xFFCBCED4);

  // Charts
  static const chart1 = Color(0xFFE56A1C);
  static const chart2 = Color(0xFF4CA7A3);
  static const chart3 = Color(0xFF3C5D80);
  static const chart4 = Color(0xFFF0C245);
  static const chart5 = Color(0xFFE4B63F);

  // ===== Dark =====
  static const backgroundDark = Color(0xFF121212);
  static const foregroundDark = Color(0xFFF5F5F5);
  static const cardDark = Color(0xFF121212);

  static const primaryDark = Color(0xFFF5F5F5);
  static const secondaryDark = Color(0xFF3A3A3A);
  static const accentDark = Color(0xFF3A3A3A);

  static const mutedDark = Color(0xFF3A3A3A);
  static const mutedForegroundDark = Color(0xFFB5B5B5);

  static const errorDark = Color(0xFF9F3A3A);

  static const borderDark = Color(0xFF3A3A3A);
}

class AppRadii {
  static const sm = Radius.circular(6);
  static const md = Radius.circular(8);
  static const lg = Radius.circular(10);
  static const xl = Radius.circular(14);
}

class AppTextStyles {
  static const base = TextStyle(
    fontSize: 16,
    height: 1.5,
  );

  static const h1 = TextStyle(fontSize: 32, fontWeight: FontWeight.w500);
  static const h2 = TextStyle(fontSize: 24, fontWeight: FontWeight.w500);
  static const h3 = TextStyle(fontSize: 20, fontWeight: FontWeight.w500);
  static const h4 = TextStyle(fontSize: 16, fontWeight: FontWeight.w500);

  static const label = TextStyle(fontSize: 16, fontWeight: FontWeight.w500);
  static const body = TextStyle(fontSize: 16);
  static const small = TextStyle(fontSize: 14);
}

class AppTheme {
  static ThemeData lightTheme = ThemeData(
    brightness: Brightness.light,
    scaffoldBackgroundColor: AppColors.backgroundLight,

    colorScheme: const ColorScheme.light(
      primary: AppColors.primaryLight,
      secondary: AppColors.secondaryLight,
      error: AppColors.errorLight,
      background: AppColors.backgroundLight,
    ),

    cardTheme: const CardThemeData(
      color: AppColors.cardLight,
      shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.all(AppRadii.lg),
      ),
    ),

    textTheme: const TextTheme(
      bodyMedium: AppTextStyles.body,
      titleLarge: AppTextStyles.h1,
      titleMedium: AppTextStyles.h2,
      titleSmall: AppTextStyles.h3,
    ),

    inputDecorationTheme: InputDecorationTheme(
      filled: true,
      fillColor: AppColors.inputBackgroundLight,
      border: OutlineInputBorder(
        borderRadius: BorderRadius.circular(10),
      ),
    ),

    elevatedButtonTheme: ElevatedButtonThemeData(
      style: ElevatedButton.styleFrom(
        minimumSize: const Size(48, 48),
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(10),
        ),
      ),
    ),
  );

  static ThemeData darkTheme = ThemeData(
    brightness: Brightness.dark,
    scaffoldBackgroundColor: AppColors.backgroundDark,

    colorScheme: const ColorScheme.dark(
      primary: AppColors.primaryDark,
      secondary: AppColors.secondaryDark,
      error: AppColors.errorDark,
      background: AppColors.backgroundDark,
    ),

    cardTheme: const CardThemeData(
      color: AppColors.cardDark,
      shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.all(AppRadii.lg),
      ),
    ),

    inputDecorationTheme: InputDecorationTheme(
      filled: true,
      fillColor: AppColors.mutedDark,
    ),
  );
}
