import { useState } from 'react';
import { Link } from 'react-router-dom';

type MedicationColor = 'blue' | 'green' | 'purple' | 'red' | 'orange';

type Medication = {
  id: string;
  name: string;
  dosage: string;
  time: string;
  instructions: string;
  color: MedicationColor;
};

const initialMedications: Medication[] = [
  { id: '1', name: 'Lisinopril 10mg', dosage: '1 tablet', time: '8:00 AM', instructions: 'Take with food', color: 'blue' },
  { id: '2', name: 'Metformin 500mg', dosage: '2 tablets', time: '8:00 AM', instructions: 'Take with breakfast', color: 'green' },
  { id: '3', name: 'Atorvastatin 20mg', dosage: '1 tablet', time: '6:00 PM', instructions: 'Take with dinner', color: 'purple' },
  { id: '4', name: 'Aspirin 81mg', dosage: '1 tablet', time: '8:00 AM', instructions: 'Blood thinner', color: 'red' },
  { id: '5', name: 'Vitamin D3 2000 IU', dosage: '1 capsule', time: '8:00 AM', instructions: 'Daily supplement', color: 'orange' },
];

function formatDate(date: Date) {
  return date.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

function PillIcon({ size = 32 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M8 8h8a4 4 0 0 1 0 8H8a4 4 0 0 1 0-8z" />
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

function InfoIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="16" x2="12" y2="12" />
      <line x1="12" y1="8" x2="12.01" y2="8" />
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

export default function MedicationsScreen() {
  const today = formatDate(new Date());
  const [takenIds, setTakenIds] = useState<Set<string>>(new Set(['1', '2', '4', '5']));

  const toggleTaken = (id: string) => {
    setTakenIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const takenCount = takenIds.size;
  const totalCount = initialMedications.length;

  return (
    <div className="medications-screen">
      <header className="dashboard-header">
        <div className="dashboard-header-left">
          <h1 className="dashboard-title">Medications</h1>
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

      <div className="medications-nav-bar">
        <Link to="/dashboard" className="medications-nav-back">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="15 18 9 12 15 6" />
          </svg>
          Medications
        </Link>
      </div>

      <div className="medications-content">
        <div className="medications-summary-card">
          <div className="medications-summary-text">
            <span className="medications-summary-label">Medications Today</span>
            <span className="medications-summary-count">{takenCount} of {totalCount} Taken</span>
          </div>
          <div className="medications-summary-icon">
            <PillIcon />
          </div>
        </div>

        <ul className="medications-list">
          {initialMedications.map((med) => {
            const taken = takenIds.has(med.id);
            return (
              <li key={med.id} className="medications-card">
                <div className={`medications-card-header medications-card-header--${med.color}`}>
                  <span className="medications-card-header-pill" aria-hidden>
                    <PillIcon size={24} />
                  </span>
                  <div className="medications-card-header-title">
                    <span className="medications-card-name">{med.name}</span>
                    <span className="medications-card-dosage">{med.dosage}</span>
                  </div>
                  {taken && (
                    <span className="medications-card-header-check" aria-hidden>
                      <CheckIcon />
                    </span>
                  )}
                </div>
                <div className="medications-card-body">
                  <div className="medications-card-detail">
                    <ClockIcon />
                    <span>{med.time}</span>
                  </div>
                  <div className="medications-card-detail">
                    <InfoIcon />
                    <span>{med.instructions}</span>
                  </div>
                  <button
                    type="button"
                    className={taken ? 'medications-card-action medications-card-action--taken' : 'medications-card-action medications-card-action--default'}
                    onClick={() => toggleTaken(med.id)}
                    aria-pressed={taken}
                    aria-label={taken ? `${med.name} marked as taken. Click to unmark.` : `Mark ${med.name} as taken`}
                    title={taken ? 'Click to mark as not taken' : 'Click to mark as taken'}
                  >
                    {taken ? (
                      <>
                        <CheckIcon />
                        Marked as Taken
                      </>
                    ) : (
                      'Mark as Taken'
                    )}
                  </button>
                </div>
              </li>
            );
          })}
        </ul>

        <footer className="medications-footer">
          <Link to="/dashboard/asl-help" className="medications-footer-link">Need Help? Watch ASL Guide</Link>
          <Link to="/dashboard/asl-help" className="medications-footer-help" aria-label="Help">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <path d="M9.5 9.2a2.5 2.5 0 0 1 4.2 1.8c0 1.5-1.5 2.5-2.5 3" />
              <circle cx="12" cy="16.5" r="1.5" fill="currentColor" stroke="none" />
            </svg>
          </Link>
        </footer>
      </div>
    </div>
  );
}
