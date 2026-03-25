import { describe, it, expect, beforeEach } from 'vitest';
import { useTaskStore } from '../../store/taskStore';

describe('taskStore', () => {
  beforeEach(() => {
    // Reset store to initial state
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

  it('should have initial tasks', () => {
    const { tasks } = useTaskStore.getState();
    expect(tasks).toHaveLength(7);
  });

  it('should have 2 completed tasks initially', () => {
    const { tasks } = useTaskStore.getState();
    const completed = tasks.filter(t => t.completed);
    expect(completed).toHaveLength(2);
  });

  it('should complete a task by id', () => {
    const { completeTask } = useTaskStore.getState();
    completeTask(3);
    const { tasks } = useTaskStore.getState();
    const task = tasks.find(t => t.id === 3);
    expect(task?.completed).toBe(true);
  });

  it('should not affect other tasks when completing one', () => {
    const { completeTask } = useTaskStore.getState();
    completeTask(4);
    const { tasks } = useTaskStore.getState();
    expect(tasks.find(t => t.id === 3)?.completed).toBe(false);
    expect(tasks.find(t => t.id === 4)?.completed).toBe(true);
  });

  it('should have hasMissedTasks as true initially', () => {
    const { hasMissedTasks } = useTaskStore.getState();
    expect(hasMissedTasks).toBe(true);
  });

  it('should dismiss missed tasks', () => {
    const { dismissMissedTasks } = useTaskStore.getState();
    dismissMissedTasks();
    const { hasMissedTasks } = useTaskStore.getState();
    expect(hasMissedTasks).toBe(false);
  });

  it('should have correct task types', () => {
    const { tasks } = useTaskStore.getState();
    const types = tasks.map(t => t.type);
    expect(types).toContain('medication');
    expect(types).toContain('meal');
    expect(types).toContain('exercise');
    expect(types).toContain('appointment');
  });

  it('should mark the current task', () => {
    const { tasks } = useTaskStore.getState();
    const currentTask = tasks.find(t => t.current);
    expect(currentTask).toBeDefined();
    expect(currentTask?.title).toBe('Physical Therapy Exercises');
  });
});
