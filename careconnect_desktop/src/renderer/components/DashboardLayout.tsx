import React from 'react';
import { Link, NavLink, Outlet } from 'react-router-dom';

const SIDEBAR_WIDTH = 260;

/** CareConnect logo for sidebar */
function SidebarLogo() {
  return (
    <div className="dashboard-sidebar-logo">
      <div className="dashboard-sidebar-logo-icon">
        <svg width="28" height="26" viewBox="0 0 24 22" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
            fill="#fff"
          />
        </svg>
      </div>
      <div>
        <div className="dashboard-sidebar-brand">CareConnect</div>
        <div className="dashboard-sidebar-tagline">Care Management</div>
      </div>
    </div>
  );
}

const navItems: { to: string; label: string; icon: string }[] = [
  { to: '/dashboard', label: 'Dashboard', icon: 'dashboard' },
  { to: '/dashboard/medications', label: 'Medications', icon: 'pill' },
  { to: '/dashboard/appointments', label: 'Appointments', icon: 'calendar' },
  { to: '/dashboard/task-history', label: 'Task History', icon: 'clock' },
  { to: '/dashboard/asl-help', label: 'ASL Help', icon: 'help' },
  { to: '/dashboard/settings', label: 'Settings', icon: 'settings' },
];

function NavIcon({ icon }: { icon: string }) {
  if (icon === 'dashboard') {
    return (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="3" y="3" width="7" height="9" rx="1" />
        <rect x="14" y="3" width="7" height="5" rx="1" />
        <rect x="14" y="12" width="7" height="9" rx="1" />
        <rect x="3" y="16" width="7" height="5" rx="1" />
      </svg>
    );
  }
  if (icon === 'calendar') {
    return (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
        <line x1="16" y1="2" x2="16" y2="6" />
        <line x1="8" y1="2" x2="8" y2="6" />
        <line x1="3" y1="10" x2="21" y2="10" />
      </svg>
    );
  }
  if (icon === 'clock') {
    return (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      </svg>
    );
  }
  if (icon === 'help') {
    return (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="10" />
        <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
        <line x1="12" y1="17" x2="12.01" y2="17" />
      </svg>
    );
  }
  if (icon === 'settings') {
    return (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="3" />
        <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
      </svg>
    );
  }
  if (icon === 'pill') {
    return (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M8 8h8a4 4 0 0 1 0 8H8a4 4 0 0 1 0-8z" />
      </svg>
    );
  }
  // link (fallback)
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
      <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
    </svg>
  );
}

export default function DashboardLayout() {
  const mainRef = React.useRef<HTMLDivElement>(null);

  const handleSkipClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    mainRef.current?.scrollIntoView({ behavior: 'smooth' });
    mainRef.current?.focus();
  };

  return (
    <div className="dashboard-layout" style={{ '--sidebar-width': `${SIDEBAR_WIDTH}px` } as React.CSSProperties}>
      <a href="#main-content" className="dashboard-skip-link" onClick={handleSkipClick}>
        Skip to main content
      </a>
      <aside className="dashboard-sidebar">
        <div className="dashboard-sidebar-top">
          <SidebarLogo />
          <nav className="dashboard-sidebar-nav">
            {navItems.map(({ to, label, icon }) => (
              <NavLink
                key={to}
                to={to}
                className={({ isActive }) =>
                  `dashboard-sidebar-link${isActive ? ' dashboard-sidebar-link--active' : ''}`
                }
                end={to === '/dashboard'}
              >
                <NavIcon icon={icon} />
                <span>{label}</span>
                <span className="dashboard-sidebar-link-arrow">→</span>
              </NavLink>
            ))}
          </nav>
        </div>
        <div className="dashboard-sidebar-bottom">
          <Link to="/dashboard/sos" className="dashboard-sidebar-sos">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
            </svg>
            Emergency SOS
          </Link>
          <div className="dashboard-sidebar-profile">
            <div className="dashboard-sidebar-profile-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
            </div>
            <div className="dashboard-sidebar-profile-info">
              <div className="dashboard-sidebar-profile-name">Sarah Johnson</div>
              <Link to="/dashboard/profile" className="dashboard-sidebar-profile-link">View Profile</Link>
            </div>
          </div>
        </div>
      </aside>
      <div id="main-content" ref={mainRef} className="dashboard-main" tabIndex={-1}>
        <Outlet />
      </div>
    </div>
  );
}
