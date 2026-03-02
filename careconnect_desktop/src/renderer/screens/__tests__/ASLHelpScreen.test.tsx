import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import ASLHelpScreen from '../ASLHelpScreen';

function renderASLHelp() {
  return render(
    <MemoryRouter>
      <ASLHelpScreen />
    </MemoryRouter>
  );
}

describe('ASLHelpScreen', () => {
  it('renders the ASL Help title', () => {
    renderASLHelp();
    expect(screen.getByRole('heading', { name: /asl help/i })).toBeInTheDocument();
  });

  it('renders the main video section with title', () => {
    renderASLHelp();
    expect(screen.getAllByText(/how to take your medication/i).length).toBeGreaterThan(0);
  });

  it('renders More Help Videos section', () => {
    renderASLHelp();
    expect(screen.getByRole('heading', { name: /more help videos/i })).toBeInTheDocument();
  });

  it('renders help video cards', () => {
    renderASLHelp();
    expect(screen.getByText(/understanding your daily tasks/i)).toBeInTheDocument();
    expect(screen.getByText(/using the sos button/i)).toBeInTheDocument();
  });

  it('renders Play button', () => {
    renderASLHelp();
    expect(screen.getByRole('button', { name: /play/i })).toBeInTheDocument();
  });

  it('uses asl-help-screen class', () => {
    const { container } = renderASLHelp();
    expect(container.querySelector('.asl-help-screen')).toBeInTheDocument();
  });
});
