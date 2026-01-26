import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';

class Medication {
  final int id;
  final String name;
  final String dosage;
  final String time;
  final String notes;
  final Color headerColor;
  bool taken;

  Medication({
    required this.id,
    required this.name,
    required this.dosage,
    required this.time,
    required this.notes,
    required this.headerColor,
    this.taken = false,
  });
}

class MedicationsScreen extends StatefulWidget {
  const MedicationsScreen({super.key});

  @override
  State<MedicationsScreen> createState() => _MedicationsScreenState();
}

class _MedicationsScreenState extends State<MedicationsScreen> {
  final List<Medication> medications = [
    Medication(
      id: 1,
      name: 'Lisinopril 10mg',
      dosage: '1 tablet',
      time: '8:00 AM',
      notes: 'Take with food',
      headerColor: Colors.blue,
      taken: true,
    ),
    Medication(
      id: 2,
      name: 'Metformin 500mg',
      dosage: '2 tablets',
      time: '8:00 AM',
      notes: 'Take with breakfast',
      headerColor: Colors.green,
      taken: true,
    ),
    Medication(
      id: 3,
      name: 'Atorvastatin 20mg',
      dosage: '1 tablet',
      time: '6:00 PM',
      notes: 'Take with dinner',
      headerColor: Colors.purple,
    ),
    Medication(
      id: 4,
      name: 'Aspirin 81mg',
      dosage: '1 tablet',
      time: '8:00 AM',
      notes: 'Blood thinner',
      headerColor: Colors.red,
      taken: true,
    ),
    Medication(
      id: 5,
      name: 'Vitamin D3 2000 IU',
      dosage: '1 capsule',
      time: '8:00 AM',
      notes: 'Daily supplement',
      headerColor: Colors.orange,
      taken: true,
    ),
  ];

  @override
  Widget build(BuildContext context) {
    final isTablet = MediaQuery.of(context).size.width > 700;
    final orientation = MediaQuery.of(context).orientation;

    final takenCount = medications.where((m) => m.taken).length;

    return Scaffold(
      appBar: AppBar(title: const Text('Medications')),
      body: ListView(
        padding: EdgeInsets.all(isTablet ? 24 : 16),
        children: [
          _SummaryCard(takenCount, medications.length),

          const SizedBox(height: 20),

          GridView.builder(
            shrinkWrap: true,
            physics: const NeverScrollableScrollPhysics(),
            gridDelegate: SliverGridDelegateWithFixedCrossAxisCount(
              crossAxisCount:
                  isTablet && orientation == Orientation.landscape ? 2 : 1,
              childAspectRatio: 2.7,
              crossAxisSpacing: 16,
              mainAxisSpacing: 16,
            ),
            itemCount: medications.length,
            itemBuilder: (_, i) => _MedicationCard(
              medication: medications[i],
              onMarkTaken: () {
                setState(() => medications[i].taken = true);
              },
            ),
          ),

          const SizedBox(height: 24),

          OutlinedButton(
            onPressed: () => context.go('/asl-help'),
            style: OutlinedButton.styleFrom(
              padding: const EdgeInsets.symmetric(vertical: 16),
              side: BorderSide(color: Colors.blue.shade200, width: 2),
              shape: RoundedRectangleBorder(
                borderRadius: BorderRadius.circular(16),
              ),
              backgroundColor: Colors.blue.shade50,
            ),
            child: const Text(
              'Need Help? Watch ASL Guide',
              style: TextStyle(fontSize: 16, fontWeight: FontWeight.w600),
            ),
          ),
        ],
      ),
    );
  }
}

class _SummaryCard extends StatelessWidget {
  final int taken;
  final int total;

  const _SummaryCard(this.taken, this.total);

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.all(20),
      decoration: BoxDecoration(
        gradient: const LinearGradient(
          colors: [Colors.purple, Colors.deepPurple],
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
                'Medications Today',
                style: TextStyle(color: Colors.white70),
              ),
              const SizedBox(height: 6),
              Text(
                '$taken of $total Taken',
                style: const TextStyle(
                  color: Colors.white,
                  fontSize: 22,
                  fontWeight: FontWeight.bold,
                ),
              ),
            ],
          ),
          const Icon(Icons.medication, size: 48, color: Colors.white70),
        ],
      ),
    );
  }
}

class _MedicationCard extends StatelessWidget {
  final Medication medication;
  final VoidCallback onMarkTaken;

  const _MedicationCard({
    required this.medication,
    required this.onMarkTaken,
  });

  @override
  Widget build(BuildContext context) {
    return Card(
      elevation: 2,
      shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.circular(20),
        side: BorderSide(
          color: medication.taken
              ? Colors.green.shade200
              : Colors.grey.shade300,
          width: 2,
        ),
      ),
      clipBehavior: Clip.antiAlias,
      child: Column(
        children: [
          Container(
            padding: const EdgeInsets.all(14),
            color: medication.headerColor,
            child: Row(
              children: [
                Expanded(
                  child: Text(
                    medication.name,
                    style: const TextStyle(
                      color: Colors.white,
                      fontWeight: FontWeight.bold,
                    ),
                  ),
                ),
                if (medication.taken)
                  const Icon(Icons.check_circle, color: Colors.white),
              ],
            ),
          ),

          Padding(
            padding: const EdgeInsets.all(14),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Row(
                  children: [
                    const Icon(Icons.schedule, size: 18),
                    const SizedBox(width: 6),
                    Text(medication.time),
                  ],
                ),
                const SizedBox(height: 8),

                Row(
                  children: [
                    const Icon(Icons.info_outline, size: 18),
                    const SizedBox(width: 6),
                    Expanded(child: Text(medication.notes)),
                  ],
                ),

                const SizedBox(height: 12),

                medication.taken
                    ? Container(
                        padding: const EdgeInsets.symmetric(vertical: 10),
                        decoration: BoxDecoration(
                          color: Colors.green.shade50,
                          borderRadius: BorderRadius.circular(12),
                          border:
                              Border.all(color: Colors.green.shade200, width: 2),
                        ),
                        child: const Center(
                          child: Text(
                            'Marked as Taken',
                            style: TextStyle(
                              color: Colors.green,
                              fontWeight: FontWeight.w600,
                            ),
                          ),
                        ),
                      )
                    : ElevatedButton(
                        onPressed: onMarkTaken,
                        style: ElevatedButton.styleFrom(
                          padding: const EdgeInsets.symmetric(vertical: 12),
                          shape: RoundedRectangleBorder(
                            borderRadius: BorderRadius.circular(14),
                          ),
                        ),
                        child: const Text('Mark as Taken'),
                      ),
              ],
            ),
          ),
        ],
      ),
    );
  }
}
