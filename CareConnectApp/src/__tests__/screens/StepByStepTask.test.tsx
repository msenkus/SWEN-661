import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import StepByStepTask from '../../screens/StepByStepTask';

jest.mock('lucide-react-native', () => {
  const { Text } = require('react-native');
  return {
    ChevronRight: (props: any) => <Text>ChevronRight</Text>,
    CheckCircle2: (props: any) => <Text>CheckCircle2</Text>,
    ArrowLeft: (props: any) => <Text>ArrowLeft</Text>,
  };
});

describe('StepByStepTask', () => {
  const mockNavigate = jest.fn();

  const renderScreen = () =>
    render(<StepByStepTask onNavigate={mockNavigate} />);

  beforeEach(() => {
    mockNavigate.mockClear();
  });

  it('renders the first step', () => {
    const { getByText } = renderScreen();
    expect(getByText('Preparation')).toBeTruthy();
    expect(getByText('Step 1 of 6')).toBeTruthy();
  });

  it('renders progress percentage', () => {
    const { getByText } = renderScreen();
    expect(getByText('17%')).toBeTruthy();
  });

  it('advances to next step when Next Step is pressed', () => {
    const { getByText } = renderScreen();
    fireEvent.press(getByText('Next Step'));
    expect(getByText('Neck Rotation')).toBeTruthy();
    expect(getByText('Step 2 of 6')).toBeTruthy();
  });

  it('shows Previous button after advancing', () => {
    const { getByText, queryByText } = renderScreen();

    // No Previous button on step 1
    expect(queryByText('Previous')).toBeNull();

    fireEvent.press(getByText('Next Step'));

    // Previous button appears on step 2
    expect(getByText('Previous')).toBeTruthy();
  });

  it('goes back to previous step when Previous is pressed', () => {
    const { getByText } = renderScreen();
    fireEvent.press(getByText('Next Step'));
    expect(getByText('Neck Rotation')).toBeTruthy();

    fireEvent.press(getByText('Previous'));
    expect(getByText('Preparation')).toBeTruthy();
  });

  it('shows Complete Task button on last step', () => {
    const { getByText } = renderScreen();

    // Advance through all 6 steps
    for (let i = 0; i < 5; i++) {
      fireEvent.press(getByText('Next Step'));
    }

    expect(getByText('Cool Down')).toBeTruthy();
    expect(getByText('Complete Task')).toBeTruthy();
  });

  it('navigates to dashboard on task completion', () => {
    const { getByText } = renderScreen();

    // Advance to last step
    for (let i = 0; i < 5; i++) {
      fireEvent.press(getByText('Next Step'));
    }

    fireEvent.press(getByText('Complete Task'));
    expect(mockNavigate).toHaveBeenCalledWith('dashboard');
  });

  it('navigates back to dashboard when back button is pressed', () => {
    const { getByText } = renderScreen();
    fireEvent.press(getByText('ArrowLeft'));
    expect(mockNavigate).toHaveBeenCalledWith('dashboard');
  });
});
