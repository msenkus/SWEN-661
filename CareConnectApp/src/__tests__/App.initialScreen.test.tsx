/**
 * Covers App.tsx switch branches that are not reachable from the main UI
 * (profile and missed-tasks), plus the MissedTaskAlert onDismiss path.
 */
import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import App from '../../App';

jest.mock('lucide-react-native', () => {
  const React = require('react');
  const { Text } = require('react-native');
  return new Proxy(
    {},
    {
      get() {
        return (props: object) => <Text {...props}>icon</Text>;
      },
    },
  );
});

describe('App initialScreen (router branches)', () => {
  it('renders Profile when initialScreen is profile', () => {
    const { getByText } = render(<App initialScreen="profile" />);
    expect(getByText('Profile')).toBeTruthy();
    expect(getByText('Eleanor Rigby')).toBeTruthy();
  });

  it('renders MissedTaskAlert when initialScreen is missed-tasks', () => {
    const { getByText } = render(<App initialScreen="missed-tasks" />);
    expect(getByText('You Have Missed Tasks')).toBeTruthy();
  });

  it('dismiss on missed tasks invokes onDismiss and returns to dashboard', () => {
    const { getByLabelText, getByText } = render(
      <App initialScreen="missed-tasks" />,
    );
    fireEvent.press(getByLabelText('Dismiss alerts'));
    expect(getByText("Today's Schedule")).toBeTruthy();
  });

  it('renders Task History when initialScreen is task-history', () => {
    const { getByText } = render(<App initialScreen="task-history" />);
    expect(getByText('Task History')).toBeTruthy();
  });

  it('renders Accessibility when initialScreen is accessibility', () => {
    const { getByText } = render(<App initialScreen="accessibility" />);
    expect(getByText('Accessibility')).toBeTruthy();
  });

  it('renders ASL Help when initialScreen is asl-help', () => {
    const { getByText } = render(<App initialScreen="asl-help" />);
    expect(getByText('ASL Help')).toBeTruthy();
  });

  it('renders StepByStepTask when initialScreen is step-task', () => {
    const { getByText } = render(<App initialScreen="step-task" />);
    expect(getByText('Exercise Task')).toBeTruthy();
  });

  it('renders SOS when initialScreen is sos', () => {
    const { getByText } = render(<App initialScreen="sos" />);
    expect(getByText('Emergency Assistance')).toBeTruthy();
  });

  it('renders fallback View for unknown screen value (default branch)', () => {
    const { toJSON } = render(
      <App {...({ initialScreen: '__bad_route__' } as any)} />,
    );
    expect(toJSON()).toBeTruthy();
  });
});
