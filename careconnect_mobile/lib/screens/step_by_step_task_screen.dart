import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';

class StepByStepTaskScreen extends StatefulWidget {
  const StepByStepTaskScreen({super.key});

  @override
  State<StepByStepTaskScreen> createState() => _StepByStepTaskScreenState();
}

class _StepByStepTaskScreenState extends State<StepByStepTaskScreen> {
  int currentStep = 0;
  final List<int> completedSteps = [];

  final steps = const [
    {
      'title': 'Preparation',
      'instruction':
          'Find a quiet space with room to move. Make sure you have your exercise mat ready.',
      'emoji': '🧘‍♀️',
    },
    {
      'title': 'Neck Rotation',
      'instruction':
          'Gently turn your head to the right, hold for 5 seconds, then turn to the left.',
      'emoji': '🔄',
    },
    {
      'title': 'Shoulder Rolls',
      'instruction':
          'Roll your shoulders backward 10 times, then forward 10 times. Move slowly and breathe.',
      'emoji': '💪',
    },
    {
      'title': 'Arm Raises',
      'instruction':
          'Raise both arms straight up above your head. Hold for 3 seconds, then lower slowly.',
      'emoji': '🙌',
    },
    {
      'title': 'Leg Lifts',
      'instruction':
          'While seated, lift your right leg straight out. Hold for 5 seconds, then switch legs.',
      'emoji': '🦵',
    },
    {
      'title': 'Cool Down',
      'instruction':
          'Take 5 deep breaths, breathing in through your nose and out through your mouth.',
      'emoji': '😌',
    },
  ];

  void nextStep() {
    if (!completedSteps.contains(currentStep)) {
      completedSteps.add(currentStep);
    }

    if (currentStep < steps.length - 1) {
      setState(() => currentStep++);
    } else {
      context.go('/'); // back to dashboard
    }
  }

  void previousStep() {
    if (currentStep > 0) {
      setState(() => currentStep--);
    }
  }

  @override
  Widget build(BuildContext context) {
    final progress = (currentStep + 1) / steps.length;
    final step = steps[currentStep];
    final isLast = currentStep == steps.length - 1;

    return Scaffold(
      appBar: AppBar(title: const Text('Physical Therapy')),
      body: Column(
        children: [
          _progressBar(progress),

          Expanded(
            child: SingleChildScrollView(
              child: Padding(
                padding: const EdgeInsets.all(20),
                child: Column(
                  children: [
                    _visual(step['emoji']!),
                    _instruction(step['title']!, step['instruction']!),
                    const SizedBox(height: 20),
                    _dotIndicators(),
                  ],
                ),
              ),
            ),
          ),

          _navigationButtons(isLast),
        ],
      ),
    );
  }

  // -------------------------------------------------

  Widget _progressBar(double progress) {
    return Container(
      padding: const EdgeInsets.all(16),
      color: Colors.blue.shade50,
      child: Column(
        children: [
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Text(
                'Step ${currentStep + 1} of ${steps.length}',
                style: const TextStyle(fontWeight: FontWeight.w600),
              ),
              Text(
                '${(progress * 100).round()}% Complete',
                style: const TextStyle(
                  color: Colors.blue,
                  fontWeight: FontWeight.w600,
                ),
              ),
            ],
          ),
          const SizedBox(height: 10),
          ClipRRect(
            borderRadius: BorderRadius.circular(20),
            child: LinearProgressIndicator(
              value: progress,
              minHeight: 10,
            ),
          ),
        ],
      ),
    );
  }

  // -------------------------------------------------

  Widget _visual(String emoji) {
    return Container(
      margin: const EdgeInsets.only(bottom: 24),
      padding: const EdgeInsets.all(40),
      decoration: BoxDecoration(
        gradient: LinearGradient(
          colors: [
            Colors.blue.shade100,
            Colors.blue.shade200,
          ],
        ),
        borderRadius: BorderRadius.circular(30),
      ),
      child: Text(
        emoji,
        style: const TextStyle(fontSize: 90),
      ),
    );
  }

  // -------------------------------------------------

  Widget _instruction(String title, String instruction) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          title,
          style: const TextStyle(
            fontSize: 26,
            fontWeight: FontWeight.bold,
          ),
        ),
        const SizedBox(height: 12),

        Container(
          padding: const EdgeInsets.all(20),
          decoration: BoxDecoration(
            color: Colors.blue.shade50,
            borderRadius: BorderRadius.circular(20),
            border: Border.all(color: Colors.blue.shade200),
          ),
          child: Text(
            instruction,
            style: const TextStyle(
              fontSize: 20,
              height: 1.4,
              color: Colors.black87,
            ),
          ),
        ),
      ],
    );
  }

  // -------------------------------------------------

  Widget _dotIndicators() {
    return Row(
      mainAxisAlignment: MainAxisAlignment.center,
      children: List.generate(steps.length, (index) {
        Color color;
        double width = 12;

        if (completedSteps.contains(index)) {
          color = Colors.green;
        } else if (index == currentStep) {
          color = Colors.blue;
          width = 30;
        } else {
          color = Colors.grey.shade300;
        }

        return AnimatedContainer(
          duration: const Duration(milliseconds: 250),
          margin: const EdgeInsets.symmetric(horizontal: 4),
          width: width,
          height: 12,
          decoration: BoxDecoration(
            color: color,
            borderRadius: BorderRadius.circular(20),
          ),
        );
      }),
    );
  }

  // -------------------------------------------------

  Widget _navigationButtons(bool isLast) {
    return Container(
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        border: Border(top: BorderSide(color: Colors.grey.shade300)),
        color: Colors.white,
      ),
      child: Row(
        children: [
          if (currentStep > 0)
            ElevatedButton.icon(
              onPressed: previousStep,
              icon: const Icon(Icons.arrow_back),
              label: const Text('Previous'),
              style: ElevatedButton.styleFrom(
                backgroundColor: Colors.grey.shade200,
                foregroundColor: Colors.black,
                padding: const EdgeInsets.symmetric(
                  horizontal: 20,
                  vertical: 16,
                ),
              ),
            ),

          const SizedBox(width: 12),

          Expanded(
            child: ElevatedButton.icon(
              onPressed: nextStep,
              icon: Icon(isLast ? Icons.check : Icons.chevron_right),
              label: Text(isLast ? 'Complete Task' : 'Next Step'),
              style: ElevatedButton.styleFrom(
                backgroundColor:
                    isLast ? Colors.green : Colors.blue,
                padding: const EdgeInsets.symmetric(
                  vertical: 18,
                ),
              ),
            ),
          ),
        ],
      ),
    );
  }
}
