import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const MedicationsScreen = ({
  onNavigate,
  isTablet = false,
  orientation = 'portrait',
  hasMissedTasks = false,
  
}) => {
  const medicationsByDate = [
    {
      date: 'Today',
      fullDate: 'January 21, 2026',
      meds: [
        { id: 1, name: 'Lisinopril', time: '8:00 AM', taken: true },
        { id: 2, name: 'Metformin', time: '8:00 AM', taken: true },
        { id: 3, name: 'Vitamin D', time: '6:00 PM', taken: false },
      ],
    },
    {
      date: 'Yesterday',
      fullDate: 'January 20, 2026',
      meds: [
        { id: 4, name: 'Lisinopril', time: '8:00 AM', taken: true },
        { id: 5, name: 'Metformin', time: '8:00 AM', taken: true },
        { id: 6, name: 'Vitamin D', time: '6:00 PM', taken: true },
      ],
    },
  ];

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <Pressable onPress={() => onNavigate('dashboard')} hitSlop={10}>
          <Ionicons name="arrow-back" size={24} color="#2563EB" />
        </Pressable>

        <Text style={styles.screenTitle}>Medications</Text>
      </View>


      {medicationsByDate.map((day, index) => (
        <View key={index} style={styles.dayBlock}>
          <View style={styles.dayHeader}>
            <Ionicons name="calendar" size={20} color="#7C3AED" />
            <View>
              <Text style={styles.dayTitle}>{day.date}</Text>
              <Text style={styles.daySubtitle}>{day.fullDate}</Text>
            </View>
          </View>

          {day.meds.map(med => (
            <Pressable
              key={med.id}
              style={[
                styles.medCard,
                !med.taken && styles.medMissed,
              ]}
              onPress={() => onNavigate('step-task')}
            >
              <Ionicons
                name={med.taken ? 'checkmark-circle' : 'alert-circle'}
                size={22}
                color={med.taken ? '#22C55E' : '#F97316'}
              />

              <View style={styles.medContent}>
                <Text style={styles.medName}>{med.name}</Text>
                <View style={styles.medMeta}>
                  <Ionicons name="time-outline" size={12} color="#64748B" />
                  <Text style={styles.medTime}>{med.time}</Text>
                </View>
              </View>

              <View
                style={[
                  styles.statusChip,
                  med.taken ? styles.takenChip : styles.missedChip,
                ]}
              >
                <Text style={styles.chipText}>
                  {med.taken ? 'Taken' : 'Missed'}
                </Text>
              </View>
            </Pressable>
          ))}
        </View>
      ))}

      <Pressable style={styles.historyButton} onPress={() => onNavigate('task-history')}>
        <Text style={styles.historyText}>View Full Medication History</Text>
      </Pressable>
    </ScrollView>
  );
};

export default MedicationsScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8FAFC' },
  content: { padding: 16 },

  header: {
  flexDirection: 'row',
  alignItems: 'center',
  marginBottom: 16,
  gap: 12,
  },


  screenTitle: {
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 16,
    color: '#0F172A',
  },

  dayBlock: { marginBottom: 24 },

  dayHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 10,
  },
  dayTitle: { fontWeight: '700', fontSize: 16 },
  daySubtitle: { fontSize: 12, color: '#64748B' },

  medCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 14,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    marginBottom: 8,
  },
  medMissed: {
    backgroundColor: '#FFF7ED',
    borderColor: '#FED7AA',
  },

  medContent: { flex: 1 },
  medName: { fontSize: 16, fontWeight: '600', color: '#0F172A' },

  medMeta: {
    flexDirection: 'row',
    gap: 6,
    marginTop: 4,
    alignItems: 'center',
  },
  medTime: { fontSize: 12, color: '#64748B' },

  statusChip: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  takenChip: { backgroundColor: '#DCFCE7' },
  missedChip: { backgroundColor: '#FFEDD5' },
  chipText: { fontSize: 12, fontWeight: '600' },

  historyButton: {
    marginTop: 24,
    backgroundColor: '#EDE9FE',
    borderRadius: 16,
    padding: 14,
    alignItems: 'center',
  },
  historyText: {
    fontWeight: '600',
    color: '#7C3AED',
  },
});
