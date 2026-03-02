import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';

function formatDate(date: Date) {
  return date.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
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

function Toggle({
  checked,
  onChange,
  ariaLabel,
}: {
  checked: boolean;
  onChange: (v: boolean) => void;
  ariaLabel: string;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={ariaLabel}
      className={`settings-toggle ${checked ? 'settings-toggle--on' : ''}`}
      onClick={() => onChange(!checked)}
    >
      <span className="settings-toggle-track">
        <span className="settings-toggle-thumb" />
      </span>
    </button>
  );
}

function SpeakerIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
      <path d="M15.54 8.46a5 5 0 0 1 0 7.07M19.07 4.93a10 10 0 0 1 0 14.14" />
    </svg>
  );
}

function VibrationIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
    </svg>
  );
}

function BulbIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M9 18h6M10 22h4M15.09 14c.18-.98.65-1.74 1.41-2.5A4.65 4.65 0 0 0 18 8 6 6 0 0 0 6 8c0 1 .23 2.23 1.5 3.5A4.61 4.61 0 0 1 8.91 14" />
    </svg>
  );
}

function VoiceIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
      <path d="M19 10v2a7 7 0 0 1-14 0v-2M12 19v4M8 23h8" />
    </svg>
  );
}

type NotificationMethod = 'sound' | 'vibration' | 'visual' | 'voice';

const NOTIFICATION_METHODS: { id: NotificationMethod; label: string; color: string }[] = [
  { id: 'sound', label: 'Sound', color: 'blue' },
  { id: 'vibration', label: 'Vibration', color: 'orange' },
  { id: 'visual', label: 'Visual', color: 'yellow' },
  { id: 'voice', label: 'Voice', color: 'green' },
];

function PillIcon({ id }: { id: NotificationMethod }) {
  switch (id) {
    case 'sound': return <SpeakerIcon />;
    case 'vibration': return <VibrationIcon />;
    case 'visual': return <BulbIcon />;
    case 'voice': return <VoiceIcon />;
    default: return null;
  }
}

export default function SettingsScreen() {
  const today = formatDate(new Date());
  const { isDark, setTheme, highContrast, setHighContrast } = useTheme();
  const [largeText, setLargeText] = useState(true);
  const [visualAlerts, setVisualAlerts] = useState(true);
  const [reduceMotion, setReduceMotion] = useState(false);
  const [soundAlerts, setSoundAlerts] = useState(true);
  const [voiceAnnouncements, setVoiceAnnouncements] = useState(true);
  const [vibrationAlerts, setVibrationAlerts] = useState(true);
  const [activeNotifications, setActiveNotifications] = useState<Set<NotificationMethod>>(
    new Set(['sound', 'vibration', 'visual', 'voice'])
  );

  const toggleNotification = (id: NotificationMethod) => {
    setActiveNotifications((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const handleDarkModeChange = (on: boolean) => {
    setTheme(on ? 'dark' : 'light');
  };

  return (
    <div className="settings-screen">
      <header className="dashboard-header settings-header">
        <div className="dashboard-header-left">
          <h1 className="dashboard-title">Settings</h1>
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

      <div className="settings-content">
        <div className="settings-nav-bar">
          <span className="settings-nav-back settings-nav-back--label">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="15 18 9 12 15 6" />
            </svg>
            Accessibility
          </span>
        </div>

        <div className="accessibility-cta accessibility-cta--inline">
          <span className="accessibility-cta-icon" aria-hidden>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
              <circle cx="12" cy="12" r="3" />
            </svg>
          </span>
          <div className="accessibility-cta-text">
            <span className="accessibility-cta-label">Customize Your Experience</span>
            <span className="accessibility-cta-desc">Adjust settings to match your needs</span>
          </div>
        </div>

        <section className="settings-section">
          <h2 className="settings-section-title">
            <span className="settings-section-icon" aria-hidden>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                <circle cx="12" cy="12" r="3" />
              </svg>
            </span>
            Visual
          </h2>
          <div className="settings-list">
            <div className="settings-row">
              <div className="settings-row-text">
                <span className="settings-row-label">Dark Mode</span>
                <span className="settings-row-desc">Use a dark theme for the interface</span>
              </div>
              <Toggle checked={isDark} onChange={handleDarkModeChange} ariaLabel="Toggle dark mode" />
            </div>
            <div className="settings-row">
              <div className="settings-row-text">
                <span className="settings-row-label">High Contrast Mode</span>
                <span className="settings-row-desc">Increase contrast for better visibility</span>
              </div>
              <Toggle checked={highContrast} onChange={setHighContrast} ariaLabel="Toggle high contrast mode" />
            </div>
            <div className="settings-row">
              <div className="settings-row-text">
                <span className="settings-row-label">Large Text</span>
                <span className="settings-row-desc">Increase text size throughout the app</span>
              </div>
              <Toggle checked={largeText} onChange={setLargeText} ariaLabel="Toggle large text" />
            </div>
            <div className="settings-row">
              <div className="settings-row-text">
                <span className="settings-row-label">Visual Alerts</span>
                <span className="settings-row-desc">Show flashing indicators for notifications</span>
              </div>
              <Toggle checked={visualAlerts} onChange={setVisualAlerts} ariaLabel="Toggle visual alerts" />
            </div>
            <div className="settings-row">
              <div className="settings-row-text">
                <span className="settings-row-label">Reduce Motion</span>
                <span className="settings-row-desc">Minimize animations and transitions</span>
              </div>
              <Toggle checked={reduceMotion} onChange={setReduceMotion} ariaLabel="Toggle reduce motion" />
            </div>
          </div>
        </section>

        <section className="settings-section">
          <h2 className="settings-section-title">
            <span className="settings-section-icon" aria-hidden>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                <path d="M15.54 8.46a5 5 0 0 1 0 7.07M19.07 4.93a10 10 0 0 1 0 14.14" />
              </svg>
            </span>
            Audio
          </h2>
          <div className="settings-list">
            <div className="settings-row">
              <div className="settings-row-text">
                <span className="settings-row-label">Sound Alerts</span>
                <span className="settings-row-desc">Play sounds for notifications.</span>
              </div>
              <Toggle checked={soundAlerts} onChange={setSoundAlerts} ariaLabel="Toggle sound alerts" />
            </div>
            <div className="settings-row">
              <div className="settings-row-text">
                <span className="settings-row-label">Voice Announcements</span>
                <span className="settings-row-desc">Speak notifications and reminders aloud</span>
              </div>
              <Toggle checked={voiceAnnouncements} onChange={setVoiceAnnouncements} ariaLabel="Toggle voice announcements" />
            </div>
          </div>
        </section>

        <section className="settings-section">
          <h2 className="settings-section-title">
            <span className="settings-section-icon" aria-hidden>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
              </svg>
            </span>
            Haptic
          </h2>
          <div className="settings-list">
            <div className="settings-row">
              <div className="settings-row-text">
                <span className="settings-row-label">Vibration Alerts</span>
                <span className="settings-row-desc">Vibrate for important notifications</span>
              </div>
              <Toggle checked={vibrationAlerts} onChange={setVibrationAlerts} ariaLabel="Toggle vibration alerts" />
            </div>
          </div>
        </section>

        <section className="settings-section settings-section--preview">
          <div className="settings-preview-box">
            <h2 className="settings-section-title settings-preview-title">
              <span className="settings-section-icon" aria-hidden>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M4 7V4h16v3M9 20h6M12 4v16" />
                </svg>
              </span>
              Text Size Preview
            </h2>
            <p className="settings-preview-text">This is how your text will appear in the app.</p>
            <p className="settings-preview-size">Current size: <strong className="settings-preview-size-value">Large</strong></p>
          </div>
        </section>

        <section className="settings-section">
          <h2 className="settings-section-title">
            <span className="settings-section-icon" aria-hidden>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
                <path d="M13.73 21a2 2 0 0 1-3.46 0" />
              </svg>
            </span>
            Notification Style
          </h2>
          <p className="settings-notification-sub">Active notification methods:</p>
          <div className="settings-notification-pills">
            {NOTIFICATION_METHODS.map(({ id, label, color }) => (
              <button
                key={id}
                type="button"
                className={`settings-pill settings-pill--${color} ${activeNotifications.has(id) ? 'settings-pill--active' : ''}`}
                onClick={() => toggleNotification(id)}
                aria-pressed={activeNotifications.has(id)}
              >
                <span className="settings-pill-icon"><PillIcon id={id} /></span>
                {label}
              </button>
            ))}
          </div>
        </section>

        <div className="settings-footer">
          <Link to="/dashboard/asl-help" className="settings-asl-btn">
            Watch ASL Help Videos
          </Link>
          <Link to="/dashboard/asl-help" className="settings-footer-help" aria-label="Help">
            <HelpCircleIcon />
          </Link>
        </div>
      </div>
    </div>
  );
}
