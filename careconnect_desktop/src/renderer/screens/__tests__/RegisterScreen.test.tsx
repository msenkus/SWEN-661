import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import RegisterScreen from '../RegisterScreen';

function renderRegister() {
  return render(
    <MemoryRouter>
      <RegisterScreen />
    </MemoryRouter>
  );
}

describe('RegisterScreen', () => {
  it('renders the Sign up heading', () => {
    renderRegister();
    expect(screen.getByRole('heading', { name: /sign up/i })).toBeInTheDocument();
  });

  it('renders the placeholder subtitle', () => {
    renderRegister();
    expect(screen.getByText(/create a careconnect account/i)).toBeInTheDocument();
  });

  it('renders Back to Sign In link', () => {
    renderRegister();
    const link = screen.getByRole('link', { name: /back to sign in/i });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', '/login');
  });

  it('uses login-page class', () => {
    const { container } = renderRegister();
    expect(container.querySelector('.login-page')).toBeInTheDocument();
  });
});
