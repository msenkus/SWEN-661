import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { ASLHelpScreen } from '../../components/screens/ASLHelpScreen';

function renderWithRouter() {
  return render(
    <MemoryRouter>
      <ASLHelpScreen />
    </MemoryRouter>
  );
}

describe('ASLHelpScreen', () => {
  it('should render the page header', () => {
    renderWithRouter();
    expect(screen.getByText('ASL Video Library')).toBeInTheDocument();
    expect(screen.getByText(/American Sign Language guidance/)).toBeInTheDocument();
  });

  it('should render video categories', () => {
    renderWithRouter();
    expect(screen.getByText('Medication Instructions')).toBeInTheDocument();
    expect(screen.getByText('Exercise Routines')).toBeInTheDocument();
    expect(screen.getByText('Emergency Procedures')).toBeInTheDocument();
  });

  it('should render video titles', () => {
    renderWithRouter();
    expect(screen.getByText('How to Take Pills')).toBeInTheDocument();
    expect(screen.getByText('Using an Inhaler')).toBeInTheDocument();
    expect(screen.getByText('Chair Exercises')).toBeInTheDocument();
    expect(screen.getByText('Calling for Help')).toBeInTheDocument();
    expect(screen.getByText('Fall Recovery')).toBeInTheDocument();
  });

  it('should render video durations', () => {
    renderWithRouter();
    expect(screen.getByText('2:30')).toBeInTheDocument();
    expect(screen.getByText('3:15')).toBeInTheDocument();
    expect(screen.getByText('5:00')).toBeInTheDocument();
  });

  it('should render help section', () => {
    renderWithRouter();
    expect(screen.getByText('Need Help?')).toBeInTheDocument();
    expect(screen.getByText(/contact your care coordinator/)).toBeInTheDocument();
  });

  it('should render all 8 video buttons', () => {
    renderWithRouter();
    const buttons = screen.getAllByRole('button');
    expect(buttons.length).toBe(8);
  });
});
