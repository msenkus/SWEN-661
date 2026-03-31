import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router';
import { MedicationList } from '../../components/screens/MedicationList';

function renderWithRouter() {
  return render(
    <MemoryRouter>
      <MedicationList />
    </MemoryRouter>
  );
}

describe('MedicationList', () => {
  it('should render all medications', () => {
    renderWithRouter();
    expect(screen.getByText('Lisinopril 10mg')).toBeInTheDocument();
    expect(screen.getByText('Metformin 500mg')).toBeInTheDocument();
    expect(screen.getByText('Atorvastatin 20mg')).toBeInTheDocument();
    expect(screen.getByText('Aspirin 81mg')).toBeInTheDocument();
    expect(screen.getByText('Vitamin D3 1000 IU')).toBeInTheDocument();
  });

  it('should display taken count', () => {
    renderWithRouter();
    expect(screen.getByText('4/5')).toBeInTheDocument();
  });

  it('should display medication notes', () => {
    renderWithRouter();
    expect(screen.getByText('Take with food')).toBeInTheDocument();
    expect(screen.getByText('Take with breakfast')).toBeInTheDocument();
    expect(screen.getByText('Take with dinner')).toBeInTheDocument();
  });

  it('should toggle medication taken status', async () => {
    const user = userEvent.setup();
    renderWithRouter();

    expect(screen.getByText('4/5')).toBeInTheDocument();

    const buttons = screen.getAllByRole('button');
    await user.click(buttons[2]);

    expect(screen.getByText('5/5')).toBeInTheDocument();
  });

  it('should show important reminder', () => {
    renderWithRouter();
    expect(screen.getByText('Important Reminder')).toBeInTheDocument();
  });

  it('should display dosage information', () => {
    renderWithRouter();
    // "1 tablet" appears multiple times (Lisinopril, Atorvastatin, Aspirin)
    expect(screen.getAllByText('1 tablet').length).toBeGreaterThanOrEqual(1);
    expect(screen.getByText('2 tablets')).toBeInTheDocument();
    expect(screen.getByText('1 capsule')).toBeInTheDocument();
  });
});
