import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import SettingsScreen from '../SettingsScreen';
import { ThemeProvider } from '../../context/ThemeContext';

function renderSettings() {
  return render(
    <MemoryRouter>
      <ThemeProvider>
        <SettingsScreen />
      </ThemeProvider>
    </MemoryRouter>
  );
}

describe('SettingsScreen', () => {
  it('renders the Settings title', () => {
    renderSettings();
    expect(screen.getByRole('heading', { name: /settings/i })).toBeInTheDocument();
  });

  it('renders Customize Your Experience', () => {
    renderSettings();
    expect(screen.getByText(/customize your experience/i)).toBeInTheDocument();
  });

  it('renders Visual, Audio, Haptic sections', () => {
    renderSettings();
    expect(screen.getByRole('heading', { name: /^visual$/i, level: 2 })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /^audio$/i, level: 2 })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /^haptic$/i, level: 2 })).toBeInTheDocument();
  });

  it('renders all Visual toggles', () => {
    renderSettings();
    expect(screen.getByRole('switch', { name: /toggle dark mode/i })).toBeInTheDocument();
    expect(screen.getByRole('switch', { name: /toggle high contrast mode/i })).toBeInTheDocument();
    expect(screen.getByRole('switch', { name: /toggle large text/i })).toBeInTheDocument();
    expect(screen.getByRole('switch', { name: /toggle visual alerts/i })).toBeInTheDocument();
    expect(screen.getByRole('switch', { name: /toggle reduce motion/i })).toBeInTheDocument();
  });

  it('renders Audio and Haptic toggles', () => {
    renderSettings();
    expect(screen.getByRole('switch', { name: /toggle sound alerts/i })).toBeInTheDocument();
    expect(screen.getByRole('switch', { name: /toggle voice announcements/i })).toBeInTheDocument();
    expect(screen.getByRole('switch', { name: /toggle vibration alerts/i })).toBeInTheDocument();
  });

  it('toggles Dark Mode', async () => {
    renderSettings();
    const darkMode = screen.getByRole('switch', { name: /toggle dark mode/i });
    const initialState = darkMode.getAttribute('aria-checked');
    await userEvent.click(darkMode);
    expect(darkMode.getAttribute('aria-checked')).not.toBe(initialState);
  });

  it('toggles High Contrast and Large Text', async () => {
    renderSettings();
    const highContrast = screen.getByRole('switch', { name: /toggle high contrast mode/i });
    await userEvent.click(highContrast);
    expect(highContrast.getAttribute('aria-checked')).toBe('true');

    const largeText = screen.getByRole('switch', { name: /toggle large text/i });
    await userEvent.click(largeText);
    expect(largeText.getAttribute('aria-checked')).toBe('false');
  });

  it('toggles Reduce Motion and Visual Alerts', async () => {
    renderSettings();
    const reduceMotion = screen.getByRole('switch', { name: /toggle reduce motion/i });
    expect(reduceMotion.getAttribute('aria-checked')).toBe('false');
    await userEvent.click(reduceMotion);
    expect(reduceMotion.getAttribute('aria-checked')).toBe('true');

    const visualAlerts = screen.getByRole('switch', { name: /toggle visual alerts/i });
    await userEvent.click(visualAlerts);
    expect(visualAlerts.getAttribute('aria-checked')).toBe('false');
  });

  it('toggles Sound and Voice Announcements', async () => {
    renderSettings();
    const sound = screen.getByRole('switch', { name: /toggle sound alerts/i });
    await userEvent.click(sound);
    expect(sound.getAttribute('aria-checked')).toBe('false');

    const voice = screen.getByRole('switch', { name: /toggle voice announcements/i });
    await userEvent.click(voice);
    expect(voice.getAttribute('aria-checked')).toBe('false');
  });

  it('toggles Vibration Alerts', async () => {
    renderSettings();
    const vibration = screen.getByRole('switch', { name: /toggle vibration alerts/i });
    await userEvent.click(vibration);
    expect(vibration.getAttribute('aria-checked')).toBe('false');
  });

  it('renders Text Size Preview section', () => {
    renderSettings();
    expect(screen.getByText(/text size preview/i)).toBeInTheDocument();
    expect(screen.getByText(/current size:/i)).toBeInTheDocument();
    expect(screen.getByText(/this is how your text will appear/i)).toBeInTheDocument();
    expect(document.querySelector('.settings-preview-size-value')).toHaveTextContent('Large');
  });

  it('renders Notification Style section with all pills', () => {
    renderSettings();
    expect(screen.getByText(/notification style/i)).toBeInTheDocument();
    expect(screen.getByText(/active notification methods/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /^sound$/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /^vibration$/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /^visual$/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /^voice$/i })).toBeInTheDocument();
  });

  it('toggling a notification pill updates aria-pressed', async () => {
    renderSettings();
    const soundPill = screen.getByRole('button', { name: /^sound$/i });
    expect(soundPill).toHaveAttribute('aria-pressed', 'true');
    await userEvent.click(soundPill);
    expect(soundPill).toHaveAttribute('aria-pressed', 'false');
    await userEvent.click(soundPill);
    expect(soundPill).toHaveAttribute('aria-pressed', 'true');
  });

  it('toggles multiple notification pills', async () => {
    renderSettings();
    const vibration = screen.getByRole('button', { name: /^vibration$/i });
    const voice = screen.getByRole('button', { name: /^voice$/i });
    await userEvent.click(vibration);
    await userEvent.click(voice);
    expect(vibration).toHaveAttribute('aria-pressed', 'false');
    expect(voice).toHaveAttribute('aria-pressed', 'false');
  });

  it('renders Watch ASL Help Videos and Help links in footer', () => {
    renderSettings();
    const aslLink = screen.getByRole('link', { name: /watch asl help videos/i });
    expect(aslLink).toHaveAttribute('href', '/dashboard/asl-help');
    expect(screen.getByRole('link', { name: 'Help' })).toHaveAttribute('href', '/dashboard/asl-help');
  });

  it('uses settings-screen class', () => {
    const { container } = renderSettings();
    expect(container.querySelector('.settings-screen')).toBeInTheDocument();
  });
});
