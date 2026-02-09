import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import AccessibilitySettings from '../../screens/AccessibilitySettings';

describe('AccessibilitySettings', () => {
  const mockNavigate = jest.fn();

  const renderScreen = () =>
    render(
      <AccessibilitySettings
        onNavigate={mockNavigate}
        hasMissedTasks={false}
      />
    );

  it('renders the header content', () => {
    const { getByText } = renderScreen();

    expect(getByText('Customize Your Experience')).toBeTruthy();
    expect(getByText('Adjust settings to match your needs')).toBeTruthy();
  });

  it('renders accessibility sections', () => {
    const { getByText } = renderScreen();

    expect(getByText('Visual')).toBeTruthy();
    expect(getByText('Audio')).toBeTruthy();
    expect(getByText('Haptic')).toBeTruthy();
  });

  it('renders setting labels', () => {
    const { getByText } = renderScreen();

    expect(getByText('High Contrast Mode')).toBeTruthy();
    expect(getByText('Large Text')).toBeTruthy();
    expect(getByText('Sound Alerts')).toBeTruthy();
    expect(getByText('Vibration Alerts')).toBeTruthy();
  });

  it('updates text preview when Large Text is toggled', () => {
    const { getByText } = renderScreen();

    // Initial state
    expect(getByText('Current size: Large')).toBeTruthy();

    // Toggle large text
    fireEvent.press(getByText('Large Text'));

    // Updated state
    expect(getByText('Current size: Standard')).toBeTruthy();
  });

  it('renders notification badges based on settings', () => {
    const { getByText } = renderScreen();

    expect(getByText('🔊 Sound')).toBeTruthy();
    expect(getByText('📳 Vibration')).toBeTruthy();
    expect(getByText('💡 Visual')).toBeTruthy();
    expect(getByText('🗣️ Voice')).toBeTruthy();
  });

  it('navigates to ASL help screen when button is pressed', () => {
    const { getByText } = renderScreen();

    fireEvent.press(getByText('Watch ASL Help Videos'));

    expect(mockNavigate).toHaveBeenCalledWith('asl-help');
  });
});
