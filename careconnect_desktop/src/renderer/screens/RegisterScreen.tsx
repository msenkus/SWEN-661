import { Link } from 'react-router-dom';

export default function RegisterScreen() {
  return (
    <div className="login-page">
      <div className="login-card" style={{ maxWidth: 420 }}>
        <h1 className="login-title">Sign up</h1>
        <p className="login-subtitle">Create a CareConnect account. (Placeholder — screen coming soon.)</p>
        <Link to="/login" className="login-back" style={{ marginTop: 24, display: 'inline-block' }}>
          ← Back to Sign In
        </Link>
      </div>
    </div>
  );
}
