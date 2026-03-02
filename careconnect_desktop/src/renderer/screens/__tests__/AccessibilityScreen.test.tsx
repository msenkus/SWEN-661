import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import AccessibilityScreen from '../AccessibilityScreen';
import { ThemeProvider } from '../../context/ThemeContext';

function renderAccessibility() {
  return render(
    <MemoryRouter>
      <ThemeProvider>
        <AccessibilityScreen />
      </ThemeProvider>
    </MemoryRouter>
  );
}

describe('AccessibilityScreen', () => {
  it('renders the Settings title', () => {
    renderAccessibility();
    expect(screen.getByRole('heading', { name: /settings/i })).toBeInTheDocument();
  });

  it('renders the Accessibility page title', () => {
    renderAccessibility();
    expect(screen.getByRole('heading', { name: /accessibility/i, level: 2 })).toBeInTheDocument();
  });

  it('renders Customize Your Experience', () => {
    renderAccessibility();
    expect(screen.getByText(/customize your experience/i)).toBeInTheDocument();
  });

  it('renders Visual and Audio sections', () => {
    renderAccessibility();
    expect(screen.getByRole('heading', { name: /^visual$/i, level: 3 })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /^audio$/i, level: 3 })).toBeInTheDocument();
  });

  it('renders Dark Mode and High Contrast toggles', () => {
    renderAccessibility();
    expect(screen.getByRole('switch', { name: /toggle dark mode/i })).toBeInTheDocument();
    expect(screen.getByRole('switch', { name: /toggle high contrast mode/i })).toBeInTheDocument();
  });

  it('renders Large Text, Visual Alerts, and Reduce Motion toggles', () => {
    renderAccessibility();
    expect(screen.getByRole('switch', { name: /toggle large text/i })).toBeInTheDocument();
    expect(screen.getByRole('switch', { name: /toggle visual alerts/i })).toBeInTheDocument();
    expect(screen.getByRole('switch', { name: /toggle reduce motion/i })).toBeInTheDocument();
  });

  it('renders Audio section message', () => {
    renderAccessibility();
    expect(screen.getByText(/sound and voice options are available on the main settings page/i)).toBeInTheDocument();
  });

  it('toggles Dark Mode', async () => {
    renderAccessibility();
    const darkMode = screen.getByRole('switch', { name: /toggle dark mode/i });
    const initialState = darkMode.getAttribute('aria-checked');
    await userEvent.click(darkMode);
    expect(darkMode.getAttribute('aria-checked')).not.toBe(initialState);
    await userEvent.click(darkMode);
    expect(darkMode.getAttribute('aria-checked')).toBe(initialState);
  });

  it('toggles High Contrast Mode', async () => {
    renderAccessibility();
    const highContrast = screen.getByRole('switch', { name: /toggle high contrast mode/i });
    await userEvent.click(highContrast);
    expect(highContrast.getAttribute('aria-checked')).toBe('true');
  });

  it('toggles Large Text and Visual Alerts', async () => {
    renderAccessibility();
    const largeText = screen.getByRole('switch', { name: /toggle large text/i });
    expect(largeText.getAttribute('aria-checked')).toBe('true');
    await userEvent.click(largeText);
    expect(largeText.getAttribute('aria-checked')).toBe('false');

    const visualAlerts = screen.getByRole('switch', { name: /toggle visual alerts/i });
    await userEvent.click(visualAlerts);
    expect(visualAlerts.getAttribute('aria-checked')).toBe('false');
  });

  it('toggles Reduce Motion', async () => {
    renderAccessibility();
    const reduceMotion = screen.getByRole('switch', { name: /toggle reduce motion/i });
    expect(reduceMotion.getAttribute('aria-checked')).toBe('false');
    await userEvent.click(reduceMotion);
    expect(reduceMotion.getAttribute('aria-checked')).toBe('true');
  });

  it('renders back link to Settings', () => {
    renderAccessibility();
    const backLink = screen.getByRole('link', { name: /accessibility/i });
    expect(backLink).toHaveAttribute('href', '/dashboard/settings');
  });

  it('renders Help link in footer', () => {
    renderAccessibility();
    expect(screen.getByRole('link', { name: 'Help' })).toHaveAttribute('href', '/dashboard/asl-help');
  });

  it('uses accessibility-screen class', () => {
    const { container } = renderAccessibility();
    expect(container.querySelector('.accessibility-screen')).toBeInTheDocument();
  });
});
