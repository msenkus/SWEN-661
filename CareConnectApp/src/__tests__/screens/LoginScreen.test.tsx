import React from 'react';
import { render, fireEvent, act } from '@testing-library/react-native';
import LoginScreen from '../../screens/LoginScreen';

jest.useFakeTimers();

describe('LoginScreen', () => {
  const mockNavigate = jest.fn();

  const renderScreen = () =>
    render(
      <LoginScreen
        onNavigate={mockNavigate}
        isTablet={false}
      />
    );

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the login header', () => {
  const { getAllByText } = renderScreen();
  expect(getAllByText('Sign In').length).toBeGreaterThan(0);
  });


  it('renders email and password inputs', () => {
    const { getByLabelText } = renderScreen();

    expect(getByLabelText('Email address')).toBeTruthy();
    expect(getByLabelText('Password')).toBeTruthy();
  });

  it('navigates to dashboard when Sign In is pressed', () => {
    const { getByLabelText } = renderScreen();

    fireEvent.press(getByLabelText('Sign in to your account'));

    act(() => {
      jest.runAllTimers();
    });

    expect(mockNavigate).toHaveBeenCalledWith('dashboard');
  });

  it('navigates back to welcome screen when back button is pressed', () => {
    const { getByLabelText } = renderScreen();

    fireEvent.press(getByLabelText('Go back to welcome screen'));

    expect(mockNavigate).toHaveBeenCalledWith('welcome');
  });

  it('navigates to register screen when sign up link is pressed', () => {
    const { getByText } = renderScreen();

    fireEvent.press(getByText('Sign up for CareConnect'));

    expect(mockNavigate).toHaveBeenCalledWith('register');
  });
});
