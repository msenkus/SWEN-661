import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router';
import { MissedTaskAlert } from '../../components/screens/MissedTaskAlert';
import { useTaskStore } from '../../store/taskStore';

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
      <MissedTaskAlert />
    </MemoryRouter>
  );
}

describe('MissedTaskAlert', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    useTaskStore.setState({ hasMissedTasks: true });
  });

  it('should display the alert heading', () => {
    renderWithRouter();
    expect(screen.getByText('Missed Tasks Alert')).toBeInTheDocument();
  });

  it('should show missed task details', () => {
    renderWithRouter();
    expect(screen.getByText('Morning Walk')).toBeInTheDocument();
    expect(screen.getByText('Water Intake Reminder')).toBeInTheDocument();
    expect(screen.getByText('Missed by: 45 minutes')).toBeInTheDocument();
    expect(screen.getByText('Missed by: 15 minutes')).toBeInTheDocument();
  });

  it('should show the count of missed tasks', () => {
    renderWithRouter();
    expect(screen.getByText(/You have 2 tasks/)).toBeInTheDocument();
  });

  it('should dismiss and navigate on dismiss click', async () => {
    const user = userEvent.setup();
    renderWithRouter();

    await user.click(screen.getByText('Dismiss'));
    expect(useTaskStore.getState().hasMissedTasks).toBe(false);
    expect(mockNavigate).toHaveBeenCalledWith('/app/dashboard');
  });

  it('should navigate to dashboard on View Schedule', async () => {
    const user = userEvent.setup();
    renderWithRouter();

    await user.click(screen.getByText('View Schedule'));
    expect(mockNavigate).toHaveBeenCalledWith('/app/dashboard');
  });

  it('should show the important reminder', () => {
    renderWithRouter();
    expect(screen.getByText(/It's important to complete your daily tasks/)).toBeInTheDocument();
  });
});
