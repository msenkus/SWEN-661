import 'package:flutter_riverpod/flutter_riverpod.dart';
import '../models/task.dart';

class TaskNotifier extends StateNotifier<List<Task>> {
  TaskNotifier() : super(_initialTasks);

  static final _initialTasks = [
    Task(time: '8:00 AM', title: 'Take Morning Medication', completed: true, type: 'medication'),
    Task(time: '9:00 AM', title: 'Breakfast', completed: true, type: 'meal'),
    Task(time: '10:30 AM', title: 'Physical Therapy Exercises', completed: false, type: 'exercise', current: true),
    Task(time: '12:00 PM', title: 'Lunch', completed: false, type: 'meal'),
    Task(time: '2:00 PM', title: 'Doctor Appointment', completed: false, type: 'appointment'),
    Task(time: '6:00 PM', title: 'Take Evening Medication', completed: false, type: 'medication'),
    Task(time: '7:00 PM', title: 'Dinner', completed: false, type: 'meal'),
  ];

  void markCompleted(Task task) {
    state = [
      for (final t in state)
        if (t == task)
          t.copyWith(completed: true, current: false)
        else
          t,
    ];
  }

  int get completedCount => state.where((t) => t.completed).length;

  bool get hasMissedTasks =>
      state.any((t) => !t.completed && !t.current);
}

final taskProvider =
    StateNotifierProvider<TaskNotifier, List<Task>>(
  (ref) => TaskNotifier(),
);
