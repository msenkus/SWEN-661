import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import WelcomeScreen from '../../screens/WelcomeScreen';

describe('WelcomeScreen', () => {
  const mockNavigate = jest.fn();

  const renderScreen = () =>
    render(
      <WelcomeScreen
        onNavigate={mockNavigate}
        isTablet={false}
      />
    );

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the i already have an account title', () => {
    const { getByText } = renderScreen();
    expect(getByText(/i already have an account/i)).toBeTruthy();
  });

  it('renders the Get Started button', () => {
    const { getByText } = renderScreen();
    expect(getByText(/get started/i)).toBeTruthy();
  });

  it('navigates to register screen when Get Started is pressed', () => {
    const { getByText } = renderScreen();

    fireEvent.press(getByText(/get started/i));

    expect(mockNavigate).toHaveBeenCalledWith('register');
  });

  it('navigates to login screen when i already have an account is pressed', () => {
    const { getByText } = renderScreen();

    fireEvent.press(getByText(/i already have an account/i));

    expect(mockNavigate).toHaveBeenCalledWith('login');
  });
});
