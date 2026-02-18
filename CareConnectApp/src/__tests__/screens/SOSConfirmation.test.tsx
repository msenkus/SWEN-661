import React from 'react';
import { render, fireEvent, act } from '@testing-library/react-native';
import SOSConfirmation from '../../screens/SOSConfirmation';

jest.useFakeTimers();

describe('SOSConfirmation', () => {
  const mockNavigate = jest.fn();

  beforeEach(() => {
    mockNavigate.mockClear();
  });

  const renderScreen = () =>
    render(<SOSConfirmation onNavigate={mockNavigate} />);

  it('renders emergency warning content', () => {
    const { getByText } = renderScreen();

    expect(getByText('Emergency Assistance')).toBeTruthy();
    expect(
      getByText(/slide to immediately call emergency services/i)
    ).toBeTruthy();
  });

  it('renders slide instruction text', () => {
    const { getByText } = renderScreen();

    expect(
      getByText('Slide to Call Emergency Services')
    ).toBeTruthy();
  });

  it('back button navigates to dashboard', () => {
    const { getByLabelText } = renderScreen();
    fireEvent.press(getByLabelText('Go back to dashboard'));
    expect(mockNavigate).toHaveBeenCalledWith('dashboard');
  });

  it('warning has alert role with descriptive label', () => {
    const { getByLabelText } = renderScreen();
    const alert = getByLabelText(/Emergency assistance/);
    expect(alert.props.accessibilityRole).toBe('alert');
  });

  it('slider has button role with hint', () => {
    const { getByLabelText } = renderScreen();
    const slider = getByLabelText('Slide to call emergency services');
    expect(slider.props.accessibilityRole).toBe('button');
    expect(slider.props.accessibilityHint).toBeTruthy();
  });

  it('header has header role', () => {
    const { getByRole } = renderScreen();
    expect(getByRole('header', { name: 'SOS' })).toBeTruthy();
  });

  it('back button meets minimum touch target size', () => {
    const { getByLabelText } = renderScreen();
    const btn = getByLabelText('Go back to dashboard');
    const style = Array.isArray(btn.props.style)
      ? Object.assign({}, ...btn.props.style.filter(Boolean))
      : btn.props.style || {};
    expect(style.minWidth).toBeGreaterThanOrEqual(44);
    expect(style.minHeight).toBeGreaterThanOrEqual(44);
  });
});
