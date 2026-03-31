import React from 'react';
import { Platform } from 'react-native';
import { render, fireEvent } from '@testing-library/react-native';
import WelcomeScreen, {
  mergePressableStyle,
} from '../../screens/WelcomeScreen';

describe('WelcomeScreen', () => {
  const mockNavigate = jest.fn();
  const originalOS = Platform.OS;

  const renderScreen = (props?: { isTablet?: boolean }) =>
    render(
      <WelcomeScreen
        onNavigate={mockNavigate}
        isTablet={props?.isTablet ?? false}
      />
    );

  beforeEach(() => {
    jest.clearAllMocks();
    Platform.OS = originalOS;
  });

  afterAll(() => {
    Platform.OS = originalOS;
  });

  it('renders the i already have an account title', () => {
    const { getByText } = renderScreen();
    expect(getByText(/i already have an account/i)).toBeTruthy();
  });

  it('renders the Get Started button', () => {
    const { getByText } = renderScreen();
    expect(getByText(/get started/i)).toBeTruthy();
  });

  it('renders title and legal copy', () => {
    const { getByText } = renderScreen();
    expect(getByText('CareConnect')).toBeTruthy();
    expect(
      getByText(/Terms of Service and Privacy Policy/i)
    ).toBeTruthy();
  });

  it('applies tablet content styles when isTablet is true', () => {
    const { getByText } = renderScreen({ isTablet: true });
    expect(getByText('CareConnect')).toBeTruthy();
  });

  it('uses default isTablet when prop is omitted', () => {
    const { getByText } = render(
      <WelcomeScreen onNavigate={mockNavigate} />
    );
    expect(getByText('CareConnect')).toBeTruthy();
  });

  it('covers iOS accessibilityLanguage branch on outer container', () => {
    Platform.OS = 'ios';
    const { getByText } = renderScreen();
    expect(getByText('CareConnect')).toBeTruthy();
  });

  it('covers non-iOS branch without accessibilityLanguage', () => {
    Platform.OS = 'android';
    const { getByText } = renderScreen();
    expect(getByText('CareConnect')).toBeTruthy();
  });

  it('mergePressableStyle covers pressed / not-pressed branches', () => {
    const base = { a: 1 };
    const pressed = { b: 2 };
    expect(mergePressableStyle(base, pressed, false)).toEqual([base]);
    expect(mergePressableStyle(base, pressed, true)).toEqual([base, pressed]);
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
