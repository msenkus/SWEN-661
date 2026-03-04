import { Outlet } from 'react-router-dom';

export default function Layout() {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <header
        style={{
          padding: '12px 24px',
          background: '#0f172a',
          color: '#f8fafc',
          fontSize: '18px',
          fontWeight: 600,
        }}
      >
        <div className="content-width">CareConnect</div>
      </header>
      <main style={{ flex: 1 }} className="content-width">
        <Outlet />
      </main>
    </div>
  );
}
