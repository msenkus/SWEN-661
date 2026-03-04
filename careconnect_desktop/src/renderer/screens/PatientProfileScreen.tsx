import { Link } from 'react-router-dom';

function formatDate(date: Date) {
  return date.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

function HeartbeatIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    </svg>
  );
}

function HeartIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    </svg>
  );
}

function ShieldAlertIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <line x1="12" y1="8" x2="12" y2="12" />
      <line x1="12" y1="16" x2="12.01" y2="16" />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}

function PencilIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
    </svg>
  );
}

export default function PatientProfileScreen() {
  const today = formatDate(new Date());

  return (
    <div className="profile-screen">
      <header className="dashboard-header">
        <div className="dashboard-header-left">
          <h1 className="dashboard-title">CareConnect</h1>
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

      <div className="profile-header-card">
        <div className="profile-header-banner" aria-hidden />
        <div className="profile-header-content">
          <div className="profile-avatar" aria-hidden>
            <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <circle cx="12" cy="8" r="4" />
              <path d="M4 20c0-4 4-6 8-6s8 2 8 6" />
            </svg>
          </div>
          <div className="profile-header-info">
            <h2 className="profile-patient-name">Sarah Johnson</h2>
            <p className="profile-patient-id">Patient ID: #8839210</p>
          </div>
          <button type="button" className="profile-edit-btn" aria-label="Edit profile">
            <PencilIcon />
            Edit Profile
          </button>
        </div>
      </div>

      <div className="profile-grid">
        <section className="profile-card" aria-labelledby="profile-vitals-heading">
          <h3 id="profile-vitals-heading" className="profile-card-title">
            <span className="profile-card-icon" aria-hidden><HeartbeatIcon /></span>
            Vital Information
          </h3>
          <div className="profile-vitals-row">
            <div className="profile-vital-chip profile-vital-chip--blue">
              <span className="profile-vital-label">Blood Type</span>
              <span className="profile-vital-value">O+</span>
            </div>
            <div className="profile-vital-chip profile-vital-chip--green">
              <span className="profile-vital-label">Age</span>
              <span className="profile-vital-value">70</span>
            </div>
          </div>
        </section>

        <section className="profile-card" aria-labelledby="profile-conditions-heading">
          <h3 id="profile-conditions-heading" className="profile-card-title">
            <span className="profile-card-icon" aria-hidden><HeartIcon /></span>
            Medical Conditions
          </h3>
          <ul className="profile-list profile-list--bullets">
            <li>Type 2 Diabetes</li>
            <li>Hypertension</li>
          </ul>
        </section>

        <section className="profile-card" aria-labelledby="profile-allergies-heading">
          <h3 id="profile-allergies-heading" className="profile-card-title">
            <span className="profile-card-icon" aria-hidden><ShieldAlertIcon /></span>
            Allergies & Alerts
          </h3>
          <div className="profile-tags">
            <span className="profile-tag profile-tag--alert">Penicillin</span>
            <span className="profile-tag profile-tag--alert">Peanuts</span>
          </div>
        </section>

        <section className="profile-card" aria-labelledby="profile-contacts-heading">
          <h3 id="profile-contacts-heading" className="profile-card-title">
            <span className="profile-card-icon" aria-hidden><PhoneIcon /></span>
            Emergency Contacts
          </h3>
          <div className="profile-contact">
            <div className="profile-contact-info">
              <span className="profile-contact-name">McKenzie Jackson</span>
              <span className="profile-contact-relation">Friend</span>
            </div>
            <button type="button" className="profile-contact-call" aria-label="Call McKenzie Jackson">
              <PhoneIcon />
            </button>
          </div>
        </section>
      </div>

      <div className="profile-footer">
        <Link to="/" className="profile-sign-out">
          <span>Sign Out</span>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
            <polyline points="16 17 21 12 16 7" />
            <line x1="21" y1="12" x2="9" y2="12" />
          </svg>
        </Link>
      </div>
    </div>
  );
}
