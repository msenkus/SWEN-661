import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import LoginScreen from '../LoginScreen';

const mockNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

function renderLogin() {
  return render(
    <MemoryRouter>
      <LoginScreen />
    </MemoryRouter>
  );
}

describe('LoginScreen', () => {
  beforeEach(() => {
    mockNavigate.mockClear();
  });

  it('renders the Sign In heading', () => {
    renderLogin();
    expect(screen.getByRole('heading', { name: /sign in/i })).toBeInTheDocument();
  });

  it('renders welcome subtitle', () => {
    renderLogin();
    expect(screen.getByText(/welcome back to careconnect/i)).toBeInTheDocument();
  });

  it('renders email and password inputs', () => {
    renderLogin();
    expect(screen.getByPlaceholderText(/name@example\.com/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/enter your password/i)).toBeInTheDocument();
  });

  it('renders Sign In submit button', () => {
    renderLogin();
    expect(screen.getByRole('button', { name: /sign in/i })).toBeInTheDocument();
  });

  it('renders Forgot Password and Sign up links', () => {
    renderLogin();
    expect(screen.getByRole('link', { name: /forgot password/i })).toHaveAttribute('href', '/forgot-password');
    expect(screen.getByRole('link', { name: /sign up/i })).toHaveAttribute('href', '/register');
  });

  it('renders Back to welcome link', () => {
    renderLogin();
    expect(screen.getByRole('link', { name: /back to welcome/i })).toHaveAttribute('href', '/');
  });

  it('updates email when typing', async () => {
    renderLogin();
    const emailInput = screen.getByPlaceholderText(/name@example\.com/i);
    await userEvent.type(emailInput, 'test@example.com');
    expect(emailInput).toHaveValue('test@example.com');
  });

  it('updates password when typing', async () => {
    renderLogin();
    const passwordInput = screen.getByPlaceholderText(/enter your password/i);
    await userEvent.type(passwordInput, 'secret');
    expect(passwordInput).toHaveValue('secret');
  });

  it('toggles show password (Show password / Hide password)', async () => {
    renderLogin();
    const toggle = screen.getByRole('button', { name: /show password/i });
    expect(toggle).toBeInTheDocument();
    await userEvent.click(toggle);
    expect(screen.getByRole('button', { name: /hide password/i })).toBeInTheDocument();
    await userEvent.click(screen.getByRole('button', { name: /hide password/i }));
    expect(screen.getByRole('button', { name: /show password/i })).toBeInTheDocument();
  });

  it('toggles remember me checkbox', async () => {
    renderLogin();
    const checkbox = screen.getByRole('checkbox', { name: /remember me/i });
    expect(checkbox).not.toBeChecked();
    await userEvent.click(checkbox);
    expect(checkbox).toBeChecked();
    await userEvent.click(checkbox);
    expect(checkbox).not.toBeChecked();
  });

  it('navigates to /dashboard on form submit', async () => {
    renderLogin();
    const submit = screen.getByRole('button', { name: /sign in/i });
    await userEvent.click(submit);
    expect(mockNavigate).toHaveBeenCalledWith('/dashboard');
  });

  it('has a working Sign In submit button', async () => {
    renderLogin();
    const submit = screen.getByRole('button', { name: /sign in/i });
    await userEvent.click(submit);
    expect(submit).toBeInTheDocument();
  });

  it('uses login-page class', () => {
    const { container } = renderLogin();
    expect(container.querySelector('.login-page')).toBeInTheDocument();
  });
});
