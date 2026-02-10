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
});
