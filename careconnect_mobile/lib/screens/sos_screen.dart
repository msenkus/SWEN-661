import 'dart:async';
import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import '../widgets/bottom_navigation_bar.dart';

class SosScreen extends StatefulWidget {
  const SosScreen({super.key});

  @override
  State<SosScreen> createState() => _SosScreenState();
}

class _SosScreenState extends State<SosScreen> {
  double slidePosition = 0;
  bool isDragging = false;
  bool isActivated = false;
  int? countdown;

  final double knobSize = 64;

  final contacts = const [
    {
      'name': 'Emergency Services',
      'number': '911',
      'type': 'emergency',
    },
    {
      'name': 'Mary Johnson (Daughter)',
      'number': '(555) 234-5678',
      'type': 'family',
    },
    {
      'name': 'John Smith (Son)',
      'number': '(555) 345-6789',
      'type': 'family',
    },
    {
      'name': 'Dr. Sarah Johnson',
      'number': '(555) 123-4567',
      'type': 'doctor',
    },
  ];

  Timer? _timer;

  void startCountdown() {
    setState(() => countdown = 3);

    _timer = Timer.periodic(const Duration(seconds: 1), (timer) {
      if (countdown == 1) {
        timer.cancel();
        setState(() {
          countdown = 0;
          isActivated = true;
        });
      } else {
        setState(() => countdown = countdown! - 1);
      }
    });
  }

  void cancelSOS() {
    _timer?.cancel();
    setState(() {
      slidePosition = 0;
      countdown = null;
      isActivated = false;
    });
  }

  Color chipColor(String type) {
    switch (type) {
      case 'emergency':
        return Colors.red.shade200;
      case 'family':
        return Colors.blue.shade100;
      default:
        return Colors.green.shade100;
    }
  }

  // -----------------------------

  @override
  Widget build(BuildContext context) {
    final width = MediaQuery.of(context).size.width;

    if (isActivated && countdown == 0) {
      return _activatedScreen();
    }

    final currentRoute = GoRouter.of(context).routerDelegate.currentConfiguration.uri.path;

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
        title: const Text('Emergency SOS'),
      ),
      body: SafeArea(
        child: SingleChildScrollView(
          padding: const EdgeInsets.all(16),
          child: Column(
            children: [
              _warningCard(),
              const SizedBox(height: 24),
              countdown != null
                  ? _countdownView()
                  : _slideControl(width),
              const SizedBox(height: 24),
              _contactsList(),
              const SizedBox(height: 20),
              _infoBox(),
            ],
          ),
        ),
      ),
    );
  }

  // -----------------------------

  Widget _warningCard() {
    return Semantics(
      label: 'Warning: Emergency Assistance. Use only in real emergencies.',
      child: Container(
        padding: const EdgeInsets.all(20),
        decoration: BoxDecoration(
          color: Colors.red,
          borderRadius: BorderRadius.circular(20),
        ),
        child: Row(
          children: [
            Semantics(
              label: 'Warning icon',
              image: true,
              excludeSemantics: true,
              child: const Icon(Icons.warning_amber, color: Colors.white, size: 40),
            ),
            const SizedBox(width: 12),
            const Expanded(
              child: Text(
                'Emergency Assistance\nUse only in real emergencies.',
                style: TextStyle(
                  color: Colors.white,
                  fontWeight: FontWeight.bold,
                  height: 1.4,
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }

  // -----------------------------

  Widget _slideControl(double width) {
    final maxSlide = width - knobSize - 32;
    final progressPercent = (slidePosition / maxSlide * 100).round().clamp(0, 100);

    return Semantics(
      label: 'Slide to Call Emergency Services. Slide all the way right to activate.',
      value: '$progressPercent percent',
      child: Column(
        children: [
          const Text(
            'Slide to Call Emergency Services',
            style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
          ),
          const SizedBox(height: 16),

          Container(
            height: 80,
            decoration: BoxDecoration(
              color: Colors.red,
              borderRadius: BorderRadius.circular(40),
            ),
            child: Stack(
              children: [
                Positioned.fill(
                  child: Align(
                    alignment: Alignment.centerRight,
                    child: Padding(
                      padding: const EdgeInsets.only(right: 24),
                      child: Row(
                        mainAxisSize: MainAxisSize.min,
                        children: const [
                          Icon(Icons.chevron_right,
                              color: Colors.white54),
                          Icon(Icons.chevron_right,
                              color: Colors.white54),
                          Icon(Icons.chevron_right,
                              color: Colors.white54),
                        ],
                      ),
                    ),
                  ),
                ),

                Positioned(
                  key: const Key('sos_slider_knob'),
                  left: slidePosition,
                  top: 8,
                  child: Semantics(
                    label: 'Emergency SOS slider, $progressPercent percent',
                    child: GestureDetector(
                      onHorizontalDragUpdate: (details) {
                        setState(() {
                          slidePosition += details.delta.dx;
                          slidePosition =
                              slidePosition.clamp(0, maxSlide);

                          if (slidePosition > maxSlide * .9) {
                            startCountdown();
                          }
                        });
                      },
                      onHorizontalDragEnd: (_) {
                        if (slidePosition < maxSlide * .8) {
                          setState(() => slidePosition = 0);
                        }
                      },
                      child: Container(
                        width: knobSize,
                        height: knobSize,
                        decoration: const BoxDecoration(
                          color: Colors.white,
                          shape: BoxShape.circle,
                        ),
                        child: const Icon(Icons.phone,
                            color: Colors.red, size: 32),
                      ),
                    ),
                  ),
                ),
              ],
            ),
          ),

          const SizedBox(height: 8),
          const Text(
            'Slide all the way right to activate',
            style: TextStyle(color: Colors.grey),
          ),
        ],
      ),
    );
  }

  // -----------------------------

  Widget _countdownView() {
    return Semantics(
      label: 'Calling emergency services in $countdown seconds',
      liveRegion: true,
      child: Column(
        children: [
          Container(
            width: 130,
            height: 130,
            decoration: const BoxDecoration(
              color: Color(0xFFFFCDD2),
              shape: BoxShape.circle,
            ),
            child: Center(
              child: Text(
                '$countdown',
                style: const TextStyle(
                  fontSize: 60,
                  fontWeight: FontWeight.bold,
                  color: Colors.red,
                ),
              ),
            ),
          ),
          const SizedBox(height: 16),
          const Text(
            'Calling in...',
            style: TextStyle(fontSize: 20),
          ),
          const SizedBox(height: 12),

          Semantics(
            label: 'Cancel emergency call, button',
            button: true,
            child: ElevatedButton(
              style: ElevatedButton.styleFrom(
                backgroundColor: Colors.grey.shade300,
                foregroundColor: Colors.black,
                padding:
                    const EdgeInsets.symmetric(horizontal: 40, vertical: 16),
                minimumSize: const Size.fromHeight(48), // WCAG 2.1: Minimum touch target
              ),
              onPressed: cancelSOS,
              child: const Text('Cancel'),
            ),
          ),
        ],
      ),
    );
  }

  // -----------------------------

  Widget _activatedScreen() {
    final currentRoute = GoRouter.of(context).routerDelegate.currentConfiguration.uri.path;

    return Scaffold(
      backgroundColor: Colors.red,
      body: SafeArea(
        child: Center(
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              const Icon(Icons.phone,
                  size: 120, color: Colors.white),

              const SizedBox(height: 20),

              const Text(
                'Calling Emergency Contact',
                style: TextStyle(
                  color: Colors.white,
                  fontSize: 28,
                  fontWeight: FontWeight.bold,
                ),
              ),

              const SizedBox(height: 10),

              const Text(
                'Emergency Services (911)',
                style: TextStyle(color: Colors.white70),
              ),

              const SizedBox(height: 40),

              ElevatedButton(
                style: ElevatedButton.styleFrom(
                  backgroundColor: Colors.white,
                  foregroundColor: Colors.red,
                  padding: const EdgeInsets.symmetric(
                      horizontal: 40, vertical: 18),
                ),
                onPressed: cancelSOS,
                child: const Text('End Call'),
              ),
            ],
          ),
        ),
      ),
      bottomNavigationBar: CareConnectBottomNavBar(currentRoute: currentRoute),
    );
  }

  // -----------------------------

  Widget _contactsList() {
    return Semantics(
      label: 'Emergency Contacts',
      header: true,
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          const Text(
            'Emergency Contacts',
            style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
          ),

          const SizedBox(height: 12),

          ...contacts.map((c) {
            final contactLabel = '${c['name']!}, ${c['number']!}, ${c['type']!} contact';
            return Semantics(
              label: contactLabel,
              button: true,
              hint: 'Tap to call ${c['name']!}',
              child: Container(
                margin: const EdgeInsets.only(bottom: 12),
                padding: const EdgeInsets.all(16),
                decoration: BoxDecoration(
                  border: Border.all(color: Colors.grey.shade300),
                  borderRadius: BorderRadius.circular(16),
                ),
                child: Row(
                  children: [
                    Expanded(
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Text(c['name']!,
                              style: const TextStyle(
                                  fontWeight: FontWeight.bold)),
                          const SizedBox(height: 4),
                          Text(c['number']!),
                          const SizedBox(height: 8),
                          Chip(
                            label: Text(c['type']!),
                            backgroundColor: chipColor(c['type']!),
                            padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
                          ),
                        ],
                      ),
                    ),

                    Semantics(
                      label: 'Call ${c['name']!}, button',
                      button: true,
                      excludeSemantics: true,
                      child: CircleAvatar(
                        backgroundColor: Colors.green,
                        radius: 24, // WCAG 2.1: Minimum touch target (48x48)
                        child: const Icon(Icons.phone,
                            color: Colors.white),
                      ),
                    ),
                  ],
                ),
              ),
            );
          }),
        ],
      ),
    );
  }

  // -----------------------------

  Widget _infoBox() {
    return Container(
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: Colors.blue.shade50,
        borderRadius: BorderRadius.circular(14),
        border: Border.all(color: Colors.blue.shade200),
      ),
      child: const Text(
        'Important: Always call 911 first in emergencies. '
        'This feature alerts your emergency contacts after connecting.',
      ),
    );
  }
}
