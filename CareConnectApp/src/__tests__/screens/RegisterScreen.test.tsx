import React from 'react';
import { render, fireEvent, act } from '@testing-library/react-native';
import RegisterScreen from '../../screens/RegisterScreen';

jest.mock('react-native-vector-icons/Ionicons', () => 'Icon');

describe('RegisterScreen', () => {
  const mockNavigate = jest.fn();

  const renderScreen = () =>
    render(
      <RegisterScreen
        onNavigate={mockNavigate}
        isTablet={false}
      />
    );

  beforeEach(() => {
    mockNavigate.mockClear();
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('renders the create account header', () => {
    const { getAllByText } = renderScreen();
    expect(getAllByText('Create Account').length).toBeGreaterThan(0);
  });

  it('renders all form fields', () => {
    const { getByPlaceholderText } = renderScreen();
    expect(getByPlaceholderText('John Doe')).toBeTruthy();
    expect(getByPlaceholderText('name@example.com')).toBeTruthy();
    expect(getByPlaceholderText('Create a password')).toBeTruthy();
    expect(getByPlaceholderText('Confirm your password')).toBeTruthy();
  });

  it('navigates back to welcome when back button is pressed', () => {
    const { getByLabelText } = renderScreen();
    fireEvent.press(getByLabelText('Go back to welcome screen'));
    expect(mockNavigate).toHaveBeenCalledWith('welcome');
  });

  it('navigates to dashboard after registration', () => {
    const { getByLabelText } = renderScreen();
    fireEvent.press(getByLabelText('Create a new account'));

    act(() => {
      jest.advanceTimersByTime(1500);
    });

    expect(mockNavigate).toHaveBeenCalledWith('dashboard');
  });

  it('navigates to login screen via sign in link', () => {
    const { getByText } = renderScreen();
    fireEvent.press(getByText('Sign In'));
    expect(mockNavigate).toHaveBeenCalledWith('login');
  });

  it('updates form fields when text is entered', () => {
    const { getByPlaceholderText } = renderScreen();
    const nameInput = getByPlaceholderText('John Doe');
    const emailInput = getByPlaceholderText('name@example.com');
    const passwordInput = getByPlaceholderText('Create a password');
    const confirmInput = getByPlaceholderText('Confirm your password');

    fireEvent.changeText(nameInput, 'Jane Doe');
    fireEvent.changeText(emailInput, 'jane@example.com');
    fireEvent.changeText(passwordInput, 'password123');
    fireEvent.changeText(confirmInput, 'password123');

    expect(nameInput.props.value).toBe('Jane Doe');
    expect(emailInput.props.value).toBe('jane@example.com');
    expect(passwordInput.props.value).toBe('password123');
    expect(confirmInput.props.value).toBe('password123');
  });

  it('toggles password visibility when eye button is pressed', () => {
    const { getByLabelText, getByPlaceholderText } = renderScreen();

    // Default: password is hidden
    const toggle = getByLabelText('Show password');
    expect(toggle).toBeTruthy();

    // Press to show password
    fireEvent.press(toggle);

    // Now it should say "Hide password"
    expect(getByLabelText('Hide password')).toBeTruthy();
  });

  it('shows loading state during registration', () => {
    const { getByLabelText } = renderScreen();
    const btn = getByLabelText('Create a new account');

    // Before press - not busy
    expect(btn.props.accessibilityState).toEqual(
      expect.objectContaining({ disabled: false, busy: false })
    );

    // Press to start loading
    fireEvent.press(btn);

    // Button should be disabled/busy during loading
    const busyBtn = getByLabelText('Create a new account');
    expect(busyBtn.props.accessibilityState).toEqual(
      expect.objectContaining({ disabled: true, busy: true })
    );

    act(() => {
      jest.advanceTimersByTime(1500);
    });
  });

  it('renders on tablet layout', () => {
    const { getByLabelText } = render(
      <RegisterScreen onNavigate={mockNavigate} isTablet={true} />
    );
    expect(getByLabelText('Create a new account')).toBeTruthy();
  });

  it('all form inputs have accessible labels and hints', () => {
    const { getByLabelText } = renderScreen();
    ['Full name', 'Email address', 'Password', 'Confirm password'].forEach(label => {
      const input = getByLabelText(label);
      expect(input).toBeTruthy();
      expect(input.props.accessibilityHint).toBeTruthy();
    });
  });

  it('header has header role', () => {
    const { getByRole } = renderScreen();
    expect(getByRole('header', { name: 'Create Account' })).toBeTruthy();
  });

  it('sign in link has link role and hint', () => {
    const { getByLabelText } = renderScreen();
    const link = getByLabelText('Sign in to existing account');
    expect(link.props.accessibilityRole).toBe('link');
    expect(link.props.accessibilityHint).toBeTruthy();
  });
});
