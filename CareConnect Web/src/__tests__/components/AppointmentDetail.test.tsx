import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router';
import { AppointmentDetail } from '../../components/screens/AppointmentDetail';

const mockNavigate = vi.fn();
vi.mock('react-router', async () => {
  const actual = await vi.importActual('react-router');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
    useParams: () => ({ appointmentId: '1' }),
  };
});

function renderWithRouter() {
  return render(
    <MemoryRouter>
      <AppointmentDetail />
    </MemoryRouter>
  );
}

describe('AppointmentDetail', () => {
  it('should render appointment title', () => {
    renderWithRouter();
    expect(screen.getByText('Dr. Sarah Johnson')).toBeInTheDocument();
    expect(screen.getByText('Primary Care Physician')).toBeInTheDocument();
  });

  it('should show appointment date and time', () => {
    renderWithRouter();
    expect(screen.getByText('January 21, 2026')).toBeInTheDocument();
    expect(screen.getByText('2:00 PM')).toBeInTheDocument();
    expect(screen.getByText('30 min duration')).toBeInTheDocument();
  });

  it('should show location details', () => {
    renderWithRouter();
    expect(screen.getByText('Main Street Medical Center')).toBeInTheDocument();
    expect(screen.getByText(/456 Main Street/)).toBeInTheDocument();
  });

  it('should show contact information', () => {
    renderWithRouter();
    expect(screen.getByText('(555) 123-4567')).toBeInTheDocument();
    expect(screen.getByText('appointments@mainstreetmedical.com')).toBeInTheDocument();
  });

  it('should show preparation checklist', () => {
    renderWithRouter();
    expect(screen.getByText('Bring current medication list')).toBeInTheDocument();
    expect(screen.getByText('Bring insurance card and ID')).toBeInTheDocument();
    expect(screen.getByText('Arrive 15 minutes early')).toBeInTheDocument();
    expect(screen.getByText('Fasting not required')).toBeInTheDocument();
  });

  it('should show notes', () => {
    renderWithRouter();
    expect(screen.getByText(/Annual checkup/)).toBeInTheDocument();
  });

  it('should navigate back to appointments', async () => {
    const user = userEvent.setup();
    renderWithRouter();

    await user.click(screen.getByText('Back to Appointments'));
    expect(mockNavigate).toHaveBeenCalledWith('/app/appointments');
  });

  it('should have an Add Reminder button', () => {
    renderWithRouter();
    expect(screen.getByText('Add Reminder')).toBeInTheDocument();
  });

  it('should have a Get Directions button', () => {
    renderWithRouter();
    expect(screen.getByText('Get Directions')).toBeInTheDocument();
  });
});
