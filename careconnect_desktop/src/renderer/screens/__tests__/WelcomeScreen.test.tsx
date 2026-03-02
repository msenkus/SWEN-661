import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import WelcomeScreen from '../WelcomeScreen';

function renderWithRouter() {
  return render(
    <MemoryRouter>
      <WelcomeScreen />
    </MemoryRouter>
  );
}

describe('WelcomeScreen', () => {
  it('renders the welcome title', () => {
    renderWithRouter();
    expect(screen.getByRole('heading', { name: /welcome to careconnect/i })).toBeInTheDocument();
  });

  it('renders the sign in subtitle', () => {
    renderWithRouter();
    expect(screen.getByText(/sign in to your account or create a new one/i)).toBeInTheDocument();
  });

  it('renders a Login link', () => {
    renderWithRouter();
    const loginLink = screen.getByRole('link', { name: /login/i });
    expect(loginLink).toBeInTheDocument();
    expect(loginLink).toHaveAttribute('href', '/login');
  });

  it('renders a Sign up link', () => {
    renderWithRouter();
    const signUpLink = screen.getByRole('link', { name: /sign up/i });
    expect(signUpLink).toBeInTheDocument();
    expect(signUpLink).toHaveAttribute('href', '/register');
  });

  it('uses login-page class', () => {
    const { container } = renderWithRouter();
    expect(container.querySelector('.login-page')).toBeInTheDocument();
  });
});
