import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import MedicationsScreen from '../../screens/MedicationsScreen';

/* Mock vector icons */
jest.mock('react-native-vector-icons/Ionicons', () => 'Icon');

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

it('navigates to step task when a medication card is pressed', () => {
  const { getAllByText } = renderScreen();

  const vitaminDItems = getAllByText('Vitamin D');

  fireEvent.press(vitaminDItems[0]);

  expect(mockNavigate).toHaveBeenCalledWith('step-task');
});


  it('navigates to task history when history button is pressed', () => {
    const { getByText } = renderScreen();

    fireEvent.press(getByText('View Full Medication History'));
    expect(mockNavigate).toHaveBeenCalledWith('task-history');
  });
});
