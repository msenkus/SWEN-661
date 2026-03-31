import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router';
import { StepByStepTask } from '../../components/screens/StepByStepTask';

const mockNavigate = vi.fn();
vi.mock('react-router', async () => {
  const actual = await vi.importActual('react-router');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
    useParams: () => ({ taskId: 'physical-therapy' }),
  };
});

function renderWithRouter() {
  return render(
    <MemoryRouter>
      <StepByStepTask />
    </MemoryRouter>
  );
}

describe('StepByStepTask', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render the first step', () => {
    renderWithRouter();
    expect(screen.getByText('Preparation')).toBeInTheDocument();
    expect(screen.getByText(/Find a quiet space/)).toBeInTheDocument();
  });

  it('should show step progress', () => {
    renderWithRouter();
    expect(screen.getByText('Step 1 of 6')).toBeInTheDocument();
    expect(screen.getByText('17% Complete')).toBeInTheDocument();
  });

  it('should navigate to next step', async () => {
    const user = userEvent.setup();
    renderWithRouter();

    await user.click(screen.getByText('Next Step'));
    expect(screen.getByText('Neck Rotation')).toBeInTheDocument();
    expect(screen.getByText('Step 2 of 6')).toBeInTheDocument();
  });

  it('should navigate to previous step', async () => {
    const user = userEvent.setup();
    renderWithRouter();

    await user.click(screen.getByText('Next Step'));
    expect(screen.getByText('Neck Rotation')).toBeInTheDocument();

    await user.click(screen.getByText('Previous'));
    expect(screen.getByText('Preparation')).toBeInTheDocument();
  });

  it('should disable previous button on first step', () => {
    renderWithRouter();
    const prevButton = screen.getByText('Previous').closest('button');
    expect(prevButton).toBeDisabled();
  });

  it('should show Complete Task on last step', async () => {
    const user = userEvent.setup();
    renderWithRouter();

    // Navigate through all steps
    for (let i = 0; i < 5; i++) {
      await user.click(screen.getByText('Next Step'));
    }

    expect(screen.getByText('Cool Down')).toBeInTheDocument();
    expect(screen.getByText('Complete Task')).toBeInTheDocument();
  });

  it('should navigate to dashboard on completing last step', async () => {
    const user = userEvent.setup();
    renderWithRouter();

    // Navigate through all 6 steps
    for (let i = 0; i < 5; i++) {
      await user.click(screen.getByText('Next Step'));
    }
    await user.click(screen.getByText('Complete Task'));

    expect(mockNavigate).toHaveBeenCalledWith('/app/dashboard');
  });
});
