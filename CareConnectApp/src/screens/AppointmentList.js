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
  Video,
  ChevronRight,
} from 'lucide-react-native';

const AppointmentList = ({ onNavigate }) => {
  const appointments = [
    {
      id: 1,
      title: 'Dr. Sarah Johnson',
      specialty: 'Primary Care Physician',
      date: 'Today',
      time: '2:00 PM',
      duration: '30 min',
      type: 'in-person',
      location: 'Main Street Medical Center',
      color: '#3B82F6',
    },
    {
      id: 2,
      title: 'Dr. Michael Chen',
      specialty: 'Cardiologist',
      date: 'Tomorrow',
      time: '10:00 AM',
      duration: '45 min',
      type: 'video',
      location: 'Telehealth',
      color: '#22C55E',
    },
    {
      id: 3,
      title: 'Physical Therapy',
      specialty: 'Dr. Emma Rodriguez',
      date: 'Jan 24',
      time: '3:00 PM',
      duration: '60 min',
      type: 'in-person',
      location: 'Rehabilitation Center',
      color: '#A855F7',
    },
    {
      id: 4,
      title: 'Lab Work',
      specialty: 'Blood Test & X-Ray',
      date: 'Jan 27',
      time: '8:30 AM',
      duration: '20 min',
      type: 'in-person',
      location: 'Medical Lab Services',
      color: '#F97316',
    },
  ];

  return (
    <ScrollView style={styles.container}>
      {/* Summary Card */}
      <View style={styles.summaryCard}>
        <View>
          <Text style={styles.summaryLabel}>Upcoming Appointments</Text>
          <Text style={styles.summaryCount}>{appointments.length}</Text>
        </View>
        <Calendar size={48} color="#FED7AA" />
      </View>

      {/* Filters */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filters}>
        <Text style={styles.filterActive}>Upcoming</Text>
        <Text style={styles.filter}>Past</Text>
        <Text style={styles.filter}>Canceled</Text>
      </ScrollView>

      {/* Appointment Cards */}
      {appointments.map((appointment) => (
        <Pressable
          key={appointment.id}
          style={styles.card}
          onPress={() => onNavigate('appointment-detail')}
        >
          {/* Card Header */}
          <View style={[styles.cardHeader, { backgroundColor: appointment.color }]}>
            <View style={{ flex: 1 }}>
              <Text style={styles.cardTitle}>{appointment.title}</Text>
              <Text style={styles.cardSubtitle}>{appointment.specialty}</Text>
            </View>
            {appointment.type === 'video' ? (
              <Video size={20} color="#FFFFFF" />
            ) : (
              <MapPin size={20} color="#FFFFFF" />
            )}
          </View>

          {/* Card Body */}
          <View style={styles.cardBody}>
            <View style={styles.row}>
              <Clock size={16} color="#64748B" />
              <Text style={styles.rowText}>Duration: {appointment.duration}</Text>
            </View>

            <View style={styles.row}>
              {appointment.type === 'video' ? (
                <Video size={16} color="#64748B" />
              ) : (
                <MapPin size={16} color="#64748B" />
              )}
              <Text style={styles.rowText}>{appointment.location}</Text>
            </View>

            <View style={styles.footer}>
              <Text style={styles.viewDetails}>View Details</Text>
              <ChevronRight size={20} color="#2563EB" />
            </View>
          </View>
        </Pressable>
      ))}

      {/* Add Appointment */}
      <Pressable style={styles.addButton}>
        <Text style={styles.addButtonText}>+ Schedule New Appointment</Text>
      </Pressable>
    </ScrollView>
  );
};

export default AppointmentList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
    padding: 16,
  },

  summaryCard: {
    backgroundColor: '#F97316',
    borderRadius: 20,
    padding: 20,
    marginBottom: 24,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  summaryLabel: {
    color: '#FED7AA',
    fontSize: 14,
  },

  summaryCount: {
    color: '#FFFFFF',
    fontSize: 32,
    fontWeight: '700',
  },

  filters: {
    flexDirection: 'row',
    marginBottom: 24,
  },

  filterActive: {
    backgroundColor: '#2563EB',
    color: '#FFFFFF',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 10,
    marginRight: 8,
    fontWeight: '600',
  },

  filter: {
    backgroundColor: '#E5E7EB',
    color: '#475569',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 10,
    marginRight: 8,
  },

  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    marginBottom: 16,
    borderWidth: 2,
    borderColor: '#E5E7EB',
    overflow: 'hidden',
  },

  cardHeader: {
    padding: 16,
    flexDirection: 'row',
    alignItems: 'flex-start',
  },

  cardTitle: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '700',
  },

  cardSubtitle: {
    color: '#FFFFFF',
    opacity: 0.9,
    fontSize: 13,
  },

  cardBody: {
    padding: 16,
  },

  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },

  rowText: {
    color: '#475569',
    fontSize: 14,
  },

  footer: {
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderColor: '#E5E7EB',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  viewDetails: {
    color: '#2563EB',
    fontWeight: '600',
  },

  addButton: {
    backgroundColor: '#EFF6FF',
    borderColor: '#BFDBFE',
    borderWidth: 2,
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 16,
    marginBottom: 32,
  },

  addButtonText: {
    color: '#2563EB',
    fontWeight: '700',
  },
});
