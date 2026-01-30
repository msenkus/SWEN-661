import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';

class TaskHistoryScreen extends StatelessWidget {
  const TaskHistoryScreen({super.key});

  @override
  Widget build(BuildContext context) {
    final isTablet = MediaQuery.of(context).size.width > 700;

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
      appBar: AppBar(title: const Text("Task History")),
      body: ListView(
        padding: EdgeInsets.all(isTablet ? 24 : 16),
        children: [
          // ====================
          // WEEKLY CARD
          // ====================

          Container(
            padding: const EdgeInsets.all(20),
            decoration: BoxDecoration(
              gradient: const LinearGradient(
                colors: [Colors.green, Colors.teal],
              ),
              borderRadius: BorderRadius.circular(20),
            ),
            child: Column(
              children: [
                Row(
                  children: [
                    const Icon(Icons.trending_up,
                        color: Colors.white, size: 30),
                    const SizedBox(width: 10),
                    Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        const Text("This Week",
                            style:
                                TextStyle(color: Colors.white70)),
                        Text(
                          "${weeklyStats["rate"]}% Complete",
                          style: TextStyle(
                            color: Colors.white,
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
                    _statBox(
                        weeklyStats["total"]!, "Total"),
                    _statBox(
                        weeklyStats["completed"]!,
                        "Completed"),
                    _statBox(
                        weeklyStats["missed"]!,
                        "Missed"),
                  ],
                )
              ],
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
                    const Icon(Icons.calendar_today,
                        size: 18,
                        color: Colors.blue),
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
                            style: const TextStyle(
                                fontSize: 11,
                                color: Colors.grey)),
                      ],
                    ),
                    const Spacer(),
                    Column(
                      children: [
                        Text("$percent%",
                            style: TextStyle(
                                fontWeight:
                                    FontWeight.bold,
                                color: percent >= 80
                                    ? Colors.green
                                    : Colors.orange)),
                        Text("$done/${tasks.length}",
                            style: const TextStyle(
                                fontSize: 11)),
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
                      color: done
                          ? Colors.white
                          : Colors.red.shade50,
                      borderRadius:
                          BorderRadius.circular(14),
                      border: Border.all(
                          color: done
                              ? Colors.grey.shade300
                              : Colors.red.shade200),
                    ),
                    child: Row(
                      children: [
                        Icon(
                          done
                              ? Icons.check_circle
                              : Icons.cancel,
                          color: done
                              ? Colors.green
                              : Colors.red,
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
                                      color: done
                                          ? Colors.black
                                          : Colors.red)),
                              const SizedBox(height: 4),
                              Row(
                                children: [
                                  const Icon(Icons.schedule,
                                      size: 14,
                                      color: Colors.grey),
                                  const SizedBox(width: 4),
                                  Text(task["time"]!,
                                      style: const TextStyle(
                                          fontSize: 12)),
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
                            color: done
                                ? Colors.green.shade100
                                : Colors.red.shade100,
                            borderRadius:
                                BorderRadius.circular(12),
                          ),
                          child: Text(
                            done ? "Done" : "Missed",
                            style: TextStyle(
                                fontSize: 11,
                                fontWeight:
                                    FontWeight.bold,
                                color: done
                                    ? Colors.green
                                    : Colors.red),
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

          OutlinedButton(
            onPressed: () {},
            child: const Text("Load More History"),
          ),

          const SizedBox(height: 20),

          // ====================
          // MOTIVATION
          // ====================

          Container(
            padding: const EdgeInsets.all(14),
            decoration: BoxDecoration(
              gradient: LinearGradient(
                colors: [
                  Colors.blue.shade50,
                  Colors.purple.shade50
                ],
              ),
              borderRadius: BorderRadius.circular(16),
              border:
                  Border.all(color: Colors.blue.shade200),
            ),
            child: Column(
              children: [
                const Text(
                  "🎉 Great job this week!",
                  style:
                      TextStyle(fontWeight: FontWeight.bold),
                ),
                const SizedBox(height: 4),
                Text(
                  "You've maintained an ${weeklyStats["rate"]}% completion rate. Keep it up!",
                  textAlign: TextAlign.center,
                )
              ],
            ),
          )
        ],
      ),
    );
  }

  Widget _statBox(int value, String label) {
    return Expanded(
      child: Container(
        margin: const EdgeInsets.symmetric(horizontal: 4),
        padding: const EdgeInsets.all(12),
        decoration: BoxDecoration(
          color: Colors.white24,
          borderRadius: BorderRadius.circular(14),
        ),
        child: Column(
          children: [
            Text(
              "$value",
              style: const TextStyle(
                  color: Colors.white,
                  fontWeight: FontWeight.bold),
            ),
            const SizedBox(height: 4),
            Text(label,
                style: const TextStyle(
                    color: Colors.white70, fontSize: 11))
          ],
        ),
      ),
    );
  }
}
