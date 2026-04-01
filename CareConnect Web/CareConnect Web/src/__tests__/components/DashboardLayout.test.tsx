import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router';
import { DashboardLayout } from '../../components/DashboardLayout';
import { useAuthStore } from '../../store/authStore';
import { useTaskStore } from '../../store/taskStore';

const mockNavigate = vi.fn();

const dashboardMocks = vi.hoisted(() => ({
  pathname: '/app/dashboard',
  isMobile: false,
  isTablet: false,
  isDesktop: true,
}));

vi.mock('../../hooks/useMediaQuery', () => ({
  useBreakpoint: () => ({
    isMobile: dashboardMocks.isMobile,
    isTablet: dashboardMocks.isTablet,
    isDesktop: dashboardMocks.isDesktop,
    breakpoint: dashboardMocks.isMobile
      ? 'mobile'
      : dashboardMocks.isTablet
        ? 'tablet'
        : 'desktop',
  }),
}));

vi.mock('react-router', async () => {
  const actual = await vi.importActual('react-router');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
    useLocation: () => ({ pathname: dashboardMocks.pathname }),
    Outlet: () => <div data-testid="outlet">Page Content</div>,
  };
});

function renderDashboard() {
  return render(
    <MemoryRouter initialEntries={[dashboardMocks.pathname]}>
      <DashboardLayout />
    </MemoryRouter>,
  );
}

describe('DashboardLayout', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    dashboardMocks.pathname = '/app/dashboard';
    dashboardMocks.isMobile = false;
    dashboardMocks.isTablet = false;
    dashboardMocks.isDesktop = true;
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
    const headings = screen.getAllByText('Dashboard');
    expect(headings.length).toBe(2);
  });

  it('should show notification indicator when there are missed tasks', () => {
    renderDashboard();
    const notificationDot = document.querySelector('.bg-red-500.rounded-full.animate-pulse');
    expect(notificationDot).toBeInTheDocument();
  });

  it('should hide notification indicator when no missed tasks', () => {
    useTaskStore.setState({ hasMissedTasks: false });
    renderDashboard();
    const notificationDot = document.querySelector('.bg-red-500.rounded-full.animate-pulse');
    expect(notificationDot).not.toBeInTheDocument();
  });

  it('shows Task Details title for task routes', () => {
    dashboardMocks.pathname = '/app/task/123';
    renderDashboard();
    expect(screen.getByRole('heading', { name: 'Task Details' })).toBeInTheDocument();
  });

  it('shows Missed Tasks title on missed-tasks route', () => {
    dashboardMocks.pathname = '/app/missed-tasks';
    renderDashboard();
    expect(screen.getByRole('heading', { name: 'Missed Tasks' })).toBeInTheDocument();
  });

  it('shows Emergency SOS title on sos route', () => {
    dashboardMocks.pathname = '/app/sos';
    renderDashboard();
    expect(screen.getByRole('heading', { name: 'Emergency SOS' })).toBeInTheDocument();
  });

  it('shows Profile title on profile route', () => {
    dashboardMocks.pathname = '/app/profile';
    renderDashboard();
    expect(screen.getByRole('heading', { name: 'Profile' })).toBeInTheDocument();
  });

  it('shows CareConnect fallback title for unknown app path', () => {
    dashboardMocks.pathname = '/app/unknown-route';
    renderDashboard();
    const topTitles = screen.getAllByRole('heading', { name: 'CareConnect' });
    expect(topTitles.some((el) => el.tagName === 'H2')).toBe(true);
  });

  it('marks appointments subtree as active for nested path', () => {
    dashboardMocks.pathname = '/app/appointments/42';
    renderDashboard();
    const nav = within(screen.getByRole('navigation')).getByRole('link', {
      name: 'Appointments',
    });
    expect(nav.className).toMatch(/bg-white/);
  });

  it('mobile: opens and closes menu via overlay', async () => {
    const user = userEvent.setup();
    dashboardMocks.isMobile = true;
    dashboardMocks.isDesktop = false;
    renderDashboard();

    const overlaySelector = '.fixed.inset-0.bg-black\\/50';
    expect(document.querySelector(overlaySelector)).toBeNull();

    await user.click(screen.getByRole('button', { name: 'Open navigation menu' }));
    const overlay = document.querySelector(overlaySelector);
    expect(overlay).toBeTruthy();

    await user.click(overlay!);
    expect(document.querySelector(overlaySelector)).toBeNull();
  });

  it('tablet: toggles collapsed sidebar and shows CC label', async () => {
    const user = userEvent.setup();
    dashboardMocks.isTablet = true;
    dashboardMocks.isDesktop = false;
    renderDashboard();

    expect(screen.getByText('CareConnect')).toBeInTheDocument();
    const collapse = screen.getByRole('button', { name: 'Collapse sidebar' });
    await user.click(collapse);

    expect(screen.getByText('CC')).toBeInTheDocument();
    const careMgmt = screen.getByText('Care Management');
    expect(careMgmt.parentElement?.className).toMatch(/hidden/);

    const expand = screen.getByRole('button', { name: 'Expand sidebar' });
    await user.click(expand);
    expect(screen.getByText('CareConnect')).toBeInTheDocument();
  });

  it('tablet collapsed: nav links show icon-only with title tooltip', async () => {
    const user = userEvent.setup();
    dashboardMocks.isTablet = true;
    dashboardMocks.isDesktop = false;
    renderDashboard();
    await user.click(screen.getByRole('button', { name: 'Collapse sidebar' }));

    const dashLink = within(screen.getByRole('navigation')).getByRole('link', {
      name: 'Dashboard',
    });
    expect(dashLink).toHaveAttribute('title', 'Dashboard');
  });

  it('shows User fallback when name is missing', () => {
    useAuthStore.setState({
      isAuthenticated: true,
      user: { name: '', email: 'x@test.com' },
    });
    renderDashboard();
    expect(screen.getByText('User')).toBeInTheDocument();
  });
});
