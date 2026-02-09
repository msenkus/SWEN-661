import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  ScrollView,
} from 'react-native';
import {
  Calendar,
  Clock,
  MapPin,
  Phone,
  Mail,
  FileText,
  Navigation,
} from 'lucide-react-native';

const AppointmentDetail = ({ onNavigate }) => {
  return (
    <ScrollView style={styles.container}>
      {/* Header Card */}
      <View style={styles.headerCard}>
        <View style={styles.headerTop}>
          <View style={{ flex: 1 }}>
            <Text style={styles.doctorName}>Dr. Sarah Johnson</Text>
            <Text style={styles.specialty}>Primary Care Physician</Text>
            <Text style={styles.subSpecialty}>Internal Medicine</Text>
          </View>
          <View style={styles.headerIcon}>
            <Calendar size={28} color="#FFFFFF" />
          </View>
        </View>

        <View style={styles.dateCard}>
          <View>
            <Text style={styles.headerMeta}>Date & Time</Text>
            <Text style={styles.headerValue}>Today at 2:00 PM</Text>
          </View>
          <View>
            <Text style={styles.headerMeta}>Duration</Text>
            <Text style={styles.headerValue}>30 min</Text>
          </View>
        </View>
      </View>

      {/* Location */}
      <View style={styles.card}>
        <View style={styles.row}>
          <View style={styles.iconBlue}>
            <MapPin size={18} color="#2563EB" />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.cardTitle}>Location</Text>
            <Text style={styles.cardText}>Main Street Medical Center</Text>
            <Text style={styles.cardSubText}>123 Main Street, Suite 400</Text>
            <Text style={styles.cardSubText}>Springfield, IL 62701</Text>
          </View>
        </View>

        <Pressable style={styles.secondaryButton}>
          <Navigation size={16} color="#2563EB" />
          <Text style={styles.secondaryButtonText}>Get Directions</Text>
        </Pressable>
      </View>

      {/* Contact */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Contact Information</Text>

        <View style={styles.row}>
          <View style={styles.iconGreen}>
            <Phone size={16} color="#16A34A" />
          </View>
          <View>
            <Text style={styles.metaLabel}>Office Phone</Text>
            <Text style={styles.metaValue}>(555) 123-4567</Text>
          </View>
        </View>

        <View style={styles.row}>
          <View style={styles.iconPurple}>
            <Mail size={16} color="#7C3AED" />
          </View>
          <View>
            <Text style={styles.metaLabel}>Email</Text>
            <Text style={styles.metaValue}>office@mainstreetmed.com</Text>
          </View>
        </View>
      </View>

      {/* Notes */}
      <View style={styles.card}>
        <View style={styles.row}>
          <View style={styles.iconOrange}>
            <FileText size={18} color="#EA580C" />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.cardTitle}>Appointment Notes</Text>
            <Text style={styles.listItem}>• Annual physical examination</Text>
            <Text style={styles.listItem}>• Medication review</Text>
            <Text style={styles.listItem}>
              • Discuss lab results from last visit
            </Text>
          </View>
        </View>
      </View>

      {/* Prep Tips */}
      <View style={styles.tipCard}>
        <Text style={styles.tipTitle}>Before Your Visit</Text>
        <Text style={styles.tipText}>✓ Bring your insurance card</Text>
        <Text style={styles.tipText}>✓ List of current medications</Text>
        <Text style={styles.tipText}>✓ Arrive 15 minutes early</Text>
        <Text style={styles.tipText}>✓ Bring photo ID</Text>
      </View>

      {/* Actions */}
      <Pressable style={styles.primaryButton}>
        <Text style={styles.primaryButtonText}>Add to Calendar</Text>
      </Pressable>

      <View style={styles.actionRow}>
        <Pressable style={styles.callButton}>
          <Phone size={16} color="#FFFFFF" />
          <Text style={styles.callText}>Call Office</Text>
        </Pressable>

        <Pressable style={styles.secondaryGrayButton}>
          <Text style={styles.secondaryGrayText}>Reschedule</Text>
        </Pressable>
      </View>

      <Pressable style={styles.cancelButton}>
        <Text style={styles.cancelText}>Cancel Appointment</Text>
      </Pressable>
    </ScrollView>
  );
};

export default AppointmentDetail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
    padding: 16,
  },

  headerCard: {
    backgroundColor: '#2563EB',
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
  },

  headerTop: {
    flexDirection: 'row',
    marginBottom: 16,
  },

  headerIcon: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 999,
    padding: 12,
  },

  doctorName: {
    fontSize: 22,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 4,
  },

  specialty: {
    color: '#DBEAFE',
    fontSize: 14,
  },

  subSpecialty: {
    color: '#BFDBFE',
    fontSize: 12,
  },

  dateCard: {
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderRadius: 14,
    padding: 14,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  headerMeta: {
    color: '#DBEAFE',
    fontSize: 12,
  },

  headerValue: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },

  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 16,
    borderWidth: 2,
    borderColor: '#E5E7EB',
    marginBottom: 16,
  },

  row: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 12,
  },

  cardTitle: {
    fontWeight: '700',
    fontSize: 16,
    marginBottom: 6,
    color: '#0F172A',
  },

  cardText: {
    color: '#334155',
    fontSize: 14,
  },

  cardSubText: {
    color: '#64748B',
    fontSize: 13,
  },

  metaLabel: {
    fontSize: 12,
    color: '#64748B',
  },

  metaValue: {
    fontWeight: '600',
    color: '#0F172A',
  },

  listItem: {
    fontSize: 13,
    color: '#334155',
    marginBottom: 4,
  },

  tipCard: {
    backgroundColor: '#EFF6FF',
    borderColor: '#BFDBFE',
    borderWidth: 2,
    borderRadius: 14,
    padding: 16,
    marginBottom: 20,
  },

  tipTitle: {
    fontWeight: '700',
    color: '#1E40AF',
    marginBottom: 6,
  },

  tipText: {
    color: '#1E40AF',
    fontSize: 13,
  },

  primaryButton: {
    backgroundColor: '#2563EB',
    paddingVertical: 16,
    borderRadius: 16,
    alignItems: 'center',
    marginBottom: 12,
  },

  primaryButtonText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 16,
  },

  actionRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 12,
  },

  callButton: {
    flex: 1,
    backgroundColor: '#16A34A',
    borderRadius: 14,
    paddingVertical: 14,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 6,
  },

  callText: {
    color: '#FFFFFF',
    fontWeight: '700',
  },

  secondaryGrayButton: {
    flex: 1,
    backgroundColor: '#E5E7EB',
    borderRadius: 14,
    paddingVertical: 14,
    alignItems: 'center',
  },

  secondaryGrayText: {
    color: '#334155',
    fontWeight: '600',
  },

  cancelButton: {
    backgroundColor: '#FEE2E2',
    borderRadius: 14,
    paddingVertical: 14,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#FECACA',
    marginBottom: 32,
  },

  cancelText: {
    color: '#DC2626',
    fontWeight: '700',
  },

  iconBlue: {
    backgroundColor: '#DBEAFE',
    borderRadius: 999,
    padding: 8,
  },

  iconGreen: {
    backgroundColor: '#DCFCE7',
    borderRadius: 999,
    padding: 8,
  },

  iconPurple: {
    backgroundColor: '#EDE9FE',
    borderRadius: 999,
    padding: 8,
  },

  iconOrange: {
    backgroundColor: '#FFEDD5',
    borderRadius: 999,
    padding: 8,
  },
});
