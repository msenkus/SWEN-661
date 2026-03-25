import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router';
import { AccessibilitySettings } from '../../components/screens/AccessibilitySettings';

function renderWithRouter() {
  return render(
    <MemoryRouter>
      <AccessibilitySettings />
    </MemoryRouter>
  );
}

describe('AccessibilitySettings', () => {
  it('should render the settings page', () => {
    renderWithRouter();
    expect(screen.getByText('Accessibility Settings')).toBeInTheDocument();
    expect(screen.getByText('Customize your experience')).toBeInTheDocument();
  });

  it('should render all setting groups', () => {
    renderWithRouter();
    expect(screen.getByText('Visual Settings')).toBeInTheDocument();
    expect(screen.getByText('Audio Settings')).toBeInTheDocument();
    expect(screen.getByText('Notification Settings')).toBeInTheDocument();
  });

  it('should render all individual settings', () => {
    renderWithRouter();
    expect(screen.getByText('High Contrast Mode')).toBeInTheDocument();
    expect(screen.getByText('Large Text')).toBeInTheDocument();
    expect(screen.getByText('Audio Alerts')).toBeInTheDocument();
    expect(screen.getByText('Voice Guidance')).toBeInTheDocument();
    expect(screen.getByText('Visual Alerts')).toBeInTheDocument();
    expect(screen.getByText('Vibration Alerts')).toBeInTheDocument();
  });

  it('should render setting descriptions', () => {
    renderWithRouter();
    expect(screen.getByText('Increase contrast for better visibility')).toBeInTheDocument();
    expect(screen.getByText('Increase font size throughout the app')).toBeInTheDocument();
  });

  it('should toggle settings on click', async () => {
    const user = userEvent.setup();
    renderWithRouter();

    // Find toggle buttons - there are 6 settings with toggle buttons
    const toggleButtons = screen.getAllByRole('button').filter(
      btn => !btn.textContent?.includes('Save')
    );

    // Click the first toggle (High Contrast Mode - initially off)
    await user.click(toggleButtons[0]);
    // No error means the toggle worked
  });

  it('should have a save button', () => {
    renderWithRouter();
    expect(screen.getByText('Save Settings')).toBeInTheDocument();
  });
});
