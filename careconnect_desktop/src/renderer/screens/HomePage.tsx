import { useEffect, useState } from 'react';

export default function HomePage() {
  const [version, setVersion] = useState<string>('');

  useEffect(() => {
    if (window.electronAPI) {
      window.electronAPI.getAppVersion().then(setVersion);
    }
  }, []);

  return (
    <div>
      <h1>Welcome to CareConnect Desktop</h1>
      <p>Windows desktop implementation. Screens will be added one at a time from your wireframes.</p>
      {version && <p>Version: {version}</p>}
    </div>
  );
}
