import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import DashboardLayout from './components/DashboardLayout';
import WelcomeScreen from './screens/WelcomeScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import DashboardScreen from './screens/DashboardScreen';
import MedicationsScreen from './screens/MedicationsScreen';
import AppointmentsScreen from './screens/AppointmentsScreen';
import TaskHistoryScreen from './screens/TaskHistoryScreen';
import ASLHelpScreen from './screens/ASLHelpScreen';
import SettingsScreen from './screens/SettingsScreen';
import AccessibilityScreen from './screens/AccessibilityScreen';
import PatientProfileScreen from './screens/PatientProfileScreen';
import PlaceholderScreen from './screens/PlaceholderScreen';

export default function App() {
  return (
    <BrowserRouter
      future={{
        v7_startTransition: true,
        v7_relativeSplatPath: true,
      }}
    >
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<WelcomeScreen />} />
          <Route path="login" element={<LoginScreen />} />
          <Route path="register" element={<RegisterScreen />} />
          <Route path="forgot-password" element={<Navigate to="/login" replace />} />
        </Route>
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<DashboardScreen />} />
          <Route path="medications" element={<MedicationsScreen />} />
          <Route path="appointments" element={<AppointmentsScreen />} />
          <Route path="appointments/:id" element={<PlaceholderScreen title="Appointment Details" />} />
          <Route path="task-history" element={<TaskHistoryScreen />} />
          <Route path="asl-help" element={<ASLHelpScreen />} />
          <Route path="settings" element={<SettingsScreen />} />
          <Route path="settings/accessibility" element={<AccessibilityScreen />} />
          <Route path="sos" element={<PlaceholderScreen title="Emergency SOS" />} />
          <Route path="profile" element={<PatientProfileScreen />} />
          <Route path="notifications" element={<PlaceholderScreen title="Notifications" />} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
