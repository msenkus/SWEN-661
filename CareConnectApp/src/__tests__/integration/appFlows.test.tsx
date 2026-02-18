/**
 * Integration Tests — Full App Navigation Flows
 *
 * These tests render the real <App /> component and exercise multi-screen
 * navigation through the state-based router defined in App.tsx.
 */
import React from 'react';
import { render, fireEvent, act, waitFor } from '@testing-library/react-native';
import App from '../../../App';

/* ── Mocks ────────────────────────────────────────────────────────────── */

// lucide-react-native icons used across many screens
jest.mock('lucide-react-native', () => {
  const { Text } = require('react-native');
  const icon = (name: string) => (props: any) => <Text>{name}</Text>;
  return {
    CheckCircle2: icon('CheckCircle2'),
    Circle: icon('Circle'),
    CircleDot: icon('CircleDot'),
    Clock: icon('Clock'),
    AlertCircle: icon('AlertCircle'),
    Phone: icon('Phone'),
    ArrowLeft: icon('ArrowLeft'),
    Calendar: icon('Calendar'),
    MapPin: icon('MapPin'),
    Video: icon('Video'),
    ChevronRight: icon('ChevronRight'),
    Play: icon('Play'),
    Pause: icon('Pause'),
    Volume2: icon('Volume2'),
    VolumeX: icon('VolumeX'),
    Subtitles: icon('Subtitles'),
    Eye: icon('Eye'),
    Vibrate: icon('Vibrate'),
    Bell: icon('Bell'),
    Type: icon('Type'),
    Mail: icon('Mail'),
    FileText: icon('FileText'),
    Navigation: icon('Navigation'),
  };
});

jest.useFakeTimers();

/* ── Helpers ──────────────────────────────────────────────────────────── */

/** Log in from the Welcome screen and land on the Dashboard. */
const loginToDashboard = (utils: ReturnType<typeof render>) => {
  const { getByText, getByLabelText } = utils;

  // Welcome → Login
  fireEvent.press(getByText('I already have an account'));

  // Fill credentials
  fireEvent.changeText(getByLabelText('Email address'), 'user@example.com');
  fireEvent.changeText(getByLabelText('Password'), 'password123');

  // Submit and wait for the 1 500 ms timeout
  fireEvent.press(getByLabelText('Sign in to your account'));
  act(() => {
    jest.runAllTimers();
  });
};

/* ── Tests ────────────────────────────────────────────────────────────── */

describe('App Integration — Navigation Flows', () => {
  afterEach(() => {
    jest.clearAllTimers();
  });

  // ────────────────────────────────────────────────────────────────────
  // 1. Welcome → Login → Dashboard
  // ────────────────────────────────────────────────────────────────────
  it('navigates from Welcome → Login → Dashboard', () => {
    const utils = render(<App />);
    const { getByText, getByLabelText, queryByText } = utils;

    // Verify WelcomeScreen renders
    expect(getByText('CareConnect')).toBeTruthy();
    expect(getByText('I already have an account')).toBeTruthy();

    // Navigate to Login
    fireEvent.press(getByText('I already have an account'));

    // Verify LoginScreen renders
    expect(getByLabelText('Email address')).toBeTruthy();
    expect(getByLabelText('Password')).toBeTruthy();

    // Fill in credentials
    fireEvent.changeText(getByLabelText('Email address'), 'user@example.com');
    fireEvent.changeText(getByLabelText('Password'), 'password123');

    // Submit
    fireEvent.press(getByLabelText('Sign in to your account'));
    act(() => {
      jest.runAllTimers();
    });

    // Verify Dashboard renders
    expect(getByText("Today's Schedule")).toBeTruthy();
    expect(getByLabelText('Medications')).toBeTruthy();
  });

  // ────────────────────────────────────────────────────────────────────
  // 2. Welcome → Register → Dashboard
  // ────────────────────────────────────────────────────────────────────
  it('navigates from Welcome → Register → Dashboard', () => {
    const utils = render(<App />);
    const { getByText, getByLabelText } = utils;

    // Verify WelcomeScreen
    expect(getByText('Get Started')).toBeTruthy();

    // Navigate to Register
    fireEvent.press(getByLabelText('Get started with CareConnect'));

    // Verify RegisterScreen renders
    expect(getByText('Join CareConnect')).toBeTruthy();
    expect(getByLabelText('Full name')).toBeTruthy();

    // Fill in all form fields
    fireEvent.changeText(getByLabelText('Full name'), 'Jane Doe');
    fireEvent.changeText(getByLabelText('Email address'), 'jane@example.com');
    fireEvent.changeText(getByLabelText('Password'), 'securePass1');
    fireEvent.changeText(getByLabelText('Confirm password'), 'securePass1');

    // Submit
    fireEvent.press(getByLabelText('Create a new account'));
    act(() => {
      jest.runAllTimers();
    });

    // Verify Dashboard renders
    expect(getByText("Today's Schedule")).toBeTruthy();
  });

  // ────────────────────────────────────────────────────────────────────
  // 3. Dashboard → Medications → Toggle → Back
  // ────────────────────────────────────────────────────────────────────
  it('navigates Dashboard → Medications, toggles a med, then returns', () => {
    const utils = render(<App />);
    const { getByText, getByLabelText, getAllByText, queryAllByText } = utils;

    // Get to Dashboard first
    loginToDashboard(utils);
    expect(getByText("Today's Schedule")).toBeTruthy();

    // Press Medications quick action
    fireEvent.press(getByLabelText('Medications'));

    // Verify MedicationsScreen renders
    expect(getByText('Today')).toBeTruthy();
    expect(getByText('Yesterday')).toBeTruthy();

    // Verify Vitamin D is initially not taken (there should be a "Missed" chip)
    const missedChipsBefore = queryAllByText('Missed');
    expect(missedChipsBefore.length).toBeGreaterThan(0);

    // Toggle Vitamin D's taken status (the only "Missed" med in Today)
    const vitaminDItems = getAllByText('Vitamin D');
    fireEvent.press(vitaminDItems[0]);

    // After toggle, "Missed" count should decrease (may now be zero)
    const missedChipsAfter = queryAllByText('Missed');
    expect(missedChipsAfter.length).toBeLessThan(missedChipsBefore.length);

    // Navigate back to Dashboard
    fireEvent.press(getByLabelText('Go back to dashboard'));

    // Verify Dashboard renders again
    expect(getByText("Today's Schedule")).toBeTruthy();
  });

  // ────────────────────────────────────────────────────────────────────
  // 4. Dashboard → Step-by-Step Task → Complete all steps → Dashboard
  // ────────────────────────────────────────────────────────────────────
  it('navigates Dashboard → StepByStepTask, completes all 6 steps, returns to Dashboard', () => {
    const utils = render(<App />);
    const { getByText, getByLabelText } = utils;

    // Get to Dashboard
    loginToDashboard(utils);

    // Press the current task (Physical Therapy Exercises)
    fireEvent.press(getByLabelText(/Physical Therapy Exercises/));

    // Verify StepByStepTask screen renders
    expect(getByText('Exercise Task')).toBeTruthy();
    expect(getByText('Step 1 of 6')).toBeTruthy();
    expect(getByText('Preparation')).toBeTruthy();

    // Step through steps 1–5 using "Next Step"
    for (let i = 1; i <= 5; i++) {
      fireEvent.press(getByLabelText('Next step'));
    }

    // Verify we're on step 6 (last step)
    expect(getByText('Step 6 of 6')).toBeTruthy();
    expect(getByText('Cool Down')).toBeTruthy();

    // Also verify "Previous" button exists (we're past step 1)
    expect(getByLabelText('Previous step')).toBeTruthy();

    // Press "Complete Task" (last step's next button)
    fireEvent.press(getByLabelText('Complete task'));

    // Verify return to Dashboard
    expect(getByText("Today's Schedule")).toBeTruthy();
  });

  // ────────────────────────────────────────────────────────────────────
  // 5. Dashboard → Appointments → Appointment Detail → Back
  // ────────────────────────────────────────────────────────────────────
  it('navigates Dashboard → Appointments → AppointmentDetail → back to Appointments', () => {
    const utils = render(<App />);
    const { getByText, getByLabelText } = utils;

    // Get to Dashboard
    loginToDashboard(utils);

    // Press Appointments quick action
    fireEvent.press(getByLabelText('Appointments'));

    // Verify AppointmentList renders
    expect(getByText('Upcoming Appointments')).toBeTruthy();
    expect(getByLabelText(/Dr. Sarah Johnson/)).toBeTruthy();

    // Press the first appointment card
    fireEvent.press(getByLabelText(/Dr. Sarah Johnson/));

    // Verify AppointmentDetail renders
    expect(getByText('Appointment Details')).toBeTruthy();
    expect(getByText('Primary Care Physician')).toBeTruthy();

    // Press back
    fireEvent.press(getByLabelText('Go back to appointments'));

    // Verify return to AppointmentList
    expect(getByText('Upcoming Appointments')).toBeTruthy();
  });
});
