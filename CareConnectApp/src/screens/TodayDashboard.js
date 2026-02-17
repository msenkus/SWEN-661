import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  TouchableOpacity,
  Platform,
} from 'react-native';
import {
  CheckCircle2,
  Circle,
  CircleDot,
  Clock,
  AlertCircle,
  Phone,
} from 'lucide-react-native';

const TodayDashboard = ({
  onNavigate,
  isTablet = false,
  orientation = 'portrait',
  hasMissedTasks = false,
}) => {
  const tasks = [
    { id: 1, time: '8:00 AM', title: 'Take Morning Medication', completed: true, type: 'medication' },
    { id: 2, time: '9:00 AM', title: 'Breakfast', completed: true, type: 'meal' },
    { id: 3, time: '10:30 AM', title: 'Physical Therapy Exercises', completed: false, type: 'exercise', current: true },
    { id: 4, time: '12:00 PM', title: 'Lunch', completed: false, type: 'meal' },
    { id: 5, time: '2:00 PM', title: 'Doctor Appointment', completed: false, type: 'appointment' },
    { id: 6, time: '6:00 PM', title: 'Take Evening Medication', completed: false, type: 'medication' },
    { id: 7, time: '7:00 PM', title: 'Dinner', completed: false, type: 'meal' },
  ];

  const completedCount = tasks.filter(t => t.completed).length;
  const progressPercentage = Math.round((completedCount / tasks.length) * 100);

  const tagStyle = type => {
    switch (type) {
      case 'medication': return styles.tagMedication;
      case 'meal': return styles.tagMeal;
      case 'exercise': return styles.tagExercise;
      case 'appointment': return styles.tagAppointment;
      default: return styles.tagDefault;
    }
  };

  const gridColumns =
    isTablet && orientation === 'landscape' ? styles.gridThree : styles.gridTwo;

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Progress Card */}
      <View
        style={styles.progressCard}
        accessible={true}
        accessibilityRole="summary"
        accessibilityLabel={`Today's progress: ${completedCount} of ${tasks.length} tasks completed, ${progressPercentage} percent`}
      >
        <View style={styles.progressHeader}>
          <View>
            <Text style={styles.progressLabel}>Today's Progress</Text>
            <Text style={styles.progressCount}>
              {completedCount}/{tasks.length}
            </Text>
          </View>
          <View style={styles.progressRight}>
            <Text style={styles.progressPercent}>{progressPercentage}%</Text>
            <Text style={styles.progressLabel}>Complete</Text>
          </View>
        </View>

        <View
          style={styles.progressBarBackground}
          accessible={true}
          accessibilityRole="progressbar"
          accessibilityValue={{
            min: 0,
            max: 100,
            now: progressPercentage,
          }}
          accessibilityLabel="Task completion progress"
        >
          <View style={[styles.progressBarFill, { width: `${progressPercentage}%` }]} />
        </View>
      </View>

      {/* Quick Actions */}
      <View style={[styles.grid, gridColumns]}>
        <TouchableOpacity
          onPress={() => onNavigate('medications')}
          accessible={true}
          accessibilityRole="button"
          accessibilityLabel="Medications"
          accessibilityHint="View and manage your medications"
          style={[
            styles.quickAction,
            { backgroundColor: '#EDE9FE', borderColor: '#C4B5FD' },
          ]}
        >
          <Text numberOfLines={1} adjustsFontSizeToFit style={styles.quickActionText}>Medications</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => onNavigate('appointments')}
          accessible={true}
          accessibilityRole="button"
          accessibilityLabel="Appointments"
          accessibilityHint="View your upcoming appointments"
          style={[
            styles.quickAction,
            { backgroundColor: '#EDE9FE', borderColor: '#C4B5FD' },
          ]}
        >
          <Text numberOfLines={1} adjustsFontSizeToFit style={styles.quickActionText}>Appointments</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => onNavigate('task-history')}
          accessible={true}
          accessibilityRole="button"
          accessibilityLabel="History"
          accessibilityHint="View your task completion history"
          style={[
            styles.quickAction,
            { backgroundColor: '#EDE9FE', borderColor: '#C4B5FD' },
          ]}
        >
          <Text numberOfLines={1} adjustsFontSizeToFit style={styles.quickActionText}>History</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => onNavigate('accessibility')}
          accessible={true}
          accessibilityRole="button"
          accessibilityLabel="Settings"
          accessibilityHint="Open accessibility and app settings"
          style={[
            styles.quickAction,
            { backgroundColor: '#EDE9FE', borderColor: '#C4B5FD' },
          ]}
        >
          <Text numberOfLines={1} adjustsFontSizeToFit style={styles.quickActionText}>Settings</Text>
        </TouchableOpacity>

      </View>

      {/* Task List */}
      <Text style={styles.sectionTitle} accessibilityRole="header">Today's Schedule</Text>

      {tasks.map(task => (
        <Pressable
          key={task.id}
          style={[
            styles.taskCard,
            task.current && styles.taskCurrent,
          ]}
          accessible={true}
          accessibilityRole="button"
          accessibilityLabel={`${task.title} at ${task.time}, ${task.completed ? 'completed' : task.current ? 'current task' : 'upcoming'}, ${task.type}`}
          accessibilityHint={
            task.type === 'medication'
              ? 'Opens medications screen'
              : task.current
              ? 'Opens step-by-step task'
              : undefined
          }
          onPress={() => {
            if (task.type === 'medication') onNavigate('medications');
            else if (task.current) onNavigate('step-task');
          }}
        >
          <View style={styles.taskRow}>
            {task.completed ? (
              <CheckCircle2 size={24} color="#22C55E" />
            ) : task.current ? (
              <CircleDot size={24} color="#2563EB" />
            ) : (
              <Circle size={24} color="#CBD5E1" />
            )}

            <View style={styles.taskContent}>
              <View style={styles.taskMeta}>
                <Clock size={14} color="#64748B" />
                <Text style={styles.taskTime}>{task.time}</Text>
                {task.current && <Text style={styles.currentBadge}>Current</Text>}
              </View>

              <Text
                style={[
                  styles.taskTitle,
                  task.completed && styles.taskCompleted,
                ]}
              >
                {task.title}
              </Text>

              <Text style={[styles.tag, tagStyle(task.type)]}>
                {task.type.charAt(0).toUpperCase() + task.type.slice(1)}
              </Text>
            </View>

            {task.current && (
              <AlertCircle size={20} color="#2563EB" />
            )}
          </View>
        </Pressable>
      ))}

      {/* SOS Button */}
      <Pressable
        style={styles.sosButton}
        onPress={() => onNavigate('sos')}
        accessible={true}
        accessibilityRole="button"
        accessibilityLabel="Emergency SOS"
        accessibilityHint="Opens emergency call confirmation"
      >
        <Phone size={24} color="#FFFFFF" />
        <Text style={styles.sosText}>Emergency SOS</Text>
      </Pressable>
    </ScrollView>
  );
};

export default TodayDashboard;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8FAFC' },
  content: { padding: 16 },

  progressCard: {
    backgroundColor: '#2563EB',
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  progressLabel: { color: '#E0EFFE', fontSize: 12 },
  progressCount: { color: '#FFF', fontSize: 32, fontWeight: '700' },
  progressRight: { alignItems: 'flex-end' },
  progressPercent: { color: '#FFF', fontSize: 28, fontWeight: '700' },

  progressBarBackground: {
    height: 10,
    backgroundColor: 'rgba(255,255,255,0.3)',
    borderRadius: 5,
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: '#FFF',
    borderRadius: 5,
  },

  grid: { marginBottom: 24, flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
  gridTwo: {},
  gridThree: {},

  quickAction: {
    width: '47%',
    borderRadius: 16,
    paddingVertical: 16,
    paddingHorizontal: 8,
    marginBottom: 12,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 48,
  },
  quickActionText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#334155',
    textAlign: 'center',
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 12,
    color: '#0F172A',
  },

  taskCard: {
    backgroundColor: '#FFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  taskCurrent: { borderColor: '#2563EB' },

  taskRow: { flexDirection: 'row', alignItems: 'flex-start', gap: 12 },
  taskContent: { flex: 1 },

  taskMeta: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  taskTime: { fontSize: 12, color: '#64748B' },

  currentBadge: {
    backgroundColor: '#2563EB',
    color: '#FFF',
    fontSize: 10,
    paddingHorizontal: 8,
    borderRadius: 10,
  },

  taskTitle: { fontSize: 16, fontWeight: '600', marginVertical: 4 },
  taskCompleted: { color: '#64748B', textDecorationLine: 'line-through' },

  tag: {
    fontSize: 12,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: 'flex-start',
  },

  tagMedication: { backgroundColor: '#EDE9FE', color: '#7C3AED' },
  tagMeal: { backgroundColor: '#DCFCE7', color: '#16A34A' },
  tagExercise: { backgroundColor: '#DBEAFE', color: '#2563EB' },
  tagAppointment: { backgroundColor: '#FFEDD5', color: '#F97316' },
  tagDefault: { backgroundColor: '#E5E7EB', color: '#374151' },

  sosButton: {
    marginTop: 24,
    backgroundColor: '#EF4444',
    paddingVertical: 20,
    borderRadius: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 12,
    minHeight: 48,
  },
  sosText: { color: '#FFF', fontSize: 20, fontWeight: '700' },
});
