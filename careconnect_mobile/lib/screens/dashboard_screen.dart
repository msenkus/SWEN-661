import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';

class DashboardScreen extends StatelessWidget {
  const DashboardScreen({super.key});

  @override
  Widget build(BuildContext context) {
    final orientation = MediaQuery.of(context).orientation;
    final width = MediaQuery.of(context).size.width;
    final isTablet = width >= 700;

    final tasks = [
      _Task('8:00 AM', 'Take Morning Medication', true, 'medication'),
      _Task('9:00 AM', 'Breakfast', true, 'meal'),
      _Task('10:30 AM', 'Physical Therapy Exercises', false, 'exercise',
          current: true),
      _Task('12:00 PM', 'Lunch', false, 'meal'),
      _Task('2:00 PM', 'Doctor Appointment', false, 'appointment'),
      _Task('6:00 PM', 'Take Evening Medication', false, 'medication'),
      _Task('7:00 PM', 'Dinner', false, 'meal'),
    ];

    final completed = tasks.where((t) => t.completed).length;
    final percent = completed / tasks.length;

    return Scaffold(
      appBar: AppBar(
        title: const Text("Today's Tasks"),
        actions: [
          IconButton(
            icon: const Icon(Icons.settings),
            onPressed: () => context.go('/accessibility'),
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

          ...tasks.map(
            (t) => _TaskTile(
              task: t,
              onTap: () {
                if (t.type == 'medication') {
                  context.go('/medications');
                } else if (t.current) {
                  context.go('/task');
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
}

/* ---------------- MODELS ---------------- */

class _Task {
  final String time;
  final String title;
  final bool completed;
  final bool current;
  final String type;

  _Task(this.time, this.title, this.completed, this.type,
      {this.current = false});
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
    return Container(
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
                  const Text("Today's Progress",
                      style: TextStyle(color: Colors.white70)),
                  Text(
                    "$completed/$total",
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
                    "${(percent * 100).round()}%",
                    style: TextStyle(
                      fontSize: isTablet ? 32 : 26,
                      fontWeight: FontWeight.bold,
                      color: Colors.white,
                    ),
                  ),
                  const Text("Complete",
                      style: TextStyle(color: Colors.white70)),
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
    );
  }
}

/* ---------------- QUICK ACTIONS ---------------- */

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
    return OutlinedButton(
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
        style: TextStyle(color: color, fontWeight: FontWeight.w600),
      ),
    );
  }
}

/* ---------------- TASK TILE ---------------- */

class _TaskTile extends StatelessWidget {
  final _Task task;
  final VoidCallback onTap;

  const _TaskTile({
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

    return InkWell(
      onTap: onTap,
      child: Container(
        margin: const EdgeInsets.only(bottom: 12),
        decoration: BoxDecoration(
          border: Border.all(color: borderColor, width: 2),
          borderRadius: BorderRadius.circular(16),
        ),
        child: ListTile(
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
