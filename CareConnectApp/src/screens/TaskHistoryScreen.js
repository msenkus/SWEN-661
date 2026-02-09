import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const TaskHistoryScreen = ({
  onNavigate,
  isTablet = false,
  orientation = 'portrait',
  hasMissedTasks = false,
}) => {
  const weeklyStats = {
    totalTasks: 49,
    completed: 42,
    missed: 7,
    completionRate: 86,
  };

  const historyByDate = [
    {
      date: 'Today',
      fullDate: 'January 21, 2026',
      tasks: [
        { id: 1, title: 'Take Morning Medication', time: '8:00 AM', completed: true, type: 'medication' },
        { id: 2, title: 'Breakfast', time: '9:00 AM', completed: true, type: 'meal' },
        { id: 3, title: 'Physical Therapy Exercises', time: '10:30 AM', completed: false, type: 'exercise' },
      ],
    },
    {
      date: 'Yesterday',
      fullDate: 'January 20, 2026',
      tasks: [
        { id: 4, title: 'Take Morning Medication', time: '8:00 AM', completed: true, type: 'medication' },
        { id: 5, title: 'Breakfast', time: '9:00 AM', completed: true, type: 'meal' },
        { id: 6, title: 'Doctor Appointment', time: '2:00 PM', completed: true, type: 'appointment' },
        { id: 7, title: 'Take Evening Medication', time: '6:00 PM', completed: true, type: 'medication' },
        { id: 8, title: 'Dinner', time: '7:00 PM', completed: true, type: 'meal' },
      ],
    },
    {
      date: 'January 19',
      fullDate: 'January 19, 2026',
      tasks: [
        { id: 9, title: 'Take Morning Medication', time: '8:00 AM', completed: true, type: 'medication' },
        { id: 10, title: 'Breakfast', time: '9:00 AM', completed: false, type: 'meal' },
        { id: 11, title: 'Physical Therapy', time: '3:00 PM', completed: true, type: 'exercise' },
        { id: 12, title: 'Take Evening Medication', time: '6:00 PM', completed: true, type: 'medication' },
      ],
    },
  ];

  const typeStyle = type => {
    switch (type) {
      case 'medication': return styles.typeMedication;
      case 'meal': return styles.typeMeal;
      case 'exercise': return styles.typeExercise;
      case 'appointment': return styles.typeAppointment;
      default: return styles.typeDefault;
    }
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Weekly Stats */}
      <View style={styles.statsCard}>
        <View style={styles.statsHeader}>
          <Ionicons name="trending-up" size={32} color="#FFFFFF" />
          <View>
            <Text style={styles.statsLabel}>This Week</Text>
            <Text style={styles.statsTitle}>
              {weeklyStats.completionRate}% Complete
            </Text>
          </View>
        </View>

        <View style={styles.statsGrid}>
          <Stat label="Total Tasks" value={weeklyStats.totalTasks} />
          <Stat label="Completed" value={weeklyStats.completed} />
          <Stat label="Missed" value={weeklyStats.missed} />
        </View>
      </View>

      {/* Filters */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filters}>
        <Filter label="All Tasks" active />
        <Filter label="Completed" />
        <Filter label="Missed" />
      </ScrollView>

      {/* History by Date */}
      {historyByDate.map((day, index) => {
        const completed = day.tasks.filter(t => t.completed).length;
        const rate = Math.round((completed / day.tasks.length) * 100);

        return (
          <View key={index} style={styles.dayBlock}>
            <View style={styles.dayHeader}>
              <View style={styles.dayLeft}>
                <Ionicons name="calendar" size={20} color="#2563EB" />
                <View>
                  <Text style={styles.dayTitle}>{day.date}</Text>
                  <Text style={styles.daySubtitle}>{day.fullDate}</Text>
                </View>
              </View>

              <View style={styles.dayRight}>
                <Text style={[
                  styles.dayRate,
                  rate >= 80 ? styles.goodRate : styles.warnRate,
                ]}>
                  {rate}%
                </Text>
                <Text style={styles.dayCount}>
                  {completed}/{day.tasks.length}
                </Text>
              </View>
            </View>

            {day.tasks.map(task => (
              <View
                key={task.id}
                style={[
                  styles.taskCard,
                  !task.completed && styles.taskMissed,
                ]}
              >
                <Ionicons
                  name={task.completed ? 'checkmark-circle' : 'close-circle'}
                  size={20}
                  color={task.completed ? '#22C55E' : '#EF4444'}
                />

                <View style={styles.taskContent}>
                  <Text style={[
                    styles.taskTitle,
                    !task.completed && styles.taskMissedText,
                  ]}>
                    {task.title}
                  </Text>

                  <View style={styles.taskMeta}>
                    <Ionicons name="time-outline" size={12} color="#64748B" />
                    <Text style={styles.taskTime}>{task.time}</Text>
                    <Text style={[styles.taskType, typeStyle(task.type)]}>
                      • {task.type}
                    </Text>
                  </View>
                </View>

                <View style={[
                  styles.statusChip,
                  task.completed ? styles.doneChip : styles.missedChip,
                ]}>
                  <Text style={styles.chipText}>
                    {task.completed ? 'Done' : 'Missed'}
                  </Text>
                </View>
              </View>
            ))}
          </View>
        );
      })}

      {/* Load More */}
      <Pressable style={styles.loadMore}>
        <Text style={styles.loadMoreText}>Load More History</Text>
      </Pressable>

      {/* Motivation */}
      <View style={styles.motivation}>
        <Text style={styles.motivationTitle}>🎉 Great job this week!</Text>
        <Text style={styles.motivationText}>
          You’ve maintained an {weeklyStats.completionRate}% completion rate. Keep up the excellent work!
        </Text>
      </View>
    </ScrollView>
  );
};

export default TaskHistoryScreen;

const Stat = ({ label, value }) => (
  <View style={styles.statBox}>
    <Text style={styles.statValue}>{value}</Text>
    <Text style={styles.statLabel}>{label}</Text>
  </View>
);

const Filter = ({ label, active }) => (
  <View style={[
    styles.filterButton,
    active && styles.filterActive,
  ]}>
    <Text style={[
      styles.filterText,
      active && styles.filterTextActive,
    ]}>
      {label}
    </Text>
  </View>
);

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8FAFC' },
  content: { padding: 16 },

  statsCard: {
    backgroundColor: '#16A34A',
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
  },
  statsHeader: { flexDirection: 'row', gap: 12, marginBottom: 16 },
  statsLabel: { color: '#DCFCE7', fontSize: 12 },
  statsTitle: { color: '#FFF', fontSize: 24, fontWeight: '700' },

  statsGrid: { flexDirection: 'row', gap: 12 },
  statBox: {
    flex: 1,
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderRadius: 12,
    padding: 12,
    alignItems: 'center',
  },
  statValue: { color: '#FFF', fontSize: 20, fontWeight: '700' },
  statLabel: { color: '#DCFCE7', fontSize: 12 },

  filters: { marginBottom: 16 },
  filterButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: '#E5E7EB',
    borderRadius: 10,
    marginRight: 8,
  },
  filterActive: { backgroundColor: '#2563EB' },
  filterText: { color: '#374151', fontWeight: '600' },
  filterTextActive: { color: '#FFF' },

  dayBlock: { marginBottom: 24 },
  dayHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  dayLeft: { flexDirection: 'row', gap: 8 },
  dayTitle: { fontWeight: '700', fontSize: 16 },
  daySubtitle: { fontSize: 12, color: '#64748B' },

  dayRight: { alignItems: 'flex-end' },
  dayRate: { fontWeight: '700' },
  goodRate: { color: '#16A34A' },
  warnRate: { color: '#F97316' },
  dayCount: { fontSize: 12, color: '#64748B' },

  taskCard: {
    flexDirection: 'row',
    gap: 12,
    backgroundColor: '#FFF',
    borderRadius: 14,
    padding: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    marginBottom: 8,
  },
  taskMissed: {
    backgroundColor: '#FEF2F2',
    borderColor: '#FECACA',
  },

  taskContent: { flex: 1 },
  taskTitle: { fontWeight: '600', fontSize: 14 },
  taskMissedText: { color: '#991B1B' },

  taskMeta: { flexDirection: 'row', gap: 6, marginTop: 4 },
  taskTime: { fontSize: 12, color: '#64748B' },

  taskType: { fontSize: 12 },
  typeMedication: { color: '#7C3AED' },
  typeMeal: { color: '#16A34A' },
  typeExercise: { color: '#2563EB' },
  typeAppointment: { color: '#F97316' },
  typeDefault: { color: '#374151' },

  statusChip: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: 'center',
  },
  doneChip: { backgroundColor: '#DCFCE7' },
  missedChip: { backgroundColor: '#FEE2E2' },
  chipText: { fontSize: 12, fontWeight: '600' },

  loadMore: {
    backgroundColor: '#E5E7EB',
    padding: 14,
    borderRadius: 14,
    alignItems: 'center',
    marginBottom: 20,
  },
  loadMoreText: { fontWeight: '600', color: '#374151' },

  motivation: {
    backgroundColor: '#EEF2FF',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#C7D2FE',
  },
  motivationTitle: { fontWeight: '700', textAlign: 'center', marginBottom: 4 },
  motivationText: { textAlign: 'center', fontSize: 13 },
});
