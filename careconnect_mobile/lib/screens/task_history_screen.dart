import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import '../widgets/bottom_navigation_bar.dart';

class TaskHistoryScreen extends StatelessWidget {
  const TaskHistoryScreen({super.key});

  @override
  Widget build(BuildContext context) {
    final isTablet = MediaQuery.of(context).size.width > 700;
    final theme = Theme.of(context);
    final colorScheme = theme.colorScheme;
    final isDark = theme.brightness == Brightness.dark;

    final weeklyStats = {
      "total": 49,
      "completed": 42,
      "missed": 7,
      "rate": 86,
    };

    final history = [
      {
        "date": "Today",
        "full": "January 21, 2026",
        "tasks": [
          {
            "title": "Take Morning Medication",
            "time": "8:00 AM",
            "done": true,
            "type": "medication"
          },
          {
            "title": "Breakfast",
            "time": "9:00 AM",
            "done": true,
            "type": "meal"
          },
          {
            "title": "Physical Therapy Exercises",
            "time": "10:30 AM",
            "done": false,
            "type": "exercise"
          },
        ]
      },
      {
        "date": "Yesterday",
        "full": "January 20, 2026",
        "tasks": [
          {
            "title": "Take Morning Medication",
            "time": "8:00 AM",
            "done": true,
            "type": "medication"
          },
          {
            "title": "Breakfast",
            "time": "9:00 AM",
            "done": true,
            "type": "meal"
          },
          {
            "title": "Doctor Appointment",
            "time": "2:00 PM",
            "done": true,
            "type": "appointment"
          },
        ]
      },
    ];

    Color typeColor(String type) {
      switch (type) {
        case "medication":
          return Colors.purple;
        case "meal":
          return Colors.green;
        case "exercise":
          return Colors.blue;
        case "appointment":
          return Colors.orange;
        default:
          return Colors.grey;
      }
    }

    return Scaffold(
      appBar: AppBar(
        leading: IconButton(
          icon: const Icon(Icons.arrow_back),
          onPressed: () {
          if (context.canPop()) {
            context.pop();
          } else {
            context.go('/dashboard');
          }
        },
          tooltip: 'Back',
        ),
        title: const Text("Task History"),
      ),
      body: ListView(
        padding: EdgeInsets.all(isTablet ? 24 : 16),
        children: [
          // ====================
          // WEEKLY CARD
          // ====================

          Semantics(
            label: 'This Week, ${weeklyStats["rate"]} percent complete, ${weeklyStats["total"]} total tasks, ${weeklyStats["completed"]} completed, ${weeklyStats["missed"]} missed',
            child: Container(
              padding: const EdgeInsets.all(20),
              decoration: BoxDecoration(
                gradient: isDark ? null : const LinearGradient(
                  colors: [Colors.green, Colors.teal],
                ),
                color: isDark ? colorScheme.primary : null,
                borderRadius: BorderRadius.circular(20),
                border: isDark ? Border.all(color: colorScheme.onPrimary, width: 2) : null,
              ),
              child: Column(
                children: [
                  Row(
                    children: [
                      Semantics(
                        label: 'Trending up icon',
                        image: true,
                        excludeSemantics: true,
                        child: Icon(Icons.trending_up,
                            color: isDark ? colorScheme.onPrimary : Colors.white, size: 30),
                      ),
                      const SizedBox(width: 10),
                      Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Text("This Week",
                              style: TextStyle(
                                  color: isDark ? colorScheme.onPrimary.withOpacity(0.9) : Colors.white70)),
                          Text(
                            "${weeklyStats["rate"]}% Complete",
                            style: TextStyle(
                              color: isDark ? colorScheme.onPrimary : Colors.white,
                              fontSize:
                                  isTablet ? 28 : 22,
                              fontWeight: FontWeight.bold,
                            ),
                          )
                        ],
                      )
                    ],
                  ),
                  const SizedBox(height: 16),
                  Row(
                    children: [
                      _statBox(context,
                          weeklyStats["total"]!, "Total", isDark),
                      _statBox(context,
                          weeklyStats["completed"]!,
                          "Completed", isDark),
                      _statBox(context,
                          weeklyStats["missed"]!,
                          "Missed", isDark),
                    ],
                  )
                ],
              ),
            ),
          ),

          const SizedBox(height: 24),

          // ====================
          // DAILY HISTORY
          // ====================

          ...history.map((day) {
            final dayMap = day as Map<String, dynamic>;

            final tasks = day["tasks"] as List;
            final done =
                tasks.where((t) => t["done"]).length;
            final percent =
                ((done / tasks.length) * 100).round();

            return Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Row(
                  children: [
                    Icon(Icons.calendar_today,
                        size: 18,
                        color: isDark ? colorScheme.primary : Colors.blue),
                    const SizedBox(width: 8),
                    Column(
                      crossAxisAlignment:
                          CrossAxisAlignment.start,
                      children: [
                        Text(dayMap["date"]!,
                            style: const TextStyle(
                                fontWeight:
                                    FontWeight.bold)),
                        Text(dayMap["full"]!,
                            style: TextStyle(
                                fontSize: 11,
                                color: isDark ? colorScheme.onSurfaceVariant : Colors.grey)),
                      ],
                    ),
                    const Spacer(),
                    Column(
                      children: [
                        Text("$percent%",
                            style: TextStyle(
                                fontWeight:
                                    FontWeight.bold,
                                color: isDark
                                    ? (percent >= 80 ? colorScheme.primary : colorScheme.tertiary)
                                    : (percent >= 80 ? Colors.green : Colors.orange))),
                        Text("$done/${tasks.length}",
                            style: TextStyle(
                                fontSize: 11,
                                color: isDark ? colorScheme.onSurface : null)),
                      ],
                    )
                  ],
                ),

                const SizedBox(height: 12),

                ...tasks.map((task) {
                  final done = task["done"] as bool;

                  return Container(
                    margin:
                        const EdgeInsets.only(bottom: 8),
                    padding: const EdgeInsets.all(12),
                    decoration: BoxDecoration(
                      color: isDark
                          ? (done ? colorScheme.surfaceContainerHighest : colorScheme.errorContainer)
                          : (done ? Colors.white : Colors.red.shade50),
                      borderRadius:
                          BorderRadius.circular(14),
                      border: Border.all(
                          color: isDark
                              ? (done ? colorScheme.outlineVariant : colorScheme.error)
                              : (done ? Colors.grey.shade300 : Colors.red.shade200)),
                    ),
                    child: Row(
                      children: [
                        Icon(
                          done
                              ? Icons.check_circle
                              : Icons.cancel,
                          color: isDark
                              ? (done ? colorScheme.primary : colorScheme.error)
                              : (done ? Colors.green : Colors.red),
                        ),
                        const SizedBox(width: 10),
                        Expanded(
                          child: Column(
                            crossAxisAlignment:
                                CrossAxisAlignment.start,
                            children: [
                              Text(task["title"]!,
                                  style: TextStyle(
                                      fontWeight:
                                          FontWeight.w600,
                                      color: isDark
                                          ? (done ? colorScheme.onSurface : colorScheme.onErrorContainer)
                                          : (done ? Colors.black : Colors.red))),
                              const SizedBox(height: 4),
                              Row(
                                children: [
                                  Icon(Icons.schedule,
                                      size: 14,
                                      color: isDark ? colorScheme.onSurfaceVariant : Colors.grey),
                                  const SizedBox(width: 4),
                                  Text(task["time"]!,
                                      style: TextStyle(
                                          fontSize: 12,
                                          color: isDark ? colorScheme.onSurfaceVariant : null)),
                                  const SizedBox(width: 6),
                                  Text(
                                    "• ${task["type"]}",
                                    style: TextStyle(
                                        fontSize: 12,
                                        color: typeColor(
                                            task["type"])),
                                  )
                                ],
                              )
                            ],
                          ),
                        ),
                        Container(
                          padding:
                              const EdgeInsets.symmetric(
                                  horizontal: 10,
                                  vertical: 4),
                          decoration: BoxDecoration(
                            color: isDark
                                ? (done ? colorScheme.primaryContainer : colorScheme.errorContainer)
                                : (done ? Colors.green.shade100 : Colors.red.shade100),
                            borderRadius:
                                BorderRadius.circular(12),
                            border: isDark ? Border.all(color: done ? colorScheme.primary : colorScheme.error) : null,
                          ),
                          child: Text(
                            done ? "Done" : "Missed",
                            style: TextStyle(
                                fontSize: 11,
                                fontWeight:
                                    FontWeight.bold,
                                color: isDark
                                    ? (done ? colorScheme.onPrimaryContainer : colorScheme.onErrorContainer)
                                    : (done ? Colors.green : Colors.red),
                            ),
                          ),
                        )
                      ],
                    ),
                  );
                }),

                const SizedBox(height: 20),
              ],
            );
          }),

          // ====================
          // LOAD MORE
          // ====================

          Semantics(
            label: 'Load More History, button',
            button: true,
            child: OutlinedButton(
              onPressed: () {},
              style: OutlinedButton.styleFrom(
                minimumSize: const Size.fromHeight(48), // WCAG 2.1: Minimum touch target
              ),
              child: const Text("Load More History"),
            ),
          ),

          const SizedBox(height: 20),

          // ====================
          // MOTIVATION
          // ====================

          Container(
            padding: const EdgeInsets.all(14),
            decoration: BoxDecoration(
              gradient: isDark ? null : LinearGradient(
                colors: [
                  Colors.blue.shade50,
                  Colors.purple.shade50
                ],
              ),
              color: isDark ? colorScheme.surfaceContainerHighest : null,
              borderRadius: BorderRadius.circular(16),
              border: Border.all(
                  color: isDark ? colorScheme.outlineVariant : Colors.blue.shade200),
            ),
            child: Column(
              children: [
                Text(
                  "🎉 Great job this week!",
                  style: TextStyle(
                      fontWeight: FontWeight.bold,
                      color: isDark ? colorScheme.onSurface : null),
                ),
                const SizedBox(height: 4),
                Text(
                  "You've maintained an ${weeklyStats["rate"]}% completion rate. Keep it up!",
                  textAlign: TextAlign.center,
                  style: TextStyle(color: isDark ? colorScheme.onSurface : null),
                )
              ],
            ),
          )
        ],
      ),
      bottomNavigationBar: CareConnectBottomNavBar(
        currentRoute: GoRouter.of(context).routerDelegate.currentConfiguration.uri.path,
      ),
    );
  }

  Widget _statBox(BuildContext context, int value, String label, bool isDark) {
    final colorScheme = Theme.of(context).colorScheme;
    return Expanded(
      child: Container(
        margin: const EdgeInsets.symmetric(horizontal: 4),
        padding: const EdgeInsets.all(12),
        decoration: BoxDecoration(
          color: isDark ? colorScheme.onPrimary.withOpacity(0.24) : Colors.white24,
          borderRadius: BorderRadius.circular(14),
        ),
        child: Column(
          children: [
            Text(
              "$value",
              style: TextStyle(
                  color: isDark ? colorScheme.onPrimary : Colors.white,
                  fontWeight: FontWeight.bold),
            ),
            const SizedBox(height: 4),
            Text(label,
                style: TextStyle(
                    color: isDark ? colorScheme.onPrimary.withOpacity(0.9) : Colors.white70,
                    fontSize: 11))
          ],
        ),
      ),
    );
  }
}
