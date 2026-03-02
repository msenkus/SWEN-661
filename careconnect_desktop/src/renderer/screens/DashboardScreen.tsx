import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';

type ScheduleItem = {
  id: string;
  time: string;
  title: string;
  tag: string;
  tagColor: 'purple' | 'green' | 'blue' | 'orange';
};

const initialSchedule: ScheduleItem[] = [
  { id: '1', time: '8:00 AM', title: 'Take Morning Medication', tag: 'Medication', tagColor: 'purple' },
  { id: '2', time: '9:00 AM', title: 'Breakfast', tag: 'Meal', tagColor: 'green' },
  { id: '3', time: '10:30 AM', title: 'Physical Therapy Exercises', tag: 'Exercise', tagColor: 'blue' },
  { id: '4', time: '12:00 PM', title: 'Lunch', tag: 'Meal', tagColor: 'green' },
  { id: '5', time: '2:00 PM', title: 'Doctor Appointment', tag: 'Appointment', tagColor: 'orange' },
  { id: '6', time: '6:00 PM', title: 'Take Evening Medication', tag: 'Medication', tagColor: 'purple' },
  { id: '7', time: '7:00 PM', title: 'Dinner', tag: 'Meal', tagColor: 'green' },
];

const quickActions = [
  { to: '/dashboard/medications', label: 'View all medications', color: 'purple' },
  { to: '/dashboard/appointments', label: 'Manage appointments', color: 'orange' },
  { to: '/dashboard/task-history', label: 'View past tasks', color: 'blue' },
];

function formatDate(date: Date) {
  return date.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export default function DashboardScreen() {
  const today = formatDate(new Date());
  const [completedIds, setCompletedIds] = useState<Set<string>>(new Set(['1', '2']));
  const [infoMessage, setInfoMessage] = useState<string | null>(null);

  const toggleTask = (id: string) => {
    setCompletedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const currentId = useMemo(() => {
    const firstIncomplete = initialSchedule.find((item) => !completedIds.has(item.id));
    return firstIncomplete?.id ?? null;
  }, [completedIds]);

  const completedCount = completedIds.size;
  const totalTasks = initialSchedule.length;
  const pct = totalTasks > 0 ? Math.round((completedCount / totalTasks) * 100) : 0;

  const showInfoSoon = () => {
    setInfoMessage('Task details coming soon.');
    setTimeout(() => setInfoMessage(null), 2000);
  };

  return (
    <div className="dashboard-screen">
      {infoMessage && (
        <div className="dashboard-toast" role="status">
          {infoMessage}
        </div>
      )}
      <header className="dashboard-header">
        <div className="dashboard-header-left">
          <h1 className="dashboard-title">Dashboard</h1>
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

      <div className="dashboard-content">
        <div className="dashboard-grid dashboard-grid--top">
          <div className="dashboard-card dashboard-card--progress">
            <h2 className="dashboard-card-title">Today&apos;s Progress</h2>
            <div className="dashboard-progress-stats">
              <span className="dashboard-progress-count">{completedCount}/{totalTasks}</span>
              <span className="dashboard-progress-pct">{pct}% Complete</span>
            </div>
            <div className="dashboard-progress-bar">
              <div className="dashboard-progress-bar-fill" style={{ width: `${pct}%` }} />
            </div>
          </div>
          <div className="dashboard-card">
            <h2 className="dashboard-card-title">Quick Stats</h2>
            <div className="dashboard-stats">
              <div className="dashboard-stat">{totalTasks - completedCount} Tasks Remaining</div>
              <div className="dashboard-stat dashboard-stat--success">{completedCount} Completed Today</div>
            </div>
          </div>
        </div>

        <div className="dashboard-grid dashboard-grid--main">
          <section className="dashboard-card dashboard-schedule">
            <h2 className="dashboard-card-title">Today&apos;s Schedule</h2>
            <ul className="dashboard-schedule-list">
              {initialSchedule.map((item) => {
                const done = completedIds.has(item.id);
                const isCurrent = item.id === currentId;
                return (
                  <li
                    key={item.id}
                    className={`dashboard-schedule-item${isCurrent ? ' dashboard-schedule-item--current' : ''}${done ? ' dashboard-schedule-item--done' : ''} dashboard-schedule-item--clickable`}
                    onClick={() => toggleTask(item.id)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        toggleTask(item.id);
                      }
                    }}
                    role="button"
                    tabIndex={0}
                    aria-pressed={done}
                    aria-label={`${item.title}, ${done ? 'completed' : 'not completed'}. Click to toggle.`}
                  >
                    <span className="dashboard-schedule-status">
                      {done ? (
                        <span className="dashboard-schedule-check">✓</span>
                      ) : (
                        <span className="dashboard-schedule-circle" />
                      )}
                    </span>
                    <span className="dashboard-schedule-time">{item.time}</span>
                    <div className="dashboard-schedule-body">
                      <span className="dashboard-schedule-title">{item.title}</span>
                      <span className={`dashboard-tag dashboard-tag--${item.tagColor}`}>{item.tag}</span>
                    </div>
                    {isCurrent && (
                      <>
                        <span className="dashboard-tag dashboard-tag--current">Current</span>
                        <button
                          type="button"
                          className="dashboard-schedule-info"
                          aria-label="More info"
                          onClick={(e) => {
                            e.stopPropagation();
                            showInfoSoon();
                          }}
                        >
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <circle cx="12" cy="12" r="10" />
                            <line x1="12" y1="16" x2="12" y2="12" />
                            <line x1="12" y1="8" x2="12.01" y2="8" />
                          </svg>
                        </button>
                      </>
                    )}
                  </li>
                );
              })}
            </ul>
          </section>

          <section className="dashboard-card dashboard-quick-actions">
            <h2 className="dashboard-card-title">Quick Actions</h2>
            <div className="dashboard-quick-actions-list">
              {quickActions.map(({ to, label, color }) => (
                <Link key={to} to={to} className={`dashboard-quick-action dashboard-quick-action--${color}`}>
                  {label}
                </Link>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
