import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';

type TaskStatus = 'done' | 'missed';
type TaskType = 'medication' | 'meal' | 'appointment' | 'exercise';

type Task = {
  id: string;
  title: string;
  time: string;
  type: TaskType;
  status: TaskStatus;
};

type DayGroup = {
  dateKey: string;
  label: string;
  fullDate: string;
  tasks: Task[];
};

const taskHistoryByDay: DayGroup[] = [
  {
    dateKey: 'today',
    label: 'Today',
    fullDate: 'January 21, 2026',
    tasks: [
      { id: 't1', title: 'Take Morning Medication', time: '8:00 AM', type: 'medication', status: 'done' },
      { id: 't2', title: 'Breakfast', time: '9:00 AM', type: 'meal', status: 'done' },
      { id: 't3', title: 'Physical Therapy Exercises', time: '10:30 AM', type: 'exercise', status: 'missed' },
    ],
  },
  {
    dateKey: 'yesterday',
    label: 'Yesterday',
    fullDate: 'January 20, 2026',
    tasks: [
      { id: 't4', title: 'Take Morning Medication', time: '8:00 AM', type: 'medication', status: 'done' },
      { id: 't5', title: 'Breakfast', time: '9:00 AM', type: 'meal', status: 'done' },
      { id: 't6', title: 'Doctor Appointment', time: '2:00 PM', type: 'appointment', status: 'done' },
      { id: 't7', title: 'Take Evening Medication', time: '6:00 PM', type: 'medication', status: 'done' },
      { id: 't8', title: 'Dinner', time: '7:00 PM', type: 'meal', status: 'done' },
    ],
  },
  {
    dateKey: 'jan19',
    label: 'January 19',
    fullDate: 'January 19, 2026',
    tasks: [
      { id: 't9', title: 'Take Morning Medication', time: '8:00 AM', type: 'medication', status: 'done' },
      { id: 't10', title: 'Breakfast', time: '9:00 AM', type: 'meal', status: 'missed' },
      { id: 't11', title: 'Physical Therapy', time: '3:00 PM', type: 'exercise', status: 'done' },
      { id: 't12', title: 'Take Evening Medication', time: '6:00 PM', type: 'medication', status: 'done' },
    ],
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

function TrendUpIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
      <polyline points="17 6 23 6 23 12" />
    </svg>
  );
}

function CalendarIconSmall() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

function XIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
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

type FilterTab = 'all' | 'completed' | 'missed';

export default function TaskHistoryScreen() {
  const today = formatDate(new Date());
  const [filter, setFilter] = useState<FilterTab>('all');

  const weeklyTotal = 49;
  const weeklyCompleted = 42;
  const weeklyMissed = 7;
  const weeklyPct = 86;

  const filteredDays = useMemo(() => {
    if (filter === 'all') return taskHistoryByDay;
    return taskHistoryByDay.map((day) => ({
      ...day,
      tasks: day.tasks.filter((t) =>
        filter === 'completed' ? t.status === 'done' : t.status === 'missed'
      ),
    })).filter((day) => day.tasks.length > 0);
  }, [filter]);

  return (
    <div className="task-history-screen">
      <header className="dashboard-header">
        <div className="dashboard-header-left">
          <h1 className="dashboard-title">Task History</h1>
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

      <div className="task-history-nav-bar">
        <Link to="/dashboard" className="task-history-nav-back">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="15 18 9 12 15 6" />
          </svg>
          Task History
        </Link>
      </div>

      <div className="task-history-content">
        <div className="task-history-summary">
          <div className="task-history-summary-main">
            <span className="task-history-summary-trend"><TrendUpIcon /></span>
            <span className="task-history-summary-label">This Week</span>
            <span className="task-history-summary-pct">{weeklyPct}% Complete</span>
          </div>
          <div className="task-history-summary-stats">
            <div className="task-history-stat"><span className="task-history-stat-value">{weeklyTotal}</span> Total Tasks</div>
            <div className="task-history-stat"><span className="task-history-stat-value">{weeklyCompleted}</span> Completed</div>
            <div className="task-history-stat"><span className="task-history-stat-value">{weeklyMissed}</span> Missed</div>
          </div>
        </div>

        <div className="task-history-filters">
          <button
            type="button"
            className={`task-history-filter-btn${filter === 'all' ? ' task-history-filter-btn--active' : ''}`}
            onClick={() => setFilter('all')}
          >
            All Tasks
          </button>
          <button
            type="button"
            className={`task-history-filter-btn${filter === 'completed' ? ' task-history-filter-btn--active' : ''}`}
            onClick={() => setFilter('completed')}
          >
            Completed
          </button>
          <button
            type="button"
            className={`task-history-filter-btn${filter === 'missed' ? ' task-history-filter-btn--active' : ''}`}
            onClick={() => setFilter('missed')}
          >
            Missed
          </button>
        </div>

        <div className="task-history-list">
          {filteredDays.map((day) => {
            const completed = day.tasks.filter((t) => t.status === 'done').length;
            const total = day.tasks.length;
            const pct = total > 0 ? Math.round((completed / total) * 100) : 0;
            const pctColor = pct === 100 ? 'green' : pct >= 50 ? 'orange' : 'red';
            return (
              <section key={day.dateKey} className="task-history-day">
                <div className="task-history-day-header">
                  <span className="task-history-day-label">
                    <CalendarIconSmall />
                    {day.label}
                  </span>
                  <span className="task-history-day-meta">
                    <span className={`task-history-day-pct task-history-day-pct--${pctColor}`}>{pct}%</span>
                    <span className="task-history-day-fraction">{completed}/{total}</span>
                  </span>
                </div>
                <p className="task-history-day-date">{day.fullDate}</p>
                <ul className="task-history-tasks">
                  {day.tasks.map((task) => (
                    <li
                      key={task.id}
                      className={`task-history-task${task.status === 'missed' ? ' task-history-task--missed' : ''}`}
                    >
                      <span className="task-history-task-status">
                        {task.status === 'done' ? (
                          <span className="task-history-task-check"><CheckIcon /></span>
                        ) : (
                          <span className="task-history-task-x"><XIcon /></span>
                        )}
                      </span>
                      <div className="task-history-task-info">
                        <span className="task-history-task-title">{task.title}</span>
                        <span className="task-history-task-meta">
                          {task.time}
                          <span className={`task-history-task-type task-history-task-type--${task.type}`}>{task.type}</span>
                        </span>
                      </div>
                      <span className={task.status === 'done' ? 'task-history-task-done' : 'task-history-task-missed'}>
                        {task.status === 'done' ? 'Done' : 'Missed'}
                      </span>
                    </li>
                  ))}
                </ul>
              </section>
            );
          })}
        </div>

        <button type="button" className="task-history-load-more">
          Load More History
        </button>

        <div className="task-history-week-message">
          <p className="task-history-week-title">Great job this week!</p>
          <p className="task-history-week-text">You&apos;ve maintained an {weeklyPct}% completion rate. Keep up the excellent work!</p>
        </div>

        <div className="task-history-footer">
          <Link to="/dashboard/asl-help" className="task-history-footer-help" aria-label="Help">
            <HelpCircleIcon />
          </Link>
        </div>
      </div>
    </div>
  );
}
