import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'router.dart';
import 'theme/app_theme.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'providers/dark_mode_provider.dart';
import 'providers/high_contrast_provider.dart';

/// Prevents overscroll stretch/glow on Android so content and icons don't stretch when scrolling.
class _NoStretchScrollBehavior extends ScrollBehavior {
  @override
  ScrollPhysics getScrollPhysics(BuildContext context) {
    return const ClampingScrollPhysics();
  }

  @override
  Widget buildOverscrollIndicator(
    BuildContext context,
    Widget child,
    ScrollableDetails details,
  ) {
    return child;
  }
}

void main() {
   runApp(const ProviderScope(child: CareConnectApp()));
}

class CareConnectApp extends ConsumerWidget {
  const CareConnectApp({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final darkModeAsync = ref.watch(darkModeProvider);
    final highContrastAsync = ref.watch(highContrastProvider);
    final themeMode = darkModeAsync.when(
      data: (isDark) => isDark ? ThemeMode.dark : ThemeMode.light,
      loading: () => ThemeMode.light,
      error: (_, __) => ThemeMode.light,
    );
    final highContrast = highContrastAsync.valueOrNull ?? false;
    final theme = highContrast ? AppTheme.highContrastLightTheme : AppTheme.lightTheme;
    final darkTheme = highContrast ? AppTheme.highContrastDarkTheme : AppTheme.darkTheme;
    return MaterialApp.router(
      key: ValueKey('$themeMode-$highContrast'),
      title: 'CareConnect',
      theme: theme,
      darkTheme: darkTheme,
      themeMode: themeMode,
      routerConfig: router,
      // WCAG 2.1: Support text scaling up to 200%
      builder: (context, child) {
        final textScaler = MediaQuery.of(context).textScaler;
        final scaleFactor = textScaler.scale(1.0);
        // Clamp scale factor between 0.8 and 2.0 (WCAG 2.1: Support up to 200% scaling)
        final clampedScale = scaleFactor < 0.8 
            ? 0.8 
            : (scaleFactor > 2.0 ? 2.0 : scaleFactor);
        return MediaQuery(
          data: MediaQuery.of(context).copyWith(
            textScaler: TextScaler.linear(clampedScale),
          ),
          child: ScrollConfiguration(
            behavior: _NoStretchScrollBehavior(),
            child: FocusTraversalGroup(
            child: Shortcuts(
              shortcuts: const <SingleActivator, Intent>{
                SingleActivator(LogicalKeyboardKey.escape): DismissIntent(),
              },
              child: Actions(
                actions: <Type, Action<Intent>>{
                  DismissIntent: CallbackAction<DismissIntent>(
                    onInvoke: (_) {
                      return Navigator.maybePop(context);
                    },
                  ),
                },
                child: child!,
              ),
            ),
            ),
          ),
        );
      },
    );
  }
}
