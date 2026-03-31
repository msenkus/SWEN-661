import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { WelcomeScreen } from '../../components/screens/WelcomeScreen';

function renderWithRouter() {
  return render(
    <MemoryRouter>
      <WelcomeScreen />
    </MemoryRouter>
  );
}

describe('WelcomeScreen', () => {
  it('should render the welcome heading', () => {
    renderWithRouter();
    expect(screen.getByText(/Welcome to/i)).toBeInTheDocument();
    expect(screen.getByText(/CareConnect/i)).toBeInTheDocument();
  });

  it('should render sign in and create account links', () => {
    renderWithRouter();
    expect(screen.getByText('Sign In')).toBeInTheDocument();
    expect(screen.getByText('Create Account')).toBeInTheDocument();
  });

  it('should render feature descriptions', () => {
    renderWithRouter();
    expect(screen.getByText('Medication Reminders')).toBeInTheDocument();
    expect(screen.getByText('Task Guidance')).toBeInTheDocument();
    expect(screen.getByText('Emergency Access')).toBeInTheDocument();
  });

  it('should have links pointing to login and register', () => {
    renderWithRouter();
    const signInLink = screen.getByText('Sign In').closest('a');
    const createLink = screen.getByText('Create Account').closest('a');
    expect(signInLink).toHaveAttribute('href', '/login');
    expect(createLink).toHaveAttribute('href', '/register');
  });
});
