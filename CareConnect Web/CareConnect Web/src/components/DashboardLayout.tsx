import { useState, useEffect } from 'react';
import { Outlet, useNavigate, useLocation, Link } from 'react-router';
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
  ChevronRight,
  Menu,
  X,
  ChevronLeft
} from 'lucide-react';
import { useAuthStore } from '../store/authStore';
import { useTaskStore } from '../store/taskStore';
import { useBreakpoint } from '../hooks/useMediaQuery';

export function DashboardLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const { isMobile, isTablet, isDesktop } = useBreakpoint();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [tabletSidebarCollapsed, setTabletSidebarCollapsed] = useState(false);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const user = useAuthStore((state) => state.user);
  const hasMissedTasks = useTaskStore((state) => state.hasMissedTasks);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login', { replace: true });
    }
  }, [isAuthenticated, navigate]);

  // Close mobile menu when route changes
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const navigationItems = [
    { path: '/app/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { path: '/app/medications', label: 'Medications', icon: Pill },
    { path: '/app/appointments', label: 'Appointments', icon: Calendar },
    { path: '/app/history', label: 'Task History', icon: History },
    { path: '/app/asl-help', label: 'ASL Help', icon: HelpCircle },
    { path: '/app/accessibility', label: 'Settings', icon: Settings },
  ];

  const isActive = (path: string) => {
    if (path === '/app/dashboard') {
      return location.pathname === '/app/dashboard' || location.pathname.startsWith('/app/task');
    }
    if (path === '/app/appointments') {
      return location.pathname.startsWith('/app/appointments');
    }
    return location.pathname === path;
  };

  const getPageTitle = () => {
    const activeNav = navigationItems.find(item => isActive(item.path));
    if (activeNav) return activeNav.label;
    if (location.pathname.startsWith('/app/task')) return 'Task Details';
    if (location.pathname === '/app/missed-tasks') return 'Missed Tasks';
    if (location.pathname === '/app/sos') return 'Emergency SOS';
    if (location.pathname === '/app/profile') return 'Profile';
    return 'CareConnect';
  };

  if (!isAuthenticated) {
    return null;
  }

  // Calculate sidebar width based on breakpoint
  const sidebarWidth = isDesktop ? 'w-64' : isTablet ? (tabletSidebarCollapsed ? 'w-20' : 'w-64') : 'w-64';

  return (
    <div className="h-screen flex bg-gray-50 relative">
      {/* Mobile Menu Overlay */}
      {isMobile && mobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div 
        className={`
          ${sidebarWidth}
          bg-gradient-to-b from-blue-600 to-blue-700 text-white flex flex-col shadow-xl
          transition-all duration-300 z-50
          ${isMobile ? 'fixed inset-y-0 left-0' : 'relative'}
          ${isMobile && !mobileMenuOpen ? '-translate-x-full' : 'translate-x-0'}
        `}
      >
        {/* Logo/Brand */}
        <div className="p-6 border-b border-blue-500/30 flex items-center justify-between">
          <div className={tabletSidebarCollapsed && isTablet ? 'hidden' : ''}>
            <h1 className="text-2xl font-bold">CareConnect</h1>
            <p className="text-blue-100 text-sm mt-1">Care Management</p>
          </div>
          {tabletSidebarCollapsed && isTablet && (
            <h1 className="text-xl font-bold">CC</h1>
          )}
          
          {/* Tablet collapse toggle */}
          {isTablet && (
            <button
              onClick={() => setTabletSidebarCollapsed(!tabletSidebarCollapsed)}
              className="p-2 hover:bg-white/10 rounded-lg"
            >
              {tabletSidebarCollapsed ? <ChevronRight className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
            </button>
          )}

          {/* Mobile close button */}
          {isMobile && (
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 hover:bg-white/10 rounded-lg"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.path);
            
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                  active
                    ? 'bg-white text-blue-600 shadow-lg font-semibold'
                    : 'text-blue-50 hover:bg-white/10'
                }`}
                title={tabletSidebarCollapsed && isTablet ? item.label : undefined}
              >
                <Icon className="w-5 h-5 flex-shrink-0" />
                {!(tabletSidebarCollapsed && isTablet) && (
                  <>
                    <span className="flex-1 text-left">{item.label}</span>
                    {active && <ChevronRight className="w-4 h-4" />}
                  </>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Emergency SOS Button */}
        <div className="p-4 border-t border-blue-500/30">
          <Link
            to="/app/sos"
            className={`w-full bg-red-500 hover:bg-red-600 text-white font-bold py-4 px-4 rounded-lg flex items-center ${
              tabletSidebarCollapsed && isTablet ? 'justify-center' : 'justify-center gap-2'
            } shadow-lg transition-colors`}
            title={tabletSidebarCollapsed && isTablet ? 'Emergency SOS' : undefined}
          >
            <Phone className="w-5 h-5" />
            {!(tabletSidebarCollapsed && isTablet) && 'Emergency SOS'}
          </Link>
        </div>

        {/* User Profile */}
        <div className="p-4 border-t border-blue-500/30">
          <Link
            to="/app/profile"
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white/10 transition-colors ${
              tabletSidebarCollapsed && isTablet ? 'justify-center' : ''
            }`}
            title={tabletSidebarCollapsed && isTablet ? 'Profile' : undefined}
          >
            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
              <User className="w-5 h-5" />
            </div>
            {!(tabletSidebarCollapsed && isTablet) && (
              <div className="flex-1 text-left">
                <p className="font-semibold text-sm truncate">{user?.name || 'User'}</p>
                <p className="text-blue-100 text-xs">View Profile</p>
              </div>
            )}
          </Link>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar */}
        <div className="bg-white border-b border-gray-200 px-4 md:px-6 py-4 flex items-center justify-between shadow-sm">
          <div className="flex items-center gap-3">
            {/* Mobile hamburger menu */}
            {isMobile && (
              <button
                onClick={() => setMobileMenuOpen(true)}
                className="p-2 hover:bg-gray-100 rounded-lg"
              >
                <Menu className="w-6 h-6 text-gray-600" />
              </button>
            )}
            
            <div>
              <h2 className="text-lg md:text-xl font-bold text-gray-900">
                {getPageTitle()}
              </h2>
              <p className="text-xs md:text-sm text-gray-500 mt-0.5 hidden sm:block">
                {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Notifications */}
            <div className="relative">
              <Link
                to="/app/missed-tasks"
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors relative block"
              >
                <Bell className="w-5 h-5 text-gray-600" />
                {hasMissedTasks && (
                  <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-red-500 rounded-full animate-pulse" />
                )}
              </Link>
            </div>

            {/* Profile */}
            <Link
              to="/app/profile"
              className="flex items-center gap-2 px-3 py-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <User className="w-4 h-4 text-blue-600" />
              </div>
            </Link>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-auto bg-gray-50">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
