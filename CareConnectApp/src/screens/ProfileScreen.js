import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  Pressable,
} from 'react-native';
import {
  Activity,
  Droplets,
  Phone,
  LogOut,
  Edit2,
  ShieldAlert,
  HeartPulse,
} from 'lucide-react-native';

const ProfileScreen = ({ onNavigate }) => {
  const patientData = {
    name: 'Eleanor Rigby',
    age: 78,
    bloodType: 'O+',
    height: "5'4\"",
    weight: '142 lbs',
    conditions: [
      'Hypertension (High Blood Pressure)',
      'Type 2 Diabetes',
      'Osteoarthritis - Right Knee',
      'Mild Asthma',
    ],
    allergies: ['Penicillin', 'Peanuts', 'Shellfish'],
    emergencyContacts: [
      { name: 'Father McKenzie', relation: 'Caregiver', phone: '(555) 123-4567' },
      { name: 'Sarah Rigby', relation: 'Daughter', phone: '(555) 987-6543' },
    ],
  };

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerTop} />
        <View style={styles.profileRow}>
          <Image
            source={{
              uri: 'https://images.unsplash.com/photo-1617216939864-e5f02a2a545d',
            }}
            style={styles.avatar}
          />

          <View style={styles.headerInfo}>
            <Text style={styles.name}>{patientData.name}</Text>
            <Text style={styles.subText}>Patient ID: #8839210</Text>
          </View>

          <Pressable style={styles.editButton}>
            <Edit2 size={16} color="#2563EB" />
            <Text style={styles.editText}>Edit</Text>
          </Pressable>
        </View>
      </View>

      {/* Vital Info */}
      <Section title="Vital Information" icon={Activity}>
        <View style={styles.grid}>
          <Stat label="Blood Type" value={patientData.bloodType} />
          <Stat label="Age" value={patientData.age} />
          <Stat label="Height" value={patientData.height} />
          <Stat label="Weight" value={patientData.weight} />
        </View>
      </Section>

      {/* Conditions */}
      <Section title="Medical Conditions" icon={HeartPulse}>
        {patientData.conditions.map((c, i) => (
          <View key={i} style={styles.listItem}>
            <View style={styles.dot} />
            <Text style={styles.listText}>{c}</Text>
          </View>
        ))}
      </Section>

      {/* Allergies */}
      <Section title="Allergies & Alerts" icon={ShieldAlert}>
        <View style={styles.badgeWrap}>
          {patientData.allergies.map((a, i) => (
            <View key={i} style={styles.badge}>
              <Text style={styles.badgeText}>{a}</Text>
            </View>
          ))}
        </View>
      </Section>

      {/* Emergency Contacts */}
      <Section title="Emergency Contacts" icon={Phone}>
        {patientData.emergencyContacts.map((c, i) => (
          <View key={i} style={styles.contactRow}>
            <View>
              <Text style={styles.contactName}>{c.name}</Text>
              <Text style={styles.subText}>{c.relation}</Text>
            </View>
            <Pressable style={styles.callButton}>
              <Phone size={18} color="#FFFFFF" />
            </Pressable>
          </View>
        ))}
      </Section>

      {/* Logout */}
      <Pressable
        style={styles.logout}
        onPress={() => onNavigate('login')}
      >
        <LogOut size={20} color="#FFFFFF" />
        <Text style={styles.logoutText}>Sign Out</Text>
      </Pressable>
    </ScrollView>
  );
};

export default ProfileScreen;

const Section = ({ title, icon: Icon, children }) => (
  <View style={styles.section}>
    <View style={styles.sectionHeader}>
      <Icon size={20} color="#2563EB" />
      <Text style={styles.sectionTitle}>{title}</Text>
    </View>
    {children}
  </View>
);

const Stat = ({ label, value }) => (
  <View style={styles.stat}>
    <Text style={styles.statLabel}>{label}</Text>
    <Text style={styles.statValue}>{value}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
    padding: 16,
  },

  header: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    marginBottom: 16,
    overflow: 'hidden',
  },

  headerTop: {
    height: 80,
    backgroundColor: '#2563EB',
  },

  profileRow: {
    marginTop: -40,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },

  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 3,
    borderColor: '#FFFFFF',
  },

  headerInfo: {
    flex: 1,
  },

  name: {
    fontSize: 20,
    fontWeight: '700',
    color: '#0F172A',
  },

  subText: {
    fontSize: 13,
    color: '#64748B',
  },

  editButton: {
    flexDirection: 'row',
    gap: 6,
    padding: 8,
  },

  editText: {
    color: '#2563EB',
    fontWeight: '600',
  },

  section: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
  },

  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
  },

  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#334155',
  },

  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },

  stat: {
    width: '48%',
    backgroundColor: '#EFF6FF',
    padding: 12,
    borderRadius: 12,
    alignItems: 'center',
  },

  statLabel: {
    fontSize: 12,
    color: '#475569',
  },

  statValue: {
    fontSize: 18,
    fontWeight: '700',
    color: '#2563EB',
  },

  listItem: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 8,
  },

  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#EF4444',
    marginTop: 6,
  },

  listText: {
    fontSize: 14,
    color: '#334155',
    flex: 1,
  },

  badgeWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },

  badge: {
    backgroundColor: '#FEE2E2',
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 12,
  },

  badgeText: {
    color: '#991B1B',
    fontWeight: '600',
  },

  contactRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#F1F5F9',
    padding: 12,
    borderRadius: 12,
    marginBottom: 8,
  },

  contactName: {
    fontWeight: '700',
    color: '#0F172A',
  },

  callButton: {
    backgroundColor: '#16A34A',
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },

  logout: {
    backgroundColor: '#DC2626',
    paddingVertical: 18,
    borderRadius: 16,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
    marginBottom: 32,
  },

  logoutText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 16,
  },
});
