import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import MissedTaskAlert from '../../screens/MissedTaskAlert';

jest.mock('lucide-react-native', () => {
  const { Text } = require('react-native');
  return {
    AlertCircle: (props: any) => <Text>AlertCircle</Text>,
    X: (props: any) => <Text>X</Text>,
    Clock: (props: any) => <Text>Clock</Text>,
    ChevronRight: (props: any) => <Text>ChevronRight</Text>,
  };
});

describe('MissedTaskAlert', () => {
  const mockNavigate = jest.fn();
  const mockDismiss = jest.fn();

  const renderScreen = () =>
    render(
      <MissedTaskAlert
        onNavigate={mockNavigate}
        onDismiss={mockDismiss}
      />
    );

  beforeEach(() => {
    mockNavigate.mockClear();
    mockDismiss.mockClear();
  });

  it('renders the missed tasks header', () => {
    const { getByText } = renderScreen();
    expect(getByText('You Have Missed Tasks')).toBeTruthy();
  });

  it('renders missed task titles', () => {
    const { getByText } = renderScreen();
    expect(getByText('Morning Blood Pressure Check')).toBeTruthy();
    expect(getByText('Drink Water')).toBeTruthy();
  });

  it('renders priority labels', () => {
    const { getByText } = renderScreen();
    expect(getByText('HIGH PRIORITY')).toBeTruthy();
    expect(getByText('MEDIUM PRIORITY')).toBeTruthy();
  });

  it('renders missed-by times', () => {
    const { getByText } = renderScreen();
    expect(getByText('Missed by 2 hours')).toBeTruthy();
    expect(getByText('Missed by 30 minutes')).toBeTruthy();
  });

  it('navigates to step-task when Complete Now is pressed', () => {
    const { getAllByText } = renderScreen();
    const completeButtons = getAllByText('Complete Now');
    fireEvent.press(completeButtons[0]);
    expect(mockNavigate).toHaveBeenCalledWith('step-task');
  });

  it('navigates to dashboard when View All Tasks is pressed', () => {
    const { getByText } = renderScreen();
    fireEvent.press(getByText('View All Tasks'));
    expect(mockNavigate).toHaveBeenCalledWith('dashboard');
  });

  it('calls onDismiss and navigates to dashboard when Dismiss Alerts is pressed', () => {
    const { getByText } = renderScreen();
    fireEvent.press(getByText('Dismiss Alerts'));
    expect(mockDismiss).toHaveBeenCalled();
    expect(mockNavigate).toHaveBeenCalledWith('dashboard');
  });

  it('renders the badge count', () => {
    const { getByText } = renderScreen();
    expect(getByText('2')).toBeTruthy();
  });
});
