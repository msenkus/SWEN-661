class Task {
  final String time;
  final String title;
  final bool completed;
  final bool current;
  final String type;

  const Task({
    required this.time,
    required this.title,
    required this.completed,
    required this.type,
    this.current = false,
  });

  Task copyWith({
    bool? completed,
    bool? current,
  }) {
    return Task(
      time: time,
      title: title,
      completed: completed ?? this.completed,
      type: type,
      current: current ?? this.current,
    );
  }
}
