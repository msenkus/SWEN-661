import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { AuthLayout } from '../../components/AuthLayout';
import { useAuthStore } from '../../store/authStore';

const mockNavigate = vi.fn();
vi.mock('react-router', async () => {
  const actual = await vi.importActual('react-router');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

describe('AuthLayout', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render children when not authenticated', () => {
    useAuthStore.setState({ isAuthenticated: false, user: null });
    render(
      <MemoryRouter>
        <AuthLayout>
          <div>Login Form</div>
        </AuthLayout>
      </MemoryRouter>
    );
    expect(screen.getByText('Login Form')).toBeInTheDocument();
  });

  it('should redirect to dashboard when authenticated', () => {
    useAuthStore.setState({ isAuthenticated: true, user: { name: 'Test', email: 'test@test.com' } });
    render(
      <MemoryRouter>
        <AuthLayout>
          <div>Login Form</div>
        </AuthLayout>
      </MemoryRouter>
    );
    expect(mockNavigate).toHaveBeenCalledWith('/app/dashboard', { replace: true });
  });
});
