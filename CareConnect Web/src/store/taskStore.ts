import { create } from 'zustand';

export interface Task {
  id: number;
  time: string;
  title: string;
  completed: boolean;
  type: 'medication' | 'meal' | 'exercise' | 'appointment';
  current?: boolean;
}

interface TaskState {
  tasks: Task[];
  hasMissedTasks: boolean;
  completeTask: (taskId: number) => void;
  dismissMissedTasks: () => void;
}

export const useTaskStore = create<TaskState>((set) => ({
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
  completeTask: (taskId: number) => {
    set((state) => ({
      tasks: state.tasks.map((task) =>
        task.id === taskId ? { ...task, completed: true } : task
      ),
    }));
  },
  dismissMissedTasks: () => {
    set({ hasMissedTasks: false });
  },
}));
