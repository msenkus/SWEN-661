import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';

class AppointmentListScreen extends StatelessWidget {
  const AppointmentListScreen({super.key});

  @override
  Widget build(BuildContext context) {
    final appointments = [
      {
        "title": "Dr. Sarah Johnson",
        "specialty": "Primary Care Physician",
        "date": "Today",
        "time": "2:00 PM",
        "duration": "30 min",
        "type": "in-person",
        "location": "Main Street Medical Center",
        "color": Colors.blue,
      },
      {
        "title": "Dr. Michael Chen",
        "specialty": "Cardiologist",
        "date": "Tomorrow",
        "time": "10:00 AM",
        "duration": "45 min",
        "type": "video",
        "location": "Telehealth",
        "color": Colors.green,
      },
      {
        "title": "Physical Therapy",
        "specialty": "Dr. Emma Rodriguez",
        "date": "Jan 24",
        "time": "3:00 PM",
        "duration": "60 min",
        "type": "in-person",
        "location": "Rehabilitation Center",
        "color": Colors.purple,
      },
      {
        "title": "Lab Work",
        "specialty": "Blood Test & X-Ray",
        "date": "Jan 27",
        "time": "8:30 AM",
        "duration": "20 min",
        "type": "in-person",
        "location": "Medical Lab Services",
        "color": Colors.orange,
      },
    ];

    final upcomingCount = appointments.length;

    final isTablet = MediaQuery.of(context).size.width > 700;
    final isLandscape =
        MediaQuery.of(context).orientation == Orientation.landscape;

    return Scaffold(
      appBar: AppBar(title: const Text("Appointments")),
      body: ListView(
        padding: const EdgeInsets.all(16),
        children: [
          _summaryCard(upcomingCount),

          const SizedBox(height: 20),

          _filterTabs(),

          const SizedBox(height: 20),

          GridView.builder(
            shrinkWrap: true,
            physics: const NeverScrollableScrollPhysics(),
            gridDelegate: SliverGridDelegateWithFixedCrossAxisCount(
              crossAxisCount: isTablet && isLandscape ? 2 : 1,
              mainAxisSpacing: 16,
              crossAxisSpacing: 16,
              childAspectRatio: 1.9,
            ),
            itemCount: appointments.length,
            itemBuilder: (context, index) {
              return _appointmentCard(
                context,
                appointments[index],
              );
            },
          ),

          const SizedBox(height: 24),

          OutlinedButton(
            style: OutlinedButton.styleFrom(
              padding: const EdgeInsets.symmetric(vertical: 18),
              shape: RoundedRectangleBorder(
                borderRadius: BorderRadius.circular(16),
              ),
            ),
            onPressed: () {},
            child: const Text("+ Schedule New Appointment"),
          ),
        ],
      ),
    );
  }

  // ============================
  // SUMMARY CARD
  // ============================

  Widget _summaryCard(int count) {
    return Container(
      padding: const EdgeInsets.all(20),
      decoration: BoxDecoration(
        gradient: const LinearGradient(
          colors: [Colors.orange, Colors.deepOrange],
        ),
        borderRadius: BorderRadius.circular(20),
      ),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.spaceBetween,
        children: [
          Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              const Text(
                "Upcoming Appointments",
                style: TextStyle(color: Colors.white70),
              ),
              const SizedBox(height: 6),
              Text(
                "$count",
                style: const TextStyle(
                  fontSize: 36,
                  fontWeight: FontWeight.bold,
                  color: Colors.white,
                ),
              ),
            ],
          ),
          const Icon(Icons.calendar_today,
              color: Colors.white70, size: 48),
        ],
      ),
    );
  }

  // ============================
  // FILTER BUTTONS
  // ============================

  Widget _filterTabs() {
    return SingleChildScrollView(
      scrollDirection: Axis.horizontal,
      child: Row(
        children: [
          _filterChip("Upcoming", selected: true),
          _filterChip("Past"),
          _filterChip("Canceled"),
        ],
      ),
    );
  }

  Widget _filterChip(String label, {bool selected = false}) {
    return Padding(
      padding: const EdgeInsets.only(right: 8),
      child: ChoiceChip(
        label: Text(label),
        selected: selected,
        onSelected: (_) {},
      ),
    );
  }

  // ============================
  // APPOINTMENT CARD
  // ============================

  Widget _appointmentCard(BuildContext context, Map<String, dynamic> data) {
    return InkWell(
      borderRadius: BorderRadius.circular(20),
      onTap: () => context.go('/appointment-detail'),
      child: Container(
        decoration: BoxDecoration(
          borderRadius: BorderRadius.circular(20),
          border: Border.all(color: Colors.grey.shade200),
          color: Colors.white,
          boxShadow: const [
            BoxShadow(
              blurRadius: 8,
              color: Colors.black12,
            ),
          ],
        ),
        child: Column(
          children: [
            // Header
            Container(
              padding: const EdgeInsets.all(14),
              decoration: BoxDecoration(
                color: data["color"],
                borderRadius: const BorderRadius.vertical(
                  top: Radius.circular(20),
                ),
              ),
              child: Row(
                children: [
                  Expanded(
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text(
                          data["title"],
                          style: const TextStyle(
                              fontSize: 18,
                              fontWeight: FontWeight.bold,
                              color: Colors.white),
                        ),
                        Text(
                          data["specialty"],
                          style: const TextStyle(color: Colors.white70),
                        ),
                      ],
                    ),
                  ),
                  Icon(
                    data["type"] == "video"
                        ? Icons.videocam
                        : Icons.location_on,
                    color: Colors.white,
                  ),
                ],
              ),
            ),

            // Body
            Padding(
              padding: const EdgeInsets.all(14),
              child: Column(
                children: [
                  Row(
                    children: [
                      const Icon(Icons.schedule, size: 16),
                      const SizedBox(width: 6),
                      Text("Duration: ${data["duration"]}"),
                    ],
                  ),
                  const SizedBox(height: 8),
                  Row(
                    children: [
                      Icon(
                        data["type"] == "video"
                            ? Icons.videocam
                            : Icons.location_on,
                        size: 16,
                      ),
                      const SizedBox(width: 6),
                      Expanded(child: Text(data["location"])),
                    ],
                  ),
                  const Divider(height: 24),
                  Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: const [
                      Text("View Details",
                          style: TextStyle(
                              color: Colors.blue,
                              fontWeight: FontWeight.w600)),
                      Icon(Icons.chevron_right, color: Colors.blue),
                    ],
                  )
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }
}
