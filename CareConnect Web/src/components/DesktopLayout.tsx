import { ReactNode } from 'react';
import { 
  LayoutDashboard, 
  Pill, 
  Calendar, 
  History, 
  Settings, 
  Bell, 
  User, 
  Phone,
  HelpCircle,
  ChevronRight
} from 'lucide-react';
import { Screen } from './CareConnectApp';

interface DesktopLayoutProps {
  children: ReactNode;
  currentScreen: Screen;
  onNavigate: (screen: Screen) => void;
  showBadge?: boolean;
}

export function DesktopLayout({ children, currentScreen, onNavigate, showBadge = false }: DesktopLayoutProps) {
  const navigationItems = [
    { id: 'dashboard' as Screen, label: 'Dashboard', icon: LayoutDashboard },
    { id: 'medications' as Screen, label: 'Medications', icon: Pill },
    { id: 'appointments' as Screen, label: 'Appointments', icon: Calendar },
    { id: 'history' as Screen, label: 'Task History', icon: History },
    { id: 'asl-help' as Screen, label: 'ASL Help', icon: HelpCircle },
    { id: 'accessibility' as Screen, label: 'Settings', icon: Settings },
  ];

  const isActive = (screenId: Screen) => {
    // Handle related screens
    if (screenId === 'dashboard' && (currentScreen === 'dashboard' || currentScreen === 'step-task')) return true;
    if (screenId === 'appointments' && (currentScreen === 'appointments' || currentScreen === 'appointment-detail')) return true;
    return currentScreen === screenId;
  };

  return (
    <div className="h-full flex bg-gray-50">
      {/* Sidebar */}
      <div className="w-64 bg-gradient-to-b from-blue-600 to-blue-700 text-white flex flex-col shadow-xl">
        {/* Logo/Brand */}
        <div className="p-6 border-b border-blue-500/30">
          <h1 className="text-2xl font-bold">CareConnect</h1>
          <p className="text-blue-100 text-sm mt-1">Care Management</p>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.id);
            
            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                  active
                    ? 'bg-white text-blue-600 shadow-lg font-semibold'
                    : 'text-blue-50 hover:bg-white/10'
                }`}
              >
                <Icon className="w-5 h-5 flex-shrink-0" />
                <span className="flex-1 text-left">{item.label}</span>
                {active && <ChevronRight className="w-4 h-4" />}
              </button>
            );
          })}
        </nav>

        {/* Emergency SOS Button */}
        <div className="p-4 border-t border-blue-500/30">
          <button
            onClick={() => onNavigate('sos')}
            className="w-full bg-red-500 hover:bg-red-600 text-white font-bold py-4 px-4 rounded-lg flex items-center justify-center gap-2 shadow-lg transition-colors"
          >
            <Phone className="w-5 h-5" />
            Emergency SOS
          </button>
        </div>

        {/* User Profile */}
        <div className="p-4 border-t border-blue-500/30">
          <button
            onClick={() => onNavigate('profile')}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white/10 transition-colors"
          >
            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
              <User className="w-5 h-5" />
            </div>
            <div className="flex-1 text-left">
              <p className="font-semibold text-sm">Sarah Johnson</p>
              <p className="text-blue-100 text-xs">View Profile</p>
            </div>
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar */}
        <div className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between shadow-sm">
          <div>
            <h2 className="text-xl font-bold text-gray-900">
              {navigationItems.find(item => isActive(item.id))?.label || 'CareConnect'}
            </h2>
            <p className="text-sm text-gray-500 mt-0.5">
              {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
          </div>

          <div className="flex items-center gap-2">
            {/* Notifications */}
            <div className="relative">
              <button
                onClick={() => onNavigate('missed-alert')}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors relative"
              >
                <Bell className="w-5 h-5 text-gray-600" />
                {showBadge && (
                  <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-red-500 rounded-full animate-pulse" />
                )}
              </button>
            </div>

            {/* Profile */}
            <button
              onClick={() => onNavigate('profile')}
              className="flex items-center gap-2 px-3 py-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <User className="w-4 h-4 text-blue-600" />
              </div>
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-auto bg-gray-50">
          {children}
        </div>
      </div>
    </div>
  );
}
