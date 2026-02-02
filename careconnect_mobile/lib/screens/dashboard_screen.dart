import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

import '../models/task.dart';
import '../providers/task_provider.dart';

class DashboardScreen extends ConsumerWidget {
  const DashboardScreen({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final orientation = MediaQuery.of(context).orientation;
    final width = MediaQuery.of(context).size.width;
    final isTablet = width >= 700;

    // --------------------------------------------------
    // TASK SOURCE — fallback to Figma defaults if empty
    // --------------------------------------------------
    final providerTasks = ref.watch(taskProvider);

    // If provider is empty (common in tests / startup), we still show something.
    final tasks = ref.watch(taskProvider); 

    final completed = tasks.where((t) => t.completed).length;

    final hasMissedTasks =
      tasks.any((t) => !t.completed && !t.current);


    // SAFE percent (prevents NaN/Infinity)
    final percent = tasks.isEmpty ? 0.0 : completed / tasks.length;

    return Scaffold(
      appBar: AppBar(
        title: const Text("Today's Tasks"),
        actions: [
          Semantics(
            label: hasMissedTasks
                ? 'Notifications. You have missed tasks.'
                : 'Notifications. No missed tasks.',
            button: true,
            child: Stack(
              children: [
                Tooltip(
                  message: 'Missed Tasks',
                  child: IconButton(
                    key: const Key('btn_missed_tasks'),
                    icon: const Icon(Icons.notifications_outlined),
                    onPressed: () => context.go('/missed-tasks'),
                  ),
                ),
                if (hasMissedTasks)
                  const Positioned(
                    right: 10,
                    top: 10,
                    child: CircleAvatar(
                      radius: 5,
                      backgroundColor: Colors.red,
                    ),
                  ),
              ],
            ),
          ),
          Semantics(
            label: 'Accessibility settings',
            button: true,
            child: Tooltip(
              message: 'Settings',
              child: IconButton(
                key: const Key('btn_accessibility'),
                icon: const Icon(Icons.settings),
                onPressed: () => context.go('/accessibility'),
              ),
            ),
          ),
        ],
      ),
      body: ListView(
        padding: EdgeInsets.all(isTablet ? 24 : 16),
        children: [
          _ProgressCard(
            completed: completed,
            total: tasks.length,
            percent: percent,
            isTablet: isTablet,
          ),
          const SizedBox(height: 20),
          _QuickActionsGrid(
            isTablet: isTablet,
            orientation: orientation,
            onNavigate: context.go,
          ),
          const SizedBox(height: 20),
          Text(
            "Today's Schedule",
            style: Theme.of(context).textTheme.titleLarge,
          ),
          const SizedBox(height: 12),

          // ---------------- TASK LIST ----------------
          ...tasks.map(
            (t) => _TaskTile(
              key: Key('task_tile_${_safeKey(t.title)}'),
              task: t,
              onTap: () {
                if (t.type == 'medication') {
                  context.go('/medications');
                } else if (t.current) {
                  context.go('/step-task');
                }
              },
            ),
          ),

          const SizedBox(height: 24),
          _SOSButton(onTap: () => context.go('/sos')),
        ],
      ),
    );
  }

  // --------------------------------------------------
  // FIGMA DEFAULT TASKS
  // --------------------------------------------------
  static List<Task> _figmaDefaultTasks() {
    return [
      Task(
        time: '8:00 AM',
        title: 'Take Morning Medication',
        completed: true,
        type: 'medication',
      ),
      Task(
        time: '9:00 AM',
        title: 'Breakfast',
        completed: true,
        type: 'meal',
      ),
      Task(
        time: '10:30 AM',
        title: 'Physical Therapy Exercises',
        completed: false,
        current: true,
        type: 'exercise',
      ),
      Task(
        time: '12:00 PM',
        title: 'Lunch',
        completed: false,
        type: 'meal',
      ),
      Task(
        time: '2:00 PM',
        title: 'Doctor Appointment',
        completed: false,
        type: 'appointment',
      ),
      Task(
        time: '6:00 PM',
        title: 'Take Evening Medication',
        completed: false,
        type: 'medication',
      ),
      Task(
        time: '7:00 PM',
        title: 'Dinner',
        completed: false,
        type: 'meal',
      ),
    ];
  }

  static String _safeKey(String input) =>
      input.replaceAll(RegExp(r'[^a-zA-Z0-9]+'), '_');
}

/* ---------------- PROGRESS CARD ---------------- */

class _ProgressCard extends StatelessWidget {
  final int completed;
  final int total;
  final double percent;
  final bool isTablet;

  const _ProgressCard({
    required this.completed,
    required this.total,
    required this.percent,
    required this.isTablet,
  });

  @override
  Widget build(BuildContext context) {
    final percentText = total == 0 ? '0%' : '${(percent * 100).round()}%';

    return Semantics(
      label: 'Daily progress',
      value: '$percentText complete',
      child: Container(
        key: const Key('progress_card'),
        padding: const EdgeInsets.all(20),
        decoration: BoxDecoration(
          gradient: const LinearGradient(
            colors: [Color(0xFF3B82F6), Color(0xFF2563EB)],
          ),
          borderRadius: BorderRadius.circular(20),
        ),
        child: Column(
          children: [
            Row(
              children: [
                Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    const Text(
                      "Today's Progress",
                      style: TextStyle(color: Colors.white70),
                    ),
                    Text(
                      "$completed/$total",
                      key: const Key('progress_fraction'),
                      style: TextStyle(
                        fontSize: isTablet ? 40 : 32,
                        fontWeight: FontWeight.bold,
                        color: Colors.white,
                      ),
                    ),
                  ],
                ),
                const Spacer(),
                Column(
                  crossAxisAlignment: CrossAxisAlignment.end,
                  children: [
                    Text(
                      percentText,
                      key: const Key('progress_percent'),
                      style: TextStyle(
                        fontSize: isTablet ? 32 : 26,
                        fontWeight: FontWeight.bold,
                        color: Colors.white,
                      ),
                    ),
                    const Text(
                      "Complete",
                      style: TextStyle(color: Colors.white70),
                    ),
                  ],
                ),
              ],
            ),
            const SizedBox(height: 16),
            ClipRRect(
              borderRadius: BorderRadius.circular(10),
              child: LinearProgressIndicator(
                value: percent,
                backgroundColor: Colors.white24,
                color: Colors.white,
                minHeight: 10,
              ),
            ),
          ],
        ),
      ),
    );
  }
}

/* ---------------- QUICK ACTIONS ---------------- */

class _QuickButton extends StatelessWidget {
  final String label;
  final MaterialColor color;
  final VoidCallback onTap;

  const _QuickButton({
    required this.label,
    required this.color,
    required this.onTap,
  });

  @override
  Widget build(BuildContext context) {
    return Semantics(
      button: true,
      label: '$label button',
      child: Tooltip(
        message: label,
        child: OutlinedButton(
          key: Key('quick_$label'),
          onPressed: onTap,
          style: OutlinedButton.styleFrom(
            padding: const EdgeInsets.all(16),
            side: BorderSide(color: color.shade200, width: 2),
            backgroundColor: color.shade50,
            shape: RoundedRectangleBorder(
              borderRadius: BorderRadius.circular(16),
            ),
          ),
          child: Text(
            label,
            style: TextStyle(
              color: color,
              fontWeight: FontWeight.w600,
            ),
          ),
        ),
      ),
    );
  }
}

class _QuickActionsGrid extends StatelessWidget {
  final bool isTablet;
  final Orientation orientation;
  final void Function(String route) onNavigate;

  const _QuickActionsGrid({
    required this.isTablet,
    required this.orientation,
    required this.onNavigate,
  });

  @override
  Widget build(BuildContext context) {
    final cols = isTablet && orientation == Orientation.landscape ? 3 : 2;

    return GridView.count(
      crossAxisCount: cols,
      shrinkWrap: true,
      physics: const NeverScrollableScrollPhysics(),
      crossAxisSpacing: 12,
      mainAxisSpacing: 12,
      children: [
        _QuickButton(
          label: "Medications",
          color: Colors.purple,
          onTap: () => onNavigate('/medications'),
        ),
        _QuickButton(
          label: "Appointments",
          color: Colors.orange,
          onTap: () => onNavigate('/appointments'),
        ),
        _QuickButton(
          label: "History",
          color: Colors.blue,
          onTap: () => onNavigate('/history'),
        ),
        _QuickButton(
          label: "Settings",
          color: Colors.green,
          onTap: () => onNavigate('/accessibility'),
        ),
      ],
    );
  }
}

/* ---------------- TASK TILE ---------------- */

class _TaskTile extends StatelessWidget {
  final Task task;
  final VoidCallback onTap;

  const _TaskTile({
    super.key,
    required this.task,
    required this.onTap,
  });

  @override
  Widget build(BuildContext context) {
    final borderColor = task.current
        ? Colors.blue
        : task.completed
            ? Colors.grey.shade200
            : Colors.grey.shade300;

    final status = task.completed
        ? 'Completed'
        : task.current
            ? 'Current task'
            : 'Upcoming';

    return Semantics(
      button: true,
      label: '${task.title}, ${task.time}. $status.',
      child: InkWell(
              onTap: onTap,
              child: Container(
                margin: const EdgeInsets.only(bottom: 12),
                decoration: BoxDecoration(
                  border: Border.all(color: borderColor, width: 2),
                  borderRadius: BorderRadius.circular(16),
                ),
                child: ListTile(
                  key: Key('task_tap_${DashboardScreen._safeKey(task.title)}'),
                  leading: Icon(
                    task.completed
                        ? Icons.check_circle
                        : task.current
                            ? Icons.radio_button_checked
                            : Icons.radio_button_off,
                    color: task.completed
                        ? Colors.green
                        : task.current
                            ? Colors.blue
                            : Colors.grey,
                  ),
                  title: Text(
                    task.title,
                    key: Key('task_title_${DashboardScreen._safeKey(task.title)}'),
                    style: TextStyle(
                      decoration:
                          task.completed ? TextDecoration.lineThrough : null,
                    ),
                  ),
                  subtitle: Text(task.time),
                  trailing: task.current
                      ? const Icon(Icons.warning, color: Colors.blue)
                      : null,
                ),
              ),
            ),
    );
  }
}

/* ---------------- SOS BUTTON ---------------- */

class _SOSButton extends StatelessWidget {
  final VoidCallback onTap;

  const _SOSButton({required this.onTap});

  @override
  Widget build(BuildContext context) {
    return ElevatedButton.icon(
      key: const Key('btn_sos'),
      onPressed: onTap,
      icon: const Icon(Icons.phone),
      label: const Text(
        "Emergency SOS",
        style: TextStyle(fontSize: 20, fontWeight: FontWeight.bold),
      ),
      style: ElevatedButton.styleFrom(
        backgroundColor: Colors.red,
        padding: const EdgeInsets.symmetric(vertical: 22),
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(20),
        ),
      ),
    );
  }
}
