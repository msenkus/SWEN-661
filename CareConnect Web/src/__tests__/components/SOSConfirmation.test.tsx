import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router';
import { SOSConfirmation } from '../../components/screens/SOSConfirmation';

const mockNavigate = vi.fn();
vi.mock('react-router', async () => {
  const actual = await vi.importActual('react-router');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

function renderWithRouter() {
  return render(
    <MemoryRouter>
      <SOSConfirmation />
    </MemoryRouter>
  );
}

describe('SOSConfirmation', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render SOS heading', () => {
    renderWithRouter();
    expect(screen.getByText('Emergency SOS')).toBeInTheDocument();
  });

  it('should render emergency contacts', () => {
    renderWithRouter();
    expect(screen.getByText('Mary Johnson')).toBeInTheDocument();
    expect(screen.getByText('911')).toBeInTheDocument();
    expect(screen.getByText('Dr. Sarah Johnson')).toBeInTheDocument();
  });

  it('should show contact details', () => {
    renderWithRouter();
    expect(screen.getByText(/Daughter/)).toBeInTheDocument();
    expect(screen.getByText(/Emergency Services/)).toBeInTheDocument();
    expect(screen.getByText(/Primary Care/)).toBeInTheDocument();
  });

  it('should show medical information', () => {
    renderWithRouter();
    expect(screen.getByText('Medical Information')).toBeInTheDocument();
    expect(screen.getByText(/Blood Type: O\+/)).toBeInTheDocument();
    expect(screen.getByText(/Penicillin/)).toBeInTheDocument();
  });

  it('should show current location', () => {
    renderWithRouter();
    expect(screen.getByText('Current Location')).toBeInTheDocument();
    expect(screen.getByText(/123 Main Street/)).toBeInTheDocument();
  });

  it('should navigate to dashboard on cancel', async () => {
    const user = userEvent.setup();
    renderWithRouter();

    await user.click(screen.getByText('Cancel & Return to Dashboard'));
    expect(mockNavigate).toHaveBeenCalledWith('/app/dashboard');
  });

  it('should have clickable emergency contact buttons', () => {
    renderWithRouter();
    const contactButtons = screen.getAllByRole('button');
    // 3 contact buttons + 1 cancel button = 4
    expect(contactButtons.length).toBe(4);
  });

  it('should set calling state and trigger alert on contact click', async () => {
    vi.useFakeTimers({ shouldAdvanceTime: true });
    const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });
    renderWithRouter();

    const maryButton = screen.getByText('Mary Johnson').closest('button')!;
    await user.click(maryButton);

    // After clicking, buttons should be disabled (calling state)
    expect(maryButton).toBeDisabled();

    // Advance past the 1s setTimeout
    await act(async () => {
      vi.advanceTimersByTime(1100);
    });

    expect(window.alert).toHaveBeenCalledWith('Calling Mary Johnson at (555) 234-5678...');
    vi.useRealTimers();
  });
});
