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
                "High Contrast Mode",
                "Increase contrast for better visibility",
                settings['highContrast']!,
                () => toggle('highContrast'),
              ),
              _settingTile(
                "Large Text",
                "Increase text size throughout the app",
                settings['largeText']!,
                () => toggle('largeText'),
              ),
              _settingTile(
                "Visual Alerts",
                "Show flashing indicators",
                settings['visualAlerts']!,
                () => toggle('visualAlerts'),
              ),
              _settingTile(
                "Reduce Motion",
                "Minimize animations",
                settings['reducedMotion']!,
                () => toggle('reducedMotion'),
              ),
            ],
          ),

          _section(
            icon: Icons.volume_up,
            title: "Audio",
            children: [
              _settingTile(
                "Sound Alerts",
                "Play sounds for notifications",
                settings['soundAlerts']!,
                () => toggle('soundAlerts'),
              ),
              _settingTile(
                "Voice Announcements",
                "Speak reminders aloud",
                settings['voiceAnnouncements']!,
                () => toggle('voiceAnnouncements'),
              ),
            ],
          ),

          _section(
            icon: Icons.vibration,
            title: "Haptic",
            children: [
              _settingTile(
                "Vibration Alerts",
                "Vibrate for notifications",
                settings['vibrationAlerts']!,
                () => toggle('vibrationAlerts'),
              ),
            ],
          ),

          _textPreview(theme),

          _notificationChips(),

          const SizedBox(height: 24),

          ElevatedButton(
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
          Text(title,
              style:
                  const TextStyle(fontSize: 18, fontWeight: FontWeight.bold)),
        ]),
        const SizedBox(height: 12),
        ...children,
        const SizedBox(height: 24),
      ],
    );
  }

  Widget _settingTile(
      String title, String subtitle, bool enabled, VoidCallback onTap) {
    return Card(
      shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.circular(16),
      ),
      child: ListTile(
        onTap: onTap,
        title: Text(title, style: const TextStyle(fontWeight: FontWeight.w600)),
        subtitle: Text(subtitle),
        trailing: Switch(
          value: enabled,
          onChanged: (_) => onTap(),
        ),
      ),
    );
  }

  Widget _textPreview(ThemeData theme) {
    final large = settings['largeText']!;

    return Container(
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
          const Text("Text Size Preview",
              style: TextStyle(fontWeight: FontWeight.bold)),
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

    if (settings['soundAlerts']!)
      chips.add(_chip("Sound", Colors.blue));
    if (settings['vibrationAlerts']!)
      chips.add(_chip("Vibration", Colors.purple));
    if (settings['visualAlerts']!)
      chips.add(_chip("Visual", Colors.amber));
    if (settings['voiceAnnouncements']!)
      chips.add(_chip("Voice", Colors.green));

    return Wrap(spacing: 8, children: chips);
  }

  Widget _chip(String label, Color color) {
    return Chip(
      label: Text(label),
      backgroundColor: color.withOpacity(.15),
      labelStyle: TextStyle(color: color),
    );
  }
}
