import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import AppointmentsScreen from '../AppointmentsScreen';

function renderAppointments() {
  return render(
    <MemoryRouter>
      <AppointmentsScreen />
    </MemoryRouter>
  );
}

describe('AppointmentsScreen', () => {
  it('renders the Appointments title', () => {
    renderAppointments();
    expect(screen.getByRole('heading', { name: /appointments/i })).toBeInTheDocument();
  });

  it('renders Upcoming Appointments summary', () => {
    renderAppointments();
    expect(screen.getByText(/upcoming appointments/i)).toBeInTheDocument();
  });

  it('renders filter tabs', () => {
    renderAppointments();
    expect(screen.getByRole('button', { name: /^upcoming$/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /^past$/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /^canceled$/i })).toBeInTheDocument();
  });

  it('renders appointment cards with doctor names', () => {
    renderAppointments();
    expect(screen.getByText(/dr\. sarah johnson/i)).toBeInTheDocument();
    expect(screen.getByText(/dr\. michael chen/i)).toBeInTheDocument();
  });

  it('switches filter when clicking Past', async () => {
    renderAppointments();
    await userEvent.click(screen.getByRole('button', { name: /^past$/i }));
    expect(screen.getByRole('button', { name: /^past$/i }).className).toMatch(/active/);
  });

  it('renders Schedule New Appointment button', () => {
    renderAppointments();
    expect(screen.getByRole('button', { name: /schedule new appointment/i })).toBeInTheDocument();
  });

  it('uses appointments-screen class', () => {
    const { container } = renderAppointments();
    expect(container.querySelector('.appointments-screen')).toBeInTheDocument();
  });
});
