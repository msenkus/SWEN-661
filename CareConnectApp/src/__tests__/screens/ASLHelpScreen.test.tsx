import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import ASLHelpScreen from '../../screens/ASLHelpScreen';

jest.mock('lucide-react-native', () => {
  const { Text } = require('react-native');
  return {
    Play: (props: any) => <Text>Play</Text>,
    Pause: (props: any) => <Text>Pause</Text>,
    Volume2: (props: any) => <Text>Volume2</Text>,
    VolumeX: (props: any) => <Text>VolumeX</Text>,
    Subtitles: (props: any) => <Text>Subtitles</Text>,
    ChevronRight: (props: any) => <Text>ChevronRight</Text>,
    ArrowLeft: (props: any) => <Text>ArrowLeft</Text>,
  };
});

describe('ASLHelpScreen', () => {
  const mockNavigate = jest.fn();

  const renderScreen = () =>
    render(<ASLHelpScreen onNavigate={mockNavigate} />);

  beforeEach(() => {
    mockNavigate.mockClear();
  });

  it('renders the ASL help title', () => {
    const { getByText } = renderScreen();
    expect(getByText('ASL Help')).toBeTruthy();
  });

  it('renders the featured video section', () => {
    const { getByText } = renderScreen();
    expect(getByText('ASL Interpretation')).toBeTruthy();
  });

  it('renders video list items', () => {
    const { getAllByText, getByText } = renderScreen();
    expect(getAllByText('How to Take Your Medication').length).toBeGreaterThan(0);
    expect(getByText('Understanding Your Daily Tasks')).toBeTruthy();
    expect(getByText('Using the SOS Button')).toBeTruthy();
    expect(getByText('Setting Up Reminders')).toBeTruthy();
  });

  it('renders captions by default', () => {
    const { getByText } = renderScreen();
    expect(
      getByText(/Welcome to CareConnect/)
    ).toBeTruthy();
  });

  it('navigates back to accessibility settings when back button is pressed', () => {
    const { getByText } = renderScreen();
    fireEvent.press(getByText('ArrowLeft'));
    expect(mockNavigate).toHaveBeenCalledWith('accessibility');
  });
});
