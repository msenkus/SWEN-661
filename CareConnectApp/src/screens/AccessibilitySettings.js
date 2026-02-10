import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  ScrollView,
} from 'react-native';
import {
  Eye,
  Volume2,
  Vibrate,
  Bell,
  Type,
  ArrowLeft,
} from 'lucide-react-native';

const AccessibilitySettings = ({ onNavigate, hasMissedTasks }) => {
  const [settings, setSettings] = useState({
    highContrast: false,
    largeText: true,
    soundAlerts: true,
    vibrationAlerts: true,
    visualAlerts: true,
    reducedMotion: false,
    voiceAnnouncements: true,
  });

  const toggleSetting = (key) => {
    setSettings((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const ToggleSwitch = ({ enabled }) => (
    <View
      style={[
        styles.toggleTrack,
        { backgroundColor: enabled ? '#3B82F6' : '#CBD5E1' },
      ]}
    >
      <View
        style={[
          styles.toggleThumb,
          { alignSelf: enabled ? 'flex-end' : 'flex-start' },
        ]}
      />
    </View>
  );

  const settingSections = [
    {
      title: 'Visual',
      icon: Eye,
      items: [
        {
          key: 'highContrast',
          label: 'High Contrast Mode',
          description: 'Increase contrast for better visibility',
        },
        {
          key: 'largeText',
          label: 'Large Text',
          description: 'Increase text size throughout the app',
        },
        {
          key: 'visualAlerts',
          label: 'Visual Alerts',
          description: 'Show visual indicators for notifications',
        },
        {
          key: 'reducedMotion',
          label: 'Reduce Motion',
          description: 'Minimize animations and transitions',
        },
      ],
    },
    {
      title: 'Audio',
      icon: Volume2,
      items: [
        {
          key: 'soundAlerts',
          label: 'Sound Alerts',
          description: 'Play sounds for notifications',
        },
        {
          key: 'voiceAnnouncements',
          label: 'Voice Announcements',
          description: 'Speak notifications aloud',
        },
      ],
    },
    {
      title: 'Haptic',
      icon: Vibrate,
      items: [
        {
          key: 'vibrationAlerts',
          label: 'Vibration Alerts',
          description: 'Vibrate for important notifications',
        },
      ],
    },
  ];

  return (
    <ScrollView style={styles.container}>
      {/* Back Button */}
      <View style={styles.backHeader}>
        <Pressable
          onPress={() => onNavigate('dashboard')}
          accessibilityRole="button"
          accessibilityLabel="Go back to dashboard"
          style={styles.backButton}
        >
          <ArrowLeft size={24} color="#334155" />
        </Pressable>
        <Text style={styles.backHeaderTitle}>Accessibility</Text>
      </View>

      {/* Header */}
      <View style={styles.headerCard}>
        <Eye size={32} color="#FFFFFF" />
        <Text style={styles.headerTitle}>Customize Your Experience</Text>
        <Text style={styles.headerSubtitle}>
          Adjust settings to match your needs
        </Text>
      </View>

      {settingSections.map((section) => (
        <View key={section.title} style={styles.section}>
          <View style={styles.sectionHeader}>
            <section.icon size={20} color="#2563EB" />
            <Text style={styles.sectionTitle}>{section.title}</Text>
          </View>

          {section.items.map((item) => (
            <Pressable
              key={item.key}
              onPress={() => toggleSetting(item.key)}
              style={styles.settingRow}
            >
              <View style={{ flex: 1 }}>
                <Text style={styles.settingLabel}>{item.label}</Text>
                <Text style={styles.settingDescription}>
                  {item.description}
                </Text>
              </View>
              <ToggleSwitch enabled={settings[item.key]} />
            </Pressable>
          ))}
        </View>
      ))}

      {/* Text Preview */}
      <View style={styles.previewCard}>
        <View style={styles.previewHeader}>
          <Type size={20} color="#2563EB" />
          <Text style={styles.previewTitle}>Text Size Preview</Text>
        </View>
        <Text
          style={[
            styles.previewText,
            { fontSize: settings.largeText ? 20 : 14 },
          ]}
        >
          This is how your text will appear in the app.
        </Text>
        <Text style={styles.previewMeta}>
          Current size: {settings.largeText ? 'Large' : 'Standard'}
        </Text>
      </View>

      {/* Notification Summary */}
      <View style={styles.notificationCard}>
        <View style={styles.sectionHeader}>
          <Bell size={20} color="#2563EB" />
          <Text style={styles.sectionTitle}>Notification Style</Text>
        </View>

        <View style={styles.badgeRow}>
          {settings.soundAlerts && <Text style={styles.badge}>🔊 Sound</Text>}
          {settings.vibrationAlerts && (
            <Text style={styles.badge}>📳 Vibration</Text>
          )}
          {settings.visualAlerts && (
            <Text style={styles.badge}>💡 Visual</Text>
          )}
          {settings.voiceAnnouncements && (
            <Text style={styles.badge}>🗣️ Voice</Text>
          )}
        </View>
      </View>

      {/* ASL Help */}
      <Pressable
        style={styles.helpButton}
        onPress={() => onNavigate('asl-help')}
      >
        <Text style={styles.helpButtonText}>Watch ASL Help Videos</Text>
      </Pressable>
    </ScrollView>
  );
};

export default AccessibilitySettings;

const styles = StyleSheet.create({
  /* Screen */
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
    padding: 16,
  },

  backHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  backButton: {
    padding: 8,
    marginRight: 8,
  },
  backHeaderTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#0F172A',
  },

  /* Header Card (green gradient) */
  headerCard: {
    backgroundColor: '#22C55E',
    borderRadius: 20,
    padding: 20,
    marginBottom: 24,
    elevation: 4,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  headerIconWrap: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    padding: 12,
    borderRadius: 999,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  headerSubtitle: {
    fontSize: 13,
    color: '#DCFCE7',
    marginTop: 4,
  },

  /* Section */
  section: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#0F172A',
  },

  /* Setting Card */
  settingCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    borderWidth: 2,
    borderColor: '#E5E7EB',
    marginBottom: 12,
  },
  settingRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: 12,
  },
  settingLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#0F172A',
    marginBottom: 4,
  },
  settingDescription: {
    fontSize: 13,
    color: '#64748B',
  },

  /* Toggle */
  toggleTrack: {
    width: 56,
    height: 32,
    borderRadius: 16,
    padding: 4,
    justifyContent: 'center',
  },
  toggleThumb: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
    elevation: 2,
  },

  /* Text Preview Card */
  previewCard: {
    backgroundColor: '#EFF6FF',
    borderRadius: 16,
    padding: 16,
    borderWidth: 2,
    borderColor: '#BFDBFE',
    marginBottom: 24,
  },
  previewHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
  },
  previewTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1E3A8A',
  },
  previewText: {
    color: '#0F172A',
    marginBottom: 6,
  },
  previewMeta: {
    fontSize: 12,
    color: '#2563EB',
  },

  /* Notification Card */
  notificationCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    borderWidth: 2,
    borderColor: '#E5E7EB',
    marginBottom: 24,
  },
  badgeRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  badge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 999,
    fontSize: 12,
    fontWeight: '600',
    backgroundColor: '#DBEAFE',
    color: '#1D4ED8',
  },

  /* Help Button */
  helpButton: {
    backgroundColor: '#3B82F6',
    borderRadius: 16,
    paddingVertical: 16,
    alignItems: 'center',
    marginBottom: 40,
  },
  helpButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
});

