import { Link } from 'react-router-dom';

type HelpVideo = {
  id: string;
  title: string;
  duration: string;
  icon: 'pill' | 'clipboard' | 'sos' | 'alarm';
};

const moreHelpVideos: HelpVideo[] = [
  { id: '1', title: 'How to Take Your Medication', duration: '2:45', icon: 'pill' },
  { id: '2', title: 'Understanding Your Daily Tasks', duration: '3:20', icon: 'clipboard' },
  { id: '3', title: 'Using the SOS Button', duration: '1:30', icon: 'sos' },
  { id: '4', title: 'Setting Up Reminders', duration: '2:15', icon: 'alarm' },
];

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

function PillIcon() {
  return (
    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M8 8h8a4 4 0 0 1 0 8H8a4 4 0 0 1 0-8z" />
    </svg>
  );
}

function ClipboardIcon() {
  return (
    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
      <rect x="8" y="2" width="8" height="4" rx="1" ry="1" />
      <path d="M9 14h6M9 18h6" />
    </svg>
  );
}

function SOSIcon() {
  return (
    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="2" y="2" width="20" height="20" rx="4" fill="#dc2626" />
      <text
        x="12"
        y="14.5"
        textAnchor="middle"
        fill="white"
        fontSize="8"
        fontWeight="800"
        fontFamily="system-ui, -apple-system, sans-serif"
        letterSpacing="0.25"
      >
        SOS
      </text>
    </svg>
  );
}

function AlarmIcon() {
  return (
    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="13" r="7" />
      <path d="M12 8v5l3 3" />
      <path d="M5 3L3 5M21 3l-2 2M3 21l2-2M19 21l2-2" />
    </svg>
  );
}

function VideoIcon({ type }: { type: HelpVideo['icon'] }) {
  switch (type) {
    case 'pill': return <PillIcon />;
    case 'clipboard': return <ClipboardIcon />;
    case 'sos': return <SOSIcon />;
    case 'alarm': return <AlarmIcon />;
    default: return <PillIcon />;
  }
}

export default function ASLHelpScreen() {
  const today = formatDate(new Date());

  return (
    <div className="asl-help-screen">
      <header className="dashboard-header">
        <div className="dashboard-header-left">
          <h1 className="dashboard-title">ASL Help</h1>
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

      <div className="asl-help-nav-bar">
        <Link to="/dashboard" className="asl-help-nav-back">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="15 18 9 12 15 6" />
          </svg>
          ASL Help Videos
        </Link>
      </div>

      <div className="asl-help-content">
        <div className="asl-help-video-section">
          <div className="asl-help-video-wrapper">
            <div className="asl-help-video-placeholder">
              <span className="asl-help-video-emoji" aria-hidden>🤟</span>
              <span className="asl-help-video-overlay">ASL Interpretation</span>
            </div>
            <div className="asl-help-video-description-bar">
              Welcome to CareConnect. This video will show you how to take your medication safely.
            </div>
            <div className="asl-help-video-controls">
              <button type="button" className="asl-help-video-control-play" aria-label="Play">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </button>
              <span className="asl-help-video-time-current">0:45</span>
              <div className="asl-help-video-progress">
                <div className="asl-help-video-progress-fill" style={{ width: '27%' }} />
              </div>
              <button type="button" className="asl-help-video-control-icon" aria-label="Volume">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                  <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
                </svg>
              </button>
              <button type="button" className="asl-help-video-control-icon" aria-label="Captions">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="2" y="6" width="20" height="12" rx="2" />
                  <line x1="7" y1="10" x2="17" y2="10" />
                  <line x1="7" y1="14" x2="13" y2="14" />
                </svg>
              </button>
              <span className="asl-help-video-time-total">2:45</span>
            </div>
          </div>
          <h2 className="asl-help-video-title">How to Take Your Medication</h2>
          <p className="asl-help-video-subtitle">Learn the step-by-step process with ASL interpretation and captions.</p>
        </div>

        <section className="asl-help-more">
          <h2 className="asl-help-more-title">More Help Videos</h2>
          <div className="asl-help-more-grid">
            {moreHelpVideos.map((video) => (
              <button key={video.id} type="button" className="asl-help-more-card">
                <span className="asl-help-more-icon">
                  <VideoIcon type={video.icon} />
                </span>
                <span className="asl-help-more-card-title">{video.title}</span>
                <span className="asl-help-more-meta">ASL + Captions · {video.duration}</span>
                <span className="asl-help-more-arrow">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="9 18 15 12 9 6" />
                  </svg>
                </span>
              </button>
            ))}
          </div>
        </section>

        <div className="asl-help-accessibility">
          <span className="asl-help-accessibility-icon" aria-hidden>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10" />
              <path d="M12 16v-4M12 8h.01" />
            </svg>
          </span>
          <p className="asl-help-accessibility-text">
            <strong>Accessibility:</strong> All videos include American Sign Language (ASL) interpretation and closed captions. You can toggle captions on/off using the subtitle button.
          </p>
        </div>

        <div className="asl-help-footer">
          <Link to="/dashboard/asl-help" className="asl-help-footer-help" aria-label="Help">
            <HelpCircleIcon />
          </Link>
        </div>
      </div>
    </div>
  );
}
