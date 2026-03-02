import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import PatientProfileScreen from '../PatientProfileScreen';

function renderProfile() {
  return render(
    <MemoryRouter>
      <PatientProfileScreen />
    </MemoryRouter>
  );
}

describe('PatientProfileScreen', () => {
  it('renders the CareConnect header title', () => {
    renderProfile();
    expect(screen.getByRole('heading', { name: /careconnect/i })).toBeInTheDocument();
  });

  it('renders patient name and ID', () => {
    renderProfile();
    expect(screen.getByText(/sarah johnson/i)).toBeInTheDocument();
    expect(screen.getByText(/patient id: #8839210/i)).toBeInTheDocument();
  });

  it('renders Edit Profile button', () => {
    renderProfile();
    expect(screen.getByRole('button', { name: /edit profile/i })).toBeInTheDocument();
  });

  it('renders Vital Information and Medical Conditions', () => {
    renderProfile();
    expect(screen.getByText(/vital information/i)).toBeInTheDocument();
    expect(screen.getByText(/medical conditions/i)).toBeInTheDocument();
  });

  it('renders Allergies & Alerts and Emergency Contacts', () => {
    renderProfile();
    expect(screen.getByText(/allergies & alerts/i)).toBeInTheDocument();
    expect(screen.getByText(/emergency contacts/i)).toBeInTheDocument();
  });

  it('renders Sign Out link', () => {
    renderProfile();
    const signOut = screen.getByRole('link', { name: /sign out/i });
    expect(signOut).toBeInTheDocument();
    expect(signOut).toHaveAttribute('href', '/');
  });

  it('uses profile-screen class', () => {
    const { container } = renderProfile();
    expect(container.querySelector('.profile-screen')).toBeInTheDocument();
  });
});
