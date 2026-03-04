import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import MedicationsScreen from '../MedicationsScreen';

function renderMedications() {
  return render(
    <MemoryRouter>
      <MedicationsScreen />
    </MemoryRouter>
  );
}

describe('MedicationsScreen', () => {
  it('renders the Medications title', () => {
    renderMedications();
    expect(screen.getByRole('heading', { name: /medications/i })).toBeInTheDocument();
  });

  it('renders the summary card with medications today', () => {
    renderMedications();
    expect(screen.getByText(/medications today/i)).toBeInTheDocument();
  });

  it('renders summary count (e.g. 4 of 5 Taken)', () => {
    renderMedications();
    expect(screen.getByText(/4 of 5 taken/i)).toBeInTheDocument();
  });

  it('renders medication cards with names and details', () => {
    renderMedications();
    expect(screen.getByText(/lisinopril 10mg/i)).toBeInTheDocument();
    expect(screen.getByText(/metformin 500mg/i)).toBeInTheDocument();
    expect(screen.getByText(/atorvastatin 20mg/i)).toBeInTheDocument();
    expect(screen.getByText(/take with dinner/i)).toBeInTheDocument();
  });

  it('renders Mark as Taken and Marked as Taken buttons', () => {
    renderMedications();
    const markButton = screen.getByRole('button', { name: /mark atorvastatin.*as taken/i });
    expect(markButton).toBeInTheDocument();
    const markedButtons = screen.getAllByRole('button', { name: /marked as taken/i });
    expect(markedButtons.length).toBeGreaterThan(0);
  });

  it('marking a medication as taken updates summary and button', async () => {
    renderMedications();
    expect(screen.getByText(/4 of 5 taken/i)).toBeInTheDocument();
    const markButton = screen.getByRole('button', { name: /mark atorvastatin.*as taken/i });
    await userEvent.click(markButton);
    expect(screen.getByText(/5 of 5 taken/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /atorvastatin 20mg marked as taken\. click to unmark\./i })).toBeInTheDocument();
  });

  it('unmarking a medication updates summary and button', async () => {
    renderMedications();
    const lisinoprilMarked = screen.getByRole('button', {
      name: /lisinopril 10mg marked as taken\. click to unmark\./i,
    });
    await userEvent.click(lisinoprilMarked);
    expect(screen.getByText(/3 of 5 taken/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /mark lisinopril 10mg as taken/i })).toBeInTheDocument();
  });

  it('renders ASL help and Help links in footer', () => {
    renderMedications();
    expect(screen.getByRole('link', { name: /need help\? watch asl guide/i })).toHaveAttribute('href', '/dashboard/asl-help');
    expect(screen.getByRole('link', { name: 'Help' })).toHaveAttribute('href', '/dashboard/asl-help');
  });

  it('uses medications-screen class', () => {
    const { container } = renderMedications();
    expect(container.querySelector('.medications-screen')).toBeInTheDocument();
  });
});
