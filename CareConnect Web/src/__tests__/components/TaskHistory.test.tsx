import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { TaskHistory } from '../../components/screens/TaskHistory';

function renderWithRouter() {
  return render(
    <MemoryRouter>
      <TaskHistory />
    </MemoryRouter>
  );
}

describe('TaskHistory', () => {
  it('should render weekly stats', () => {
    renderWithRouter();
    expect(screen.getByText('49')).toBeInTheDocument();
    expect(screen.getByText('42')).toBeInTheDocument();
    expect(screen.getByText('7')).toBeInTheDocument();
    expect(screen.getByText('86%')).toBeInTheDocument();
  });

  it('should render stat labels', () => {
    renderWithRouter();
    expect(screen.getByText('Total Tasks')).toBeInTheDocument();
    // "Completed" appears both as a stat label and as task badges
    expect(screen.getAllByText('Completed').length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText('Missed').length).toBeGreaterThanOrEqual(1);
  });

  it('should render today and yesterday sections', () => {
    renderWithRouter();
    expect(screen.getByText('Today')).toBeInTheDocument();
    expect(screen.getByText('Yesterday')).toBeInTheDocument();
    expect(screen.getByText('January 21, 2026')).toBeInTheDocument();
    expect(screen.getByText('January 20, 2026')).toBeInTheDocument();
  });

  it('should render task names in history', () => {
    renderWithRouter();
    expect(screen.getAllByText('Take Morning Medication')).toHaveLength(2);
    expect(screen.getAllByText('Breakfast')).toHaveLength(2);
    expect(screen.getByText('Physical Therapy Exercises')).toBeInTheDocument();
    expect(screen.getByText('Doctor Appointment')).toBeInTheDocument();
  });

  it('should show done and missed badges', () => {
    renderWithRouter();
    const doneBadges = screen.getAllByText('Done');
    const missedBadges = screen.getAllByText('Missed');
    expect(doneBadges.length).toBeGreaterThan(0);
    expect(missedBadges.length).toBeGreaterThan(0);
  });
});
