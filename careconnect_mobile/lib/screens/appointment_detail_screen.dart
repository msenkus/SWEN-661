import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';

class AppointmentDetailScreen extends StatelessWidget {
  const AppointmentDetailScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Appointment Details')),
      body: ListView(
        padding: const EdgeInsets.all(16),
        children: [
          _headerCard(),

          _locationCard(),

          _contactCard(),

          _notesCard(),

          _prepCard(),

          _actions(context),
        ],
      ),
    );
  }

  // ---------------------------------------------------

  Widget _headerCard() {
    return Container(
      margin: const EdgeInsets.only(bottom: 24),
      padding: const EdgeInsets.all(20),
      decoration: BoxDecoration(
        gradient: const LinearGradient(
          colors: [Colors.blue, Colors.indigo],
        ),
        borderRadius: BorderRadius.circular(20),
      ),
      child: Column(
        children: [
          Row(
            children: [
              const Expanded(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text("Dr. Sarah Johnson",
                        style: TextStyle(
                            color: Colors.white,
                            fontSize: 22,
                            fontWeight: FontWeight.bold)),
                    SizedBox(height: 4),
                    Text("Primary Care Physician",
                        style: TextStyle(color: Colors.white70)),
                    Text("Internal Medicine",
                        style: TextStyle(color: Colors.white54)),
                  ],
                ),
              ),
              CircleAvatar(
                backgroundColor: Colors.white24,
                child: const Icon(Icons.calendar_today, color: Colors.white),
              )
            ],
          ),
          const SizedBox(height: 16),
          Container(
            padding: const EdgeInsets.all(12),
            decoration: BoxDecoration(
              color: Colors.white12,
              borderRadius: BorderRadius.circular(16),
            ),
            child: const Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                _InfoBlock("Date & Time", "Today at 2:00 PM"),
                _InfoBlock("Duration", "30 min"),
              ],
            ),
          ),
        ],
      ),
    );
  }

  Widget _locationCard() {
    return _card(
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          _iconHeader(Icons.location_on, "Location"),
          const SizedBox(height: 6),
          const Text("Main Street Medical Center"),
          const Text("123 Main Street, Suite 400",
              style: TextStyle(color: Colors.grey)),
          const Text("Springfield, IL 62701",
              style: TextStyle(color: Colors.grey)),
          const SizedBox(height: 12),
          OutlinedButton.icon(
            onPressed: () {},
            icon: const Icon(Icons.navigation),
            label: const Text("Get Directions"),
          )
        ],
      ),
    );
  }

  Widget _contactCard() {
    return _card(
      title: "Contact Information",
      child: Column(
        children: const [
          _ContactRow(Icons.phone, Colors.green, "Office Phone",
              "(555) 123-4567"),
          SizedBox(height: 12),
          _ContactRow(Icons.email, Colors.purple, "Email",
              "office@mainstreetmed.com"),
        ],
      ),
    );
  }

  Widget _notesCard() {
    return _card(
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          _iconHeader(Icons.description, "Appointment Notes"),
          SizedBox(height: 8),
          Text("• Annual physical examination"),
          Text("• Medication review"),
          Text("• Discuss lab results"),
        ],
      ),
    );
  }

  Widget _prepCard() {
    return Container(
      margin: const EdgeInsets.only(bottom: 20),
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: Colors.blue.shade50,
        borderRadius: BorderRadius.circular(16),
        border: Border.all(color: Colors.blue.shade200),
      ),
      child: const Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text("Before Your Visit",
              style: TextStyle(fontWeight: FontWeight.bold)),
          SizedBox(height: 6),
          Text("✓ Bring insurance card"),
          Text("✓ Current medication list"),
          Text("✓ Arrive 15 minutes early"),
          Text("✓ Photo ID"),
        ],
      ),
    );
  }

  Widget _actions(BuildContext context) {
    return Column(
      children: [
        ElevatedButton(
          onPressed: () {},
          style: ElevatedButton.styleFrom(
            padding: const EdgeInsets.symmetric(vertical: 18),
            shape: RoundedRectangleBorder(
                borderRadius: BorderRadius.circular(16)),
          ),
          child: const Text("Add to Calendar"),
        ),

        const SizedBox(height: 12),

        Row(
          children: [
            Expanded(
              child: ElevatedButton.icon(
                onPressed: () {},
                icon: const Icon(Icons.phone),
                label: const Text("Call Office"),
                style: ElevatedButton.styleFrom(
                    backgroundColor: Colors.green),
              ),
            ),
            const SizedBox(width: 12),
            Expanded(
              child: OutlinedButton(
                onPressed: () {},
                child: const Text("Reschedule"),
              ),
            ),
          ],
        ),

        const SizedBox(height: 12),

        OutlinedButton(
          onPressed: () {},
          style: OutlinedButton.styleFrom(
            foregroundColor: Colors.red,
            side: const BorderSide(color: Colors.red),
          ),
          child: const Text("Cancel Appointment"),
        ),
      ],
    );
  }

  // ---------------------------------------------------

  Widget _card({String? title, required Widget child}) {
    return Container(
      margin: const EdgeInsets.only(bottom: 16),
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(18),
        border: Border.all(color: Colors.grey.shade300),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          if (title != null)
            Padding(
              padding: const EdgeInsets.only(bottom: 8),
              child: Text(title,
                  style: const TextStyle(
                      fontWeight: FontWeight.bold, fontSize: 16)),
            ),
          child,
        ],
      ),
    );
  }
}

// ---------------------------------------------------

class _InfoBlock extends StatelessWidget {
  final String title;
  final String value;

  const _InfoBlock(this.title, this.value);

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(title,
            style: const TextStyle(color: Colors.white70, fontSize: 12)),
        const SizedBox(height: 2),
        Text(value,
            style: const TextStyle(
                color: Colors.white, fontWeight: FontWeight.bold)),
      ],
    );
  }
}

class _ContactRow extends StatelessWidget {
  final IconData icon;
  final Color color;
  final String label;
  final String value;

  const _ContactRow(this.icon, this.color, this.label, this.value);

  @override
  Widget build(BuildContext context) {
    return Row(
      children: [
        CircleAvatar(
          backgroundColor: color.withAlpha(40),
          child: Icon(icon, color: color),
        ),
        const SizedBox(width: 12),
        Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(label,
                style:
                    const TextStyle(fontSize: 12, color: Colors.grey)),
            Text(value,
                style:
                    const TextStyle(fontWeight: FontWeight.w600)),
          ],
        )
      ],
    );
  }
}

Widget _iconHeader(IconData icon, String title) {
  return Row(
    children: [
      CircleAvatar(
        backgroundColor: Colors.orange.withOpacity(.15),
        child: Icon(icon, color: Colors.orange),
      ),
      const SizedBox(width: 8),
      Text(title,
          style:
              const TextStyle(fontWeight: FontWeight.bold)),
    ],
  );
}
