export default function PlaceholderScreen({ title }: { title: string }) {
  return (
    <div className="dashboard-screen">
      <h1 className="dashboard-title">{title}</h1>
      <p style={{ color: '#64748b', marginTop: 8 }}>This screen is coming soon.</p>
    </div>
  );
}
