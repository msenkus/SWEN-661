import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router';
import { RegisterScreen } from '../../components/screens/RegisterScreen';
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
      <RegisterScreen />
    </MemoryRouter>
  );
}

describe('RegisterScreen', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    useAuthStore.setState({ isAuthenticated: false, user: null });
  });

  it('should render the registration form', () => {
    renderWithRouter();
    expect(screen.getByRole('heading', { name: 'Create Account' })).toBeInTheDocument();
    expect(screen.getByLabelText('Full Name')).toBeInTheDocument();
    expect(screen.getByLabelText('Email Address')).toBeInTheDocument();
    expect(screen.getByLabelText('Password')).toBeInTheDocument();
    expect(screen.getByLabelText('Confirm Password')).toBeInTheDocument();
  });

  it('should update form fields', async () => {
    const user = userEvent.setup();
    renderWithRouter();

    await user.type(screen.getByLabelText('Full Name'), 'John Doe');
    await user.type(screen.getByLabelText('Email Address'), 'john@example.com');
    await user.type(screen.getByLabelText('Password'), 'password123');
    await user.type(screen.getByLabelText('Confirm Password'), 'password123');

    expect(screen.getByLabelText('Full Name')).toHaveValue('John Doe');
    expect(screen.getByLabelText('Email Address')).toHaveValue('john@example.com');
    expect(screen.getByLabelText('Password')).toHaveValue('password123');
    expect(screen.getByLabelText('Confirm Password')).toHaveValue('password123');
  });

  it('should toggle password visibility', async () => {
    const user = userEvent.setup();
    renderWithRouter();

    const passwordInput = screen.getByLabelText('Password');
    expect(passwordInput).toHaveAttribute('type', 'password');

    await user.click(screen.getByLabelText('Show password'));
    expect(passwordInput).toHaveAttribute('type', 'text');
  });

  it('should have a link to sign in', () => {
    renderWithRouter();
    expect(screen.getByText('Sign in')).toBeInTheDocument();
  });

  it('should alert when passwords do not match on submit', async () => {
    const user = userEvent.setup();
    window.alert = vi.fn();
    renderWithRouter();

    await user.type(screen.getByLabelText('Full Name'), 'John Doe');
    await user.type(screen.getByLabelText('Email Address'), 'john@example.com');
    await user.type(screen.getByLabelText('Password'), 'password123');
    await user.type(screen.getByLabelText('Confirm Password'), 'different');
    await user.click(screen.getByRole('checkbox'));

    await user.click(screen.getByRole('button', { name: /Create Account/i }));

    expect(window.alert).toHaveBeenCalledWith('Passwords do not match!');
  });

  it('should submit and navigate when passwords match', async () => {
    const user = userEvent.setup();
    renderWithRouter();

    await user.type(screen.getByLabelText('Full Name'), 'John Doe');
    await user.type(screen.getByLabelText('Email Address'), 'john@example.com');
    await user.type(screen.getByLabelText('Password'), 'password123');
    await user.type(screen.getByLabelText('Confirm Password'), 'password123');
    await user.click(screen.getByRole('checkbox'));

    await user.click(screen.getByRole('button', { name: /Create Account/i }));

    await vi.waitFor(() => {
      expect(useAuthStore.getState().isAuthenticated).toBe(true);
    }, { timeout: 2000 });

    expect(useAuthStore.getState().user?.name).toBe('John Doe');
    expect(mockNavigate).toHaveBeenCalledWith('/app/dashboard');
  });
});
