import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  ScrollView,
} from 'react-native';
import {
  AlertCircle,
  X,
  Clock,
  ChevronRight,
} from 'lucide-react-native';

const MissedTaskAlert = ({ onNavigate, onDismiss }) => {
  const missedTasks = [
    {
      id: 1,
      title: 'Morning Blood Pressure Check',
      scheduledTime: '9:00 AM',
      missedBy: '2 hours',
      priority: 'high',
    },
    {
      id: 2,
      title: 'Drink Water',
      scheduledTime: '11:00 AM',
      missedBy: '30 minutes',
      priority: 'medium',
    },
  ];

  const handleDismissAll = () => {
    onDismiss?.();
    onNavigate('dashboard');
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerRow}>
          <View style={styles.iconWrapper}>
            <AlertCircle size={40} color="#DC2626" />
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{missedTasks.length}</Text>
            </View>
          </View>

          <View>
            <Text style={styles.headerTitle}>You Have Missed Tasks</Text>
            <Text style={styles.headerSubtitle}>
              Please complete these as soon as possible
            </Text>
          </View>
        </View>
      </View>

      {/* Task List */}
      <ScrollView style={styles.content}>
        {missedTasks.map((task) => (
          <View
            key={task.id}
            style={[
              styles.taskCard,
              task.priority === 'high'
                ? styles.highBorder
                : styles.mediumBorder,
            ]}
          >
            {/* Priority Bar */}
            <View
              style={[
                styles.priorityBar,
                task.priority === 'high'
                  ? styles.highPriority
                  : styles.mediumPriority,
              ]}
            >
              <Text style={styles.priorityText}>
                {task.priority.toUpperCase()} PRIORITY
              </Text>
            </View>

            <View style={styles.taskBody}>
              <Text style={styles.taskTitle}>{task.title}</Text>

              <View style={styles.metaRow}>
                <Clock size={16} color="#64748B" />
                <Text style={styles.metaText}>
                  Scheduled:{' '}
                  <Text style={styles.metaStrong}>
                    {task.scheduledTime}
                  </Text>
                </Text>
              </View>

              <View style={styles.metaRow}>
                <AlertCircle size={16} color="#DC2626" />
                <Text style={styles.missedText}>
                  Missed by {task.missedBy}
                </Text>
              </View>

              <Pressable
                style={[
                  styles.completeButton,
                  task.priority === 'high'
                    ? styles.highPriority
                    : styles.mediumPriority,
                ]}
                onPress={() => onNavigate('step-task')}
              >
                <Text style={styles.completeText}>Complete Now</Text>
                <ChevronRight size={18} color="#FFFFFF" />
              </Pressable>
            </View>
          </View>
        ))}

        {/* Info */}
        <View style={styles.infoCard}>
          <Text style={styles.infoText}>
            💡 <Text style={{ fontWeight: '700' }}>Tip:</Text> Set reminders to
            stay on track. Notification preferences can be adjusted in
            Accessibility settings.
          </Text>
        </View>
      </ScrollView>

      {/* Footer Actions */}
      <View style={styles.footer}>
        <Pressable
          style={styles.primaryButton}
          onPress={() => onNavigate('dashboard')}
        >
          <Text style={styles.primaryText}>View All Tasks</Text>
        </Pressable>

        <Pressable style={styles.dismissButton} onPress={handleDismissAll}>
          <X size={18} color="#475569" />
          <Text style={styles.dismissText}>Dismiss Alerts</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default MissedTaskAlert;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },

  header: {
    backgroundColor: '#FEF2F2',
    borderBottomWidth: 4,
    borderBottomColor: '#FECACA',
    padding: 20,
  },

  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },

  iconWrapper: {
    position: 'relative',
  },

  badge: {
    position: 'absolute',
    top: -6,
    right: -6,
    backgroundColor: '#DC2626',
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },

  badgeText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '700',
  },

  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#7F1D1D',
  },

  headerSubtitle: {
    fontSize: 13,
    color: '#991B1B',
  },

  content: {
    padding: 16,
  },

  taskCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    borderWidth: 2,
    marginBottom: 16,
    overflow: 'hidden',
  },

  highBorder: {
    borderColor: '#FCA5A5',
  },

  mediumBorder: {
    borderColor: '#FDBA74',
  },

  priorityBar: {
    paddingVertical: 6,
    paddingHorizontal: 12,
  },

  highPriority: {
    backgroundColor: '#DC2626',
  },

  mediumPriority: {
    backgroundColor: '#F97316',
  },

  priorityText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '700',
  },

  taskBody: {
    padding: 16,
  },

  taskTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#0F172A',
    marginBottom: 12,
  },

  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },

  metaText: {
    fontSize: 13,
    color: '#475569',
  },

  metaStrong: {
    fontWeight: '700',
  },

  missedText: {
    fontSize: 13,
    color: '#DC2626',
    fontWeight: '700',
  },

  completeButton: {
    marginTop: 12,
    borderRadius: 14,
    paddingVertical: 14,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 6,
  },

  completeText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 15,
  },

  infoCard: {
    backgroundColor: '#EFF6FF',
    borderWidth: 2,
    borderColor: '#BFDBFE',
    borderRadius: 14,
    padding: 16,
    marginTop: 8,
    marginBottom: 24,
  },

  infoText: {
    color: '#1E40AF',
    fontSize: 13,
  },

  footer: {
    padding: 16,
    borderTopWidth: 2,
    borderTopColor: '#E5E7EB',
    backgroundColor: '#FFFFFF',
  },

  primaryButton: {
    backgroundColor: '#2563EB',
    borderRadius: 16,
    paddingVertical: 16,
    alignItems: 'center',
    marginBottom: 10,
  },

  primaryText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 16,
  },

  dismissButton: {
    backgroundColor: '#E5E7EB',
    borderRadius: 16,
    paddingVertical: 14,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 6,
  },

  dismissText: {
    color: '#475569',
    fontWeight: '600',
  },
});
