import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router';
import { TodayDashboard } from '../../components/screens/TodayDashboard';
import { useTaskStore } from '../../store/taskStore';

function renderWithRouter() {
  return render(
    <MemoryRouter>
      <TodayDashboard />
    </MemoryRouter>
  );
}

describe('TodayDashboard', () => {
  beforeEach(() => {
    useTaskStore.setState({
      tasks: [
        { id: 1, time: '8:00 AM', title: 'Take Morning Medication', completed: true, type: 'medication' },
        { id: 2, time: '9:00 AM', title: 'Breakfast', completed: true, type: 'meal' },
        { id: 3, time: '10:30 AM', title: 'Physical Therapy Exercises', completed: false, type: 'exercise', current: true },
        { id: 4, time: '12:00 PM', title: 'Lunch', completed: false, type: 'meal' },
        { id: 5, time: '2:00 PM', title: 'Doctor Appointment', completed: false, type: 'appointment' },
        { id: 6, time: '6:00 PM', title: 'Take Evening Medication', completed: false, type: 'medication' },
        { id: 7, time: '7:00 PM', title: 'Dinner', completed: false, type: 'meal' },
      ],
      hasMissedTasks: true,
    });
  });

  it('should render all tasks', () => {
    renderWithRouter();
    expect(screen.getByText('Take Morning Medication')).toBeInTheDocument();
    expect(screen.getByText('Breakfast')).toBeInTheDocument();
    expect(screen.getByText('Physical Therapy Exercises')).toBeInTheDocument();
    expect(screen.getByText('Lunch')).toBeInTheDocument();
    expect(screen.getByText('Doctor Appointment')).toBeInTheDocument();
  });

  it('should display progress count', () => {
    renderWithRouter();
    expect(screen.getByText('2/7')).toBeInTheDocument();
  });

  it('should display progress percentage', () => {
    renderWithRouter();
    expect(screen.getByText('29%')).toBeInTheDocument();
  });

  it('should show missed tasks indicator', () => {
    renderWithRouter();
    expect(screen.getByText('2 Missed')).toBeInTheDocument();
  });

  it('should show task type badges', () => {
    renderWithRouter();
    expect(screen.getAllByText('Medication')).toHaveLength(2);
    expect(screen.getAllByText('Meal')).toHaveLength(3);
    expect(screen.getByText('Exercise')).toBeInTheDocument();
    expect(screen.getByText('Appointment')).toBeInTheDocument();
  });

  it('should show the current task badge and start button', () => {
    renderWithRouter();
    expect(screen.getByText('Current Task')).toBeInTheDocument();
    expect(screen.getByText('Start Task')).toBeInTheDocument();
  });

  it('should complete a task when clicking the circle', async () => {
    const user = userEvent.setup();
    renderWithRouter();

    // There are 5 incomplete tasks with circle buttons
    const circleButtons = screen.getAllByRole('button');
    // Click the first incomplete task circle (task id 3)
    // The buttons include both completed checkmarks and incomplete circles
    // Task 3 is the first incomplete one
    await user.click(circleButtons[2]); // 0-indexed, tasks 1,2 completed, task 3 is index 2

    const { tasks } = useTaskStore.getState();
    expect(tasks.find(t => t.id === 3)?.completed).toBe(true);
  });

  it('should show Today\'s Tasks heading', () => {
    renderWithRouter();
    expect(screen.getByText("Today's Tasks")).toBeInTheDocument();
  });
});
