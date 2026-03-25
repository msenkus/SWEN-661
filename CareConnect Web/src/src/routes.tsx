import { createBrowserRouter, Navigate } from 'react-router';
import { RootLayout } from './components/RootLayout';
import { AuthLayout } from './components/AuthLayout';
import { DashboardLayout } from './components/DashboardLayout';

// Auth screens
import { WelcomeScreen } from './components/screens/WelcomeScreen';
import { LoginScreen } from './components/screens/LoginScreen';
import { RegisterScreen } from './components/screens/RegisterScreen';

// App screens
import { TodayDashboard } from './components/screens/TodayDashboard';
import { MedicationList } from './components/screens/MedicationList';
import { StepByStepTask } from './components/screens/StepByStepTask';
import { MissedTaskAlert } from './components/screens/MissedTaskAlert';
import { ASLHelpScreen } from './components/screens/ASLHelpScreen';
import { AccessibilitySettings } from './components/screens/AccessibilitySettings';
import { AppointmentList } from './components/screens/AppointmentList';
import { AppointmentDetail } from './components/screens/AppointmentDetail';
import { SOSConfirmation } from './components/screens/SOSConfirmation';
import { TaskHistory } from './components/screens/TaskHistory';
import { ProfileScreen } from './components/screens/ProfileScreen';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <Navigate to="/welcome" replace />,
      },
      {
        path: 'welcome',
        element: <AuthLayout><WelcomeScreen /></AuthLayout>,
      },
      {
        path: 'login',
        element: <AuthLayout><LoginScreen /></AuthLayout>,
      },
      {
        path: 'register',
        element: <AuthLayout><RegisterScreen /></AuthLayout>,
      },
      {
        path: 'app',
        element: <DashboardLayout />,
        children: [
          {
            index: true,
            element: <Navigate to="/app/dashboard" replace />,
          },
          {
            path: 'dashboard',
            element: <TodayDashboard />,
          },
          {
            path: 'medications',
            element: <MedicationList />,
          },
          {
            path: 'task/:taskId',
            element: <StepByStepTask />,
          },
          {
            path: 'missed-tasks',
            element: <MissedTaskAlert />,
          },
          {
            path: 'asl-help',
            element: <ASLHelpScreen />,
          },
          {
            path: 'accessibility',
            element: <AccessibilitySettings />,
          },
          {
            path: 'appointments',
            element: <AppointmentList />,
          },
          {
            path: 'appointments/:appointmentId',
            element: <AppointmentDetail />,
          },
          {
            path: 'sos',
            element: <SOSConfirmation />,
          },
          {
            path: 'history',
            element: <TaskHistory />,
          },
          {
            path: 'profile',
            element: <ProfileScreen />,
          },
        ],
      },
    ],
  },
]);
