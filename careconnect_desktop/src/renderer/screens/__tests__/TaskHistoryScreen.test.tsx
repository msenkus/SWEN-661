import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import TaskHistoryScreen from '../TaskHistoryScreen';

function renderTaskHistory() {
  return render(
    <MemoryRouter>
      <TaskHistoryScreen />
    </MemoryRouter>
  );
}

describe('TaskHistoryScreen', () => {
  it('renders the Task History title', () => {
    renderTaskHistory();
    expect(screen.getByRole('heading', { name: /task history/i })).toBeInTheDocument();
  });

  it('renders This Week summary with percentage', () => {
    renderTaskHistory();
    expect(screen.getByText(/86% complete/i)).toBeInTheDocument();
  });

  it('renders filter tabs', () => {
    renderTaskHistory();
    expect(screen.getByRole('button', { name: /all tasks/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /completed/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /missed/i })).toBeInTheDocument();
  });

  it('renders task items for Today', () => {
    renderTaskHistory();
    const medication = screen.getAllByText(/take morning medication/i);
    expect(medication.length).toBeGreaterThan(0);
    expect(screen.getAllByText(/breakfast/i).length).toBeGreaterThan(0);
  });

  it('switches filter when clicking Missed', async () => {
    renderTaskHistory();
    await userEvent.click(screen.getByRole('button', { name: /^missed$/i }));
    expect(screen.getByRole('button', { name: /^missed$/i }).className).toMatch(/active/);
  });

  it('renders Load More History button', () => {
    renderTaskHistory();
    expect(screen.getByRole('button', { name: /load more history/i })).toBeInTheDocument();
  });

  it('uses task-history-screen class', () => {
    const { container } = renderTaskHistory();
    expect(container.querySelector('.task-history-screen')).toBeInTheDocument();
  });
});
