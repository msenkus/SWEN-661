import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router';
import { ProfileScreen } from '../../components/screens/ProfileScreen';
import { useAuthStore } from '../../store/authStore';

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
      <ProfileScreen />
    </MemoryRouter>
  );
}

describe('ProfileScreen', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    useAuthStore.setState({
      isAuthenticated: true,
      user: { name: 'Eleanor Rodriguez', email: 'eleanor.r@email.com' },
    });
  });

  it('should render patient name', () => {
    renderWithRouter();
    expect(screen.getByText('Eleanor Rodriguez')).toBeInTheDocument();
  });

  it('should render patient ID', () => {
    renderWithRouter();
    expect(screen.getByText('Patient ID: #8839210')).toBeInTheDocument();
  });

  it('should render vital information', () => {
    renderWithRouter();
    expect(screen.getByText('Vital Information')).toBeInTheDocument();
    expect(screen.getByText('O+')).toBeInTheDocument();
    expect(screen.getByText('72')).toBeInTheDocument();
  });

  it('should render medical conditions', () => {
    renderWithRouter();
    expect(screen.getByText('Medical Conditions')).toBeInTheDocument();
    expect(screen.getByText('Type 2 Diabetes')).toBeInTheDocument();
    expect(screen.getByText('Hypertension')).toBeInTheDocument();
    expect(screen.getByText('Arthritis')).toBeInTheDocument();
  });

  it('should render allergies', () => {
    renderWithRouter();
    expect(screen.getByText('Allergies & Alerts')).toBeInTheDocument();
    expect(screen.getByText('Penicillin')).toBeInTheDocument();
    expect(screen.getByText('Sulfa drugs')).toBeInTheDocument();
  });

  it('should render emergency contact', () => {
    renderWithRouter();
    expect(screen.getByText('Emergency Contacts')).toBeInTheDocument();
    expect(screen.getByText('Mary Johnson')).toBeInTheDocument();
    expect(screen.getByText('Daughter')).toBeInTheDocument();
  });

  it('should logout and navigate on sign out', async () => {
    const user = userEvent.setup();
    renderWithRouter();

    await user.click(screen.getByText('Sign Out'));
    expect(useAuthStore.getState().isAuthenticated).toBe(false);
    expect(mockNavigate).toHaveBeenCalledWith('/login');
  });

  it('should have edit profile button', () => {
    renderWithRouter();
    expect(screen.getByText('Edit Profile')).toBeInTheDocument();
  });
});
