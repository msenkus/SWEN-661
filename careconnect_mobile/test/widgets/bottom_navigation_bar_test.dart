import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:go_router/go_router.dart';

import 'package:careconnect_mobile/widgets/bottom_navigation_bar.dart';

Widget _harness({
  required GoRouter router,
  required String initialRoute,
}) {
  return MaterialApp.router(
    routerConfig: router,
  );
}

void main() {
  late GoRouter router;

  setUp(() {
    router = GoRouter(
      initialLocation: '/dashboard',
      routes: [
        GoRoute(
          path: '/dashboard',
          builder: (_, __) => Scaffold(
            body: const Center(child: Text('Dashboard')),
            bottomNavigationBar: const CareConnectBottomNavBar(currentRoute: '/dashboard'),
          ),
        ),
        GoRoute(
          path: '/history',
          builder: (_, __) => Scaffold(
            body: const Center(child: Text('History')),
            bottomNavigationBar: const CareConnectBottomNavBar(currentRoute: '/history'),
          ),
        ),
        GoRoute(
          path: '/messages',
          builder: (_, __) => Scaffold(
            body: const Center(child: Text('Messages Screen')),
            bottomNavigationBar: const CareConnectBottomNavBar(currentRoute: '/messages'),
          ),
        ),
        GoRoute(
          path: '/medications',
          builder: (_, __) => Scaffold(
            body: const Center(child: Text('Medications')),
            bottomNavigationBar: const CareConnectBottomNavBar(currentRoute: '/medications'),
          ),
        ),
        GoRoute(
          path: '/profile',
          builder: (_, __) => Scaffold(
            body: const Center(child: Text('Profile Screen')),
            bottomNavigationBar: const CareConnectBottomNavBar(currentRoute: '/profile'),
          ),
        ),
      ],
    );
  });

  group('CareConnectBottomNavBar', () {
    testWidgets('renders five nav items with labels', (tester) async {
      await tester.pumpWidget(_harness(router: router, initialRoute: '/dashboard'));
      await tester.pumpAndSettle();

      expect(find.text('Home'), findsOneWidget);
      expect(find.text('Tasks'), findsOneWidget);
      expect(find.text('Messages'), findsOneWidget);
      expect(find.text('Health'), findsOneWidget);
      expect(find.text('Profile'), findsOneWidget);
    });

    testWidgets('Home tab is active when currentRoute is /dashboard', (tester) async {
      await tester.pumpWidget(_harness(router: router, initialRoute: '/dashboard'));
      await tester.pumpAndSettle();
      expect(find.byIcon(Icons.home), findsOneWidget);
    });

    testWidgets('Home tab is active when currentRoute is /', (tester) async {
      router = GoRouter(
        initialLocation: '/',
        routes: [
          GoRoute(
            path: '/',
            builder: (_, __) => Scaffold(
              body: const Center(child: Text('Home')),
              bottomNavigationBar: const CareConnectBottomNavBar(currentRoute: '/'),
            ),
          ),
        ],
      );
      await tester.pumpWidget(_harness(router: router, initialRoute: '/'));
      await tester.pumpAndSettle();
      expect(find.byIcon(Icons.home), findsOneWidget);
    });

    testWidgets('Tasks tab is active for /history', (tester) async {
      router = GoRouter(
        initialLocation: '/history',
        routes: [
          GoRoute(
            path: '/history',
            builder: (_, __) => Scaffold(
              body: const Center(child: Text('History')),
              bottomNavigationBar: const CareConnectBottomNavBar(currentRoute: '/history'),
            ),
          ),
        ],
      );
      await tester.pumpWidget(MaterialApp.router(routerConfig: router));
      await tester.pumpAndSettle();
      expect(find.byIcon(Icons.calendar_today), findsOneWidget);
    });

    testWidgets('Tasks tab is active for /missed-tasks', (tester) async {
      await tester.pumpWidget(
        MaterialApp.router(
          routerConfig: GoRouter(
            initialLocation: '/missed-tasks',
            routes: [
              GoRoute(
                path: '/missed-tasks',
                builder: (_, __) => Scaffold(
                  body: const Center(child: Text('Missed')),
                  bottomNavigationBar: const CareConnectBottomNavBar(currentRoute: '/missed-tasks'),
                ),
              ),
            ],
          ),
        ),
      );
      await tester.pumpAndSettle();
      expect(find.byIcon(Icons.calendar_today), findsOneWidget);
    });

    testWidgets('Tasks tab is active for /step-task', (tester) async {
      await tester.pumpWidget(
        MaterialApp.router(
          routerConfig: GoRouter(
            initialLocation: '/step-task',
            routes: [
              GoRoute(
                path: '/step-task',
                builder: (_, __) => Scaffold(
                  body: const Center(child: Text('Step')),
                  bottomNavigationBar: const CareConnectBottomNavBar(currentRoute: '/step-task'),
                ),
              ),
            ],
          ),
        ),
      );
      await tester.pumpAndSettle();
      expect(find.byIcon(Icons.calendar_today), findsOneWidget);
    });

    testWidgets('Messages tab is active for /messages', (tester) async {
      await tester.pumpWidget(
        MaterialApp.router(
          routerConfig: GoRouter(
            initialLocation: '/messages',
            routes: [
              GoRoute(
                path: '/messages',
                builder: (_, __) => Scaffold(
                  body: const Center(child: Text('Messages')),
                  bottomNavigationBar: const CareConnectBottomNavBar(currentRoute: '/messages'),
                ),
              ),
            ],
          ),
        ),
      );
      await tester.pumpAndSettle();
      expect(find.byIcon(Icons.chat_bubble), findsOneWidget);
    });

    testWidgets('Health tab is active for /medications', (tester) async {
      await tester.pumpWidget(
        MaterialApp.router(
          routerConfig: GoRouter(
            initialLocation: '/medications',
            routes: [
              GoRoute(
                path: '/medications',
                builder: (_, __) => Scaffold(
                  body: const Center(child: Text('Medications')),
                  bottomNavigationBar: const CareConnectBottomNavBar(currentRoute: '/medications'),
                ),
              ),
            ],
          ),
        ),
      );
      await tester.pumpAndSettle();
      expect(find.byIcon(Icons.favorite), findsOneWidget);
    });

    testWidgets('Health tab is active for /appointments', (tester) async {
      await tester.pumpWidget(
        MaterialApp.router(
          routerConfig: GoRouter(
            initialLocation: '/appointments',
            routes: [
              GoRoute(
                path: '/appointments',
                builder: (_, __) => Scaffold(
                  body: const Center(child: Text('Appointments')),
                  bottomNavigationBar: const CareConnectBottomNavBar(currentRoute: '/appointments'),
                ),
              ),
            ],
          ),
        ),
      );
      await tester.pumpAndSettle();
      expect(find.byIcon(Icons.favorite), findsOneWidget);
    });

    testWidgets('Health tab is active for /appointment-detail', (tester) async {
      await tester.pumpWidget(
        MaterialApp.router(
          routerConfig: GoRouter(
            initialLocation: '/appointment-detail',
            routes: [
              GoRoute(
                path: '/appointment-detail',
                builder: (_, __) => Scaffold(
                  body: const Center(child: Text('Detail')),
                  bottomNavigationBar: const CareConnectBottomNavBar(currentRoute: '/appointment-detail'),
                ),
              ),
            ],
          ),
        ),
      );
      await tester.pumpAndSettle();
      expect(find.byIcon(Icons.favorite), findsOneWidget);
    });

    testWidgets('Health tab is active for /health', (tester) async {
      await tester.pumpWidget(
        MaterialApp.router(
          routerConfig: GoRouter(
            initialLocation: '/health',
            routes: [
              GoRoute(
                path: '/health',
                builder: (_, __) => Scaffold(
                  body: const Center(child: Text('Health')),
                  bottomNavigationBar: const CareConnectBottomNavBar(currentRoute: '/health'),
                ),
              ),
            ],
          ),
        ),
      );
      await tester.pumpAndSettle();
      expect(find.byIcon(Icons.favorite), findsOneWidget);
    });

    testWidgets('Profile tab is active for /profile', (tester) async {
      await tester.pumpWidget(
        MaterialApp.router(
          routerConfig: GoRouter(
            initialLocation: '/profile',
            routes: [
              GoRoute(
                path: '/profile',
                builder: (_, __) => Scaffold(
                  body: const Center(child: Text('Profile Screen')),
                  bottomNavigationBar: const CareConnectBottomNavBar(currentRoute: '/profile'),
                ),
              ),
            ],
          ),
        ),
      );
      await tester.pumpAndSettle();
      expect(find.byIcon(Icons.person), findsOneWidget);
    });

    testWidgets('Profile tab is active for /accessibility', (tester) async {
      await tester.pumpWidget(
        MaterialApp.router(
          routerConfig: GoRouter(
            initialLocation: '/accessibility',
            routes: [
              GoRoute(
                path: '/accessibility',
                builder: (_, __) => Scaffold(
                  body: const Center(child: Text('Accessibility')),
                  bottomNavigationBar: const CareConnectBottomNavBar(currentRoute: '/accessibility'),
                ),
              ),
            ],
          ),
        ),
      );
      await tester.pumpAndSettle();
      expect(find.byIcon(Icons.person), findsOneWidget);
    });

    testWidgets('unknown route defaults to Home index', (tester) async {
      await tester.pumpWidget(
        MaterialApp.router(
          routerConfig: GoRouter(
            initialLocation: '/unknown',
            routes: [
              GoRoute(
                path: '/unknown',
                builder: (_, __) => Scaffold(
                  body: const Center(child: Text('Unknown')),
                  bottomNavigationBar: const CareConnectBottomNavBar(currentRoute: '/unknown'),
                ),
              ),
            ],
          ),
        ),
      );
      await tester.pumpAndSettle();
      expect(find.byIcon(Icons.home), findsOneWidget);
    });

    testWidgets('tapping Home navigates to dashboard', (tester) async {
      await tester.pumpWidget(
        MaterialApp.router(
          routerConfig: GoRouter(
            initialLocation: '/profile',
            routes: [
              GoRoute(path: '/dashboard', builder: (_, __) => const Scaffold(body: Center(child: Text('Dashboard')))),
              GoRoute(path: '/profile', builder: (_, __) => Scaffold(body: const Center(child: Text('Profile')), bottomNavigationBar: const CareConnectBottomNavBar(currentRoute: '/profile'))),
            ],
          ),
        ),
      );
      await tester.pumpAndSettle();
      await tester.tap(find.text('Home'));
      await tester.pumpAndSettle();
      expect(find.text('Dashboard'), findsOneWidget);
    });

    testWidgets('tapping Tasks navigates to history', (tester) async {
      await tester.pumpWidget(_harness(router: router, initialRoute: '/dashboard'));
      await tester.pumpAndSettle();
      await tester.tap(find.text('Tasks'));
      await tester.pumpAndSettle();
      expect(find.text('History'), findsOneWidget);
    });

    testWidgets('tapping Messages navigates to messages', (tester) async {
      await tester.pumpWidget(_harness(router: router, initialRoute: '/dashboard'));
      await tester.pumpAndSettle();
      await tester.tap(find.text('Messages'));
      await tester.pumpAndSettle();
      expect(find.text('Messages Screen'), findsOneWidget);
    });

    testWidgets('tapping Health navigates to medications', (tester) async {
      await tester.pumpWidget(_harness(router: router, initialRoute: '/dashboard'));
      await tester.pumpAndSettle();
      await tester.tap(find.text('Health'));
      await tester.pumpAndSettle();
      expect(find.text('Medications'), findsOneWidget);
    });

    testWidgets('tapping Profile navigates to profile', (tester) async {
      await tester.pumpWidget(_harness(router: router, initialRoute: '/dashboard'));
      await tester.pumpAndSettle();
      await tester.tap(find.text('Profile'));
      await tester.pumpAndSettle();
      expect(find.text('Profile Screen'), findsOneWidget);
    });

    testWidgets('has semantics label for bottom navigation', (tester) async {
      await tester.pumpWidget(_harness(router: router, initialRoute: '/dashboard'));
      await tester.pumpAndSettle();
      expect(find.bySemanticsLabel('Bottom navigation'), findsOneWidget);
    });
  });
}
