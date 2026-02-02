import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';

class AccessibilitySettingsScreen extends StatefulWidget {
  const AccessibilitySettingsScreen({super.key});

  @override
  State<AccessibilitySettingsScreen> createState() =>
      _AccessibilitySettingsScreenState();
}

class _AccessibilitySettingsScreenState
    extends State<AccessibilitySettingsScreen> {
  final Map<String, bool> settings = {
    'highContrast': false,
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

    return Scaffold(
      appBar: AppBar(title: const Text('Accessibility')),
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
                subtitle: "Increase contrast for better visibility",
                enabled: settings['highContrast']!,
                onTap: () => toggle('highContrast'),
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

          ElevatedButton(
            key: const Key('asl_help_button'),
            onPressed: () => context.go('/asl-help'),
            style: ElevatedButton.styleFrom(
              padding: const EdgeInsets.symmetric(vertical: 18),
              shape: RoundedRectangleBorder(
                borderRadius: BorderRadius.circular(16),
              ),
            ),
            child: const Text("Watch ASL Help Videos"),
          ),
        ],
      ),
    );
  }

  // -------------------------------------------------

  Widget _headerCard() {
    return Container(
      key: const Key('accessibility_header'),
      margin: const EdgeInsets.only(bottom: 24),
      padding: const EdgeInsets.all(20),
      decoration: BoxDecoration(
        gradient: const LinearGradient(
          colors: [Colors.green, Colors.teal],
        ),
        borderRadius: BorderRadius.circular(20),
      ),
      child: Row(
        children: const [
          CircleAvatar(
            backgroundColor: Colors.white24,
            radius: 24,
            child: Icon(Icons.visibility, color: Colors.white),
          ),
          SizedBox(width: 16),
          Expanded(
            child: Text(
              "Customize Your Experience\nAdjust settings to match your needs",
              style: TextStyle(color: Colors.white),
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
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Row(children: [
          Icon(icon, color: Colors.blue),
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
    return Card(
      key: tileKey,
      shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.circular(16),
      ),
      child: ListTile(
        onTap: onTap,
        title: Text(title, style: const TextStyle(fontWeight: FontWeight.w600)),
        subtitle: Text(subtitle),
        trailing: Switch(
          key: switchKey,
          value: enabled,
          onChanged: (_) => onTap(),
        ),
      ),
    );
  }

  Widget _textPreview(ThemeData theme) {
    final large = settings['largeText']!;

    return Container(
      key: const Key('text_preview'),
      padding: const EdgeInsets.all(16),
      margin: const EdgeInsets.only(bottom: 24),
      decoration: BoxDecoration(
        color: Colors.blue.shade50,
        borderRadius: BorderRadius.circular(16),
        border: Border.all(color: Colors.blue.shade200),
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
