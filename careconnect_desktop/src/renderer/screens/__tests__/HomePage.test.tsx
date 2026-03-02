import { render, screen } from '@testing-library/react';
import HomePage from '../HomePage';

describe('HomePage', () => {
  const originalElectronAPI = (window as unknown as { electronAPI?: unknown }).electronAPI;

  beforeEach(() => {
    (window as unknown as { electronAPI?: unknown }).electronAPI = undefined;
  });

  afterEach(() => {
    (window as unknown as { electronAPI?: unknown }).electronAPI = originalElectronAPI;
  });

  it('renders the welcome heading', () => {
    render(<HomePage />);
    expect(screen.getByRole('heading', { name: /welcome to careconnect desktop/i })).toBeInTheDocument();
  });

  it('renders the Windows desktop description', () => {
    render(<HomePage />);
    expect(screen.getByText(/windows desktop implementation/i)).toBeInTheDocument();
  });

  it('shows version when electronAPI.getAppVersion resolves', async () => {
    (window as unknown as { electronAPI: { getAppVersion: () => Promise<string> } }).electronAPI = {
      getAppVersion: () => Promise.resolve('1.0.0'),
    };
    render(<HomePage />);
    expect(await screen.findByText(/version: 1\.0\.0/i)).toBeInTheDocument();
  });

  it('does not show version when electronAPI is missing', () => {
    render(<HomePage />);
    expect(screen.queryByText(/version:/i)).not.toBeInTheDocument();
  });
});
