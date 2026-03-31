import { describe, it, expect, beforeEach } from 'vitest';
import { useAuthStore } from '../../store/authStore';

describe('authStore', () => {
  beforeEach(() => {
    useAuthStore.setState({
      isAuthenticated: false,
      user: null,
    });
  });

  it('should start unauthenticated', () => {
    const { isAuthenticated, user } = useAuthStore.getState();
    expect(isAuthenticated).toBe(false);
    expect(user).toBeNull();
  });

  it('should login and set user', async () => {
    const { login } = useAuthStore.getState();
    await login('test@example.com', 'password123');
    const { isAuthenticated, user } = useAuthStore.getState();
    expect(isAuthenticated).toBe(true);
    expect(user).not.toBeNull();
    expect(user?.email).toBe('test@example.com');
    expect(user?.name).toBe('Eleanor Rodriguez');
  });

  it('should register and set user with provided name', async () => {
    const { register } = useAuthStore.getState();
    await register('Jane Doe', 'jane@example.com', 'password123');
    const { isAuthenticated, user } = useAuthStore.getState();
    expect(isAuthenticated).toBe(true);
    expect(user?.name).toBe('Jane Doe');
    expect(user?.email).toBe('jane@example.com');
  });

  it('should logout and clear user', async () => {
    const { login } = useAuthStore.getState();
    await login('test@example.com', 'password123');
    expect(useAuthStore.getState().isAuthenticated).toBe(true);

    const { logout } = useAuthStore.getState();
    logout();
    const { isAuthenticated, user } = useAuthStore.getState();
    expect(isAuthenticated).toBe(false);
    expect(user).toBeNull();
  });
});
