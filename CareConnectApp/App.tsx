import React, { useState } from 'react';
import { View } from 'react-native';

/* Screens */
import WelcomeScreen from './src/screens/WelcomeScreen';
import LoginScreen from './src/screens/LoginScreen';
import RegisterScreen from './src/screens/RegisterScreen';
import Dashboard from './src/screens/TodayDashboard';
import AppointmentList from './src/screens/AppointmentList';
import AppointmentDetail from './src/screens/AppointmentDetail';
import TaskHistory from './src/screens/TaskHistoryScreen';
import AccessibilitySettings from './src/screens/AccessibilitySettings';
import ASLHelpScreen from './src/screens/ASLHelpScreen';
import StepByStepTask from './src/screens/StepByStepTask';
import MedicationsScreen from './src/screens/MedicationsScreen';
import SOSConfirmation from './src/screens/SOSConfirmation';
import ProfileScreen from './src/screens/ProfileScreen';
import MissedTaskAlert from './src/screens/MissedTaskAlert';

export type Screen =
  | 'welcome'
  | 'login'
  | 'register'
  | 'dashboard'
  | 'medications'
  | 'appointments'
  | 'appointment-detail'
  | 'task-history'
  | 'accessibility'
  | 'asl-help'
  | 'step-task'
  | 'sos'
  | 'profile'
  | 'missed-tasks';

export default function App() {
  const [screen, setScreen] = useState<Screen>('welcome');
  const [hasMissedTasks, setHasMissedTasks] = useState(true);

  const onNavigate = (next: Screen) => {
    setScreen(next);
  };

  const sharedProps = {
    onNavigate,
    isTablet: false,
    orientation: 'portrait' as const,
    hasMissedTasks,
  };

  switch (screen) {
    case 'welcome':
      return <WelcomeScreen {...sharedProps} />;

    case 'login':
      return <LoginScreen {...sharedProps} />;

    case 'register':
      return <RegisterScreen {...sharedProps} />;

    case 'dashboard':
      return <Dashboard {...sharedProps} />;

    case 'medications':
      return <MedicationsScreen {...sharedProps} />;

    case 'appointments':
      return <AppointmentList {...sharedProps} />;

    case 'appointment-detail':
      return <AppointmentDetail {...sharedProps} />;

    case 'task-history':
      return <TaskHistory {...sharedProps} />;

    case 'accessibility':
      return <AccessibilitySettings {...sharedProps} />;

    case 'asl-help':
      return <ASLHelpScreen {...sharedProps} />;

    case 'step-task':
      return <StepByStepTask {...sharedProps} />;

    case 'sos':
      return <SOSConfirmation {...sharedProps} />;

    case 'profile':
      return <ProfileScreen {...sharedProps} />;

    case 'missed-tasks':
      return (
        <MissedTaskAlert
          {...sharedProps}
          onDismiss={() => setHasMissedTasks(false)}
        />
      );

    default:
      return <View />;
  }
}
