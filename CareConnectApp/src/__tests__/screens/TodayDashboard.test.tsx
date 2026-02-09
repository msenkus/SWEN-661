import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import TodayDashboard from '../../screens/TodayDashboard';

/* Mock vector icons */
jest.mock('react-native-vector-icons/Ionicons', () => 'Icon');

describe('TodayDashboard', () => {
  const mockNavigate = jest.fn();

  const renderScreen = () =>
    render(
      <TodayDashboard
        onNavigate={mockNavigate}
        isTablet={false}
        orientation="portrait"
        hasMissedTasks={false}
      />
    );

  beforeEach(() => {
    mockNavigate.mockClear();
  });

  it('renders progress section', () => {
    const { getByText } = renderScreen();

    expect(getByText("Today’s Progress")).toBeTruthy();
    expect(getByText('2/7')).toBeTruthy(); // 2 completed tasks
    expect(getByText('29%')).toBeTruthy(); // rounded percentage
  });

  it('renders quick action buttons', () => {
    const { getByText } = renderScreen();

    expect(getByText('Medications')).toBeTruthy();
    expect(getByText('Appointments')).toBeTruthy();
    expect(getByText('History')).toBeTruthy();
    expect(getByText('Settings')).toBeTruthy();
  });

  it('navigates to medications when Medications quick action is pressed', () => {
    const { getByText } = renderScreen();

    fireEvent.press(getByText('Medications'));
    expect(mockNavigate).toHaveBeenCalledWith('medications');
  });

  it('navigates to appointments when Appointments quick action is pressed', () => {
    const { getByText } = renderScreen();

    fireEvent.press(getByText('Appointments'));
    expect(mockNavigate).toHaveBeenCalledWith('appointments');
  });

  it('navigates to task history when History quick action is pressed', () => {
    const { getByText } = renderScreen();

    fireEvent.press(getByText('History'));
    expect(mockNavigate).toHaveBeenCalledWith('task-history');
  });

  it('navigates to accessibility when Settings quick action is pressed', () => {
    const { getByText } = renderScreen();

    fireEvent.press(getByText('Settings'));
    expect(mockNavigate).toHaveBeenCalledWith('accessibility');
  });

  it('navigates to step task when current task is pressed', () => {
    const { getByText } = renderScreen();

    fireEvent.press(getByText('Physical Therapy Exercises'));
    expect(mockNavigate).toHaveBeenCalledWith('step-task');
  });

  it('navigates to SOS screen when Emergency SOS button is pressed', () => {
    const { getByText } = renderScreen();

    fireEvent.press(getByText('Emergency SOS'));
    expect(mockNavigate).toHaveBeenCalledWith('sos');
  });
});
