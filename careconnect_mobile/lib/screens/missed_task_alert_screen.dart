import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';

class MissedTaskAlertScreen extends StatelessWidget {
  const MissedTaskAlertScreen({super.key});

  @override
  Widget build(BuildContext context) {
    final isTablet = MediaQuery.of(context).size.width > 700;
    final isLandscape =
        MediaQuery.of(context).orientation == Orientation.landscape;

    final missedTasks = [
      {
        "title": "Morning Blood Pressure Check",
        "scheduled": "9:00 AM",
        "missedBy": "2 hours",
        "priority": "high",
      },
      {
        "title": "Drink Water",
        "scheduled": "11:00 AM",
        "missedBy": "30 minutes",
        "priority": "medium",
      },
    ];

    return Scaffold(
      appBar: AppBar(title: const Text("Missed Tasks")),
      body: Column(
        children: [
          // ========================
          // ALERT HEADER
          // ========================

          Container(
            width: double.infinity,
            color: Colors.red.shade50,
            padding: const EdgeInsets.all(20),
            child: Row(
              children: [
                Stack(
                  children: [
                    Icon(
                      Icons.error_outline,
                      size: isTablet ? 48 : 40,
                      color: Colors.red,
                    ),
                    Positioned(
                      right: -2,
                      top: -2,
                      child: CircleAvatar(
                        radius: 12,
                        backgroundColor: Colors.red,
                        child: Text(
                          "${missedTasks.length}",
                          style: const TextStyle(
                              color: Colors.white,
                              fontWeight: FontWeight.bold,
                              fontSize: 12),
                        ),
                      ),
                    )
                  ],
                ),
                const SizedBox(width: 12),
                Expanded(
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: const [
                      Text(
                        "You Have Missed Tasks",
                        style: TextStyle(
                            fontWeight: FontWeight.bold,
                            fontSize: 20,
                            color: Colors.red),
                      ),
                      SizedBox(height: 4),
                      Text(
                        "Please complete these as soon as possible",
                        style: TextStyle(color: Colors.redAccent),
                      ),
                    ],
                  ),
                )
              ],
            ),
          ),

          // ========================
          // TASK LIST
          // ========================

          Expanded(
            child: ListView(
              padding: EdgeInsets.all(isTablet ? 24 : 16),
              children: [
                ...missedTasks.map((task) {
                  final high = task["priority"] == "high";

                  return Container(
                    margin: const EdgeInsets.only(bottom: 16),
                    decoration: BoxDecoration(
                      borderRadius: BorderRadius.circular(20),
                      border: Border.all(
                          color:
                              high ? Colors.red : Colors.orange, width: 2),
                      boxShadow: const [
                        BoxShadow(color: Colors.black12, blurRadius: 8),
                      ],
                    ),
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.stretch,
                      children: [
                        Container(
                          padding: const EdgeInsets.all(10),
                          color: high
                              ? Colors.red
                              : Colors.orange,
                          child: Text(
                            "${task["priority"]!.toUpperCase()} PRIORITY",
                            style: const TextStyle(
                                color: Colors.white,
                                fontWeight: FontWeight.bold,
                                fontSize: 12),
                          ),
                        ),

                        Padding(
                          padding: const EdgeInsets.all(16),
                          child: Column(
                            crossAxisAlignment: CrossAxisAlignment.start,
                            children: [
                              Text(
                                task["title"]!,
                                style: TextStyle(
                                    fontWeight: FontWeight.bold,
                                    fontSize:
                                        isTablet ? 22 : 18),
                              ),

                              const SizedBox(height: 12),

                              Row(
                                children: [
                                  const Icon(Icons.schedule,
                                      size: 18,
                                      color: Colors.grey),
                                  const SizedBox(width: 6),
                                  Text(
                                      "Scheduled: ${task["scheduled"]}"),
                                ],
                              ),

                              const SizedBox(height: 6),

                              Row(
                                children: const [
                                  Icon(Icons.error,
                                      size: 18,
                                      color: Colors.red),
                                  SizedBox(width: 6),
                                  Text(
                                    "Missed",
                                    style: TextStyle(
                                        color: Colors.red,
                                        fontWeight:
                                            FontWeight.w600),
                                  ),
                                ],
                              ),

                              const SizedBox(height: 14),

                              ElevatedButton.icon(
                                onPressed: () =>
                                    context.go('/step-task'),
                                icon: const Icon(Icons.chevron_right),
                                label:
                                    const Text("Complete Now"),
                                style: ElevatedButton.styleFrom(
                                  backgroundColor: high
                                      ? Colors.red
                                      : Colors.orange,
                                  padding:
                                      const EdgeInsets.symmetric(
                                          vertical: 14),
                                  shape:
                                      RoundedRectangleBorder(
                                    borderRadius:
                                        BorderRadius.circular(14),
                                  ),
                                ),
                              )
                            ],
                          ),
                        )
                      ],
                    ),
                  );
                }),

                // INFO BOX
                Container(
                  padding: const EdgeInsets.all(14),
                  decoration: BoxDecoration(
                    color: Colors.blue.shade50,
                    borderRadius: BorderRadius.circular(14),
                    border: Border.all(color: Colors.blue.shade200),
                  ),
                  child: const Text(
                    "💡 Tip: Set reminders to help you stay on track with your daily tasks. "
                    "You can adjust notification settings in the Accessibility menu.",
                    style: TextStyle(fontSize: 13),
                  ),
                )
              ],
            ),
          ),

          // ========================
          // ACTION BUTTONS
          // ========================

          Padding(
            padding: EdgeInsets.all(isTablet ? 24 : 16),
            child: Column(
              children: [
                ElevatedButton(
                  onPressed: () => context.go('/'),
                  style: ElevatedButton.styleFrom(
                    backgroundColor: Colors.blue,
                    minimumSize:
                        const Size.fromHeight(52),
                    shape: RoundedRectangleBorder(
                      borderRadius:
                          BorderRadius.circular(14),
                    ),
                  ),
                  child: const Text("View All Tasks"),
                ),

                const SizedBox(height: 10),

                OutlinedButton.icon(
                  onPressed: () => context.go('/asl-help'),
                  icon: const Icon(Icons.accessibility),
                  label: const Text("ASL Help Videos"),
                  style: OutlinedButton.styleFrom(
                    minimumSize:
                        const Size.fromHeight(52),
                  ),
                ),

                const SizedBox(height: 10),

                OutlinedButton.icon(
                  onPressed: () => context.go('/'),
                  icon: const Icon(Icons.close),
                  label: const Text("Dismiss Alerts"),
                  style: OutlinedButton.styleFrom(
                    minimumSize:
                        const Size.fromHeight(52),
                  ),
                ),
              ],
            ),
          )
        ],
      ),
    );
  }
}
