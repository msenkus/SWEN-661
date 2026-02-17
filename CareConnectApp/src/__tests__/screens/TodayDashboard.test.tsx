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

  it('renders progress section with accessibility label', () => {
    const { getByLabelText } = renderScreen();

    // Progress card is an accessible group with a descriptive label
    expect(getByLabelText(/Today's progress/)).toBeTruthy();
  });

  it('renders quick action buttons', () => {
    const { getByLabelText } = renderScreen();

    expect(getByLabelText('Medications')).toBeTruthy();
    expect(getByLabelText('Appointments')).toBeTruthy();
    expect(getByLabelText('History')).toBeTruthy();
    expect(getByLabelText('Settings')).toBeTruthy();
  });

  it('navigates to medications when Medications quick action is pressed', () => {
    const { getByLabelText } = renderScreen();

    fireEvent.press(getByLabelText('Medications'));
    expect(mockNavigate).toHaveBeenCalledWith('medications');
  });

  it('navigates to appointments when Appointments quick action is pressed', () => {
    const { getByLabelText } = renderScreen();

    fireEvent.press(getByLabelText('Appointments'));
    expect(mockNavigate).toHaveBeenCalledWith('appointments');
  });

  it('navigates to task history when History quick action is pressed', () => {
    const { getByLabelText } = renderScreen();

    fireEvent.press(getByLabelText('History'));
    expect(mockNavigate).toHaveBeenCalledWith('task-history');
  });

  it('navigates to accessibility when Settings quick action is pressed', () => {
    const { getByLabelText } = renderScreen();

    fireEvent.press(getByLabelText('Settings'));
    expect(mockNavigate).toHaveBeenCalledWith('accessibility');
  });

  it('navigates to step task when current task is pressed', () => {
    const { getByLabelText } = renderScreen();

    fireEvent.press(getByLabelText(/Physical Therapy Exercises/));
    expect(mockNavigate).toHaveBeenCalledWith('step-task');
  });

  it('navigates to SOS screen when Emergency SOS button is pressed', () => {
    const { getByLabelText } = renderScreen();

    fireEvent.press(getByLabelText('Emergency SOS'));
    expect(mockNavigate).toHaveBeenCalledWith('sos');
  });
});
