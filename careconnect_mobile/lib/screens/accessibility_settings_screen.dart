import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';
import '../providers/dark_mode_provider.dart';
import '../providers/high_contrast_provider.dart';
import '../widgets/bottom_navigation_bar.dart';

class AccessibilitySettingsScreen extends ConsumerStatefulWidget {
  const AccessibilitySettingsScreen({super.key});

  @override
  ConsumerState<AccessibilitySettingsScreen> createState() =>
      _AccessibilitySettingsScreenState();
}

class _AccessibilitySettingsScreenState
    extends ConsumerState<AccessibilitySettingsScreen> {
  final Map<String, bool> settings = {
    'largeText': true,
    'soundAlerts': true,
    'vibrationAlerts': true,
    'visualAlerts': true,
    'reducedMotion': false,
    'voiceAnnouncements': true,
  };

  void toggle(String key) {
    setState(() => settings[key] = !settings[key]!);
  }

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final darkModeAsync = ref.watch(darkModeProvider);
    final highContrastAsync = ref.watch(highContrastProvider);
    final isDarkMode = darkModeAsync.valueOrNull ?? false;
    final isHighContrast = highContrastAsync.valueOrNull ?? false;

    return Scaffold(
      appBar: AppBar(
        leading: IconButton(
          icon: const Icon(Icons.arrow_back),
          onPressed: () {
          if (context.canPop()) {
            context.pop();
          } else {
            context.go('/dashboard');
          }
        },
          tooltip: 'Back',
        ),
        title: Semantics(
          label: 'Accessibility',
          child: const Text('Accessibility'),
        ),
      ),
      body: ListView(
        padding: const EdgeInsets.all(16),
        children: [
          _headerCard(),

          _section(
            icon: Icons.visibility,
            title: "Visual",
            children: [
              _settingTile(
                tileKey: const Key('toggle_high_contrast'),
                switchKey: const Key('toggle_high_contrast_switch'),
                title: "High Contrast Mode",
                subtitle: "Increase contrast for visibility",
                enabled: isHighContrast,
                onTap: () => ref
                    .read(highContrastProvider.notifier)
                    .setHighContrast(!isHighContrast),
              ),
              _settingTile(
                tileKey: const Key('toggle_large_text'),
                switchKey: const Key('toggle_large_text_switch'),
                title: "Large Text",
                subtitle: "Increase text size throughout the app",
                enabled: settings['largeText']!,
                onTap: () => toggle('largeText'),
              ),
              _settingTile(
                tileKey: const Key('toggle_dark_mode'),
                switchKey: const Key('toggle_dark_mode_switch'),
                title: "Dark Mode",
                subtitle: "Use dark theme for reduced eye strain",
                enabled: isDarkMode,
                onTap: () => ref
                    .read(darkModeProvider.notifier)
                    .setDarkMode(!isDarkMode),
              ),
              _settingTile(
                tileKey: const Key('toggle_visual_alerts'),
                switchKey: const Key('toggle_visual_alerts_switch'),
                title: "Visual Alerts",
                subtitle: "Show flashing indicators",
                enabled: settings['visualAlerts']!,
                onTap: () => toggle('visualAlerts'),
              ),
              _settingTile(
                tileKey: const Key('toggle_reduce_motion'),
                switchKey: const Key('toggle_reduce_motion_switch'),
                title: "Reduce Motion",
                subtitle: "Minimize animations",
                enabled: settings['reducedMotion']!,
                onTap: () => toggle('reducedMotion'),
              ),
            ],
          ),

          _section(
            icon: Icons.volume_up,
            title: "Audio",
            children: [
              _settingTile(
                tileKey: const Key('toggle_sound_alerts'),
                switchKey: const Key('toggle_sound_alerts_switch'),
                title: "Sound Alerts",
                subtitle: "Play sounds for notifications",
                enabled: settings['soundAlerts']!,
                onTap: () => toggle('soundAlerts'),
              ),
              _settingTile(
                tileKey: const Key('toggle_voice'),
                switchKey: const Key('toggle_voice_switch'),
                title: "Voice Announcements",
                subtitle: "Speak reminders aloud",
                enabled: settings['voiceAnnouncements']!,
                onTap: () => toggle('voiceAnnouncements'),
              ),
            ],
          ),

          _section(
            icon: Icons.vibration,
            title: "Haptic",
            children: [
              _settingTile(
                tileKey: const Key('toggle_vibration'),
                switchKey: const Key('toggle_vibration_switch'),
                title: "Vibration",
                subtitle: "Vibrate for notifications",
                enabled: settings['vibrationAlerts']!,
                onTap: () => toggle('vibrationAlerts'),
              ),
            ],
          ),

          _textPreview(theme),

          _notificationChips(),

          const SizedBox(height: 24),

          Semantics(
            label: 'Watch ASL Help Videos, button',
            button: true,
            child: ElevatedButton(
              key: const Key('asl_help_button'),
              onPressed: () => context.push('/asl-help'),
              style: ElevatedButton.styleFrom(
                padding: const EdgeInsets.symmetric(vertical: 18),
                minimumSize: const Size.fromHeight(48), // WCAG 2.1: Minimum touch target
                shape: RoundedRectangleBorder(
                  borderRadius: BorderRadius.circular(16),
                ),
              ),
              child: const Text("Watch ASL Help Videos"),
            ),
          ),
        ],
      ),
      bottomNavigationBar: CareConnectBottomNavBar(
        currentRoute: GoRouter.of(context).routerDelegate.currentConfiguration.uri.path,
      ),
    );
  }

  // -------------------------------------------------

  Widget _headerCard() {
    final theme = Theme.of(context);
    final colorScheme = theme.colorScheme;
    return Container(
      key: const Key('accessibility_header'),
      margin: const EdgeInsets.only(bottom: 24),
      padding: const EdgeInsets.all(20),
      decoration: BoxDecoration(
        color: colorScheme.primary,
        borderRadius: BorderRadius.circular(20),
        border: colorScheme.brightness == Brightness.dark
            ? Border.all(color: colorScheme.onPrimary, width: 2)
            : null,
      ),
      child: Row(
        children: [
          CircleAvatar(
            backgroundColor: colorScheme.onPrimary.withOpacity(0.24),
            radius: 24,
            child: Icon(Icons.visibility, color: colorScheme.onPrimary),
          ),
          const SizedBox(width: 16),
          Expanded(
            child: Text(
              "Customize Your Experience\nAdjust settings to match your needs",
              style: TextStyle(color: colorScheme.onPrimary),
            ),
          ),
        ],
      ),
    );
  }

  Widget _section({
    required IconData icon,
    required String title,
    required List<Widget> children,
  }) {
    final colorScheme = Theme.of(context).colorScheme;
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Row(children: [
          Icon(icon, color: colorScheme.primary),
          const SizedBox(width: 8),
          Text(
            title,
            style:
                const TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
          ),
        ]),
        const SizedBox(height: 12),
        ...children,
        const SizedBox(height: 24),
      ],
    );
  }

  Widget _settingTile({
    required Key tileKey,
    required Key switchKey,
    required String title,
    required String subtitle,
    required bool enabled,
    required VoidCallback onTap,
  }) {
    return Semantics(
      label: '$title, $subtitle, switch, ${enabled ? "on" : "off"}',
      value: enabled ? 'on' : 'off',
      child: Card(
        key: tileKey,
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(16),
        ),
        child: ListTile(
          onTap: onTap,
          title: Semantics(
            label: title,
            child: Text(title, style: const TextStyle(fontWeight: FontWeight.w600)),
          ),
          subtitle: Text(subtitle),
          trailing: Semantics(
            label: '$title switch, ${enabled ? "on" : "off"}',
            value: enabled ? 'on' : 'off',
            child: Switch(
              key: switchKey,
              value: enabled,
              onChanged: (_) => onTap(),
            ),
          ),
        ),
      ),
    );
  }

  Widget _textPreview(ThemeData theme) {
    final large = settings['largeText']!;
    final colorScheme = theme.colorScheme;

    return Container(
      key: const Key('text_preview'),
      padding: const EdgeInsets.all(16),
      margin: const EdgeInsets.only(bottom: 24),
      decoration: BoxDecoration(
        color: colorScheme.surfaceContainerHighest,
        borderRadius: BorderRadius.circular(16),
        border: Border.all(color: colorScheme.outline, width: colorScheme.brightness == Brightness.dark ? 2 : 1),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          const Text(
            "Text Size Preview",
            style: TextStyle(fontWeight: FontWeight.bold),
          ),
          const SizedBox(height: 8),
          Text(
            "This is how your text will appear in the app.",
            style: TextStyle(fontSize: large ? 22 : 16),
          ),
        ],
      ),
    );
  }

  Widget _notificationChips() {
    List<Widget> chips = [];

    if (settings['soundAlerts']!) {
      chips.add(_chip("Sound", Colors.blue));
    }
    if (settings['vibrationAlerts']!) {
      chips.add(_chip("Vibration", Colors.purple));
    }
    if (settings['visualAlerts']!) {
      chips.add(_chip("Visual", Colors.amber));
    }
    if (settings['voiceAnnouncements']!) {
      chips.add(_chip("Voice", Colors.green));
    }

    return Wrap(
      key: const Key('notification_chips'),
      spacing: 8,
      children: chips,
    );
  }

  Widget _chip(String label, Color color) {
    return Chip(
      key: Key('chip_$label'),
      label: Text(label),
      backgroundColor: color.withOpacity(.15),
      labelStyle: TextStyle(color: color),
    );
  }
}
