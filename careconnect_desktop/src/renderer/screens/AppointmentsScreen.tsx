import { useState } from 'react';
import { Link } from 'react-router-dom';

type AppointmentColor = 'blue' | 'green' | 'purple' | 'orange';

type Appointment = {
  id: string;
  title: string;
  subtitle: string;
  dateLabel: string;
  time: string;
  duration: string;
  location: string;
  isTelehealth: boolean;
  color: AppointmentColor;
};

const upcomingAppointments: Appointment[] = [
  {
    id: '1',
    title: 'Dr. Sarah Johnson',
    subtitle: 'Primary Care Physician',
    dateLabel: 'Today',
    time: '2:00 PM',
    duration: '30 min',
    location: 'Main Street Medical Center',
    isTelehealth: false,
    color: 'blue',
  },
  {
    id: '2',
    title: 'Dr. Michael Chen',
    subtitle: 'Cardiologist',
    dateLabel: 'Tomorrow',
    time: '10:00 AM',
    duration: '45 min',
    location: 'Telehealth',
    isTelehealth: true,
    color: 'green',
  },
  {
    id: '3',
    title: 'Physical Therapy',
    subtitle: 'Dr. Emma Rodriguez',
    dateLabel: 'Jan 24',
    time: '3:00 PM',
    duration: '60 min',
    location: 'Rehabilitation Center',
    isTelehealth: false,
    color: 'purple',
  },
  {
    id: '4',
    title: 'Lab Work',
    subtitle: 'Blood Test & X-Ray',
    dateLabel: 'Jan 27',
    time: '8:30 AM',
    duration: '20 min',
    location: 'Medical Lab Services',
    isTelehealth: false,
    color: 'orange',
  },
];

function formatDate(date: Date) {
  return date.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

function CalendarIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  );
}

function PinIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

function VideoIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <polygon points="23 7 16 12 23 17 23 7" />
      <rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
    </svg>
  );
}

function HelpCircleIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <path d="M9.5 9.2a2.5 2.5 0 0 1 4.2 1.8c0 1.5-1.5 2.5-2.5 3" />
      <circle cx="12" cy="16.5" r="1.5" fill="currentColor" stroke="none" />
    </svg>
  );
}

type FilterTab = 'upcoming' | 'past' | 'canceled';

export default function AppointmentsScreen() {
  const today = formatDate(new Date());
  const [filter, setFilter] = useState<FilterTab>('upcoming');

  const count = upcomingAppointments.length;

  return (
    <div className="appointments-screen">
      <header className="dashboard-header">
        <div className="dashboard-header-left">
          <h1 className="dashboard-title">Appointments</h1>
          <p className="dashboard-date">{today}</p>
        </div>
        <div className="dashboard-header-actions">
          <Link to="/dashboard/notifications" className="dashboard-icon-btn" aria-label="Notifications">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
              <path d="M13.73 21a2 2 0 0 1-3.46 0" />
            </svg>
            <span className="dashboard-badge">3</span>
          </Link>
          <Link to="/dashboard/profile" className="dashboard-icon-btn" aria-label="Profile">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
          </Link>
        </div>
      </header>

      <div className="appointments-nav-bar">
        <Link to="/dashboard" className="appointments-nav-back">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="15 18 9 12 15 6" />
          </svg>
          Appointments
        </Link>
      </div>

      <div className="appointments-content">
        <div className="appointments-summary-card">
          <div className="appointments-summary-text">
            <span className="appointments-summary-label">Upcoming Appointments</span>
            <span className="appointments-summary-count">{count}</span>
          </div>
          <div className="appointments-summary-icon">
            <CalendarIcon />
          </div>
        </div>

        <div className="appointments-filters">
          <button
            type="button"
            className={`appointments-filter-btn${filter === 'upcoming' ? ' appointments-filter-btn--active' : ''}`}
            onClick={() => setFilter('upcoming')}
          >
            Upcoming
          </button>
          <button
            type="button"
            className={`appointments-filter-btn${filter === 'past' ? ' appointments-filter-btn--active' : ''}`}
            onClick={() => setFilter('past')}
          >
            Past
          </button>
          <button
            type="button"
            className={`appointments-filter-btn${filter === 'canceled' ? ' appointments-filter-btn--active' : ''}`}
            onClick={() => setFilter('canceled')}
          >
            Canceled
          </button>
        </div>

        <ul className="appointments-list">
          {upcomingAppointments.map((apt) => (
            <li key={apt.id} className="appointments-card">
              <div className={`appointments-card-header appointments-card-header--${apt.color}`}>
                <div className="appointments-card-header-text">
                  <span className="appointments-card-title">{apt.title}</span>
                  <span className="appointments-card-subtitle">{apt.subtitle}</span>
                </div>
                <div className="appointments-card-header-right">
                  <div className="appointments-card-header-meta">
                    <span className={`appointments-date-badge appointments-date-badge--${apt.color}`}>
                      {apt.dateLabel}
                    </span>
                    <span className="appointments-card-time">{apt.time}</span>
                  </div>
                  {apt.isTelehealth ? (
                    <span className="appointments-card-icon" aria-hidden>
                      <VideoIcon />
                    </span>
                  ) : (
                    <span className="appointments-card-icon" aria-hidden>
                      <PinIcon />
                    </span>
                  )}
                </div>
              </div>
              <div className="appointments-card-body">
                <div className="appointments-card-detail">
                  <ClockIcon />
                  <span>Duration: {apt.duration}</span>
                </div>
                <div className="appointments-card-detail">
                  {apt.isTelehealth ? (
                    <><VideoIcon /><span>{apt.location}</span></>
                  ) : (
                    <><PinIcon /><span>{apt.location}</span></>
                  )}
                </div>
                <Link to={`/dashboard/appointments/${apt.id}`} className="appointments-card-link">
                  View Details
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="9 18 15 12 9 6" />
                  </svg>
                </Link>
              </div>
            </li>
          ))}
        </ul>

        <div className="appointments-footer">
          <button type="button" className="appointments-schedule-btn">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="12" y1="5" x2="12" y2="19" />
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
            Schedule New Appointment
          </button>
          <Link to="/dashboard/asl-help" className="appointments-footer-help" aria-label="Help">
            <HelpCircleIcon />
          </Link>
        </div>
      </div>
    </div>
  );
}
