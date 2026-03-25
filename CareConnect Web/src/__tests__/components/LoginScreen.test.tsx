import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router';
import { LoginScreen } from '../../components/screens/LoginScreen';
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
      <LoginScreen />
    </MemoryRouter>
  );
}

describe('LoginScreen', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    useAuthStore.setState({ isAuthenticated: false, user: null });
  });

  it('should render the sign in form', () => {
    renderWithRouter();
    expect(screen.getByRole('heading', { name: 'Sign In' })).toBeInTheDocument();
    expect(screen.getByLabelText('Email Address')).toBeInTheDocument();
    expect(screen.getByLabelText('Password')).toBeInTheDocument();
  });

  it('should toggle password visibility', async () => {
    const user = userEvent.setup();
    renderWithRouter();

    const passwordInput = screen.getByLabelText('Password');
    expect(passwordInput).toHaveAttribute('type', 'password');

    const toggleButton = screen.getByLabelText('Show password');
    await user.click(toggleButton);
    expect(passwordInput).toHaveAttribute('type', 'text');

    const hideButton = screen.getByLabelText('Hide password');
    await user.click(hideButton);
    expect(passwordInput).toHaveAttribute('type', 'password');
  });

  it('should update email and password inputs', async () => {
    const user = userEvent.setup();
    renderWithRouter();

    const emailInput = screen.getByLabelText('Email Address');
    const passwordInput = screen.getByLabelText('Password');

    await user.type(emailInput, 'test@example.com');
    await user.type(passwordInput, 'mypassword');

    expect(emailInput).toHaveValue('test@example.com');
    expect(passwordInput).toHaveValue('mypassword');
  });

  it('should have a link to register', () => {
    renderWithRouter();
    expect(screen.getByText('Sign up')).toBeInTheDocument();
  });

  it('should have a back to welcome link', () => {
    renderWithRouter();
    expect(screen.getByText('← Back to welcome')).toBeInTheDocument();
  });

  it('should submit the form and navigate to dashboard', async () => {
    const user = userEvent.setup();
    renderWithRouter();

    await user.type(screen.getByLabelText('Email Address'), 'test@example.com');
    await user.type(screen.getByLabelText('Password'), 'password123');

    const submitButton = screen.getByRole('button', { name: /Sign In/i });
    await user.click(submitButton);

    // Wait for the async login (1s simulated delay)
    await vi.waitFor(() => {
      expect(useAuthStore.getState().isAuthenticated).toBe(true);
    }, { timeout: 2000 });

    expect(mockNavigate).toHaveBeenCalledWith('/app/dashboard');
  });
});
