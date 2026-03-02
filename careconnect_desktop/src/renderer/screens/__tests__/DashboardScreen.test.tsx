import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import DashboardScreen from '../DashboardScreen';

function renderDashboard() {
  return render(
    <MemoryRouter>
      <DashboardScreen />
    </MemoryRouter>
  );
}

describe('DashboardScreen', () => {
  it('renders the Dashboard title', () => {
    renderDashboard();
    expect(screen.getByRole('heading', { name: /dashboard/i })).toBeInTheDocument();
  });

  it('renders Today\'s Progress card', () => {
    renderDashboard();
    expect(screen.getByText(/today'?s progress/i)).toBeInTheDocument();
  });

  it('renders progress count and percentage', () => {
    renderDashboard();
    expect(screen.getByText(/2\/7/)).toBeInTheDocument();
    expect(screen.getByText(/29% complete/i)).toBeInTheDocument();
    expect(screen.getByText(/5 tasks remaining/i)).toBeInTheDocument();
    expect(screen.getByText(/2 completed today/i)).toBeInTheDocument();
  });

  it('renders Today\'s Schedule with task items', () => {
    renderDashboard();
    expect(screen.getByText(/today'?s schedule/i)).toBeInTheDocument();
    expect(screen.getByText(/take morning medication/i)).toBeInTheDocument();
    expect(screen.getByText(/breakfast/i)).toBeInTheDocument();
    expect(screen.getByText(/physical therapy exercises/i)).toBeInTheDocument();
    expect(screen.getByText(/doctor appointment/i)).toBeInTheDocument();
  });

  it('renders Quick Actions links', () => {
    renderDashboard();
    expect(screen.getByRole('link', { name: /view all medications/i })).toHaveAttribute('href', '/dashboard/medications');
    expect(screen.getByRole('link', { name: /manage appointments/i })).toHaveAttribute('href', '/dashboard/appointments');
    expect(screen.getByRole('link', { name: /view past tasks/i })).toHaveAttribute('href', '/dashboard/task-history');
  });

  it('marks current (first incomplete) item with Current tag and More info button', () => {
    renderDashboard();
    expect(screen.getByText(/current/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /more info/i })).toBeInTheDocument();
  });

  it('toggling a schedule item updates completed state', async () => {
    renderDashboard();
    const physicalTherapy = screen.getByRole('button', {
      name: /physical therapy exercises, not completed\. click to toggle\./i,
    });
    await userEvent.click(physicalTherapy);
    expect(screen.getByText(/3\/7/)).toBeInTheDocument();
    expect(screen.getByText(/43% complete/i)).toBeInTheDocument();
    expect(screen.getByText(/4 tasks remaining/i)).toBeInTheDocument();
    expect(screen.getByText(/3 completed today/i)).toBeInTheDocument();
  });

  it('toggling a completed item uncompletes it', async () => {
    renderDashboard();
    const breakfast = screen.getByRole('button', {
      name: /breakfast, completed\. click to toggle\./i,
    });
    await userEvent.click(breakfast);
    expect(screen.getByText(/1\/7/)).toBeInTheDocument();
    expect(screen.getByText(/14% complete/i)).toBeInTheDocument();
  });

  it('More info button shows toast and does not toggle task', async () => {
    renderDashboard();
    const moreInfoBtn = screen.getByRole('button', { name: /more info/i });
    await userEvent.click(moreInfoBtn);
    expect(screen.getByRole('status')).toHaveTextContent(/task details coming soon/i);
    expect(screen.getByText(/2\/7/)).toBeInTheDocument();
  });

  it('schedule item responds to Enter key', () => {
    renderDashboard();
    const item = screen.getByRole('button', {
      name: /physical therapy exercises, not completed\. click to toggle\./i,
    });
    fireEvent.keyDown(item, { key: 'Enter', code: 'Enter' });
    expect(screen.getByText(/3\/7/)).toBeInTheDocument();
  });

  it('schedule item responds to Space key', () => {
    renderDashboard();
    const lunch = screen.getByRole('button', {
      name: /lunch, not completed\. click to toggle\./i,
    });
    fireEvent.keyDown(lunch, { key: ' ', code: 'Space' });
    expect(screen.getByText(/3\/7/)).toBeInTheDocument();
  });

  it('uses dashboard-screen class', () => {
    const { container } = renderDashboard();
    expect(container.querySelector('.dashboard-screen')).toBeInTheDocument();
  });
});
