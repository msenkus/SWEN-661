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
    const { getByLabelText } = renderScreen();
    fireEvent.press(getByLabelText('Go back to accessibility settings'));
    expect(mockNavigate).toHaveBeenCalledWith('accessibility');
  });

  it('toggles play/pause when play button is pressed', () => {
    const { getByLabelText, queryByLabelText } = renderScreen();

    // Default: paused
    expect(getByLabelText('Play video')).toBeTruthy();

    // Press to play
    fireEvent.press(getByLabelText('Play video'));

    // Now should show pause
    expect(getByLabelText('Pause video')).toBeTruthy();
    expect(queryByLabelText('Play video')).toBeNull();
  });

  it('toggles mute/unmute when mute button is pressed', () => {
    const { getByLabelText, queryByLabelText } = renderScreen();

    // Default: unmuted
    expect(getByLabelText('Mute audio')).toBeTruthy();

    // Press to mute
    fireEvent.press(getByLabelText('Mute audio'));

    // Now should show unmute
    expect(getByLabelText('Unmute audio')).toBeTruthy();
    expect(queryByLabelText('Mute audio')).toBeNull();
  });

  it('toggles captions when caption button is pressed', () => {
    const { getByLabelText, queryByText } = renderScreen();

    // Default: captions on
    expect(getByLabelText('Turn off captions')).toBeTruthy();
    expect(queryByText(/Welcome to CareConnect/)).toBeTruthy();

    // Press to turn off captions
    fireEvent.press(getByLabelText('Turn off captions'));

    // Now captions should be hidden and button label changed
    expect(getByLabelText('Turn on captions')).toBeTruthy();
    expect(queryByText(/Welcome to CareConnect/)).toBeNull();
  });

  it('video progress bar has progressbar role', () => {
    const { getByLabelText } = renderScreen();
    const bar = getByLabelText('Video progress');
    expect(bar.props.accessibilityRole).toBe('progressbar');
    expect(bar.props.accessibilityValue).toEqual(
      expect.objectContaining({ min: 0, max: 100, now: 33 })
    );
  });

  it('section headers have header role', () => {
    const { getByRole } = renderScreen();
    expect(getByRole('header', { name: 'ASL Help' })).toBeTruthy();
    expect(getByRole('header', { name: 'More Help Videos' })).toBeTruthy();
  });

  it('video library items have accessible labels with duration', () => {
    const { getByLabelText } = renderScreen();
    const video = getByLabelText(/How to Take Your Medication, duration 2:45/);
    expect(video.props.accessibilityRole).toBe('button');
    expect(video.props.accessibilityHint).toBeTruthy();
  });

  it('mute and caption buttons meet minimum touch target size', () => {
    const { getByLabelText } = renderScreen();
    const muteBtn = getByLabelText('Mute audio');
    const captionBtn = getByLabelText('Turn off captions');

    [muteBtn, captionBtn].forEach(btn => {
      const style = Array.isArray(btn.props.style)
        ? Object.assign({}, ...btn.props.style.filter(Boolean))
        : btn.props.style || {};
      expect(style.minWidth).toBeGreaterThanOrEqual(44);
      expect(style.minHeight).toBeGreaterThanOrEqual(44);
    });
  });
});
