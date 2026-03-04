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

export default function AccessibilityScreen() {
  const today = formatDate(new Date());
  const { isDark, setTheme, highContrast, setHighContrast } = useTheme();
  const [largeText, setLargeText] = useState(true);
  const [visualAlerts, setVisualAlerts] = useState(true);
  const [reduceMotion, setReduceMotion] = useState(false);

  return (
    <div className="settings-screen accessibility-screen">
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

      <div className="settings-nav-bar">
        <Link to="/dashboard/settings" className="settings-nav-back">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="15 18 9 12 15 6" />
          </svg>
          Accessibility
        </Link>
      </div>

      <div className="settings-content">
        <h2 className="accessibility-page-title">Accessibility</h2>

        <div className="accessibility-cta">
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
          <h3 className="settings-section-title">
            <span className="settings-section-icon settings-section-icon--visual" aria-hidden>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                <circle cx="12" cy="12" r="3" />
              </svg>
            </span>
            Visual
          </h3>
          <div className="settings-list">
            <div className="settings-row">
              <div className="settings-row-text">
                <span className="settings-row-label">Dark Mode</span>
                <span className="settings-row-desc">Use a dark theme for the interface</span>
              </div>
              <Toggle checked={isDark} onChange={(on) => setTheme(on ? 'dark' : 'light')} ariaLabel="Toggle dark mode" />
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
          <h3 className="settings-section-title">
            <span className="settings-section-icon settings-section-icon--audio" aria-hidden>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                <path d="M15.54 8.46a5 5 0 0 1 0 7.07M19.07 4.93a10 10 0 0 1 0 14.14" />
              </svg>
            </span>
            Audio
          </h3>
          <p className="settings-row-desc" style={{ marginTop: 4 }}>Sound and voice options are available on the main Settings page.</p>
        </section>

        <div className="settings-footer">
          <Link to="/dashboard/asl-help" className="settings-footer-help" aria-label="Help">
            <HelpCircleIcon />
          </Link>
        </div>
      </div>
    </div>
  );
}
