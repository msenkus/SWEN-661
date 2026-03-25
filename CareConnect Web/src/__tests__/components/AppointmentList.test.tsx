import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { AppointmentList } from '../../components/screens/AppointmentList';

function renderWithRouter() {
  return render(
    <MemoryRouter>
      <AppointmentList />
    </MemoryRouter>
  );
}

describe('AppointmentList', () => {
  it('should render the appointment count', () => {
    renderWithRouter();
    expect(screen.getByText('4')).toBeInTheDocument();
    expect(screen.getByText('Appointments')).toBeInTheDocument();
  });

  it('should render all appointments', () => {
    renderWithRouter();
    expect(screen.getByText('Dr. Sarah Johnson')).toBeInTheDocument();
    expect(screen.getByText('Dr. Michael Chen')).toBeInTheDocument();
    expect(screen.getByText('Physical Therapy')).toBeInTheDocument();
    expect(screen.getByText('Lab Work')).toBeInTheDocument();
  });

  it('should show appointment details', () => {
    renderWithRouter();
    expect(screen.getByText('Primary Care Physician')).toBeInTheDocument();
    expect(screen.getByText('Cardiologist')).toBeInTheDocument();
    expect(screen.getByText('Today')).toBeInTheDocument();
    expect(screen.getByText('Tomorrow')).toBeInTheDocument();
  });

  it('should show video call indicator for telehealth', () => {
    renderWithRouter();
    expect(screen.getByText('Video Call')).toBeInTheDocument();
  });

  it('should show location for in-person appointments', () => {
    renderWithRouter();
    expect(screen.getByText('Main Street Medical Center')).toBeInTheDocument();
    expect(screen.getByText('Rehabilitation Center')).toBeInTheDocument();
  });

  it('should have a schedule new appointment button', () => {
    renderWithRouter();
    expect(screen.getByText('Schedule New Appointment')).toBeInTheDocument();
  });

  it('should link to appointment details', () => {
    renderWithRouter();
    const links = screen.getAllByRole('link');
    const appointmentLinks = links.filter(l => l.getAttribute('href')?.includes('/app/appointments/'));
    expect(appointmentLinks.length).toBeGreaterThanOrEqual(4);
  });
});
