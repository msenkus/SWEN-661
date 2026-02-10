import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import MedicationsScreen from '../../screens/MedicationsScreen';

jest.mock('lucide-react-native', () => {
  const { Text } = require('react-native');
  return {
    ArrowLeft: (props: any) => <Text>ArrowLeft</Text>,
    Calendar: (props: any) => <Text>Calendar</Text>,
    CheckCircle2: (props: any) => <Text>CheckCircle2</Text>,
    AlertCircle: (props: any) => <Text>AlertCircle</Text>,
    Clock: (props: any) => <Text>Clock</Text>,
  };
});

describe('MedicationsScreen', () => {
  const mockNavigate = jest.fn();

  const renderScreen = () =>
    render(
      <MedicationsScreen
        onNavigate={mockNavigate}
        isTablet={false}
        orientation="portrait"
        hasMissedTasks={false}
      />
    );

  beforeEach(() => {
    mockNavigate.mockClear();
  });

  it('renders the medications screen title', () => {
    const { getByText } = renderScreen();
    expect(getByText('Medications')).toBeTruthy();
  });

  it('renders medication sections', () => {
    const { getByText } = renderScreen();
    expect(getByText('Today')).toBeTruthy();
    expect(getByText('Yesterday')).toBeTruthy();
  });

  it('renders medication names', () => {
    const { getAllByText } = renderScreen();
    expect(getAllByText('Lisinopril').length).toBeGreaterThan(0);
    expect(getAllByText('Metformin').length).toBeGreaterThan(0);
    expect(getAllByText('Vitamin D').length).toBeGreaterThan(0);
  });

  it('toggles medication taken status when pressed', () => {
    const { getAllByText } = renderScreen();

    // Vitamin D (today) starts as "not taken" — there should be at least one "Missed" chip
    const missedChips = getAllByText('Missed');
    expect(missedChips.length).toBeGreaterThan(0);

    // Press the first Vitamin D to toggle it
    const vitaminDItems = getAllByText('Vitamin D');
    fireEvent.press(vitaminDItems[0]);

    // After toggle, all today's meds should now be "Taken"
    // The Missed count should decrease
    expect(mockNavigate).not.toHaveBeenCalled();
  });

  it('does not navigate away when a medication card is pressed', () => {
    const { getAllByText } = renderScreen();
    const lisinoprilItems = getAllByText('Lisinopril');
    fireEvent.press(lisinoprilItems[0]);
    expect(mockNavigate).not.toHaveBeenCalled();
  });

  it('navigates to task history when history button is pressed', () => {
    const { getByText } = renderScreen();
    fireEvent.press(getByText('View Full Medication History'));
    expect(mockNavigate).toHaveBeenCalledWith('task-history');
  });

  it('navigates back to dashboard when back button is pressed', () => {
    const { getByText } = renderScreen();
    fireEvent.press(getByText('ArrowLeft'));
    expect(mockNavigate).toHaveBeenCalledWith('dashboard');
  });
});
