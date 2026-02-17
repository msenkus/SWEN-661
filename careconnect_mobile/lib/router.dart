import 'package:go_router/go_router.dart';
import 'screens/login_screen.dart';
import 'screens/dashboard_screen.dart';
import 'screens/sos_screen.dart';
import 'screens/medications_screen.dart';
import 'screens/step_by_step_task_screen.dart';
import 'screens/accessibility_settings_screen.dart';
import 'screens/appointment_list_screen.dart';
import 'screens/appointment_detail_screen.dart';
import 'screens/asl_help_screen.dart';
import 'screens/missed_task_alert_screen.dart';
import 'screens/task_history_screen.dart';
import 'screens/messages_screen.dart';
import 'screens/profile_screen.dart';


final router = GoRouter(
  routes: [
    GoRoute(
      path: '/',
      builder: (context, state) => const LoginScreen(),
    ),
    GoRoute(
      path: '/dashboard',
      builder: (context, state) => const DashboardScreen(),
    ),
    GoRoute(
      path: '/sos',
      builder: (context, state) => const SosScreen(),
    ),
    GoRoute(
      path: '/medications',
      builder: (context, state) => const MedicationsScreen(),
    ),
    GoRoute(
      path: '/step-task',
      builder: (context, state) => const StepByStepTaskScreen(),
    ),
    GoRoute(
      path: '/accessibility',
      builder: (context, state) =>
      const AccessibilitySettingsScreen(),
    ),
    GoRoute(
      path: '/appointments',
      builder: (context, state) => const AppointmentListScreen(),
    ),
    GoRoute(
      path: '/appointment-detail',
      builder: (context, state) =>
      const AppointmentDetailScreen(),
    ),
    GoRoute(
      path: '/asl-help',
      builder: (context, state) => const ASLHelpScreen(),
    ),
    GoRoute(
  path: '/missed-tasks',
  builder: (context, state) =>
      const MissedTaskAlertScreen(),
    ),
    GoRoute(
      path: '/history',
      builder: (context, state) =>
          const TaskHistoryScreen(),
    ),
    GoRoute(
      path: '/messages',
      builder: (context, state) => const MessagesScreen(),
    ),
    GoRoute(
      path: '/profile',
      builder: (context, state) => const ProfileScreen(),
    ),
    GoRoute(
      path: '/health',
      builder: (context, state) => const MedicationsScreen(),
    ),
  ],
);
