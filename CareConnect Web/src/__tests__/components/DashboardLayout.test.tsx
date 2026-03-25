import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router';
import { DashboardLayout } from '../../components/DashboardLayout';
import { useAuthStore } from '../../store/authStore';
import { useTaskStore } from '../../store/taskStore';

const mockNavigate = vi.fn();
vi.mock('react-router', async () => {
  const actual = await vi.importActual('react-router');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
    useLocation: () => ({ pathname: '/app/dashboard' }),
    Outlet: () => <div data-testid="outlet">Page Content</div>,
  };
});

function renderDashboard() {
  return render(
    <MemoryRouter initialEntries={['/app/dashboard']}>
      <DashboardLayout />
    </MemoryRouter>
  );
}

describe('DashboardLayout', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    useAuthStore.setState({
      isAuthenticated: true,
      user: { name: 'Eleanor Rodriguez', email: 'eleanor@test.com' },
    });
    useTaskStore.setState({ hasMissedTasks: true });
  });

  it('should redirect to login when not authenticated', () => {
    useAuthStore.setState({ isAuthenticated: false, user: null });
    renderDashboard();
    expect(mockNavigate).toHaveBeenCalledWith('/login', { replace: true });
  });

  it('should render nothing when not authenticated', () => {
    useAuthStore.setState({ isAuthenticated: false, user: null });
    const { container } = renderDashboard();
    expect(container.innerHTML).toBe('');
  });

  it('should render sidebar with navigation items when authenticated', () => {
    renderDashboard();
    expect(screen.getByText('CareConnect')).toBeInTheDocument();
    expect(screen.getAllByText('Dashboard').length).toBeGreaterThanOrEqual(1);
    expect(screen.getByText('Medications')).toBeInTheDocument();
    expect(screen.getByText('Appointments')).toBeInTheDocument();
    expect(screen.getByText('Task History')).toBeInTheDocument();
    expect(screen.getByText('ASL Help')).toBeInTheDocument();
    expect(screen.getByText('Settings')).toBeInTheDocument();
  });

  it('should render Emergency SOS button', () => {
    renderDashboard();
    expect(screen.getByText('Emergency SOS')).toBeInTheDocument();
  });

  it('should render the user profile section', () => {
    renderDashboard();
    expect(screen.getByText('Eleanor Rodriguez')).toBeInTheDocument();
    expect(screen.getByText('View Profile')).toBeInTheDocument();
  });

  it('should render the outlet content', () => {
    renderDashboard();
    expect(screen.getByTestId('outlet')).toBeInTheDocument();
  });

  it('should show page title in top bar', () => {
    renderDashboard();
    // Dashboard appears in both sidebar nav and top bar heading
    const headings = screen.getAllByText('Dashboard');
    expect(headings.length).toBe(2);
  });

  it('should show notification indicator when there are missed tasks', () => {
    renderDashboard();
    // The notification bell has a red dot when hasMissedTasks
    const notificationDot = document.querySelector('.bg-red-500.rounded-full.animate-pulse');
    expect(notificationDot).toBeInTheDocument();
  });

  it('should hide notification indicator when no missed tasks', () => {
    useTaskStore.setState({ hasMissedTasks: false });
    renderDashboard();
    const notificationDot = document.querySelector('.bg-red-500.rounded-full.animate-pulse');
    expect(notificationDot).not.toBeInTheDocument();
  });
});
