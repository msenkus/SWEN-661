import { useState } from 'react';
import { DesktopLayout } from './DesktopLayout';
import { TodayDashboard } from './screens/TodayDashboard';
import { MedicationList } from './screens/MedicationList';
import { StepByStepTask } from './screens/StepByStepTask';
import { MissedTaskAlert } from './screens/MissedTaskAlert';
import { ASLHelpScreen } from './screens/ASLHelpScreen';
import { AccessibilitySettings } from './screens/AccessibilitySettings';
import { AppointmentList } from './screens/AppointmentList';
import { AppointmentDetail } from './screens/AppointmentDetail';
import { SOSConfirmation } from './screens/SOSConfirmation';
import { TaskHistory } from './screens/TaskHistory';
import { LoginScreen } from './screens/LoginScreen';
import { RegisterScreen } from './screens/RegisterScreen';
import { WelcomeScreen } from './screens/WelcomeScreen';
import { ProfileScreen } from './screens/ProfileScreen';

export type Screen =
  | 'welcome'
  | 'login'
  | 'register'
  | 'profile'
  | 'dashboard'
  | 'medications'
  | 'step-task'
  | 'missed-alert'
  | 'asl-help'
  | 'accessibility'
  | 'appointments'
  | 'appointment-detail'
  | 'sos'
  | 'history';

export function CareConnectApp() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('login');
  const [hasMissedTasks, setHasMissedTasks] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const renderScreen = () => {
    const screenProps = {
      onNavigate: setCurrentScreen,
      hasMissedTasks,
    };

    // Public screens that don't require authentication
    const publicScreens = ['welcome', 'login', 'register'];
    
    // If not authenticated and trying to access protected screen, show login
    if (!isAuthenticated && !publicScreens.includes(currentScreen)) {
      return <LoginScreen {...screenProps} onLogin={() => setIsAuthenticated(true)} />;
    }

    switch (currentScreen) {
      case 'welcome':
        return <WelcomeScreen {...screenProps} />;
      case 'register':
        return <RegisterScreen {...screenProps} />;
      case 'login':
        return <LoginScreen {...screenProps} onLogin={() => setIsAuthenticated(true)} />;
      case 'profile':
        return <ProfileScreen {...screenProps} onLogout={() => setIsAuthenticated(false)} />;
      case 'dashboard':
        return <TodayDashboard {...screenProps} />;
      case 'medications':
        return <MedicationList {...screenProps} />;
      case 'step-task':
        return <StepByStepTask {...screenProps} />;
      case 'missed-alert':
        return <MissedTaskAlert {...screenProps} onDismiss={() => setHasMissedTasks(false)} />;
      case 'asl-help':
        return <ASLHelpScreen {...screenProps} />;
      case 'accessibility':
        return <AccessibilitySettings {...screenProps} />;
      case 'appointments':
        return <AppointmentList {...screenProps} />;
      case 'appointment-detail':
        return <AppointmentDetail {...screenProps} />;
      case 'sos':
        return <SOSConfirmation {...screenProps} />;
      case 'history':
        return <TaskHistory {...screenProps} />;
      default:
        return <TodayDashboard {...screenProps} />;
    }
  };

  // Desktop layout wrapper for authenticated screens
  if (isAuthenticated && !['welcome', 'login', 'register'].includes(currentScreen)) {
    return (
      <DesktopLayout 
        currentScreen={currentScreen} 
        onNavigate={setCurrentScreen}
        showBadge={hasMissedTasks}
      >
        {renderScreen()}
      </DesktopLayout>
    );
  }

  // Fullscreen for login/register/welcome
  return (
    <div className="w-screen h-screen bg-white">
      {renderScreen()}
    </div>
  );
}
