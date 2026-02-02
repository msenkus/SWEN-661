import 'package:flutter_test/flutter_test.dart';
import 'package:careconnect_mobile/models/task.dart';
import 'package:careconnect_mobile/providers/task_provider.dart';

void main() {
  group('Task model', () {
    test('copyWith updates completed flag', () {
      const task = Task(
        time: '8:00 AM',
        title: 'Test Task',
        completed: false,
        type: 'test',
      );

      final updated = task.copyWith(completed: true);

      expect(updated.completed, true);
      expect(updated.title, task.title);
      expect(updated.time, task.time);
    });

    test('copyWith updates current flag', () {
      const task = Task(
        time: '9:00 AM',
        title: 'Another Task',
        completed: false,
        current: false,
        type: 'test',
      );

      final updated = task.copyWith(current: true);

      expect(updated.current, true);
      expect(updated.completed, false);
    });
  });

  group('TaskNotifier', () {
    test('initial state uses provided tasks', () {
      final tasks = [
        const Task(
          time: '10:00 AM',
          title: 'Provided Task',
          completed: false,
          type: 'test',
        ),
      ];

      final notifier = TaskNotifier(initialTasks: tasks);

      expect(notifier.state.length, 1);
      expect(notifier.state.first.title, 'Provided Task');
    });

    test('completedCount returns correct count', () {
      final notifier = TaskNotifier(initialTasks: const [
        Task(
          time: '8:00 AM',
          title: 'Completed Task',
          completed: true,
          type: 'test',
        ),
        Task(
          time: '9:00 AM',
          title: 'Incomplete Task',
          completed: false,
          type: 'test',
        ),
      ]);

      expect(notifier.completedCount, 1);
    });

    test('hasMissedTasks returns true when task is incomplete and not current',
        () {
      final notifier = TaskNotifier(initialTasks: const [
        Task(
          time: '8:00 AM',
          title: 'Missed Task',
          completed: false,
          current: false,
          type: 'test',
        ),
      ]);

      expect(notifier.hasMissedTasks, true);
    });

    test('hasMissedTasks returns false when task is current', () {
      final notifier = TaskNotifier(initialTasks: const [
        Task(
          time: '8:00 AM',
          title: 'Current Task',
          completed: false,
          current: true,
          type: 'test',
        ),
      ]);

      expect(notifier.hasMissedTasks, false);
    });
  });
}
