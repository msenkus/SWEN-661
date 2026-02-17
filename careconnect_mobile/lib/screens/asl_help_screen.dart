import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import '../widgets/bottom_navigation_bar.dart';

class ASLHelpScreen extends StatefulWidget {
  const ASLHelpScreen({super.key});

  @override
  State<ASLHelpScreen> createState() => _ASLHelpScreenState();
}

class _ASLHelpScreenState extends State<ASLHelpScreen> {
  bool isPlaying = false;
  bool isMuted = false;
  bool showCaptions = true;

  final aslVideos = const [
    {
      "title": "How to Take Your Medication",
      "duration": "2:45",
      "emoji": "💊",
    },
    {
      "title": "Understanding Your Daily Tasks",
      "duration": "3:20",
      "emoji": "📋",
    },
    {
      "title": "Using the SOS Button",
      "duration": "1:30",
      "emoji": "🆘",
    },
    {
      "title": "Setting Up Reminders",
      "duration": "2:15",
      "emoji": "⏰",
    },
  ];

  @override
  Widget build(BuildContext context) {
    final isTablet = MediaQuery.of(context).size.width > 700;
    final isLandscape =
        MediaQuery.of(context).orientation == Orientation.landscape;

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
        title: const Text("ASL Help Videos"),
      ),
      body: ListView(
        padding: const EdgeInsets.all(16),
        children: [
          _featuredPlayer(isTablet),

          const SizedBox(height: 12),

          const Text(
            "How to Take Your Medication",
            style: TextStyle(fontSize: 22, fontWeight: FontWeight.bold),
          ),
          const SizedBox(height: 4),
          const Text(
            "Learn the step-by-step process with ASL interpretation and captions",
            style: TextStyle(color: Colors.grey),
          ),

          const SizedBox(height: 28),

          const Text(
            "More Help Videos",
            style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
          ),

          const SizedBox(height: 12),

          GridView.builder(
            shrinkWrap: true,
            physics: const NeverScrollableScrollPhysics(),
            gridDelegate: SliverGridDelegateWithFixedCrossAxisCount(
              crossAxisCount: isTablet && isLandscape ? 2 : 1,
              mainAxisSpacing: 12,
              crossAxisSpacing: 12,
              childAspectRatio: 3.5,
            ),
            itemCount: aslVideos.length,
            itemBuilder: (context, index) {
              return _videoTile(aslVideos[index]);
            },
          ),

          const SizedBox(height: 24),

          _accessibilityInfo(),
        ],
      ),
      bottomNavigationBar: CareConnectBottomNavBar(
        currentRoute: GoRouter.of(context).routerDelegate.currentConfiguration.uri.path,
      ),
    );
  }

  // ===============================
  // FEATURED PLAYER
  // ===============================

  Widget _featuredPlayer(bool isTablet) {
    return Container(
      decoration: BoxDecoration(
        color: Colors.grey.shade900,
        borderRadius: BorderRadius.circular(20),
        boxShadow: const [
          BoxShadow(color: Colors.black26, blurRadius: 10),
        ],
      ),
      child: Column(
        children: [
          AspectRatio(
            aspectRatio: 16 / 9,
            child: Stack(
              alignment: Alignment.bottomCenter,
              children: [
                Container(
                  decoration: const BoxDecoration(
                    gradient: LinearGradient(
                      colors: [Colors.indigo, Colors.black87],
                    ),
                  ),
                  child: Center(
                    child: Column(
                      mainAxisSize: MainAxisSize.min,
                      children: [
                        Text(
                          "🤟",
                          style: TextStyle(
                            fontSize: isTablet ? 90 : 64,
                          ),
                        ),
                        const SizedBox(height: 8),
                        const Text(
                          "ASL Interpretation",
                          style: TextStyle(
                              color: Colors.white,
                              fontWeight: FontWeight.w600),
                        ),
                      ],
                    ),
                  ),
                ),

                if (showCaptions)
                  Container(
                    width: double.infinity,
                    padding: const EdgeInsets.all(12),
                    color: Colors.black87,
                    child: Text(
                      "Welcome to CareConnect. This video will show you how to take your medication safely.",
                      textAlign: TextAlign.center,
                      style: TextStyle(
                        color: Colors.white,
                        fontSize: isTablet ? 18 : 14,
                      ),
                    ),
                  ),
              ],
            ),
          ),

          // CONTROLS
          Container(
            color: Colors.grey.shade800,
            padding: const EdgeInsets.all(14),
            child: Column(
              children: [
                Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    Semantics(
                      label: isPlaying ? 'Pause video' : 'Play video',
                      button: true,
                      child: IconButton(
                        iconSize: 36,
                        color: Colors.white,
                        onPressed: () {
                          setState(() => isPlaying = !isPlaying);
                        },
                        icon: Icon(
                            isPlaying ? Icons.pause : Icons.play_arrow),
                      ),
                    ),
                    Row(
                      children: [
                        Semantics(
                          label: isMuted ? 'Unmute audio' : 'Mute audio',
                          button: true,
                          child: IconButton(
                            icon: Icon(isMuted
                                ? Icons.volume_off
                                : Icons.volume_up),
                            color: Colors.white,
                            onPressed: () {
                              setState(() => isMuted = !isMuted);
                            },
                          ),
                        ),
                        Semantics(
                          label: showCaptions ? 'Hide captions' : 'Show captions',
                          button: true,
                          selected: showCaptions,
                          child: IconButton(
                            icon: Icon(Icons.subtitles,
                                color: showCaptions
                                    ? Colors.blue
                                    : Colors.white),
                            onPressed: () {
                              setState(() => showCaptions = !showCaptions);
                            },
                          ),
                        ),
                      ],
                    )
                  ],
                ),

                const SizedBox(height: 6),

                LinearProgressIndicator(
                  value: .33,
                  backgroundColor: Colors.grey.shade700,
                ),

                const SizedBox(height: 4),

                Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: const [
                    Text("0:45",
                        style: TextStyle(color: Colors.white70)),
                    Text("2:45",
                        style: TextStyle(color: Colors.white70)),
                  ],
                )
              ],
            ),
          )
        ],
      ),
    );
  }

  // ===============================
  // VIDEO TILE
  // ===============================

  Widget _videoTile(Map<String, String> video) {
    final videoLabel = '${video["title"]!}, ${video["duration"]!}, ASL and captions available';
    return Semantics(
      label: videoLabel,
      button: true,
      hint: 'Tap to play video',
      child: Container(
        padding: const EdgeInsets.all(12),
        decoration: BoxDecoration(
          borderRadius: BorderRadius.circular(16),
          border: Border.all(color: Colors.grey.shade300),
        ),
        child: Row(
          children: [
            Semantics(
              label: 'Video thumbnail',
              image: true,
              excludeSemantics: true,
              child: Container(
                width: 64,
                height: 64,
                decoration: BoxDecoration(
                  borderRadius: BorderRadius.circular(12),
                  gradient: LinearGradient(
                    colors: [Colors.blue.shade100, Colors.blue.shade200],
                  ),
                ),
                child: Center(
                  child: Text(video["emoji"]!,
                      style: const TextStyle(fontSize: 28)),
                ),
              ),
            ),

            const SizedBox(width: 12),

            Expanded(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  Text(
                    video["title"]!,
                    style: const TextStyle(fontWeight: FontWeight.w600),
                  ),
                  const SizedBox(height: 6),
                  Row(
                    children: [
                      Container(
                        padding: const EdgeInsets.symmetric(
                            horizontal: 8, vertical: 4),
                        decoration: BoxDecoration(
                          color: Colors.blue.shade100,
                          borderRadius: BorderRadius.circular(12),
                        ),
                        child: const Text(
                          "ASL + Captions",
                          style: TextStyle(
                              fontSize: 12,
                              color: Colors.blue),
                        ),
                      ),
                      const SizedBox(width: 8),
                      Text(video["duration"]!,
                          style: const TextStyle(
                              fontSize: 12, color: Colors.grey)),
                    ],
                  ),
                ],
              ),
            ),

            Semantics(
              label: 'Play video',
              image: true,
              excludeSemantics: true,
              child: const Icon(Icons.chevron_right, color: Colors.grey),
            ),
          ],
        ),
      ),
    );
  }

  // ===============================
  // ACCESSIBILITY INFO
  // ===============================

  Widget _accessibilityInfo() {
    return Container(
      padding: const EdgeInsets.all(14),
      decoration: BoxDecoration(
        color: Colors.blue.shade50,
        borderRadius: BorderRadius.circular(14),
        border: Border.all(color: Colors.blue.shade200),
      ),
      child: const Text(
        "♿ Accessibility: All videos include American Sign Language (ASL) interpretation and closed captions. You can toggle captions on/off using the subtitle button.",
        style: TextStyle(fontSize: 13),
      ),
    );
  }
}
