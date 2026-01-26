import 'package:go_router/go_router.dart';
import 'screens/dashboard_screen.dart';
import 'screens/tasks_screen.dart';
import 'screens/sos_screen.dart';
import 'screens/medications_screen.dart';

final router = GoRouter(
  routes: [
    GoRoute(
      path: '/',
      builder: (context, state) => const DashboardScreen(),
    ),
    GoRoute(
      path: '/task',
      builder: (context, state) => const TasksScreen(),
    ),
    GoRoute(
      path: '/sos',
      builder: (context, state) => const SosScreen(),
    ),
     GoRoute(
      path: '/medications',
      builder: (context, state) => const MedicationsScreen(),
    ),
  ],
);
