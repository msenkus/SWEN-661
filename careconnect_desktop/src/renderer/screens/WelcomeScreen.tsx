import { Link } from 'react-router-dom';

/** CareConnect logo: blue square with white heart */
function Logo() {
  return (
    <div
      style={{
        width: 48,
        height: 48,
        borderRadius: 8,
        background: '#2563eb',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 24,
      }}
    >
      <svg width="26" height="24" viewBox="0 0 24 22" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
          fill="#fff"
        />
      </svg>
    </div>
  );
}

export default function WelcomeScreen() {
  return (
    <div className="login-page">
      <div className="login-card" style={{ maxWidth: 380 }}>
        <Logo />
        <h1 className="login-title">Welcome to CareConnect</h1>
        <p className="login-subtitle">Sign in to your account or create a new one.</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginTop: 24 }}>
          <Link to="/login" className="login-submit" style={{ textAlign: 'center', textDecoration: 'none' }}>
            Login
          </Link>
          <Link to="/register" className="login-submit login-submit-secondary" style={{ textAlign: 'center', textDecoration: 'none' }}>
            Sign up
          </Link>
        </div>
      </div>
    </div>
  );
}
